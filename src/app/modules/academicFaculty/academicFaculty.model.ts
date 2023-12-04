import mongoose from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

const AcademicFacultySchema = new mongoose.Schema<TAcademicFaculty>(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true },
)

const AcademicFacultyModel = mongoose.model<TAcademicFaculty>(
  'academicFaculty',
  AcademicFacultySchema,
)

export default AcademicFacultyModel
