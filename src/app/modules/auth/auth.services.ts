import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { userModel } from '../users/users.model'
import { TLoginUser } from './auth.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config/config'
import bcrypt from 'bcrypt'
import { createToken } from '../../utils/createToken'
import sendEmail from '../../utils/sendmail'

const loginUserService = async (payload: TLoginUser) => {
  const user = await userModel.isUserExistsByCustomId(payload.id)

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "The user doesn't exists")
  }
  // check if user is deleted
  const isDeleted = user.isdeleted
  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "The user doesn't exists")
  }
  // check if user is blocked
  const isBlocked = user?.status
  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, "The user doesn't exists")
  }

  // check if password is matched
  const passwordMatched = await userModel.isPasswordMatched(
    payload.password,
    user.password,
  )

  if (!passwordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password didn't match")
  }

  // generate access token
  const jwtPayload = {
    id: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessToken as string,
    '1hr',
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshToken as string,
    '10d',
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  }
}

// change password
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(userData.id)
  //checking if the password is correct

  if (!(await userModel.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password did not match')

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.saltRound),
  )

  await userModel.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )

  return null
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(token, config.jwtRefreshToken as string)

  const { id, iat } = decoded as JwtPayload

  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isdeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  if (
    user.passwordChangedAt &&
    (await userModel.isJwtIssuedBeforePasswordChange(
      user.passwordChangedAt,
      iat as number,
    ))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessToken as string,
    config.accessTokenExpiry as string,
  )

  return {
    accessToken,
  }
}

// forgot password

const forgotPasswordLink = async (id: string) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isdeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  }

  const resetToken = createToken(
    jwtPayload,
    config.jwtAccessToken as string,
    '10m',
  )

  const resetLink = `${config.deployment}?id=${user.id}&token=${resetToken}`
  const resetButton = ` <a
  style="padding: 2px 4px; background-color: red; color: #fff; text-align: center; margin: 10pc auto;"
  href=${resetLink}
>
 Reset Password
</a>`

  await sendEmail(resetLink, user.email, resetButton)

  return {}
}

// reset password

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(payload?.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isdeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const decoded = jwt.verify(
    token,
    config.jwtAccessToken as string,
  ) as JwtPayload

  //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.saltRound),
  )

  await userModel.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )
}

export const LoginAuth = {
  loginUserService,
  changePassword,
  refreshToken,
  forgotPasswordLink,
  resetPassword,
}
