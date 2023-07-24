import { Router } from 'express'
import { API_URL } from '../constants'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
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
  API_URL.RECRUITER.EMAIL_SIGNUP,
  joiValidatorMiddleware(authSchemas.freelancerOrClientEmailSignup),
  authController.recruiterEmailSignup,
)

authRouter.post(
  API_URL.AUTH.LOGIN,
  joiValidatorMiddleware(authSchemas.login),
  authController.login,
)

authRouter.put(
  API_URL.AUTH.CHANGE_PASSWORD,
  joiValidatorMiddleware(authSchemas.changePassword),
  validateTokenMiddleware,
  authController.changePassword,
)

authRouter.put(
  API_URL.AUTH.SWITCH_ACCOUNT,
  joiValidatorMiddleware(authSchemas.switchAccount),
  validateTokenMiddleware,
  authController.switchAccount,
)

authRouter.get(
  API_URL.AUTH.ACCOUNTS,
  validateTokenMiddleware,
  authController.getAccounts,
)

authRouter.post(
  API_URL.AUTH.FORGOT_PASSWORD,
  joiValidatorMiddleware(authSchemas.forgotPassword),
  authController.forgotPassword,
)

authRouter.post(
  API_URL.AUTH.RESET_PASSWORD,
  joiValidatorMiddleware(authSchemas.resetPassword),
  authController.resetPassword,
)

export { authRouter }
