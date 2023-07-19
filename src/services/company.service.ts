import { MESSAGES, USER } from '../constants'
import { companyHelper, userHelper } from '../helpers'
import { saveCompanyDetailsInterface } from '../interfaces'
import { generateToken } from '../utils/jwt-token.util'

class CompanyService {
  async saveCompanyDetails(data: saveCompanyDetailsInterface) {
    try {
      const [savedCompany] = await companyHelper.saveCompanyDetails(data)
      const [user] = await userHelper.getUserTypeById(data.userId)
      if (user[0].type === USER.TYPE.FREELANCER) {
        await userHelper.updateUserType(data.userId)
      }
      const token = generateToken({
        userId: user[0].id,
        companyId: savedCompany['insertId'],
        type: user[0].type,
      })

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
        data: { token },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const companyService = new CompanyService()
