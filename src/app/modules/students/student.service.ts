import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { StudentModel } from './student.model'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'
import { userModel } from '../users/users.model'
import QueryBuilder from '../../builder/QueryBuilder'

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exists!')
  }
  const result = await StudentModel.create(studentData)
  return result
}

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const searchFields = ['email', 'name.firstName', 'presentAddress']

  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery

  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const isExists = await StudentModel.isUserExists(id)
  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
  }
  const result = await StudentModel.findOne({ id })
  return result
}

const updateStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  const isExists = await StudentModel.isUserExists(id)
  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const isExists = await StudentModel.isUserExists(id)
    if (!isExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
    }

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
}
