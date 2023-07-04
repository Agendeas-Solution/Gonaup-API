import { Router } from 'express'
import { API_URL } from '../constants'
import { joiValidatorMiddleware } from '../middlewares'
import { authSchemas } from '../validators'
import { authController } from '../controllers'

const authRouter = Router()

authRouter.post(
  API_URL.CLIENT.EMAIL_SIGNUP,
  joiValidatorMiddleware(authSchemas.freelancerOrClientEmailSignup),
  authController.clientEmailSignup,
)

authRouter.post(
  API_URL.FREELANCER.EMAIL_SIGNUP,
  joiValidatorMiddleware(authSchemas.freelancerOrClientEmailSignup),
  authController.freelancerEmailSignup,
)

authRouter.post(
  API_URL.AUTH.LOGIN,
  joiValidatorMiddleware(authSchemas.login),
  authController.login,
)

export { authRouter }
