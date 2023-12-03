import HttpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import academicSemesterServices from './academicSemester.services'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterServices.createAcademiSemesterInDB(
      req.body,
    )
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Academic Semester Created Successfully',
      data: result,
    })
  },
)

const getAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterServices.getAcademicSemestersFromDB()

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Retirved all academic semesters',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params
    const result =
      await academicSemesterServices.getSingleSemesterFromDB(semesterId)

    if (!result) throw new Error('No matched document found')

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Retirved academic semester',
      data: result,
    })
  },
)

const UpdateAnAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params
    const result = await academicSemesterServices.updateAcademicSemesterInDB(
      semesterId,
      req.body,
    )

    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Academic semester is updated succesfully',
      data: result,
    })
  },
)

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemester,
  UpdateAnAcademicSemester,
}
