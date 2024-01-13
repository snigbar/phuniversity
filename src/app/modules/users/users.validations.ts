import { z } from 'zod'
import { UserStatus } from './user.constants'

export const UserValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password should be a string' })
    .max(20, { message: "can't be more than 20 characters" })
    .min(8, { message: 'At least 8 characters long' }),
})

export const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
})
