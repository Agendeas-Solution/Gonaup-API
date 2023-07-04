import { Router } from 'express'
import { projectController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { projectSchemas } from '../validators'
import { API_URL } from '../constants'

const projectRouter = Router()

projectRouter.post(
  '/',
  joiValidatorMiddleware(projectSchemas.saveProject),
  validateTokenMiddleware,
  projectController.saveClientProjectDetails,
)

projectRouter.get(
  '/',
  joiValidatorMiddleware(projectSchemas.projectDetails),
  validateTokenMiddleware,
  projectController.getProjectDetailsById,
)

projectRouter.get(
  API_URL.CLIENT.PROJECT_LIST,
  joiValidatorMiddleware(projectSchemas.projectList),
  validateTokenMiddleware,
  projectController.getClientProjectList,
)

projectRouter.get(
  API_URL.FREELANCER.ASSIGN_PROJECT_LIST,
  joiValidatorMiddleware(projectSchemas.projectList),
  validateTokenMiddleware,
  projectController.getFreelancerProjectList,
)

export { projectRouter }
