const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')
const cors = require('cors')

// Morgan-toteutus, ei kaunein
morgan.token('info', function (req, res) {
  const r = '{"name":"' + req.body['name'] + '","number":"' + req.body['number'] + '"}'
  return r
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'))
app.use(express.static('build'))

/* Ei tarvita enää kovakoodattua 'tietokantaa'...
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-53212331",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-4244213",
    id: 4
  }
]
 */

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has ${persons.length} persons' info.</p>
  <br></br>
  <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// Kaikkien henkilöiden haku
app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()))
  })
})

// Random id:n generaattorille ei ole enää käyttöä...
//const generateId = () => {
//  return Math.ceil(Math.random() * 1000)
//}

// Uuden henkilön lisäys. Frontend ei osaa antaa virheviestiä puuttuvista parametreista...
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  } 
  
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.map(p => p.name).includes(body.name)) {
    return res.status(400).json({
      error: 'person is already in phonebook'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    //id: generateId(),
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
})

// Henkilön poisto
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// Numeron muokkaus
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true})
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

// Virheiden käsittelijät middlewareissa
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformattedi id'})
  }
  next(error)
}

app.use(errorHandler)

// Port ja 'käynnistys'

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})