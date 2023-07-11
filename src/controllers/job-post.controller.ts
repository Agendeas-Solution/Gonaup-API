import { NextFunction, Request, Response } from 'express'
import { jobPostService } from '../services'
import { sendSuccessResponse } from '../utils'

class JobPostController {
  async saveOrUpdateJobPostDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await jobPostService.saveOrUpdateJobPostDetails({
          ...req.body,
          companyId: req.token.companyId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateJobPostRequirements(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await jobPostService.updateJobPostRequirements({
          ...req.body,
          companyId: req.token.companyId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async getRecruiterJobList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await jobPostService.getRecruiterJobList({
          ...req.query,
          companyId: req.token.companyId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const jobPostController = new JobPostController()
