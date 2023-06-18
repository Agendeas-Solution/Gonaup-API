import { Router } from 'express'
import { authRouter } from './auth.router'
import { userRouter } from './user.router'
import { projectRouter } from './project.router'
import { searchRouter } from './search.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/search', searchRouter)

export { router }
