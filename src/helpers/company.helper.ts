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

  async getCompanyDetailById(companyId: number) {
    const findQuery = `
    SELECT
      company_name,
      website,
      size,
      linkdin_profile,
      position
    FROM
      companies
    WHERE
      id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [companyId])
  }
}

export const companyHelper = new CompanyHelper()
