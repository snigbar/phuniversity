import { Router } from 'express'
import { userRoutes } from '../modules/users/users.route'
import { StudentRoutes } from '../modules/students/student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { courseRoute } from '../modules/course/course.route'
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes'
import { offeredCourseRoutes } from '../modules/offeredCourse/OfferedCourse.route'
import { authRoute } from '../modules/auth/auth.routes'
import { EnrolledCourseRoutes } from '../modules/enrolledCourse/enrolledCourse.route'

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
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/enrolled-course',
    route: EnrolledCourseRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
