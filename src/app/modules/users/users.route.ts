import { Router } from 'express'
import { userController } from './users.controllers'

const router = Router()

router.post('/create-student', userController.createStudent)

export const userRoutes = router
