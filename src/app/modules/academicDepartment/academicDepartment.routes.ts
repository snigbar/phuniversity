import { validateRequest } from '../../middlewares/validateRequest'

import express from 'express'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { academicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
)

router.get('/', academicDepartmentController.getAcademicDepartment)
router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
)
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.UpdateAnAcademicDepartment,
)
export const AcademicDepartmentRoutes = router
