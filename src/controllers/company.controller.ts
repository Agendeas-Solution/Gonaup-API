import { NextFunction, Request, Response } from 'express'
import { companyService } from '../services'
import { sendSuccessResponse } from '../utils'

class CompanyController {
  async saveCompanyDetails(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await companyService.saveCompanyDetails({
          ...req.body,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const companyController = new CompanyController()
