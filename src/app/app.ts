import express, { Application } from 'express'
import cors from 'cors'
import golobalErrorHandler from './middlewares/golobal.error.handler'
import notfound from './middlewares/notfound'
import router from './routes'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('running....')
})

app.use(golobalErrorHandler)
app.use(notfound)
export default app
