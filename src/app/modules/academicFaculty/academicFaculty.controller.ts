import HttpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import academicFacultyServices from './academicFaculty.services'
import AppError from '../../errors/appError'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.createAcademiFacultyInDB(
      req.body,
    )
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Academic faculty Created Successfully',
      data: result,
    })
  },
)

const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyServices.getAcademicFacultyFromDB()

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Retirved all academic faculties',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params
    const result =
      await academicFacultyServices.getSingleFacultyFromDB(facultyId)

    if (!result)
      throw new AppError(HttpStatus.NOT_FOUND, 'No matched document found')

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Retirved academic faculty',
      data: result,
    })
  },
)

const UpdateAnAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params
    const result = await academicFacultyServices.updateAcademicFacultyInDB(
      facultyId,
      req.body,
    )

    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Academic faculty is updated succesfully',
      data: result,
    })
  },
)

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  UpdateAnAcademicFaculty,
}
