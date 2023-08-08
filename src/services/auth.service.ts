import {
  freelancerOrClientSignupInterface,
  loginInterface,
} from '../interfaces'
import { MESSAGES, USER } from '../constants'
import bcrypt from 'bcryptjs'
import { SERVER_CONFIG, URL_CONFIG } from '../config'
import { authHelper, companyHelper, userHelper } from '../helpers'
import { BadRequestException, NotFoundException } from '../exceptions'
import { generateToken, validateToken } from '../utils/jwt-token.util'
import { emailSubjectAndContentFormatting, sendEmail } from '../utils'

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
      const token = generateToken(
        {
          userId: existedUser[0].id,
          type: existedUser[0].type,
          companyId: companyId,
        },
        SERVER_CONFIG.JWT_SECRET,
      )

      return {
        message: MESSAGES.AUTH.USER_LOGIN_SUCCESSFULLY,
        data: {
          token,
          usedDetails: {
            firstName: existedUser[0].first_name,
            lastName: existedUser[0].last_name,
            signupCompleted: existedUser[0].signup_completed,
            type: existedUser[0].type,
            hasCompany:
              existedUser[0].type !== USER.TYPE.FREELANCER
                ? companyId
                  ? true
                  : false
                : undefined,
          },
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async changePassword(
    userId: number,
    newPassword: string,
    oldPassword: string,
  ) {
    try {
      const [existedUser] = await authHelper.getUserOldPassword(userId)

      const isMatched = await bcrypt.compare(
        oldPassword,
        existedUser[0].password,
      )

      if (!isMatched)
        throw new BadRequestException(MESSAGES.AUTH.INVALID_EMAIL_PASSWORD)

      newPassword = await bcrypt.hash(newPassword, SERVER_CONFIG.HASH_SALT)
      await authHelper.changePassword(userId, newPassword)
      return {
        message: MESSAGES.AUTH.PASSWORD_CHANGED,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async switchAccount(type: number, userId: number) {
    try {
      let token
      const [userAccount] = await authHelper.getUserAccount(userId)

      if (!userAccount[0])
        throw new NotFoundException(MESSAGES.AUTH.ACCOUNT_NOT_FOUND)

      if (type === 0) {
        // 0 = freelancer
        token = generateToken(
          {
            userId: userAccount[0].id,
            type: userAccount[0].type,
          },
          SERVER_CONFIG.JWT_SECRET,
        )
      } else if (type === 1) {
        // 1 = client
        const [companyAccount] = await authHelper.getCompanyAccountByUserId(
          userId,
        )

        token = generateToken(
          {
            userId: userAccount[0].id,
            type: userAccount[0].type,
            companyId: companyAccount[0].id,
          },
          SERVER_CONFIG.JWT_SECRET,
        )
      }

      await authHelper.updateUserCurrentLoginType(type, userId)

      return {
        message: MESSAGES.AUTH.USER_LOGIN_SUCCESSFULLY,
        data: {
          token,
          type,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getAccounts(userId: number) {
    try {
      const accountList = []
      const [userAccount] = await authHelper.getUserAccount(userId)

      if (!userAccount[0])
        throw new NotFoundException(MESSAGES.AUTH.ACCOUNT_NOT_FOUND)

      accountList.push({
        imageUrl: userAccount[0].image_url,
        fullName: userAccount[0].first_name + ' ' + userAccount[0].last_name,
        type: 0, // 0 = freelancer
        main: userAccount[0].current_login_type === 0 ? true : false,
      })

      const [companyAccount] = await authHelper.getCompanyAccountByUserId(
        userId,
      )

      if (companyAccount[0]) {
        accountList.push({
          fullName: companyAccount[0].company_name,
          type: 1, // 1 = client
          main: userAccount[0].current_login_type === 1 ? true : false,
        })
      }

      return {
        message: MESSAGES.AUTH.USER_LOGIN_SUCCESSFULLY,
        data: accountList,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async forgotPassword(email: string) {
    try {
      const [user] = await userHelper.getUserByEmail(email)

      if (!user[0])
        throw new BadRequestException(MESSAGES.AUTH.INVALID_EMAIL_PASSWORD)

      const token = generateToken(
        { userId: user[0].id },
        SERVER_CONFIG.JWT_RESET_PASSWORD_SECRET,
      )

      const [emailFormat] = await authHelper.getEmailFormat(2)

      const { subject, content: html } = emailSubjectAndContentFormatting(
        emailFormat[0].subject,
        emailFormat[0].content,
        { password_url: `${URL_CONFIG.FRONTED_URL}?reset-password=${token}` },
      )

      sendEmail({
        to: email,
        subject,
        html,
      })

      return {
        message: MESSAGES.AUTH.EMAIL_SENT_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const tokenData = validateToken(
        token,
        SERVER_CONFIG.JWT_RESET_PASSWORD_SECRET,
      )
      if (!tokenData || !tokenData['userId'])
        throw new BadRequestException(MESSAGES.AUTH.INVALID_TOKEN)

      newPassword = await bcrypt.hash(newPassword, SERVER_CONFIG.HASH_SALT)
      await authHelper.changePassword(tokenData['userId'], newPassword)

      return { message: MESSAGES.AUTH.PASSWORD_CHANGED }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const authService = new AuthService()
