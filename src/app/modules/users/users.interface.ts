import { Model } from 'mongoose'
import { user_role } from './user.constants'

export type Tuser = {
  id: string
  email: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'faculty' | 'student'
  status: 'in-progress' | 'blocked'
  isdeleted: boolean
  passwordChangedAt?: Date
}

export interface UserModel extends Model<Tuser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistsByCustomId(id: string): Promise<Tuser>
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>

  isJwtIssuedBeforePasswordChange(
    // eslint-disable-next-line no-unused-vars
    passwordChangedAt: Date,
    // eslint-disable-next-line no-unused-vars
    jwtIssuedAt: number,
  ): Promise<boolean>
}

export type TUserType = keyof typeof user_role
