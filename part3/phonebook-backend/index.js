const express = require('express')
var morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())


morgan.token("body", function (req) {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}<p/>`

    response.status(200).send(info)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    // const maxId = persons.length > 0
    //     ? Math.max(...persons.map(n => n.id))
    //     : 0
    // return maxId + 1

    return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (request, response) => {
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

    if (persons.some(person => person.name === newPerson.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: newPerson.name,
        number: newPerson.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})