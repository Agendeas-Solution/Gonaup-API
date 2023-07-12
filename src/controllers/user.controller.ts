import { NextFunction, Request, Response } from 'express'
import { userService } from '../services'
import { sendSuccessResponse } from '../utils'

class UserController {
  async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await userService.getUserProfile(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerSignupSteps(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerSignupSteps(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFreelancerProfileLinks(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateFreelancerProfileLinks({
          ...req.body,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerProfileLinksById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerProfileLinksById(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async saveFreelancerEducation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.saveFreelancerEducation(req.body, req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerEducationList(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerEducationList(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerEducationDetailById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerEducationDetailById(
          parseInt(req.query.educationId as string),
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFreelancerEducationById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateFreelancerEducationById(
          req.body,
          req.body.educationId,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async deleteFreelancerEducationById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.deleteFreelancerEducationById(
          req.body.educationId,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async saveFreelancerExperience(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.saveFreelancerExperience(req.body, req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerExperienceList(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerExperienceList(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerExperienceDetailById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerExperienceDetailById(
          parseInt(req.query.experienceId as string),
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFreelancerExperienceById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateFreelancerExperienceById(
          req.body,
          req.body.experienceId,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async deleteFreelancerExperienceById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.deleteFreelancerExperienceById(
          req.body.experienceId,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async saveFreelancerProjects(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.saveFreelancerProjects(
          req.files.map(file => file.key),
          req.body,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerProjectList(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerProjectList(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerProjectDetailById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerProjectDetailById(
          parseInt(req.query.projectId as string),
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFreelancerProjectById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateFreelancerProjectById(
          req.files.map(file => file.key),
          req.body,
          req.body.projectId,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async deleteFreelancerProjectById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.deleteFreelancerProjectById(
          req.body.projectId,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFreelancerRole(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateFreelancerRole({
          ...req.body,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFreelancerSkillAndServices(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateFreelancerSkillAndServices({
          ...req.body,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFreelancerHourlyRate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateFreelancerHourlyRate(
          req.body.hourlyRate,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerWorkDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.getFreelancerWorkDetails(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFreelancerContactDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateFreelancerContactDetails({
          ...req.body,
          userId: req.token.userId,
          profileImage: req.file?.key,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateUserNameAndEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await userService.updateUserNameAndEmail({
          ...req.body,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController()
