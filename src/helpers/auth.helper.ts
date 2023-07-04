import { freelancerOrClientSignupInterface } from '../interfaces'
import { pool } from '../databases'

class AuthHelper {
  async freelancerOrClientEmailSignup(data: freelancerOrClientSignupInterface) {
    const insertQuery = `
    INSERT INTO user_master
        (
          first_name,
          last_name,
          email,
          password,
          type
        )
    VALUES 
        (?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.type,
    ])
  }
}

export const authHelper = new AuthHelper()
