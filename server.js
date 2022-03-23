import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import connectDB from './db/connectDB.js'

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('welcome')
// })
app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API' })
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
