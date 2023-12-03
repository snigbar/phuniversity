import { z } from 'zod'
import {
  AcademicSemesters,
  AcademicSemestersCodes,
  Months,
} from './academicSemester.constants'

const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesters] as [string, ...[string]]),
    year: z.string(),
    code: z.enum([...AcademicSemestersCodes] as [string, ...[string]]),
    startMonth: z.enum([...Months] as [string, ...[string]]),
    endMonth: z.enum([...Months] as [string, ...[string]]),
  }),
})

export default {
  academicSemesterValidationSchema,
}
