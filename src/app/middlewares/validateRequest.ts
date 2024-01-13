import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'

export const validateRequest = (validationSchema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // validation with zod
    await validationSchema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    })

    next()
  })
}
