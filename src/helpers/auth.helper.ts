import { freelancerOrClientSignupInterface } from '../interfaces'
import { pool } from '../databases'
import { S3_CONFIG } from '../config'
import { S3 } from '../constants'

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

  async changePassword(userId: number, newPassword: string) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      password = ?
    WHERE
      id = ?`
    return pool.query(updateQuery, [newPassword, userId])
  }

  async getUserOldPassword(userId: number) {
    const findQuery = `
    SELECT
      password
    FROM
      user_master
    WHERE
      id = ?`
    return pool.query(findQuery, [userId])
  }

  async getUserAccount(userId: number) {
    const findQuery = `
    SELECT
      id,
      concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as image_url,
      first_name,
      last_name,
      current_login_type,
      type
    FROM
      user_master
    WHERE
      id = ?`
    return pool.query(findQuery, [userId])
  }

  async getCompanyAccountByUserId(userId: number) {
    const findQuery = `
    SELECT
      id,
      company_name
    FROM
      companies
    WHERE
      user_id = ?`
    return pool.query(findQuery, [userId])
  }

  async updateUserCurrentLoginType(type: number, userId: number) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      current_login_type = ?
    WHERE
      id = ?`
    return pool.query(updateQuery, [type, userId])
  }
}

export const authHelper = new AuthHelper()
