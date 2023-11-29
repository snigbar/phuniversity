import { model, Schema } from 'mongoose'
import { Tuser } from './users.interface'
import bcrypt from 'bcrypt'
import config from '../../config/config'

const UserSchema = new Schema<Tuser>(
  {
    id: { type: String, required: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'faculty', 'student'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isdeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

// pre save middleware/ hook : will work on create()  save()
UserSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.saltRound))
  next()
})

// post save middleware / hook
UserSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const userModel = model<Tuser>('User', UserSchema)
