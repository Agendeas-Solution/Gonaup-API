import { validateToken } from '../utils/jwt-token.util'
import { MESSAGES } from '../constants'
import { UnauthorizedException } from '../exceptions'
import { NextFunction, Request, Response } from 'express'

export function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedException(MESSAGES.COMMON_MESSAGE.NO_TOKEN_SUPPLIED)

    const response: any = validateToken(req.headers.authorization)
    if (!response.userId) {
      throw new UnauthorizedException('Unauthorized!')
    }
    req['user'] = response
    next()
  } catch (error) {
    console.log(error)
    throw new UnauthorizedException(error && error.message ? error.message : '')
  }
}
