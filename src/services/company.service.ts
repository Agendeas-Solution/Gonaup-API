import { SERVER_CONFIG } from '../config'
import { MESSAGES, USER } from '../constants'
import { companyHelper, userHelper } from '../helpers'
import { saveOrUpdateCompanyDetailsInterface } from '../interfaces'
import { generateToken } from '../utils/jwt-token.util'

class CompanyService {
  async saveCompanyDetails(data: saveOrUpdateCompanyDetailsInterface) {
    try {
      const [savedCompany] = await companyHelper.saveCompanyDetails(data)
      const [user] = await userHelper.getUserTypeById(data.userId)
      if (user[0].type === USER.TYPE.FREELANCER) {
        await userHelper.updateUserType(data.userId)
      }
      const token = generateToken(
        {
          userId: user[0].id,
          companyId: savedCompany['insertId'],
          type: user[0].type,
        },
        SERVER_CONFIG.JWT_SECRET,
      )

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
        data: { token },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateCompanyDetails(data: saveOrUpdateCompanyDetailsInterface) {
    try {
      await companyHelper.updateCompanyDetails(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const companyService = new CompanyService()
