import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { LoginAuth } from './auth.services'
import { Request, Response } from 'express'
import config from '../../config/config'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, needsPasswordChange } =
    await LoginAuth.loginUserService(req.body)

  res.cookie('refreshToken', refreshToken, {
    secure: config.enviroment === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body
  const result = await LoginAuth.changePassword(req.user, passwordData)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'password changed successfully',
    data: result,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await LoginAuth.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  })
})

const forgotPassword = catchAsync(async (req, res) => {
  const { id } = req.body
  const result = await LoginAuth.forgotPasswordLink(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'reset link generated',
    data: result,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization

  const result = await LoginAuth.resetPassword(req.body, token as string)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesful!',
    data: result,
  })
})

export const loginUserController = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
}
