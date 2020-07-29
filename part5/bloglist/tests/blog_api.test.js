const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = listHelper.blogs.map(blog => new Blog(blog))
  const promiseArray = blogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(6)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('add a blog', async () => {
  const test = {
    title: 'VS Code REST client is pretty good',
    author: 'Matti Luukkainen',
    url: 'www.jotain.com',
    likes: 35
  }

  await api
    .post('/api/blogs')
    .send(test)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const title = response.body.map(blog => blog.title)
  expect(title).toContain('VS Code REST client is pretty good')
})

test('missing likes defaults to zero', async () => {
  const test = {
    title: 'VS Code REST client is pretty good',
    author: 'Matti Luukkainen',
    url: 'www.jotain.com',
  }

  await api
    .post('/api/blogs')
    .send(test)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body[response.body.length - 1].likes
  expect(likes).toBe(0)
})

test('missing title and url', async () => {
  const test = {
    author: 'Matti Luukkainen',
    likes: 35
  }

  await api
    .post('/api/blogs')
    .send(test)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(listHelper.blogs.length)
})

test('delete a blog', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[response.body.length - 1].id

  await api
    .delete(`/api/blogs/${blog}`)
    .expect(204)

  const responseExpect = await api.get('/api/blogs')
  expect(responseExpect.body.length).toBe(listHelper.blogs.length - 1)
})

test('update a blog', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[response.body.length - 1]
  const expectLikes = blog.likes + 10
  blog.likes = expectLikes

  const putResponse = await api
    .put(`/api/blogs/${blog.id}`)
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(putResponse.body.likes).toBe(expectLikes)
})
afterAll(() => {
  mongoose.connection.close()
})