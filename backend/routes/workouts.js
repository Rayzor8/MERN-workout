const express = require('express')
const {
  createSingleWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutControllers')
const router = express.Router()

router.get('/', getWorkouts)

router.post('/', createSingleWorkout)

router.get('/:id', getSingleWorkout)

router.patch('/:id', updateWorkout)

router.delete('/:id', deleteWorkout)

module.exports = router
