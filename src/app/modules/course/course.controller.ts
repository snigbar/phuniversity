import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { courseServices } from './course.services'

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Created succesfully',
    data: result,
  })
})

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved succesfully',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved succesfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await courseServices.updateCourseintoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are updated succesfully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.deleteCourseInDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is deleted succesfully',
    data: result,
  })
})

const assignFacultiesToCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await courseServices.assignFacultiestoCourseInDB(
    courseId,
    faculties,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assigned',
    data: result,
  })
})

const removeFacultiesToCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await courseServices.removeFacultiesfromCourseInDB(
    courseId,
    faculties,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed',
    data: result,
  })
})

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesToCourse,
  removeFacultiesToCourse,
}
