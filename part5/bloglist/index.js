require('dotenv').config()
const http = require('http')
const express = require('express')
var morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const listHelper = require('./utils/list_helper')
const config = require('./utils/config')
const app = require('./app') // the actual Express app

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})