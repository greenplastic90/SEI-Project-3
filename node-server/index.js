import express from 'express'
import { port } from './config/environment.js'
import router from './config/routes.js'

const app = express()

const startServer = () => {
  app.use(express.json())
  app.use((req, _res, next) => {
    console.log(`Request Recived on ${req.method} - ${req.url}`)
    next()
  })

  app.use(router)

  app.listen(port, () => console.log(`🚀 Server running on port: ${port}`))
}
startServer()
