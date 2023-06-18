import { NextFunction, Request, Response } from 'express'
import { projectService } from '../services'
import { sendSuccessResponse } from '../utils'

class ProjectController {
  async saveClientProjectDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await projectService.saveClientProjectDetails({
          ...req.body,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async getProjectDetailsById(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.getProjectDetailsById(Number(req.query.projectId)),
      )
    } catch (error) {
      next(error)
    }
  }

  async getClientProjectList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.getClientProjectList({
          ...req.query,
          clientId: req.token.userId,
        }),
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
        await projectService.getFreelancerProjectList({
          ...req.query,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const projectController = new ProjectController()
