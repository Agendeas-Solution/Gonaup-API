import { verify, sign, SignOptions } from 'jsonwebtoken'
import { SERVER_CONFIG } from '../config'

export function validateToken(token: string, secret: string) {
  return verify(token, secret)
}

export function generateToken(payload: any, secret: string) {
  return sign(payload, secret, {
    algorithm: SERVER_CONFIG.JWT_AlGORITHM as SignOptions['algorithm'],
  })
}
