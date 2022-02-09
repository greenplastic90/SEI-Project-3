import express from 'express'
import { getAllEvents } from '../controllers/events.js'

const router = express.Router()

router.route('/events').get(getAllEvents)

export default router
