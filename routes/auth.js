const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, photo, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, photo, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'Registration successful!' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found!' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password!' })
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({
      message: 'Login successful!',
      user: { name: user.name, email: user.email, photo: user.photo }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logout successful!' })
})

module.exports = router