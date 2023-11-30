import { Router } from 'express'
import { userController } from './users.controllers'

import studentValidation from '../students/student.validation'
import { validateRequest } from '../../middlewares/validateRequest'

const router = Router()

router.post(
  '/create-student',
  validateRequest(studentValidation.studentValidationSchema),
  userController.createStudent,
)

export const userRoutes = router
