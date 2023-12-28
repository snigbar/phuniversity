import { Types } from 'mongoose'

export type TPreRequisiteCourses = {
  course: Types.ObjectId
  isDeleted: boolean
}

export type TCourse = {
  title: string
  prefix: string
  code: number
  credits: number
  preRequisiteCourse: TPreRequisiteCourses[]
  isDeleted?: boolean
}

export type TCourseFaculties = {
  course: Types.ObjectId
  faculties: Types.ObjectId[]
}
