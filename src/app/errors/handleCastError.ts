import mongoose from 'mongoose'
import { TErrorSource, TGenericResponseType } from './interface'

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericResponseType => {
  const statusCode = 400
  const errorSources: TErrorSource = [
    {
      path: error?.path,
      message: error?.message,
    },
  ]

  return {
    statusCode,
    errorSources,
    message: 'validation error',
  }
}

export default handleCastError
