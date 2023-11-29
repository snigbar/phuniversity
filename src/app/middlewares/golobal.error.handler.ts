import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500
  const message = err.message || 'something went wrong'
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  })
}
