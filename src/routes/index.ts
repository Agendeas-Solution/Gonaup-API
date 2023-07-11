import { Router } from 'express'
import { authRouter } from './auth.router'
import { userRouter } from './user.router'
import { projectRouter } from './project.router'
import { searchRouter } from './search.router'
import { companyRouter } from './company.router'
import { jobPostRouter } from './job-post.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/search', searchRouter)
router.use('/company', companyRouter)
router.use('/job-post', jobPostRouter)

export { router }
