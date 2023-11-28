import express, { Application } from 'express'
import cors from 'cors'

const app: Application = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('running....')
})

export default app
