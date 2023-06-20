import { NextFunction, Request, Response } from 'express'
import { sendSuccessResponse } from '../utils'
import { authService } from '../services'

class AuthController {
  async clientEmailSignup(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await authService.clientEmailSignup(req.body))
    } catch (error) {
      next(error)
    }
  }

  async freelancerEmailSignup(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await authService.freelancerEmailSignup(req.body),
      )
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await authService.login(req.body))
    } catch (error) {
      next(error)
    }
  }
}

export const authController = new AuthController()
