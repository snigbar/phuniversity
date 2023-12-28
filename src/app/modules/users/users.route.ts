import { Router } from 'express'
import { userController } from './users.controllers'

import studentValidation from '../students/student.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { FacultyValidations } from '../faculty/faculty.validation'

const router = Router()

router.post(
  '/create-student',
  validateRequest(studentValidation.studentValidationSchema),
  userController.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
)
export const userRoutes = router
