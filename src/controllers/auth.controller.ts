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

  async recruiterEmailSignup(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await authService.recruiterEmailSignup(req.body))
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

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await authService.changePassword(
          req.token.userId,
          req.body.newPassword,
          req.body.oldPassword,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async switchAccount(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await authService.switchAccount(req.body.type, req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }

  async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await authService.getAccounts(req.token.userId))
    } catch (error) {
      next(error)
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await authService.forgotPassword(req.body.email))
    } catch (error) {
      next(error)
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await authService.resetPassword(req.body.token, req.body.newPassword),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const authController = new AuthController()
