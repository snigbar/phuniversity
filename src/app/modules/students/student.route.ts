import express from 'express'
import { StudentControllers } from './student.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { updateStudentValidationSchema } from './student.validation'
import { auth } from '../../middlewares/auth'

const router = express.Router()

router.get(
  '/:id',
  auth('faculty', 'admin'),
  StudentControllers.getSingleStudent,
)

router.get('/', StudentControllers.getAllStudents)

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
)

router.delete('/:id', StudentControllers.deleteStudent)
export const StudentRoutes = router
