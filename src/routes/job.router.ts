import { Router } from 'express'
import { jobController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { jobSchema } from '../validators'
import { API_URL } from '../constants'

const jobRouter = Router()

jobRouter.post(
  API_URL.DETAILS,
  joiValidatorMiddleware(jobSchema.saveOrUpdateJobDetails),
  validateTokenMiddleware,
  jobController.saveOrUpdateJobDetails,
)

jobRouter.put(
  API_URL.PROJECT.REQUIREMENTS,
  joiValidatorMiddleware(jobSchema.updateJobRequirements),
  validateTokenMiddleware,
  jobController.updateJobRequirements,
)

jobRouter.get(
  API_URL.RECRUITER.JOB_LIST,
  joiValidatorMiddleware(jobSchema.recruiterJobList),
  validateTokenMiddleware,
  jobController.getRecruiterJobList,
)

export { jobRouter }
