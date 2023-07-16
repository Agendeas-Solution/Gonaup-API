import {
  freelancerOrClientSignupInterface,
  loginInterface,
} from '../interfaces'
import { MESSAGES, USER } from '../constants'
import bcrypt from 'bcryptjs'
import { SERVER_CONFIG } from '../config'
import { authHelper, companyHelper, userHelper } from '../helpers'
import { BadRequestException, NotFoundException } from '../exceptions'
import { generateToken } from '../utils/jwt-token.util'

class AuthService {
  async clientEmailSignup(data: freelancerOrClientSignupInterface) {
    try {
      const [existedUser] = await userHelper.getUserByEmail(data.email)

      if (existedUser[0])
        throw new BadRequestException(MESSAGES.AUTH.USER_ALREADY_EXISTS)

      data.password = await bcrypt.hash(data.password, SERVER_CONFIG.HASH_SALT)

      await authHelper.freelancerOrClientEmailSignup({
        ...data,
        type: USER.TYPE.CLIENT,
      })

      return { message: MESSAGES.AUTH.USER_REGISTERD_SUCCESSFULLY }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async freelancerEmailSignup(data: freelancerOrClientSignupInterface) {
    try {
      const [existedUser] = await userHelper.getUserByEmail(data.email)

      if (existedUser[0])
        throw new BadRequestException(MESSAGES.AUTH.USER_ALREADY_EXISTS)

      data.password = await bcrypt.hash(data.password, SERVER_CONFIG.HASH_SALT)

      await authHelper.freelancerOrClientEmailSignup({
        ...data,
        type: USER.TYPE.FREELANCER,
      })

      return { message: MESSAGES.AUTH.USER_REGISTERD_SUCCESSFULLY }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async recruiterEmailSignup(data: freelancerOrClientSignupInterface) {
    try {
      const [existedUser] = await userHelper.getUserByEmail(data.email)

      if (existedUser[0])
        throw new BadRequestException(MESSAGES.AUTH.USER_ALREADY_EXISTS)

      data.password = await bcrypt.hash(data.password, SERVER_CONFIG.HASH_SALT)

      await authHelper.freelancerOrClientEmailSignup({
        ...data,
        type: USER.TYPE.RECRUITER,
      })

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

      let companyId
      if (
        [USER.TYPE.CLIENT, USER.TYPE.RECRUITER].includes(existedUser[0].type)
      ) {
        const [company] = await companyHelper.getCompanyIdByUserId(
          existedUser[0].id,
        )
        companyId = company[0]?.id
      }
      const token = generateToken({
        userId: existedUser[0].id,
        type: existedUser[0].type,
        companyId: companyId,
      })

      return {
        message: MESSAGES.AUTH.USER_LOGIN_SUCCESSFULLY,
        data: {
          token,
          usedDetails: {
            firstName: existedUser[0].first_name,
            lastName: existedUser[0].last_name,
            signupCompleted: existedUser[0].signup_completed,
            type: existedUser[0].type,
          },
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const authService = new AuthService()
