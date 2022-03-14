import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleWare from './middleware/not-found.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.get('/', (req, res) => {
  throw new Error('error')
  res.send('welcome')
})

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`)
})
