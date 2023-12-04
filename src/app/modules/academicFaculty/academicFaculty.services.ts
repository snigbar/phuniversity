import { TAcademicFaculty } from './academicFaculty.interface'
import AcademicFacultyModel from './academicFaculty.model'

const createAcademiFacultyInDB = async (payload: TAcademicFaculty) => {
  return await AcademicFacultyModel.create(payload)
}

const getAcademicFacultyFromDB = async () => {
  return AcademicFacultyModel.find({})
}

const getSingleFacultyFromDB = async (id: string) => {
  return AcademicFacultyModel.findById(id)
}

const updateAcademicFacultyInDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export default {
  createAcademiFacultyInDB,
  getAcademicFacultyFromDB,
  getSingleFacultyFromDB,
  updateAcademicFacultyInDB,
}
