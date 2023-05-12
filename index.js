// Packages
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Database
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}

// Models
const Results = mongoose.model('results', {
  resultNumber: {
    type: Number,
    required: true,
  },
})

// Routes
app.post('/results', async (req, res) => {
  try {
    let newResult = await Results.create(req.body)
    res.send(newResult)
  } catch (err) {
    res.send(err)
  }
})

// Server
app.listen(4000, () => {
  console.log('Ready at http://localhost:4000')
  connectToDB()
})
