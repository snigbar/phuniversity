import { Router } from 'express'
import { userRoutes } from '../modules/users/users.route'
import { StudentRoutes } from '../modules/students/student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'

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
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
