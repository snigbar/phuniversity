import { AcademicSemesterModel } from './../academicSemester/academicSemester.Schema'
import config from '../../config/config'
import { TStudent } from '../students/student.interface'
import { StudentModel } from '../students/student.model'
import { Tuser } from './users.interface'
import { userModel } from './users.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils'
import mongoose from 'mongoose'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'
import AcademicDepartmentModel from '../academicDepartment/academicDepartment.model'
import { Faculty } from '../faculty/faculty.model'
import { TFaculty } from '../faculty/faculty.interface'
import { Admin } from '../admin/admin.model'
import { TAdmin } from '../admin/admin.interface'
import { user_role } from './user.constants'
import { sendImageToColudinary } from '../../utils/sendImagesToCloudinary'

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<Tuser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string)

  //set student role
  userData.role = 'student'
  // set student email
  userData.email = payload.email

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  )

  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateStudentId(admissionSemester)

    const imageName = `${userData.id}${payload?.name?.firstName}`
    const path = file?.path
    //send image to cloudinary
    const { secure_url } = await sendImageToColudinary(imageName, path)

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }) // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id
    payload.profileImg = secure_url

    // create a student (transaction-2)

    const newStudent = await StudentModel.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}
// crate Faculty

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<Tuser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string)

  //set student role
  userData.role = 'faculty'
  // set email
  userData.email = payload.email

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

    const imageName = `${userData.id}${payload?.name?.firstName}`
    const path = file?.path
    //send image to cloudinary
    const { secure_url } = await sendImageToColudinary(imageName, path)

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }) // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id
    payload.profileImg = secure_url

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

// create admin into DB
const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<Tuser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string)

  //set student role
  userData.role = 'admin'
  // set email
  userData.email = payload.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()

    const imageName = `${userData.id}${payload?.name?.firstName}`
    const path = file?.path
    //send image to cloudinary
    const { secure_url } = await sendImageToColudinary(imageName, path)

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id
    payload.profileImg = secure_url

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getmeFromDB = async (id: string, role: string) => {
  let result = null
  if (role === user_role.student) result = await StudentModel.findOne({ id })
  if (role === user_role.faculty) result = await Faculty.findOne({ id })
  if (role === user_role.admin) result = await Admin.findOne({ id })
  return result
}

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await userModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}
export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getmeFromDB,
  changeStatus,
}
