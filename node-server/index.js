import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './config/routes.js'

dotenv.config()

const app = express()

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DBURI)
    console.log('Database Connected')

    app.use(express.json())

    app.use((req, _res, next) => {
      console.log(`Request Recived on ${req.method} - ${req.url}`)
      next()
    })

    app.use('/api', router)

    app.use((_req, res) => res.status(404).json({ message: 'Route Not Found' }))

    app.listen(process.env.PORT, () => console.log(`🚀 Server running on port: ${process.env.PORT}`))
  } catch (err) {
    console.log(err)
  }
}
startServer()
