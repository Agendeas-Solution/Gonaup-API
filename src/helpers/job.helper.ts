import {
  ProjectListType,
  saveOrUpdateJobDetails,
  updateJobRequirements,
} from '../interfaces'
import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class JobHelper {
  async saveJobDetails(data: saveOrUpdateJobDetails) {
    const insertQuery = `
    INSERT INTO projects
        (
          title,
          description,
          min_hourly_budget,
          skills,
          company_id,
          step_status,
          project_type
        )
    VALUES 
        (?,?,?,?,?,2,1)`
    return pool.query(insertQuery, [
      data.jobRole,
      data.description,
      data.hourlyRate,
      data.skills,
      data.companyId,
    ])
  }

  async updateJobDetails(data: saveOrUpdateJobDetails) {
    const updateQuery = `
    UPDATE
      projects 
    SET 
      title = ?,
      description = ?,
      min_hourly_budget = ?,
      skills = ?
    WHERE
      company_id = ? 
      AND id = ?`
    return pool.query(updateQuery, [
      data.jobRole,
      data.description,
      data.hourlyRate,
      data.skills,
      data.companyId,
      data.jobId,
    ])
  }

  async updateJobRequirements(data: updateJobRequirements) {
    const updateQuery = `
    UPDATE
      projects 
    SET 
      experience_needed = ?,
      project_duration = ?,
      hour_per_week = ?,
      step_status = 3
    WHERE
      company_id = ? 
      AND id = ?`
    return pool.query(updateQuery, [
      data.experienceNeeded,
      data.projectDuration,
      data.hourePerWeek,
      data.companyId,
      data.jobId,
    ])
  }

  async getRecruiterJobList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    let whereQuery = ''

    if (data.type === ProjectListType.ACTIVE) {
      whereQuery += ' AND (contract_status IN (0,1) OR project_status = 0)'
    } else if (data.type === ProjectListType.RECENTLY_FILLED) {
      whereQuery += ' AND contract_status = 2 AND project_status = 1'
    }

    const findQuery = `
    SELECT
      id,
      title,
      description,
      skills,
      created_at
    FROM
      projects
    WHERE
      company_id = ?
      AND project_type = 1
      ${whereQuery}
      AND deleted_at IS NULL
    ORDER BY
      created_at DESC
    ${limitQuery}
    `
    return pool.query(findQuery, [data.companyId])
  }

  async getRecruiterJobCount(data) {
    let whereQuery = ''

    if (data.type === ProjectListType.ACTIVE) {
      whereQuery += ' AND (contract_status IN (0,1) OR project_status = 0)'
    } else if (data.type === ProjectListType.RECENTLY_FILLED) {
      whereQuery += ' AND contract_status = 2 AND project_status = 1'
    }

    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      projects
    WHERE
      company_id = ?
      AND project_type = 1
      ${whereQuery}
      AND deleted_at IS NULL`
    return pool.query(findQuery, [data.companyId])
  }
}

export const jobHelper = new JobHelper()
