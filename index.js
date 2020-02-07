const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')
const cors = require('cors')

morgan.token('info', function (req, res) {
  const r = '{"name":"' + req.body['name'] + '","number":"' + req.body['number'] + '"}'
  return r
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'))
app.use(express.static('build'))


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

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has ${persons.length} persons' info.</p>
  <br></br>
  <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()))
  })
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

const generateId = () => {
  return Math.ceil(Math.random() * 1000)
}

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

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port someone`)
})