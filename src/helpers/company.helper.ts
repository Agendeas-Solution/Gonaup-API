import { pool } from '../databases'
import { saveOrUpdateCompanyDetailsInterface } from '../interfaces'

class CompanyHelper {
  async saveCompanyDetails(data: saveOrUpdateCompanyDetailsInterface) {
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

  async updateCompanyDetails(data: saveOrUpdateCompanyDetailsInterface) {
    const updateQuery = `
    UPDATE
      companies
    SET
      company_name = ?,
      position = ?,
      website = ?,
      linkdin_profile = ?,
      size = ?
    WHERE
      id = ?`
    return pool.query(updateQuery, [
      data.companyName,
      data.position,
      data.website,
      data.linkdinProfile,
      data.size,
      data.companyId,
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

  async getCompanyIdByUserId(userId: number) {
    const findQuery = `
    SELECT
      id
    FROM
      companies
    WHERE
      user_id = ?
      AND deleted_at IS NULL
    LIMIT 1`
    return pool.query(findQuery, [userId])
  }

  async getCompanyProjectWithStatus(companyId: number) {
    const findQuery = `
    SELECT
      id,
      step_status
    FROM
      projects
    WHERE
      company_id = ?
      AND deleted_at IS NULL
    LIMIT 1`
    return pool.query(findQuery, [companyId])
  }
}

export const companyHelper = new CompanyHelper()
