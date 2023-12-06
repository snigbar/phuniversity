import HttpStatus from 'http-status'
import mongoose from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/appError'

const AcademicDepartmentSchema = new mongoose.Schema<TAcademicDepartment>({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  academicFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'academicFaculty',
  },
})

AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  })
  if (isDepartmentExists) throw new Error('Department is already exists')
  next()
})

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const id = this.getQuery()
  const isDepartmentExists = await AcademicDepartmentModel.findOne({
    _id: id,
  })
  if (!isDepartmentExists)
    throw new AppError(HttpStatus.NOT_FOUND, "Department doesn't exists")
  next()
})

const AcademicDepartmentModel = mongoose.model<TAcademicDepartment>(
  'academicDepartment',
  AcademicDepartmentSchema,
)

export default AcademicDepartmentModel
