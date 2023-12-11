import { TacademicSemester } from './../academicSemester/academicSemester.interface'
import { AcademicSemesterModel } from './../academicSemester/academicSemester.Schema'
import config from '../../config/config'
import { TStudent } from '../students/student.interface'
import { StudentModel } from '../students/student.model'
import { Tuser } from './users.interface'
import { userModel } from './users.model'
import { generateStudentId } from './users.utils'
import mongoose from 'mongoose'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const createStudentInDB = async (password: string, payload: TStudent) => {
  const user: Partial<Tuser> = {}

  const session = await mongoose.startSession()

  try {
    // start session
    session.startTransaction()
    // check and assign password
    user.password = password || config.defaultPassword
    // assign role
    user.role = 'student'

    // find Academic Semester
    const admissionSemester = await AcademicSemesterModel.findById(
      payload.admissionSemester,
    )

    // assign Id
    user.id = await generateStudentId(admissionSemester as TacademicSemester)

    // transaction - 1
    const newUser = await userModel.create([user], { session }) // newUser is array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id //refernecing to user

    // tarnsaction - 2
    const newStudent = await StudentModel.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new Student')
    }

    return newStudent

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student')
  }
}

export const userServices = {
  createStudentInDB,
}
