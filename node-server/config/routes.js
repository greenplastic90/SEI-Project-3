import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'
import { addComment, deleteComment } from '../controllers/comments.js'
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  updateEventLikedBy,
} from '../controllers/events.js'
import { deleteUser, getUserProfile, updateProfile } from '../controllers/users.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

router.route('/events').get(getAllEvents).post(secureRoute, createEvent)

router
  .route('/events/:id')
  .get(getSingleEvent)
  .delete(secureRoute, deleteEvent)
  .put(secureRoute, updateEvent)

router.route('/events/:eventID/user/:userID/likes').put(secureRoute, updateEventLikedBy)

router.route('/events/:id/comments').post(secureRoute, addComment)

router.route('/events/:id/comments/:commentId').delete(secureRoute, deleteComment)

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router
  .route('/profile')
  .delete(secureRoute, deleteUser)
  .get(secureRoute, getUserProfile)
  .put(secureRoute, updateProfile)

// router.route('/profile/:id').get(secureRoute, getSingleProfile)

// router.route('/resetPassword')
//   .put(secureRoute, updatePassword)

export default router
