import HttpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import academicDepartmentServices from './academicDepartment.services'
import AppError from '../../errors/appError'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentServices.createAcademiDepartmentInDB(
      req.body,
    )
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Academic department Created Successfully',
      data: result,
    })
  },
)

const getAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.getAcademicDepartmentFromDB()

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Retirved all academic departments',
      data: result,
    })
  },
)

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params
    const result =
      await academicDepartmentServices.getSingleDepartmentFromDB(departmentId)

    if (!result)
      throw new AppError(HttpStatus.NOT_FOUND, 'No matched document found')

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Retirved academic department',
      data: result,
    })
  },
)

const UpdateAnAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params
    const result =
      await academicDepartmentServices.updateAcademicDepartmentInDB(
        departmentId,
        req.body,
      )

    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Academic department is updated succesfully',
      data: result,
    })
  },
)

export const academicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  UpdateAnAcademicDepartment,
}
