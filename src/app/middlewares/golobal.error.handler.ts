import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { TErrorSource } from '../errors/interface'
import config from '../config/config'
import { handleZodError } from '../errors/zodErrorHandler'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import AppError from '../errors/appError'

let errorSource: TErrorSource = [{ path: '', message: 'Someting went wrong' }]

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'something went wrong'

  if (err instanceof ZodError) {
    const handeledError = handleZodError(err)
    statusCode = handeledError?.statusCode
    message = handeledError?.message
    errorSource = handeledError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSource = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSource = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSource = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err?.message
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.enviroment === 'development' && err?.stack,
  })
}
