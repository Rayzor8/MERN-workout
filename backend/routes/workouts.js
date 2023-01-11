const express = require('express')
const { createSingleWorkout } = require('../controllers/workoutControllers')
const router = express.Router()
const WorkoutModel = require('../models/workoutModel')

router.get('/', async (req, res) => {
  const workouts = await WorkoutModel.find({}).sort({ createAt: -1 })
  res.status(200).send(workouts)
})

router.post('/', createSingleWorkout)

router.get('/:id', (req, res) => {
  res.send({ message: 'get single workout ' })
})

router.put('/:id', (req, res) => {
  res.send({ message: 'edit single workout ' })
})

router.delete('/:id', (req, res) => {
  res.send({ message: 'delete single workout ' })
})

module.exports = router
