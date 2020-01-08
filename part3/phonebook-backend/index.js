require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//     {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//     },
//     {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//     },
//     {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//     },
//     {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//     }
// ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.countDocuments({}, (err, count) => {
    response.status(200).send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}<p/>`)
  })

  // const info = `
  // <p>Phonebook has info for ${persons.length} people</p>
  // <p>${new Date()}<p/>`

  // response.status(200).send(info)
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end
    })
    .catch(error => next(error))
})

const generateId = () => {
  // const maxId = persons.length > 0
  //     ? Math.max(...persons.map(n => n.id))
  //     : 0
  // return maxId + 1

  return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (request, response, next) => {
  const newPerson = request.body

  if (!newPerson.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!newPerson.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  Person.find({ name: newPerson.name }, function (err, docs) {
    if (docs.length) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
  })

  // if (persons.some(person => person.name === newPerson.name)) {
  //     return response.status(400).json({
  //         error: 'name must be unique'
  //     })
  // }

  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
    id: generateId(),
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})