const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const facilityRoutes = require('./routes/facilities')
const bookingRoutes = require('./routes/bookings')

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/facilities', facilityRoutes)
app.use('/bookings', bookingRoutes)

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  family: 4
})
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err)
  })

app.get('/', (req, res) => {
  res.send('SportNest server is running')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})