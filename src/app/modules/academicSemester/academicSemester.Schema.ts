import { Schema, model } from 'mongoose'
import { TacademicSemester } from './academicSemester.interface'
import {
  AcademicSemesters,
  AcademicSemestersCodes,
  Months,
} from './academicSemester.constants'

const academicSemesterSchema = new Schema<TacademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesters,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemestersCodes,
      required: true,
    },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months },
    endMonth: { type: String, enum: Months },
  },
  { timestamps: true },
)

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  })
  if (isSemesterExist) throw new Error('Semester is already exists')
  next()
})

export const AcademicSemesterModel = model<TacademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
