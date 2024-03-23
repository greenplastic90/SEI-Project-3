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
    Outdoor: [
      'Amazing experience!',
      'Loved the adventure!',
      'The scenery was breathtaking.',
      'Such a refreshing outdoor activity!',
      'I felt so connected to nature!',
      'An unforgettable journey!',
    ],
    Food: [
      'Delicious food!',
      'Great vegan options!',
      'The flavors were incredible.',
      'Everything tasted fresh and homemade.',
      'Loved the culinary adventure!',
      'Best dining experience in a while!',
    ],
    Party: [
      'Best party ever!',
      'Had an amazing time!',
      'The vibe was fantastic!',
      'Great music and people!',
      "Can't wait for the next one!",
      'This party was lit!',
    ],
    Music: [
      'Incredible live performance!',
      'The music was soulful and moving.',
      'What a talented lineup!',
      'Felt every beat! just awesome!',
      'A musical feast for the ears.',
      'That concert was legendary!',
    ],
    Sports: [
      'What an intense game!',
      'Loved the competitive spirit!',
      'Great sportsmanship shown by all.',
      'Thrilling to watch from start to finish!',
      'A truly exciting sports event!',
      "Can't wait for the next match!",
    ],
    Workshop: [
      'Really informative and engaging.',
      'Loved the hands-on experience.',
      'Great workshop, learned a lot!',
      'The instructor was top-notch.',
      'So much valuable information.',
      'Fantastic learning environment!',
    ],
    Class: [
      'Educational and fun!',
      'Really enjoyed the interactive aspect.',
      'The teacher was great and knowledgeable.',
      'Learnt something new today!',
      'Highly recommend this class.',
      'The class exceeded my expectations!',
    ],
    Tech: [
      'Fascinating insights into the tech world!',
      'Very innovative and informative.',
      'Cutting-edge technology, mind blown!',
      "A tech enthusiast's dream event.",
      'Loved the hands-on tech demos.',
      'Great networking opportunity with tech experts.',
    ],
    Craft: [
      'So creative and fun!',
      'Loved making something beautiful.',
      'The crafting materials were top quality.',
      'A perfect way to express creativity.',
      'Therapeutic and rewarding experience.',
      "Can't wait to craft more!",
    ],
    Art: [
      'The art pieces were stunning!',
      'Felt inspired by all the creativity.',
      'A visual feast for the eyes!',
      'The exhibition was beautifully curated.',
      'Loved the variety of art styles.',
      "An art lover's paradise!",
    ],
    Culture: [
      'An enriching cultural experience.',
      'Learned so much about different cultures.',
      'A beautiful celebration of diversity.',
      'The cultural performances were captivating.',
      'Felt immersed in the cultural atmosphere.',
      'A great way to experience different traditions!',
    ],
    History: [
      'So much fascinating history!',
      'The historical insights were enlightening.',
      'A journey back in time! loved it!',
      'The historical artifacts were incredible.',
      'Gained a deeper understanding of our past.',
      'A must-visit for history buffs!',
    ],
    Philosophy: [
      'Thought-provoking and insightful!',
      'Stimulating philosophical discussions.',
      'Great exchange of ideas and perspectives.',
      'Loved the depth of the conversation.',
      "A philosopher's dream meetup.",
      'Left with more questions than answers, in a good way!',
    ],
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
