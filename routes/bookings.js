const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const Facility = require('../models/Facility')

// Add booking
router.post('/', async (req, res) => {
  try {
    const facility = await Facility.findById(req.body.facility_id)
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found!' })
    }
    const booking = new Booking({
      ...req.body,
      facility_name: facility.name
    })
    await booking.save()
    await Facility.findByIdAndUpdate(req.body.facility_id, { $inc: { booking_count: 1 } })
    res.status(201).json({ message: 'Booking successful!', booking })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// Get bookings by user email
router.get('/:email', async (req, res) => {
  try {
    const bookings = await Booking.find({ user_email: req.params.email })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: 'Booking cancelled!' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

module.exports = router