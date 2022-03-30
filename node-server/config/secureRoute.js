import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Missing header')
    const token = req.headers.authorization.replace('Bearer ', '')
    // console.log(token)
    const payload = jwt.verify(token, process.env.SECRET)
    // console.log(payload)
    const userToVerify = await User.findOne({ username: payload.username })
    if (!userToVerify) throw new Error('User Not Found')
    req.currentUser = userToVerify
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json('Unauthorized')
  }
}
