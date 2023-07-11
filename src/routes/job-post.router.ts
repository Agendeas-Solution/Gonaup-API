import { Router } from 'express'
import { jobPostController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { jobPostSchema } from '../validators'
import { API_URL } from '../constants'

const jobPostRouter = Router()

jobPostRouter.post(
  API_URL.JOB_POST.DETAILS,
  joiValidatorMiddleware(jobPostSchema.saveOrUpdateJobPostDetails),
  validateTokenMiddleware,
  jobPostController.saveOrUpdateJobPostDetails,
)

jobPostRouter.put(
  API_URL.PROJECT.REQUIREMENTS,
  joiValidatorMiddleware(jobPostSchema.updateJobPostRequirements),
  validateTokenMiddleware,
  jobPostController.updateJobPostRequirements,
)

jobPostRouter.get(
  API_URL.RECRUITER.JOB_LIST,
  joiValidatorMiddleware(jobPostSchema.recruiterJobList),
  validateTokenMiddleware,
  jobPostController.getRecruiterJobList,
)

export { jobPostRouter }
