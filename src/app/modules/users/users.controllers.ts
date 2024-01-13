import HttpStatus from 'http-status'
import { RequestHandler } from 'express'
import { userServices } from './users.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import httpStatus from 'http-status'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  const result = await userServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  )
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Created Successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await userServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await userServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

const getme = catchAsync(async (req, res) => {
  const { id, role } = req.user

  const result = await userServices.getmeFromDB(id, role)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user retrived successfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await userServices.changeStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  })
})

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getme,
  changeStatus,
}
