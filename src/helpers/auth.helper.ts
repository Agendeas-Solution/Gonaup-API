import { emailSignupInterface } from '../interfaces'
import { pool } from '../databases'

class AuthHelper {
  async emailSignup(data: emailSignupInterface) {
    const insertQuery = `
    INSERT INTO user_master
        (name,email,password,contact_number,type,skype_id,address)
    VALUES 
        (?,?,?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.name,
      data.email,
      data.password,
      data.contactNumber,
      data.type,
      data.skypeId,
      data.address,
    ])
  }
}

export const authHelper = new AuthHelper()
