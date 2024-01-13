import { model, Schema } from 'mongoose'
import { Tuser, UserModel } from './users.interface'
import bcrypt from 'bcrypt'
import config from '../../config/config'

const UserSchema = new Schema<Tuser, UserModel>(
  {
    id: { type: String, required: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
      select: 0,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'faculty', 'student'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isdeleted: { type: Boolean, default: false },
    passwordChangedAt: Date,
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
// find if user exists by custom ID
UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await userModel.findOne({ id }).select('+password')
}
// compare password
UserSchema.statics.isPasswordMatched = async function (
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword)
}

// check password change time
UserSchema.statics.isJwtIssuedBeforePasswordChange = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000
  return passwordChangedTime > jwtIssuedTimestamp
}
export const userModel = model<Tuser, UserModel>('User', UserSchema)
