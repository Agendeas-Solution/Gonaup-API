import { Router } from 'express'
import { userController } from '../controllers'
import {
  joiValidatorMiddleware,
  uploadFileToS3,
  validateTokenMiddleware,
} from '../middlewares'
import { userSchemas } from '../validators'
import { API_URL } from '../constants'

const userRouter = Router()

userRouter.get('/', validateTokenMiddleware, userController.getUserProfile)

userRouter.get(
  API_URL.FREELANCER.SIGNUP_STEPS,
  validateTokenMiddleware,
  userController.getFreelancerSignupSteps,
)

userRouter.put(
  API_URL.FREELANCER.PROFIlE_LINKS,
  joiValidatorMiddleware(userSchemas.updateFreelancerProfileLinks),
  validateTokenMiddleware,
  userController.updateFreelancerProfileLinks,
)

userRouter.get(
  API_URL.FREELANCER.PROFIlE_LINKS,
  validateTokenMiddleware,
  userController.getFreelancerProfileLinksById,
)

userRouter.post(
  API_URL.FREELANCER.EDUCATION,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.saveFreelancerEducation),
  userController.saveFreelancerEducation,
)

userRouter.get(
  API_URL.FREELANCER.EDUCATION + API_URL.LIST,
  validateTokenMiddleware,
  userController.getFreelancerEducationList,
)

userRouter.get(
  API_URL.FREELANCER.EDUCATION,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.gerFreelancerEducationDetails),
  userController.getFreelancerEducationDetailById,
)

userRouter.put(
  API_URL.FREELANCER.EDUCATION,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.updateFreelancerEducation),
  userController.updateFreelancerEducationById,
)

userRouter.delete(
  API_URL.FREELANCER.EDUCATION,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.deleteFreelancerEducation),
  userController.deleteFreelancerEducationById,
)

userRouter.post(
  API_URL.FREELANCER.EXPERIENCE,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.saveFreelancerExperience),
  userController.saveFreelancerExperience,
)

userRouter.get(
  API_URL.FREELANCER.EXPERIENCE + API_URL.LIST,
  validateTokenMiddleware,
  userController.getFreelancerExperienceList,
)

userRouter.get(
  API_URL.FREELANCER.EXPERIENCE,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.gerFreelancerExperienceDetails),
  userController.getFreelancerExperienceDetailById,
)

userRouter.put(
  API_URL.FREELANCER.EXPERIENCE,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.updateFreelancerExperience),
  userController.updateFreelancerExperienceById,
)

userRouter.delete(
  API_URL.FREELANCER.EXPERIENCE,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.deleteFreelancerExperience),
  userController.deleteFreelancerExperienceById,
)

userRouter.post(
  API_URL.FREELANCER.PROJECT,
  uploadFileToS3.array('portfolio_image'),
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.saveFreelancerProject),
  userController.saveFreelancerProjects,
)

userRouter.get(
  API_URL.FREELANCER.PROJECT + API_URL.LIST,
  validateTokenMiddleware,
  userController.getFreelancerProjectList,
)

userRouter.get(
  API_URL.FREELANCER.PROJECT,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.gerFreelancerProjectDetails),
  userController.getFreelancerProjectDetailById,
)

userRouter.put(
  API_URL.FREELANCER.PROJECT,
  uploadFileToS3.array('portfolio_image'),
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.updateFreelancerProject),
  userController.updateFreelancerProjectById,
)

userRouter.delete(
  API_URL.FREELANCER.PROJECT,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.deleteFreelancerProject),
  userController.deleteFreelancerProjectById,
)

userRouter.put(
  API_URL.FREELANCER.ROLE,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.updateFreelancerRole),
  userController.updateFreelancerRole,
)

userRouter.put(
  API_URL.FREELANCER.SKILL,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.updateFreelancerSkillAndService),
  userController.updateFreelancerSkillAndServices,
)

userRouter.put(
  API_URL.FREELANCER.HOURLY_RATE,
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.updateFreelancerHourlyRate),
  userController.updateFreelancerHourlyRate,
)

userRouter.get(
  API_URL.FREELANCER.WORK_DETAILS,
  validateTokenMiddleware,
  userController.getFreelancerWorkDetails,
)

userRouter.put(
  API_URL.FREELANCER.CONTACT_DETAILS,
  uploadFileToS3.single('profile_image'),
  validateTokenMiddleware,
  joiValidatorMiddleware(userSchemas.updateFreelancerContactDetails),
  userController.updateFreelancerContactDetails,
)

export { userRouter }
