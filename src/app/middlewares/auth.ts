import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/appError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config/config'
import { TUserType } from '../modules/users/users.interface'
import { userModel } from '../modules/users/users.model'

export const auth = (...requiredRoles: TUserType[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //    check token
    const token = req.headers?.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }
    //  verify token

    const decoded = jwt.verify(
      token,
      config.jwtAccessToken as string,
    ) as JwtPayload

    const { role, id, iat } = decoded

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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized  hi!')
    }

    if (
      user.passwordChangedAt &&
      (await userModel.isJwtIssuedBeforePasswordChange(
        user.passwordChangedAt,
        iat as number,
      ))
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized,login again!',
      )
    }

    req.user = decoded as JwtPayload & { role: string }
    next()
  })
}
