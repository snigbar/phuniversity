import HttpStatus from 'http-status'
import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query)

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Students are retrieved succesfully',
    data: result,
  })
})

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await StudentServices.getSingleStudentFromDB(id)

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Student are retrieved succesfully',
    data: result,
  })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await StudentServices.deleteStudentFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Student is deleted succesfully',
    data: result,
  })
})

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const { student } = req.body
  const result = await StudentServices.updateStudentInDB(id, student)
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Student is updated succesfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
