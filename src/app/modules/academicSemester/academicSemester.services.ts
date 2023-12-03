import { AcademicSemesterModel } from './academicSemester.Schema'
import { academicSemesterNameCodeMap } from './academicSemester.constants'
import { TacademicSemester } from './academicSemester.interface'

const createAcademiSemesterInDB = async (payload: TacademicSemester) => {
  if (academicSemesterNameCodeMap[payload.name] !== payload.code)
    throw new Error("Semester Code didn't match")

  return AcademicSemesterModel.create(payload)
}

const getAcademicSemestersFromDB = async () => {
  return AcademicSemesterModel.find({})
}

const getSingleSemesterFromDB = async (id: string) => {
  return AcademicSemesterModel.findById(id)
}

const updateAcademicSemesterInDB = async (
  id: string,
  payload: Partial<TacademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMap[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export default {
  createAcademiSemesterInDB,
  getAcademicSemestersFromDB,
  getSingleSemesterFromDB,
  updateAcademicSemesterInDB,
}
