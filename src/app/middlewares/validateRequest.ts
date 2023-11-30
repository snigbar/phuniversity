import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const validateRequest = (validationSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation with zod
      await validationSchema.parseAsync({
        body: req.body,
      })

      next()
    } catch (error) {
      next(error)
    }
  }
}
