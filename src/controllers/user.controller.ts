import { NextFunction, Request, Response } from 'express'
import { userService } from '../services'
import { sendSuccessResponse } from '../utils'

class UserController {
  async getUserDetailById(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await userService.getUserDetailsById(Number(req.query.userId)),
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
        await userService.saveFreelancerExperience({
          ...req.body,
          userId: req.token.userId,
        }),
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
        await userService.getFreelancerExperienceList({
          ...req.query,
          userId: req.token.userId,
        }),
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
        await userService.deleteFreelancerExperienceById({
          experienceId: req.body.experienceId,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController()
