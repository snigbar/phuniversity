import express from 'express'

import { validateRequest } from '../../middlewares/validateRequest'
import { courseControllers } from './course.controller'
import { courseValidation } from './course.validation'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
)

router.get('/:id', courseControllers.getSingleCourse)
router.get('/', courseControllers.getAllCourses)
router.delete('/:id', courseControllers.deleteCourse)
router.patch(
  '/:id',
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse,
)

export const courseRoute = router
