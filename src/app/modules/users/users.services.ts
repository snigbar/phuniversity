import { TacademicSemester } from './../academicSemester/academicSemester.interface'
import { AcademicSemesterModel } from './../academicSemester/academicSemester.Schema'
import config from '../../config/config'
import { TStudent } from '../students/student.interface'
import { StudentModel } from '../students/student.model'
import { Tuser } from './users.interface'
import { userModel } from './users.model'
import { generateStudentId } from './users.utils'

const createStudentInDB = async (password: string, payload: TStudent) => {
  const user: Partial<Tuser> = {}
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

  const newUser = await userModel.create(user)

  if (Object.keys(newUser).length) {
    payload.id = newUser.id
    payload.user = newUser._id //refernecing to user

    return await StudentModel.create(payload)
  }
}

export const userServices = {
  createStudentInDB,
}
