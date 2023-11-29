import HttpStatus from 'http-status'
import { RequestHandler } from 'express'
// import { UserValidationSchema } from './users.validations'
import { userServices } from './users.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  // const validatedData = UserValidationSchema.parse(studentData.password)
  const result = await userServices.createStudentInDB(password, studentData)
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Created Successfully',
    data: result,
  })
})

export const userController = {
  createStudent,
}
