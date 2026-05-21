const mongoose = require('mongoose')
const Facility = require('./models/Facility')
require('dotenv').config()

const facilities = [
  {
    name: 'Green Field Football Turf',
    facility_type: 'Football',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
    location: 'Gulshan, Dhaka',
    price_per_hour: 1500,
    capacity: 22,
    available_slots: ['6:00 AM - 8:00 AM', '8:00 AM - 10:00 AM', '4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'],
    description: 'Professional football turf with high quality artificial grass. Perfect for friendly matches and tournaments.',
    owner_email: 'owner@sportnest.com',
    booking_count: 0
  },
  {
    name: 'Smash Badminton Court',
    facility_type: 'Badminton',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
    location: 'Dhanmondi, Dhaka',
    price_per_hour: 800,
    capacity: 4,
    available_slots: ['7:00 AM - 9:00 AM', '9:00 AM - 11:00 AM', '3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM'],
    description: 'Indoor badminton court with professional flooring and lighting. Great for both beginners and professionals.',
    owner_email: 'owner@sportnest.com',
    booking_count: 0
  },
  {
    name: 'Blue Wave Swimming Pool',
    facility_type: 'Swimming',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800',
    location: 'Banani, Dhaka',
    price_per_hour: 1200,
    capacity: 20,
    available_slots: ['6:00 AM - 8:00 AM', '8:00 AM - 10:00 AM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'],
    description: 'Olympic size swimming pool with clean filtered water. Suitable for all age groups.',
    owner_email: 'owner@sportnest.com',
    booking_count: 0
  },
  {
    name: 'Ace Tennis Court',
    facility_type: 'Tennis',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800',
    location: 'Uttara, Dhaka',
    price_per_hour: 1000,
    capacity: 4,
    available_slots: ['7:00 AM - 9:00 AM', '9:00 AM - 11:00 AM', '4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'],
    description: 'Professional tennis court with high quality surface. Equipment rental available.',
    owner_email: 'owner@sportnest.com',
    booking_count: 0
  },
  {
    name: 'Premier Cricket Ground',
    facility_type: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    location: 'Mirpur, Dhaka',
    price_per_hour: 2000,
    capacity: 22,
    available_slots: ['6:00 AM - 9:00 AM', '9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'],
    description: 'Full size cricket ground with proper pitch and outfield. Perfect for practice and matches.',
    owner_email: 'owner@sportnest.com',
    booking_count: 0
  },
  {
    name: 'Slam Dunk Basketball Court',
    facility_type: 'Basketball',
    image: 'https://images.unsplash.com/photo-1546519638405-a9d1b25f6f83?w=800',
    location: 'Mohammadpur, Dhaka',
    price_per_hour: 900,
    capacity: 10,
    available_slots: ['7:00 AM - 9:00 AM', '9:00 AM - 11:00 AM', '3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM'],
    description: 'Indoor basketball court with professional flooring. Suitable for training and friendly games.',
    owner_email: 'owner@sportnest.com',
    booking_count: 0
  }
]

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  .then(async () => {
    console.log('MongoDB connected')
    await Facility.deleteMany({})
    await Facility.insertMany(facilities)
    console.log('Sample facilities added successfully!')
    process.exit()
  })
  .catch(err => {
    console.log('Error:', err)
    process.exit()
  })