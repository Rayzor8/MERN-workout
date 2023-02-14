const WorkoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')

const createSingleWorkout = async (req, res) => {
  const { title, reps, load } = req.body

  if (!title && !reps && !load) {
    return res.status(400).json({ message: 'Please enter all input value' })
  }

  try {
    const workout = await WorkoutModel.create({ title, reps, load })
    res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

const getWorkouts = async (req, res) => {
  try {
    const findWorkouts = await WorkoutModel.find({}).sort({ createdAt: -1 })
    res.status(200).send(findWorkouts)
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

const getSingleWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Cannot find workout' })
  }

  const singleWorkout = await WorkoutModel.findById(id)

  if (!singleWorkout) {
    return res.status(404).json({ message: 'Cannot find workout' })
  }

  res.status(200).json(singleWorkout)
}

const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Cannot find workout' })
  }

  const findIdAndDelete = await WorkoutModel.findOneAndDelete({ _id: id })

  if (!findIdAndDelete) {
    return res.status(404).json({ message: 'Cannot find workout' })
  }

  res.status(200).json({ message: 'Success delete workout' })
}

const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Cannot find workout' })
  }

  const findAndUpdate = await WorkoutModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  )

  // get new data
  const findById = await WorkoutModel.findById(id)

  if (!findAndUpdate) {
    return res.status(404).json({ message: 'Cannot find workout' })
  }

  res.status(200).json(findById)
}

module.exports = {
  createSingleWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
}
