import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartmentModel from './academicDepartment.model'

const createAcademiDepartmentInDB = async (payload: TAcademicDepartment) => {
  return await AcademicDepartmentModel.create(payload)
}

const getAcademicDepartmentFromDB = async () => {
  return AcademicDepartmentModel.find().populate('academicFaculty')
}

const getSingleDepartmentFromDB = async (id: string) => {
  return AcademicDepartmentModel.findById(id).populate('academicFaculty')
}

const updateAcademicDepartmentInDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export default {
  createAcademiDepartmentInDB,
  getAcademicDepartmentFromDB,
  getSingleDepartmentFromDB,
  updateAcademicDepartmentInDB,
}
