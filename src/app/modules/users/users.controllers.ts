import HttpStatus from 'http-status'
import { RequestHandler } from 'express'
import { userServices } from './users.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import httpStatus from 'http-status'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  const result = await userServices.createStudentInDB(password, studentData)
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Created Successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await userServices.createFacultyIntoDB(password, facultyData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  })
})

export const userController = {
  createStudent,
  createFaculty,
}
