import nodemailer from 'nodemailer'
import config from '../config/config'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: config.enviroment === 'production', // `true` for port 465, `false` for all other ports
  auth: {
    user: 'snigbar@gmail.com',
    pass: config.appPasswordMail,
  },
})

const sendEmail = async (link: string, to: string, html: string) => {
  await transporter.sendMail({
    from: 'PH University - reset your password', // sender address
    to, // list of receivers
    subject: 'Reset password - PH University', // Subject line
    text: `reset your password visting here - `, // plain text body
    html,
  })
}

export default sendEmail
