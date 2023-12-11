import { ZodError, ZodIssue } from 'zod'
import { TErrorSource, TGenericResponseType } from './interface'

export const handleZodError = (error: ZodError): TGenericResponseType => {
  const statusCode = 400
  const errorSources: TErrorSource = error.issues.map((issues: ZodIssue) => {
    return {
      path: issues?.path[issues.path.length - 1],
      message: issues.message,
    }
  })

  return {
    statusCode,
    errorSources,
    message: 'validation error',
  }
}
