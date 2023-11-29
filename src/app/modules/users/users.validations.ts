import { z } from 'zod'

export const UserValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password should be a string' })
    .max(20, { message: "can't be more than 20 characters" })
    .min(8, { message: 'At least 8 characters long' }),
})
