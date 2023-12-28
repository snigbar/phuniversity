import { TacademicSemester } from './../academicSemester/academicSemester.interface'
import { AcademicSemesterModel } from './../academicSemester/academicSemester.Schema'
import config from '../../config/config'
import { TStudent } from '../students/student.interface'
import { StudentModel } from '../students/student.model'
import { Tuser } from './users.interface'
import { userModel } from './users.model'
import { generateFacultyId, generateStudentId } from './users.utils'
import mongoose from 'mongoose'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'
import AcademicDepartmentModel from '../academicDepartment/academicDepartment.model'
import { Faculty } from '../faculty/faculty.model'
import { TFaculty } from '../faculty/faculty.interface'

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

    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student')
  }
}

// crate Faculty

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<Tuser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string)

  //set student role
  userData.role = 'faculty'

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  )

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateFacultyId()

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }) // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const userServices = {
  createStudentInDB,
  createFacultyIntoDB,
}
