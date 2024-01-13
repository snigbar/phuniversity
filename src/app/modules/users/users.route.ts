import { NextFunction, Request, Response, Router } from 'express'
import { userController } from './users.controllers'

import studentValidation from '../students/student.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { FacultyValidations } from '../faculty/faculty.validation'
import { auth } from '../../middlewares/auth'
import { user_role } from './user.constants'
import { AdminValidations } from '../admin/admin.validation'
import { changeStatusValidationSchema } from './users.validations'
import { upload } from '../../utils/sendImagesToCloudinary'

const router = Router()

router.post(
  '/create-student',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  },
  validateRequest(studentValidation.studentValidationSchema),
  // auth(user_role.admin),
  userController.createStudent,
)

router.post(
  '/create-faculty',
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
)

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
)

router.get(
  '/me',
  auth(user_role.admin, user_role.faculty, user_role.student),
  userController.getme,
)

router.post(
  '/change-status/:id',
  auth(user_role.admin),
  validateRequest(changeStatusValidationSchema),
  userController.changeStatus,
)

export const userRoutes = router
