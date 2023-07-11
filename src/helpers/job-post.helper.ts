import {
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
      AND deleted_at IS NULL
    ${limitQuery}`
    return pool.query(findQuery, [data.companyId])
  }

  async getRecruiterJobCount(data) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      job_post
    WHERE
      company_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [data.companyId])
  }
}

export const jobPostHelper = new JobPostHelper()
