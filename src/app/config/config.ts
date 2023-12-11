import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  url: process.env.MONGO_URI,
  saltRound: process.env.SALT_ROUNDS,
  defaultPassword: process.env.Default_Pass,
  enviroment: process.env.NODE_ENV,
}
