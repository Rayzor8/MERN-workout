const express = require('express')

const workoutRouter = require('./routes/workouts')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  res.send({ message: 'WELCOME TO HOMEPAGE' })
})
app.use('/api/workouts', workoutRouter)

// connect db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to MongoDB and Server running on port ' + process.env.PORT)
    })
  })
  .catch((err) => console.log(err))
