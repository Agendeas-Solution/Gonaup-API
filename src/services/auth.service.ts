import {
  clientSignupInterface,
  freelancerSignupInterface,
  loginInterface,
} from '../interfaces'
import { MESSAGES } from '../constants'
import bcrypt from 'bcryptjs'
import { SERVER_CONFIG } from '../config'
import { authHelper, userHelper } from '../helpers'
import { BadRequestException, NotFoundException } from '../exceptions'
import { generateToken } from '../utils/jwt-token.util'

class AuthService {
  async clientEmailSignup(data: clientSignupInterface) {
    try {
      const [existedUser] = await userHelper.getUserByEmail(data.email)

      if (existedUser[0])
        throw new BadRequestException(MESSAGES.AUTH.USER_ALREADY_EXISTS)

      data.password = await bcrypt.hash(data.password, SERVER_CONFIG.HASH_SALT)

      await authHelper.clientEmailSignup(data)

      return { message: MESSAGES.AUTH.USER_REGISTERD_SUCCESSFULLY }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async freelancerEmailSignup(data: freelancerSignupInterface) {
    try {
      const [existedUser] = await userHelper.getUserByEmail(data.email)

      if (existedUser[0])
        throw new BadRequestException(MESSAGES.AUTH.USER_ALREADY_EXISTS)

      data.password = await bcrypt.hash(data.password, SERVER_CONFIG.HASH_SALT)

      await authHelper.freelancerEmailSignup(data)

      return { message: MESSAGES.AUTH.USER_REGISTERD_SUCCESSFULLY }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async login(data: loginInterface) {
    try {
      const [existedUser] = await userHelper.getUserByEmail(data.email)

      if (!existedUser[0])
        throw new NotFoundException(MESSAGES.AUTH.INVALID_EMAIL_PASSWORD)

      const isMatched = await bcrypt.compare(
        data.password,
        existedUser[0].password,
      )

      if (!isMatched)
        throw new BadRequestException(MESSAGES.AUTH.INVALID_EMAIL_PASSWORD)

      const token = generateToken({ userId: existedUser[0].id })

      return {
        message: MESSAGES.AUTH.USER_LOGIN_SUCCESSFULLY,
        data: { token },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const authService = new AuthService()
