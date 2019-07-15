'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mongoose-crud', {
  useMongoClient: true
})
const db = mongoose.connection

//Here, Import the `models/student.js` to variable and called 'Student'
const Student = require('../models/student');

const done = function () { // eslint-disable-line no-unused-vars
  db.close() 
}

const create = function (firstName, lastName, grade, age, city) {
  const studentParam = {
    firstName:firstName,
    lastName:lastName,
    grade:grade,
    age:age,
    city:city
  }
  Student.create(studentParam)
  .then((sStudent) => console.log(sStudent))
  .catch(console.error)
  .then(done)
}

const index = function () {
  Student.find()
  .then((pStudents) =>{ pStudents.forEach( (sStudent) => console.log(sStudent.toJSON()) ) } )
  .catch(console.error)
  .then(done)
}

const show = function (id) {
  Student.findById(id)
  .then((sStudent) => console.log (sStudent.toJSON()))
  .catch(console.error)
  .then(done)
}

const destroy = function (id) {
  Student.findById(id)
  .then( (sStudent) => sStudent.remove() )
  .catch(console.error)
  .then(done)
}

/**
 * @param {student id} id 
 * @param {the column that the user want to update} field 
 * @param {new value that entered by the user } value 
 */
const update = function (id, field, value) {
  Student.findById(id)
  .then( (sStudent) => {
    sStudent[field] = value
    return sStudent.save()
  })
  .then( (sStudent) =>console.log(sStudent.toJSON()))
  .catch(console.error)
  .then(done)
}

db.once('open', function () {
  const command = process.argv[2]

  let field
  let id

  switch (command) {
    case 'create':
      const firstName = process.argv[3]
      const lastName = process.argv[4]
      const grade = process.argv[5]
      const age = process.argv[6]
      const city = process.argv[7]

      create(firstName, lastName, grade, age, city)

      break

    case 'show':
      id = process.argv[3]
      show(id)
      break

    case 'update':
      id = process.argv[3]
      field = process.argv[4]
      const value = process.argv[5]
      update(id, field, value)
      break

    case 'destroy':
      id = process.argv[3]
      destroy(id)
      break

    default:
      index()

      break
  }
})

module.exports = Student
