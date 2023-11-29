import mongoose from 'mongoose'
import app from './app'
import config from './config/config'

async function main() {
  try {
    await mongoose.connect(config.url as string)
    app.listen(config.port, () => console.log(`Running on port ${config.port}`))
  } catch (error) {
    console.log(error)
  }
}

main()
