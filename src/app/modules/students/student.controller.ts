import HttpStatus from 'http-status'
import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB()

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Students are retrieved succesfully',
    data: result,
  })
})

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params

  const result = await StudentServices.getSingleStudentFromDB(studentId)

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Student are retrieved succesfully',
    data: result,
  })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params

  const result = await StudentServices.deleteStudentFromDB(studentId)
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Student is deleted succesfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}