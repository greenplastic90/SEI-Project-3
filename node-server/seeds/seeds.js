import mongoose from 'mongoose'
import eventData from './data/events.js'
import userData from './data/users.js'
// import eventTypes from './data/eventTypes.js'
import userLocation from './data/userlocation.js'
import Event from '../models/event.js'
import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()

const getRandomInRange = (from, to) => {
  return (Math.random() * (to - from) + from).toFixed(2) * 1
}

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

const createRandomComments = (event, users) => {
  // Add specific comment texts here based on your event types
  const commentsText = {
    Outdoor: ['Amazing experience!', 'Loved the adventure!'],
    Food: ['Delicious food!', 'Great vegan options!'],
    Party: ['Best party ever!', 'Had an amazing time!'],
    // ...other event types
  }

  return Array.from({ length: Math.floor(Math.random() * 5) }, () => {
    const user = getRandomElement(users)
    const eventComments = commentsText[event.eventType] || ['What an event!']
    return {
      owner: user._id,
      text: getRandomElement(eventComments),
    }
  })
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('🚀 Database Connected')
    await mongoose.connection.db.dropDatabase()
    console.log('👌 Database dropped')

    const userDataWithPasswords = userData.map((user) => {
      return {
        ...user,
        password: process.env.DEMO_USER_PASSWORD,
        passwordConfirmation: process.env.DEMO_USER_PASSWORD,
      }
    })

    const users = await User.create(userDataWithPasswords)

    const eventsWithEverythingAdded = eventData.map((event) => {
      const randomUserIndex = Math.floor(Math.random() * users.length)
      const randomLat = getRandomInRange(-0.02, 0.02) + userLocation.latitude
      const randomLong = getRandomInRange(-0.04, 0.04) + userLocation.longitude

      // Create random likes and comments
      const likedBy = users
        .slice(0, Math.floor(Math.random() * users.length))
        .map((user) => ({ owner: user._id }))
      const comments = createRandomComments(event, users)

      return {
        ...event,
        owner: users[randomUserIndex]._id,
        longitude: randomLong,
        latitude: randomLat,
        eventTime: '12:30pm',
        isDemo: true,
        likedBy,
        comments,
      }
    })

    await Event.create(eventsWithEverythingAdded)
    console.log(
      `🌱 Seeded database with ${eventsWithEverythingAdded.length} events and ${users.length} users`
    )
    await mongoose.connection.close()
    console.log('👋 Bye!')
  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
    console.log('👋 Bye!')
  }
}

seedDatabase()
