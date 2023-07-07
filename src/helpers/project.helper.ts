import {
  saveOrUpdateProjectTitleAndDesc,
  updateProjectBudget,
  updateProjectRequirements,
} from '../interfaces'
import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class ProjectHelper {
  async saveProjectTitleAndDesc(data: saveOrUpdateProjectTitleAndDesc) {
    const insertQuery = `
    INSERT INTO projects
        (
          title,
          description,
          company_id,
          step_status
        )
    VALUES 
        (?,?,?,2)`
    return pool.query(insertQuery, [
      data.title,
      data.description,
      data.companyId,
    ])
  }

  async updateProjectTitleAndDesc(data: saveOrUpdateProjectTitleAndDesc) {
    const updateQuery = `
    UPDATE
      projects 
    SET 
      title = ?, 
      description = ?
    WHERE
      company_id = ? 
      AND id = ?`
    return pool.query(updateQuery, [
      data.title,
      data.description,
      data.companyId,
      data.projectId,
    ])
  }

  async updateProjectSkills(
    skills: string,
    projectId: number,
    companyId: number,
  ) {
    const updateQuery = `
    UPDATE
      projects 
    SET 
      skills = ?,
      step_status = 3
    WHERE
      company_id = ? 
      AND id = ?`
    return pool.query(updateQuery, [skills, companyId, projectId])
  }

  async updateProjectBudget(data: updateProjectBudget) {
    const updateQuery = `
    UPDATE
      projects 
    SET 
      budget_type = ?,
      fixed_budget = ?,
      min_hourly_budget = ?,
      max_hourly_budget = ?,
      step_status = 4
    WHERE
      company_id = ? 
      AND id = ?`
    return pool.query(updateQuery, [
      data.budgetType,
      data.fixedBudget,
      data.minHourlyBudget,
      data.maxHourlyBudget,
      data.companyId,
      data.projectId,
    ])
  }

  async updateProjectRequirements(data: updateProjectRequirements) {
    const updateQuery = `
    UPDATE
      projects 
    SET 
      experience_needed = ?,
      project_duration = ?,
      hour_per_week = ?,
      step_status = 5
      ${data.isPublished ? ',published_at = now()' : ''}
    WHERE
      company_id = ? 
      AND id = ?`
    return pool.query(updateQuery, [
      data.experienceNeeded,
      data.projectDuration,
      data.hourePerWeek,
      data.companyId,
      data.projectId,
    ])
  }

  async getClientProjectDetailsById(projectId: number) {
    const findQuery = `
    SELECT
      id,
      title,
      description,
      budget_type,
      fixed_budget,
      min_hourly_budget,
      max_hourly_budget,
      skills,
      project_duration,
      experience_needed,
      hour_per_week
    FROM
      projects
    WHERE
      id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [projectId])
  }

  async getClientProjectList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
    SELECT
      id,
      title,
      description,
      fixed_budget,
      min_hourly_budget,
      max_hourly_budget,
      project_duration
    FROM
      projects
    WHERE
      company_id = ?
      AND deleted_at IS NULL
    ${limitQuery}`
    return pool.query(findQuery, [data.companyId])
  }

  async getClientProjectsCount(companyId: number) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      projects
    WHERE
      company_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [companyId])
  }

  async getFreelancerProjectList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
    SELECT
      id,
      title,
      description,
      fixed_budget,
      min_hourly_budget,
      max_hourly_budget,
      project_duration
    FROM
      projects
    WHERE
      FIND_IN_SET(?,assigned_user) > 0
      AND deleted_at IS NULL
    ${limitQuery}`
    return pool.query(findQuery, [data.userId])
  }

  async getFreeLancerProjectsCount(userId: number) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      projects
    WHERE
      FIND_IN_SET(?,assigned_user) > 0
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }
}

export const projectHelper = new ProjectHelper()
