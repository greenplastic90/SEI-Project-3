import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const registerUser = async (req, res) => {
  try {
    // console.log(req.body)
    const newUser = await User.create(req.body)
    console.log(newUser)
    // accepted 202
    return res.status(202).json(newUser)
  } catch (err) {
    console.log(err)
    // unprocessable entity 422
    return res.status(422).json(err)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const userToLogin = await User.findOne({ username: username })
    if (!userToLogin || !userToLogin.validatePassword(password))
      throw new Error('Unauthorised')

    const token = jwt.sign(
      {
        sub: userToLogin._id,
        username: userToLogin.username,
      },
      process.env.SECRET,
      { expiresIn: '7 days' }
    )
    return res
      .status(200)
      .json({ message: `Welcome back ${username}`, token: token })
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}
