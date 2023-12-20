import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Missing header')
    const token = req.headers.authorization.replace('Bearer ', '')

    const payload = jwt.verify(token, process.env.SECRET)

    const userToVerify = await User.findOne({ username: payload.username })
    if (!userToVerify) throw new Error('User Not Found')
    req.currentUser = userToVerify
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json('Unauthorized')
  }
}
