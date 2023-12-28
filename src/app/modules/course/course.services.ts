import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableCourseFields } from './course.constant'
import { TCourse, TCourseFaculties } from './course.interface'
import CourseModel, { CourseFacultiesModel } from './course.model'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const createCourseIntoDB = async (payload: TCourse) =>
  await CourseModel.create(payload)

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find(),
    // .populate('preRequisiteCourse.course'),
    query,
  )
    .search(searchableCourseFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.modelQuery
  return result
}

const getSingleCourseFromDB = async (id: string) =>
  await CourseModel.findById(id).populate('preRequisiteCourse.course')

const deleteCourseInDB = async (id: string) =>
  await CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

const updateCourseintoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...updateCourseInfo } = payload

  // session
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const updatedData = await CourseModel.findByIdAndUpdate(
      id,
      updateCourseInfo,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updatedData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
    }

    // delete preRequisite Courses
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletedPrerequisites = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course)
      // delete preRequisite Courses
      const deletedPrerequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPrerequisites } },
          },
        },
      )

      if (!deletedPrerequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
      }

      //add new PreRequisite Courses
      const newPrerequisites = preRequisiteCourse?.filter(
        (el) => el.course && !el.isDeleted,
      )

      const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPrerequisites } },
        },
        {
          new: true,
          runValidators: true,
        },
      )

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
      }
    }

    await session.commitTransaction()
    await session.endSession()
    const result = await CourseModel.findById(id).populate(
      'preRequisiteCourse.course',
    )
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
  }
}

const assignFacultiestoCourseInDB = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFacultiesModel.findByIdAndUpdate(
    id,
    { $addToSet: { course: id, faculties: { $each: payload } } },
    { upsert: true, new: true },
  )
  return result
}

const removeFacultiesfromCourseInDB = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFacultiesModel.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    { new: true },
  )
  return result
}

export const courseServices = {
  createCourseIntoDB,
  getSingleCourseFromDB,
  getAllCourseFromDB,
  deleteCourseInDB,
  updateCourseintoDB,
  assignFacultiestoCourseInDB,
  removeFacultiesfromCourseInDB,
}
