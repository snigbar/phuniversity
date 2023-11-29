import config from '../../config/config'
import { TStudent } from '../students/student.interface'
import { StudentModel } from '../students/student.model'
import { Tuser } from './users.interface'
import { userModel } from './users.model'

const createStudentInDB = async (password: string, student: TStudent) => {
  const user: Partial<Tuser> = {}
  // check and assign password
  user.password = password || config.defaultPassword
  // assign role
  user.role = 'student'
  // assign Id
  user.id = '123345'

  const newUser = await userModel.create(user)

  if (Object.keys(newUser).length) {
    student.id = newUser.id
    student.user = newUser._id //refernecing to user

    return await StudentModel.create(student)
  }
}

export const userServices = {
  createStudentInDB,
}
