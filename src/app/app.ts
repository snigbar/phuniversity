import express, { Application } from 'express'
import cors from 'cors'
import golobalErrorHandler from './middlewares/golobal.error.handler'
import notfound from './middlewares/notfound'
import router from './routes'
import cookieParser from 'cookie-parser'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('running....')
})

app.use(golobalErrorHandler)
app.use(notfound)
export default app
