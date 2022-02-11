import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/routes.js'

const app = express()

const startServer = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database Connected')

    app.use(express.json())

    app.use((req, _res, next) => {
      console.log(`Request Recived on ${req.method} - ${req.url}`)
      next()
    })

    app.use(router)

    app.use((_req, res) => res.status(404).json({ message: 'Route Not Found' }))

    app.listen(port, () => console.log(`🚀 Server running on port: ${port}`))
  } catch (err) {
    console.log(err)
  }
}
startServer()
