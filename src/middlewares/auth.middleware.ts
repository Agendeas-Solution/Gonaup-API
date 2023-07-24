import { validateToken } from '../utils/jwt-token.util'
import { MESSAGES, USER } from '../constants'
import { UnauthorizedException } from '../exceptions'
import { NextFunction, Request, Response } from 'express'
import { SERVER_CONFIG } from '../config'

export function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedException(MESSAGES.COMMON_MESSAGE.NO_TOKEN_SUPPLIED)

    const response: any = validateToken(
      req.headers.authorization,
      SERVER_CONFIG.JWT_SECRET,
    )
    if (response.type === USER.TYPE.FREELANCER && !response.userId) {
      throw new UnauthorizedException('Unauthorized!')
    } else if (response.type === USER.TYPE.CLIENT && !response.companyId) {
      throw new UnauthorizedException('Unauthorized!')
    }
    req.token = response
    next()
  } catch (error) {
    console.log(error)
    throw new UnauthorizedException(error && error.message ? error.message : '')
  }
}
