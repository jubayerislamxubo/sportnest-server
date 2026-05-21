const express = require('express')
const router = express.Router()
const Facility = require('../models/Facility')


router.get('/', async (req, res) => {
  try {
    const { search, type } = req.query
    let query = {}
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }
    if (type) {
      query.facility_type = { $in: [type] }
    }
    const facilities = await Facility.find(query)
    res.json(facilities)
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})


router.get('/owner/:email', async (req, res) => {
  try {
    const facilities = await Facility.find({ owner_email: req.params.email })
    res.json(facilities)
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})


router.get('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id)
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found!' })
    }
    res.json(facility)
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})


router.post('/', async (req, res) => {
  try {
    const facility = new Facility(req.body)
    await facility.save()
    res.status(201).json({ message: 'Facility added successfully!', facility })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: 'Facility updated!', facility })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    await Facility.findByIdAndDelete(req.params.id)
    res.json({ message: 'Facility deleted!' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

module.exports = router