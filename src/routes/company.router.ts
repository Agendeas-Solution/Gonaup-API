import { Router } from 'express'
import { API_URL } from '../constants'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { companySchema } from '../validators'
import { companyController } from '../controllers'

const companyRouter = Router()

companyRouter.post(
  API_URL.DETAILS,
  validateTokenMiddleware,
  joiValidatorMiddleware(companySchema.saveCompanyDetails),
  companyController.saveClientProjectDetails,
)

export { companyRouter }
