import { Router } from 'express'
import { API_URL } from '../constants'
import { joiValidatorMiddleware } from '../middlewares'
import { authSchemas } from '../validators'
import { authController } from '../controllers'

const authRouter = Router()

authRouter.post(
  API_URL.CLIENT_EMAIL_SIGNUP,
  joiValidatorMiddleware(authSchemas.clientEmailSignup),
  authController.clientEmailSignup,
)

authRouter.post(
  API_URL.FREELANCER_EMAIL_SIGNUP,
  joiValidatorMiddleware(authSchemas.freelancerEmailSignup),
  authController.freelancerEmailSignup,
)

authRouter.post(
  API_URL.LOGIN,
  joiValidatorMiddleware(authSchemas.login),
  authController.login,
)

export { authRouter }
