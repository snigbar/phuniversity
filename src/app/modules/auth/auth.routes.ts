import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { AuthValidations } from './auth.validations'
import { loginUserController } from './auth.controller'
import { auth } from '../../middlewares/auth'
import { user_role } from '../users/user.constants'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  loginUserController.loginUser,
)

router.post(
  '/change-password',
  validateRequest(AuthValidations.changePasswordSchema),
  auth(user_role.admin, user_role.faculty, user_role.student),
  loginUserController.changePassword,
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  loginUserController.refreshToken,
)

router.post(
  '/forgot-password',
  validateRequest(AuthValidations.forgetPasswordValidationSchema),
  loginUserController.forgotPassword,
)

router.post(
  '/reset-password',
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  loginUserController.resetPassword,
)

export const authRoute = router
