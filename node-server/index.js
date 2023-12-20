import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/routes.js'
import 'dotenv/config' // only needs to be added if it doesn't already exist
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

const startServer = async () => {
	try {
		await mongoose.connect(process.env.DB_URI)
		console.log('Database Connected')

		app.use(express.json())

		app.use((req, _res, next) => {
			console.log(`Request Recived on ${req.method} - ${req.url}`)
			next()
		})

		app.use('/api', router)

		// ** New lines **
		app.use(express.static(path.join(__dirname, 'metups', 'build')))

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, 'metups', 'build', 'index.html'))
		})

		app.use((_req, res) => res.status(404).json({ message: 'Route Not Found' }))

		app.listen(process.env.PORT, () =>
			console.log(`🚀 Server running on port: ${process.env.PORT}`)
		)
	} catch (err) {
		console.log(err)
	}
}
startServer()
