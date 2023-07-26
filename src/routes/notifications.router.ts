import { Router } from 'express'
import { API_URL } from '../constants'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { companySchema } from '../validators'
import { companyController } from '../controllers'

const notificationRouter = Router()

export { notificationRouter }
