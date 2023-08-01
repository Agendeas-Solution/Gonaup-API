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

  async updateProjectSkillsAndService(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await projectService.updateProjectSkillsAndService(
          req.body,
          req.token.companyId,
        ),
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
          userId: req.token.userId,
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
          req.token.companyId,
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
          companyId: req.token.companyId,
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

  async getFreelancerProjectDetailsById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await projectService.getFreelancerProjectDetailsById(
          Number(req.query.projectId),
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async applyForProject(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.applyForProject({
          ...req.body,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async closeProject(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.closeProject(
          req.body.reason,
          req.body.projectId,
          req.token?.companyId,
          req.token.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const projectController = new ProjectController()
