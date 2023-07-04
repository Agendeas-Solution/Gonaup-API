import { saveClientProjectDetailInterface } from '../interfaces'
import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class ProjectHelper {
  async saveClientProjectDetails(data: saveClientProjectDetailInterface) {
    const insertQuery = `
    INSERT INTO projects
        (
          title,
          description,
          budget_type,
          fixed_budget,
          hourly_budget,
          skills,
          project_duration,
          english_level,
          company_id
        )
    VALUES 
        (?,?,?,?,?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.title,
      data.description,
      data.budgetType,
      data.fixedBudget,
      data.hourlyBudget,
      data.skills,
      data.projectDuration,
      data.englishLevel,
      data.companyId,
    ])
  }

  async getProjectDetailsById(projectId: number) {
    const findQuery = `
    SELECT
      id,
      title,
      description,
      budget_type,
      fixed_budget,
      hourly_budget,
      skills,
      project_duration,
      english_level,
      project_status,
      assigned_user,
      created_at
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
      hourly_budget,
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
      hourly_budget,
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
