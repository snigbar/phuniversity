import { Router } from 'express'
import { userRoutes } from '../modules/users/users.route'
import { StudentRoutes } from '../modules/students/student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
