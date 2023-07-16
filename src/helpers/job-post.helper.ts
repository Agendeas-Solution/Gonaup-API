import {
  ProjectListType,
  saveOrUpdateJobPostDetails,
  updateJobPosttRequirements,
} from '../interfaces'
import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class JobPostHelper {
  async saveJobPostDetails(data: saveOrUpdateJobPostDetails) {
    const insertQuery = `
    INSERT INTO job_post
        (
          job_role,
          description,
          hourly_rate,
          skills,
          company_id,
          step_status
        )
    VALUES 
        (?,?,?,?,?,2)`
    return pool.query(insertQuery, [
      data.jobRole,
      data.description,
      data.hourlyRate,
      data.skills,
      data.companyId,
    ])
  }

  async updateJobPostDetails(data: saveOrUpdateJobPostDetails) {
    const updateQuery = `
    UPDATE
      job_post 
    SET 
      job_role = ?,
      description = ?,
      hourly_rate = ?,
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
      data.jobPostId,
    ])
  }

  async updateJobPostRequirements(data: updateJobPosttRequirements) {
    const updateQuery = `
    UPDATE
      job_post 
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
      data.jobPostId,
    ])
  }

  async getRecruiterJobList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    let whereQuery = ''

    if (data.type === ProjectListType.ACTIVE) {
      whereQuery += ' AND (contract_status IN (0,1) OR job_status = 0)'
    } else if (data.type === ProjectListType.RECENTLY_FILLED) {
      whereQuery += ' AND contract_status = 2 AND job_status = 1'
    }

    const findQuery = `
    SELECT
      id,
      job_role,
      description,
      skills,
      created_at
    FROM
      job_post
    WHERE
      company_id = ?
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
      whereQuery += ' AND (contract_status IN (0,1) OR job_status = 0)'
    } else if (data.type === ProjectListType.RECENTLY_FILLED) {
      whereQuery += ' AND contract_status = 2 AND job_status = 1'
    }

    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      job_post
    WHERE
      company_id = ?
      ${whereQuery}
      AND deleted_at IS NULL`
    return pool.query(findQuery, [data.companyId])
  }
}

export const jobPostHelper = new JobPostHelper()
