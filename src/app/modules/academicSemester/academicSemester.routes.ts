import { validateRequest } from '../../middlewares/validateRequest'
import { academicSemesterController } from './academicSemester.controller'
import express from 'express'
import academicSemesterValidation from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.academicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester,
)

router.get('/', academicSemesterController.getAcademicSemester)
router.get('/:semesterId', academicSemesterController.getSingleAcademicSemester)
router.patch(
  '/:semesterId',
  academicSemesterController.UpdateAnAcademicSemester,
)
export const AcademicSemesterRoutes = router
