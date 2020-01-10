const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const user = new User({ username: 'root', password: 'aaaaa' })
  await user.save()
})

test('users can be created', async () => {
  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'moikka'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  const user = response.body.map(user => user.username)
  expect(user).toContain('mluukkai')

})

test('user must have a password', async () => {
  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('password required')

})

test('user must have a password that at least 3 characters', async () => {
  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'mo'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('password must be at least 3 characters')

})

test('user must have a username that at least 3 characters', async () => {
  const newUser = {
    username: 'ml',
    name: 'Matti Luukkainen',
    password: 'moikka'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be at least 3 characters')

})

test('username must be unique', async () => {
  const newUser = {
    username: 'root',
    name: 'Matti Luukkainen',
    password: 'moikka'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be unique')

})