import { NextFunction, Request, Response } from 'express'
import { jobService } from '../services'
import { sendSuccessResponse } from '../utils'

class JobController {
  async saveOrUpdateJobDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await jobService.saveOrUpdateJobDetails({
          ...req.body,
          companyId: req.token.companyId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateJobRequirements(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await jobService.updateJobRequirements({
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
        await jobService.getRecruiterJobList({
          ...req.query,
          companyId: req.token.companyId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const jobController = new JobController()
