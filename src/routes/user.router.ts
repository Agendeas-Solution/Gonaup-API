import { Router } from 'express'
import { userController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { userSchemas } from '../validators'
import { API_URL } from '../constants'

const userRouter = Router()

userRouter.get(
  '/',
  joiValidatorMiddleware(userSchemas.userDetailsById),
  validateTokenMiddleware,
  userController.getUserDetailById,
)

userRouter.post(
  API_URL.FREELANCER_EXPERIENCE,
  joiValidatorMiddleware(userSchemas.saveFreelancerExperience),
  validateTokenMiddleware,
  userController.saveFreelancerExperience,
)

userRouter.get(
  API_URL.FREELANCER_EXPERIENCE + API_URL.LIST,
  joiValidatorMiddleware(userSchemas.freelancerExperienceList),
  validateTokenMiddleware,
  userController.getFreelancerExperienceList,
)

userRouter.delete(
  API_URL.FREELANCER_EXPERIENCE,
  joiValidatorMiddleware(userSchemas.deleteFreelancerExperience),
  validateTokenMiddleware,
  userController.deleteFreelancerExperienceById,
)
export { userRouter }
