export type TErrorSource = {
  path: string | number
  message: string
}[]

export type TGenericResponseType = {
  statusCode: number
  message: string
  errorSources: TErrorSource
}
