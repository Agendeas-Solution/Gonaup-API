import { Router } from 'express'
import { projectController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { projectSchemas } from '../validators'
import { API_URL } from '../constants'

const projectRouter = Router()

projectRouter.post(
  API_URL.PROJECT.TITLE,
  joiValidatorMiddleware(projectSchemas.saveOrUpdateProjectTitleAndDesc),
  validateTokenMiddleware,
  projectController.saveOrUpdateProjectTitleAndDesc,
)

projectRouter.put(
  API_URL.PROJECT.SKILL,
  joiValidatorMiddleware(projectSchemas.updateProjectSkills),
  validateTokenMiddleware,
  projectController.updateProjectSkills,
)

projectRouter.put(
  API_URL.PROJECT.BUDGET,
  joiValidatorMiddleware(projectSchemas.updateProjectBudget),
  validateTokenMiddleware,
  projectController.updateProjectBudget,
)

projectRouter.put(
  API_URL.PROJECT.REQUIREMENTS,
  joiValidatorMiddleware(projectSchemas.updateProjectRequirements),
  validateTokenMiddleware,
  projectController.updateProjectRequirements,
)

projectRouter.get(
  API_URL.CLIENT.PROJECT_DETAILS,
  joiValidatorMiddleware(projectSchemas.projectDetails),
  validateTokenMiddleware,
  projectController.getClientProjectDetailsById,
)

projectRouter.get(
  API_URL.CLIENT.PROJECT_LIST,
  joiValidatorMiddleware(projectSchemas.clientProjectList),
  validateTokenMiddleware,
  projectController.getClientProjectList,
)

projectRouter.get(
  API_URL.FREELANCER.ASSIGN_PROJECT_LIST,
  joiValidatorMiddleware(projectSchemas.freelancerProjectList),
  validateTokenMiddleware,
  projectController.getFreelancerProjectList,
)

export { projectRouter }
