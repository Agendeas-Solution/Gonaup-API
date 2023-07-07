import { pool } from '../databases'
import { saveCompanyDetailsInterface } from '../interfaces'

class CompanyHelper {
  async saveCompanyDetails(data: saveCompanyDetailsInterface) {
    const insertQuery = `
    INSERT INTO companies
        (
          company_name,
          position,
          website,
          linkdin_profile,
          size,
          user_id
        )
    VALUES 
        (?,?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.companyName,
      data.position,
      data.website,
      data.linkdinProfile,
      data.size,
      data.userId,
    ])
  }

  async getCompanyDetailByClientId(clientId: number) {
    const findQuery = `
    SELECT
      id,
      company_name,
      tageline
    FROM
      companies
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [clientId])
  }
}

export const companyHelper = new CompanyHelper()
