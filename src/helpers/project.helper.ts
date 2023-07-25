import {
  ProjectListType,
  applyForProject,
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

  async updateProjectSkillsAndService(
    skills: string,
    serviceId: number,
    projectId: number,
    companyId: number,
  ) {
    const updateQuery = `
    UPDATE
      projects 
    SET 
      skills = ?,
      service_id = ?,
      step_status = 
        CASE
          WHEN 
            published_at IS NOT NULL THEN step_status 
          ELSE 3 
        END
    WHERE
      company_id = ? 
      AND id = ?`
    return pool.query(updateQuery, [skills, serviceId, companyId, projectId])
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
      step_status =  
        CASE
          WHEN 
            published_at IS NOT NULL THEN step_status 
          ELSE 4
        END
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

  async getProjectPublishedStatus(companyId: number, projectId: number) {
    const findQuery = `
    SELECT
      published_at
    FROM
      projects
    WHERE
      company_id = ? 
      AND id = ?`
    return pool.query(findQuery, [companyId, projectId])
  }

  async updateProjectRequirements(data: updateProjectRequirements) {
    const updateQuery = `
    UPDATE
      projects 
    SET 
      experience_needed = ?,
      project_duration = ?,
      hour_per_week = ?,
      step_status = 
        CASE
          WHEN 
            published_at IS NOT NULL THEN step_status 
          ELSE 5 
        END
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

  async getClientProjectDetailsById(projectId: number, companyId: number) {
    const findQuery = `
    SELECT
      p.id,
      title,
      description,
      budget_type,
      fixed_budget,
      min_hourly_budget,
      max_hourly_budget,
      skills,
      s.id as service_id,
      s.name as service_name,
      project_duration,
      experience_needed,
      hour_per_week,
      project_status,
      project_type
    FROM
      projects as p
    LEFT JOIN
      services as s 
    ON 
      p.service_id = s.id
    WHERE
      p.id = ?
      AND company_id = ?
      AND p.deleted_at IS NULL`
    return pool.query(findQuery, [projectId, companyId])
  }

  async getClientProjectList(data) {
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
      budget_type,
      fixed_budget,
      min_hourly_budget,
      max_hourly_budget,
      project_duration,
      skills,
      created_at
    FROM
      projects
    WHERE
      company_id = ?
      AND published_at ${data.type === 'draft' ? 'is NULL' : 'is NOT NULL'}
      ${whereQuery}
      AND deleted_at IS NULL
    ORDER BY
      created_at DESC
    ${limitQuery}`
    return pool.query(findQuery, [data.companyId])
  }

  async getClientProjectsCount(data) {
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
      AND published_at ${data.type === 'draft' ? 'is NULL' : 'is NOT NULL'}
      ${whereQuery}
      AND deleted_at IS NULL`
    return pool.query(findQuery, [data.companyId])
  }

  async getFreelancerProjectList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
    SELECT
      p.id,
      p.title,
      p.description,
      p.skills,
      p.created_at
    FROM
      projects as p
    LEFT JOIN
      hiring_records as hr
    ON
      hr.project_id = p.id
    WHERE
      hr.user_id = ?
      ${this.getFreelancerProjectListFilterQuery(data)}
      AND p.deleted_at IS NULL
    ORDER BY
      p.created_at DESC
    ${limitQuery}`
    return pool.query(findQuery, [data.userId])
  }

  async getFreeLancerProjectsCount(data) {
    const findQuery = `
    SELECT
      COUNT(1) as total
    FROM
      projects as p
    LEFT JOIN
      hiring_records as hr
    ON
      hr.project_id = p.id
    WHERE
      hr.user_id = ?
      ${this.getFreelancerProjectListFilterQuery(data)}
      AND p.deleted_at IS NULL`
    return pool.query(findQuery, [data.userId])
  }

  getFreelancerProjectListFilterQuery(data) {
    let whereQuery = ''

    if (
      data.type === ProjectListType.ACTIVE ||
      data.type === ProjectListType.RECENTLY_FILLED
    ) {
      whereQuery += ` AND p.contract_status = ${
        data.type === ProjectListType.ACTIVE ? 1 : 2
      } AND hr.status = 3`
    } else if (data.type === ProjectListType.INVITED) {
      whereQuery += ' AND hr.status = 0'
    }

    return whereQuery
  }

  async getFreelancerProjectDetailsById(projectId: number, userId: number) {
    const findQuery = `
    SELECT
      p.id,
      title,
      description,
      budget_type,
      (fixed_budget - commission) as fixed_budget,
      (min_hourly_budget - commission) as min_hourly_budget,
      (max_hourly_budget - commission) as max_hourly_budget,
      skills,
      s.id as service_id,
      s.name as service_name,
      project_duration,
      experience_needed,
      hour_per_week,
      project_status,
      case when hr.status != 0 then true else false end as invited,
      project_type
    FROM
      projects as p
    LEFT JOIN
      services as s 
    ON 
      p.service_id = s.id
    LEFT JOIN
      hiring_records as hr
    ON
      hr.project_id = p.id
    WHERE
      p.id = ?
      AND hr.user_id = ?   
      AND p.deleted_at IS NULL`
    return pool.query(findQuery, [projectId, userId])
  }

  async applyForProject(data: applyForProject) {
    const updateQuery = `
    UPDATE
      hiring_records 
    SET 
      status = 1,
      suggested_rate = ?
    WHERE
      user_id = ? 
      AND project_id = ?`
    return pool.query(updateQuery, [
      data.suggestedRate,
      data.userId,
      data.projectId,
    ])
  }

  async getCandidateListByStatus(projectId: number, status: number) {
    const findQuery = `
      SELECT
        ${status === 3 ? 'hr.final_rate,' : ''}
        hr.suggested_rate,
        CONCAT(first_name, ' ', SUBSTRING(last_name, 1, 1)) AS full_name
      FROM
        hiring_records as hr
      LEFT JOIN
        user_master as u
      ON
        u.id = hr.user_id
      WHERE
        hr.project_id = ?
        AND hr.status = ?
        AND hr.deleted_at is NULL
      ORDER BY
        hr.created_at DESC`
    return pool.query(findQuery, [projectId, status])
  }

  async closeProject(reason: string, projectId: number, companyId: number) {
    const updateQuery = `
      UPDATE 
        projects
      SET
        project_closed_reason = ?,
        project_status = 1
      WHERE
        id = ?
        AND company_id = ?`
    return pool.query(updateQuery, [reason, projectId, companyId])
  }
}

export const projectHelper = new ProjectHelper()
