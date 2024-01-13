import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  url: process.env.MONGO_URI,
  saltRound: process.env.SALT_ROUNDS,
  defaultPassword: process.env.Default_Pass,
  enviroment: process.env.NODE_ENV,
  jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
  jwtRefreshToken: process.env.JWT_REFRESH_TOKEN,
  accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRE,
  refreshTokenExpiry: process.env.JWT_Refresh_TOKEN_EXPIRE,
  appPasswordMail: process.env.MAIL_PASSWORD,
  deployment: process.env.DEPLOYMENT,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecrets: process.env.CLOUDINARY_API_SECRETS,
}
