import mongoose from 'mongoose'
import { TErrorSource, TGenericResponseType } from './interface'

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericResponseType => {
  const errorSources: TErrorSource = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'validation Error',
    errorSources,
  }
}

export default handleValidationError
