(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(2),l=function(e){var n=e.person,t=e.removePerson;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:t},"delete"))},i=function(e){var n=e.personsToShow,t=e.removePerson;return n.map((function(e){return r.a.createElement(l,{key:e.name,person:e,removePerson:function(){return t(e.id)}})}))},m=function(e,n){var t=e.handleSearchChange,a=n.searchCondition;return r.a.createElement("form",{onSubmit:t},"Filter:",r.a.createElement("input",{value:a,onChange:t}))},s=t(3),f=t.n(s),d="/api/persons",h=function(){return f.a.get(d).then((function(e){return e.data}))},v=function(e){return f.a.post(d,e).then((function(e){return e.data}))},b=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return f.a.delete("".concat(d,"/").concat(e)),f.a.get(d).then((function(e){return e.data}))},p=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"info"},n)},g=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},j=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),l=Object(o.a)(c,2),s=l[0],f=l[1],d=Object(a.useState)(""),j=Object(o.a)(d,2),O=j[0],S=j[1],w=Object(a.useState)(""),P=Object(o.a)(w,2),C=P[0],y=P[1],T=Object(a.useState)(null),k=Object(o.a)(T,2),N=k[0],A=k[1],J=Object(a.useState)(null),x=Object(o.a)(J,2),B=x[0],D=x[1];Object(a.useEffect)((function(){h().then((function(e){u(e)}))}),[]);var F=t.filter((function(e){return e.name.includes(C)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:N}),r.a.createElement(g,{message:B}),r.a.createElement("div",null,r.a.createElement(m,{searchCondition:C,handleSearchChange:function(e){y(e.target.value)}})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("h2",null,"Add a new person"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n={name:s,number:O};if(t.filter((function(e){return e.name===s})).length>0){if(window.confirm("Want to update number of ".concat(s,"?"))){var a=t.find((function(e){return e.name===s}));b(a.id,n).then((function(e){u(t.map((function(n){return n.id!==a.id?n:e}))),f(""),S(""),A("Person ".concat(s," updated succesfully.")),setTimeout((function(){A(null)}),5e3)})).catch((function(e){D("Person ".concat(s," was already deleted from server.")),setTimeout((function(){D(null)}),5e3)}))}}else s&&O?(v(n).then((function(e){u(t.concat(e)),f(""),S("")})).catch((function(e){D(e.response.data.error)})),setTimeout((function(){A(null)}),5e3)):(D("Person must have name and number!"),setTimeout((function(){D(null)}),5e3))}},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:s,onChange:function(e){console.log(e.target.value),f(e.target.value)}}),r.a.createElement("br",null),"number:",r.a.createElement("input",{value:O,onChange:function(e){console.log(e.target.value),S(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))),r.a.createElement("h2",null,"Numbers"),r.a.createElement("ul",null,r.a.createElement(i,{personsToShow:F,removePerson:function(e){window.confirm("Are you sure?")&&(E(e).then((function(n){u(t.filter((function(n){return n.id!==e})))})),A("Person removed succesfully."),setTimeout((function(){A(null)}),5e3))}})))};t(36);c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a97f9ced.chunk.js.map