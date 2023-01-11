const Workout = require('../models/workoutModel')

const createSingleWorkout = async (req, res) => {
  const { title, reps, load } = req.body

  try {
    const workout = await Workout.create({ title, reps, load })
    res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({ message: err })
  }
}
module.exports = { createSingleWorkout }
