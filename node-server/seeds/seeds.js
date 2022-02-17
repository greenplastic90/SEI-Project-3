import mongoose from 'mongoose'
import eventData from './data/events.js'
import userData from './data/users.js'
import eventTypes from './data/eventTypes.js'
import userLocation from './data/userlocation.js'
import { dbURI } from '../config/environment.js'
import Event from '../models/event.js'
import User from '../models/user.js'

const getRandomInRange = (from, to) => {
  return (Math.random() * (to - from) + from).toFixed(2) * 1
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('🚀 Database Connected')
    await mongoose.connection.db.dropDatabase()
    console.log('👌 Database dropped')
    const users = await User.create(userData)
    const eventsWithEverythingAdded = eventData.map((event, i) => {
      const randomUserIndex = Math.floor(Math.random() * users.length)
      const randomTypeIndex = Math.floor(Math.random() * eventTypes.length)
      const randomLat = getRandomInRange(-0.02, 0.02) + userLocation.latitude
      const randomLong = getRandomInRange(-0.04, 0.04) + userLocation.longitude
      return {
        ...event,
        owner: users[randomUserIndex]._id,
        // eventType: eventTypes[randomTypeIndex],
        longitude: randomLong,
        latitude: randomLat,
        eventTime: '12:30pm',
        // image: `https://picsum.photos/2000/500?random=${i}`,
        likedBy: [{ owner: users[randomUserIndex] }],
      }

      // console.log(updatedEvent)
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
