import { saveFreelancerExperience } from '../interfaces'
import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class UserHelper {
  async getUserByEmail(email: string) {
    const findQuery = `
      SELECT 
        id,
        name, 
        password
      FROM
        user_master
      WHERE
        email = ?
        AND deleted_at IS NULL
      LIMIT 1`
    return pool.query(findQuery, [email])
  }

  async getUserDetailsById(userId: number) {
    const findQuery = `
    SELECT
      id,
      name,
      email
    FROM
      user_master
    WHERE
      id = ?
      AND deleted_at IS NULL
    LIMIT 1`
    return pool.query(findQuery, [userId])
  }

  async saveFreelancerExperience(data: saveFreelancerExperience) {
    const insertQuery = `
    INSERT INTO freelance_experience
        (
          framework_id,
          experienced_years,
          project_links,
          description,
          user_id
        )
    VALUES 
        (?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.frameworkId,
      data.experiencedYears,
      data.projectLinks.toString(),
      data.description,
      data.userId,
    ])
  }

  async getFreelancerExperienceList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
    SELECT
      fe.id,
      f.name,
      fe.experienced_years,
      fe.project_links,
      fe.description
    FROM
      freelance_experience as fe
    LEFT JOIN
      frameworks as f
    ON
      fe.framework_id = f.id
    WHERE
      user_id = ?
      AND fe.deleted_at IS NULL
    ${limitQuery}`
    return pool.query(findQuery, [data.userId])
  }

  async getFreelancerExperienceCount(userId: number) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      freelance_experience
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  async deleteFreelancerExperienceById(experienceId: number, userId: number) {
    const updateQuery = `
    UPDATE
      freelance_experience
    SET
      deleted_at = now()
    WHERE
      id = ?
      AND user_id = ?`
    return pool.query(updateQuery, [experienceId, userId])
  }
}

export const userHelper = new UserHelper()
