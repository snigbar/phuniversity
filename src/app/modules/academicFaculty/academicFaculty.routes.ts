import { validateRequest } from '../../middlewares/validateRequest'

import express from 'express'
import academicFacultyValidation from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.academicFacultyValidation),
  academicFacultyController.createAcademicFaculty,
)

router.get('/', academicFacultyController.getAcademicFaculty)
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty)
router.patch(
  '/:facultyId',
  validateRequest(academicFacultyValidation.academicFacultyValidation),
  academicFacultyController.UpdateAnAcademicFaculty,
)
export const AcademicFacultyRoutes = router
