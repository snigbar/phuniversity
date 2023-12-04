import { z } from 'zod'

const academicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Must be a string',
    }),
  }),
})

export default {
  academicFacultyValidation,
}
