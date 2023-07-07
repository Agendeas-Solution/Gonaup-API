import { NextFunction, Request, Response } from 'express'
import { projectService } from '../services'
import { sendSuccessResponse } from '../utils'

class ProjectController {
  async saveOrUpdateProjectTitleAndDesc(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await projectService.saveOrUpdateProjectTitleAndDesc({
          ...req.body,
          companyId: req.token.companyId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateProjectSkills(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.updateProjectSkills(req.body, req.token.companyId),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateProjectBudget(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.updateProjectBudget({
          ...req.body,
          companyId: req.token.companyId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateProjectRequirements(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await projectService.updateProjectRequirements({
          ...req.body,
          companyId: req.token.companyId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async getClientProjectDetailsById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await projectService.getClientProjectDetailsById(
          Number(req.query.projectId),
        ),
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
