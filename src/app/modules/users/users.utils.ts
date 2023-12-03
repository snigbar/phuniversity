import { TacademicSemester } from '../academicSemester/academicSemester.interface'
import { userModel } from './users.model'

const findLastEnrolledStudentId = async () => {
  const lastStudent = await userModel
    .findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: 1 })
    .lean()
  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TacademicSemester) => {
  let currentId = (0).toString()
  const lastStudentID = await findLastEnrolledStudentId()
  const lastStudentSemesterCode = lastStudentID?.substring(4, 6)
  const lastStudentYear = lastStudentID?.substring(0, 4)
  const currentSemesterCode = payload.code
  const currentStudentYear = payload.year

  if (
    lastStudentID &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentStudentYear
  ) {
    currentId = lastStudentID.substring(6)
  }
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0')
  increamentId = `${payload.year}${payload.code}${increamentId}`
  return increamentId
}
