import {
  saveFreelancerEducation,
  saveFreelancerExperience,
  saveFreelancerProjects,
  updateFreelancerContactDetails,
  updateFreelancerProfileLinks,
  updateFreelancerRole,
  updateFreelancerSkillAndServices,
  updateUserNameAndEmail,
} from '../interfaces'
import { pool } from '../databases'
import { S3_CONFIG } from '../config'
import { S3, USER } from '../constants'

class UserHelper {
  async getUserByEmail(email: string) {
    const findQuery = `
      SELECT 
        id,
        first_name, 
        last_name,
        password,
        signup_completed,
        type
      FROM
        user_master
      WHERE
        email = ?
        AND deleted_at IS NULL
      LIMIT 1`
    return pool.query(findQuery, [email])
  }

  async getUserDetailForCompleteSignup(userId: number) {
    const findQuery = `
    SELECT
      first_name,
      last_name,
      email,
      type,
      contact_number,
      address,
      skype_id,
      english_level,
      hourly_rate,
      freelance_profile,
      linkdin_profile,
      github_profile,
      signup_completed,
      professional_role,
      description,
      services_offer,
      skills
    FROM
      user_master
    WHERE
      id = ?
      AND deleted_at IS NULL
    LIMIT 1`
    return pool.query(findQuery, [userId])
  }

  updateFreelancerProfileLinks(data: updateFreelancerProfileLinks) {
    const updateQuery = `
      UPDATE
        user_master
      SET
        freelance_profile = ?,
        linkdin_profile = ?,
        github_profile = ?
      WHERE
        id = ?
        AND deleted_at IS NULL`

    return pool.query(updateQuery, [
      data.freelanceProfile,
      data.linkdinProfile,
      data.githubProfile,
      data.userId,
    ])
  }

  getFreelancerProfileLinksById(userId: number) {
    const findQuery = `
      SELECT
        freelance_profile,
        linkdin_profile,
        github_profile
      FROM
        user_master
      WHERE
        id = ?
        AND deleted_at IS NULL`

    return pool.query(findQuery, [userId])
  }

  saveFreelancerEducation(data: saveFreelancerEducation, userId: number) {
    const insertQuery = `
    INSERT INTO freelancer_education
        (
          school,
          degree,
          study_in,
          description,
          date_from,
          date_to,
          user_id
        )
    VALUES 
        (?,?,?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.school,
      data.degree,
      data.studyIn,
      data.description,
      data.dateFrom,
      data.dateTo,
      userId,
    ])
  }

  getFreelancerEducationList(userId: number) {
    const findQuery = `
    SELECT
      id,
      school,
      degree,
      study_in,
      date_from,
      date_to
    FROM
      freelancer_education
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  getFreelancerEducationDetailById(educationId: number, userId: number) {
    const findQuery = `
    SELECT
      id,
      school,
      degree,
      study_in,
      date_from,
      date_to,
      description
    FROM
      freelancer_education
    WHERE
      id = ?
      AND user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [educationId, userId])
  }

  updateFreelancerEducationById(
    data: saveFreelancerEducation,
    educationId: number,
    userId: number,
  ) {
    const updateQuery = `
    UPDATE
      freelancer_education
    SET
      school = ?,
      degree = ?,
      study_in = ?,
      description = ?,
      date_from = ?,
      date_to = ?
    WHERE
      id = ?
      AND user_id = ?
      AND deleted_at IS NULL`
    return pool.query(updateQuery, [
      data.school,
      data.degree,
      data.studyIn,
      data.description,
      data.dateFrom,
      data.dateTo,
      educationId,
      userId,
    ])
  }

  deleteRecordByIdAndUserId(table: string, recordId: number, userId: number) {
    const updateQuery = `
    UPDATE
      ${table}
    SET
      deleted_at = now()
    WHERE
      id = ?
      AND user_id = ?`
    return pool.query(updateQuery, [recordId, userId])
  }

  saveFreelancerExperience(data: saveFreelancerExperience, userId: number) {
    const insertQuery = `
    INSERT INTO freelancer_experience
        (
          title,
          company,
          country_id,
          country_code,
          country_name,
          city_name,
          is_working,
          working_from,
          working_to,
          description,
          user_id
        )
    VALUES 
        (?,?,?,?,?,?,?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.title,
      data.company,
      data.countryId,
      data.countryCode,
      data.countryName,
      data.cityName,
      data.isWorking,
      data.workingFrom,
      data.workgingTo,
      data.description,
      userId,
    ])
  }

  getFreelancerExperienceList(userId: number) {
    const findQuery = `
    SELECT
      id,
      title,
      company,
      is_working,
      working_from,
      working_to,
      city_name,
      country_name
    FROM
      freelancer_experience
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  getFreelancerExperienceDetailById(experienceId: number, userId: number) {
    const findQuery = `
    SELECT
      id,
      title,
      company,
      country_id,
      country_code,
      country_name,
      city_id,
      city_name,
      is_working,
      working_from,
      working_to,
      description
    FROM
      freelancer_experience
    WHERE
      id = ?
      AND user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [experienceId, userId])
  }

  updateFreelancerExperienceById(
    data: saveFreelancerExperience,
    experienceId: number,
    userId: number,
  ) {
    const updateQuery = `
    UPDATE
      freelancer_experience
    SET
      title = ?,
      company = ?,
      country_id = ?,
      country_code = ?,
      country_name = ?,
      city_name = ?,
      is_working = ?,
      working_from = ?,
      working_to = ?,
      description = ?
    WHERE
      id = ?
      AND user_id = ?
      AND deleted_at IS NULL`
    return pool.query(updateQuery, [
      data.title,
      data.company,
      data.countryId,
      data.countryCode,
      data.countryName,
      data.cityName,
      data.isWorking,
      data.workingFrom,
      data.workgingTo,
      data.description,
      experienceId,
      userId,
    ])
  }

  saveFreelancerProjects(
    projectImage: string[],
    data: saveFreelancerProjects,
    userId: number,
  ) {
    projectImage = projectImage.map(img => {
      return img.split('/')[1]
    })

    const insertQuery = `
    INSERT INTO freelancer_projects
        (
          project_image_url,
          title,
          project_url,
          description,
          skills,
          date_from,
          date_to,
          user_id
        )
    VALUES 
        (?,?,?,?,?,?,?,?)`
    return pool.query(insertQuery, [
      projectImage.toString(),
      data.title,
      data.projectUrl,
      data.description,
      data.skills,
      data.dateFrom,
      data.dateTo,
      userId,
    ])
  }

  getFreelancerProjectList(userId: number) {
    const findQuery = `
    SELECT
      id,
      title,
      project_image_url
    FROM
      freelancer_projects
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  getFreelancerProjectDetailById(projectId: number, userId: number) {
    const findQuery = `
    SELECT
      id,
      project_image_url,
      title,
      project_url,
      description,
      skills,
      date_from,
      date_to
    FROM
      freelancer_projects
    WHERE
      id = ?
      AND user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [projectId, userId])
  }

  updateFreelancerProjectById(
    projectImage: string[],
    data: saveFreelancerProjects,
    projectId: number,
    userId: number,
  ) {
    projectImage = projectImage.map(img => {
      return img.split('/')[1]
    })

    const updateQuery = `
    UPDATE
      freelancer_projects
    SET
     ${
       projectImage.length > 0
         ? `project_image_url = ${projectImage.toString()},`
         : ''
     } 
      title = ?,
      project_url = ?,
      description = ?,
      skills = ?,
      date_from = ?,
      date_to = ?
    WHERE
      id = ?
      AND user_id = ?
      AND deleted_at IS NULL`
    return pool.query(updateQuery, [
      data.title,
      data.projectUrl,
      data.description,
      data.skills,
      data.dateFrom,
      data.dateTo,
      projectId,
      userId,
    ])
  }

  async getFreelancerEducationCount(userId: number) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      freelancer_education
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  async getFreelancerExperienceCount(userId: number) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      freelancer_experience
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  async getFreelancerProjectsCount(userId: number) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      freelancer_projects
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  updateFreelancerRole(data: updateFreelancerRole) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      professional_role = ?,
      description = ?
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(updateQuery, [
      data.professionalRole,
      data.description,
      data.userId,
    ])
  }

  updateFreelancerSkillAndServices(data: updateFreelancerSkillAndServices) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      services_offer = ?,
      skills = ?
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(updateQuery, [
      data.offerServices,
      data.skills,
      data.userId,
    ])
  }

  updateFreelancerHourlyRate(hourlyRate: number, userId: number) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      hourly_rate = ?
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(updateQuery, [hourlyRate, userId])
  }

  getFreelancerWorkDetails(userId: number) {
    const findQuery = `
    SELECT
      professional_role,
      description,
      services_offer,
      skills,
      hourly_rate
    FROM
      user_master
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(findQuery, [userId])
  }

  updateFreelancerContactDetails(data: updateFreelancerContactDetails) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      image_url = ?,
      contact_number = ?,
      skype_id = ?,
      address = ?,
      country_id = ?,
      country_code = ?,
      country_name = ?,
      state_id = ?,
      state_code = ?,
      state_name = ?,
      city_id = ?,
      city_name = ?,
      zip_code = ? 
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(updateQuery, [
      data.profileImage ? data.profileImage.split('/')[1] : null,
      data.contactNumber,
      data.skypeId,
      data.address,
      data.countryId,
      data.countryCode,
      data.countryName,
      data.stateId,
      data.stateCode,
      data.stateName,
      data.cityId,
      data.cityName,
      data.zipCode,
      data.userId,
    ])
  }

  getUserSignupStatus(userId: number) {
    const findQuery = `
    SELECT
      signup_completed
    FROM
      user_master
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(findQuery, [userId])
  }

  updateUserSignupStatus(userId: number) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      signup_completed = 1
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(updateQuery, [userId])
  }

  getUserTypeById(userId: number) {
    const findQuery = `
    SELECT
      id,
      type
    FROM
      user_master
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(findQuery, [userId])
  }

  updateUserNameAndEmail(data: updateUserNameAndEmail) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      first_name = ?,
      last_name = ?,
      email = ?
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(updateQuery, [
      data.firstName,
      data.lastName,
      data.email,
      data.userId,
    ])
  }

  getUserNameAndEmail(userId: number) {
    const findQuery = `
      SELECT
        first_name,
        last_name,
        email,
        case when c.company_name is null then 0 else 1 end as clientAccountExist
      FROM
        user_master as u
      LEFT JOIN
        companies as c
      ON
        c.user_id = u.id
      WHERE
        u.id = ?
    `
    return pool.query(findQuery, [userId])
  }

  getUserProfileDetailseById(userId: number, companyId?: number) {
    const findQuery = `
    SELECT
      first_name,
      last_name,
      email,
      concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as image_url,
      contact_number,
      skype_id,
      address,
      country_id,
      country_code,
      country_name,
      state_id,
      state_code,
      state_name,
      city_id,
      city_name,
      zip_code
      ${
        !companyId
          ? `,description,
      professional_role,
      english_level,
      hourly_rate,
      freelance_profile,
      linkdin_profile,
      github_profile,
      services_offer,
      skills`
          : ''
      }
    FROM
      user_master
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(findQuery, [userId])
  }

  updateUserType(userId: number) {
    const updateQuery = `
    UPDATE
      user_master
    SET
      type = ?
    WHERE
      id = ?
    `
    return pool.query(updateQuery, [USER.TYPE.BOTH, userId])
  }

  async closeUserAccount(userId: number) {
    const updateQuery = `
      UPDATE 
        user_master
      SET 
        deleted_at = NOW() 
      WHERE
        id = ?;`
    return pool.query(updateQuery, [userId])
  }

  async closeCompanyAccount(id: number, key: string) {
    const updateQuery = `
      UPDATE
        companies
      SET
        deleted_at = NOW() 
      WHERE
        ${key === 'byUser' ? 'user_id' : 'id'} = ?;`
    return pool.query(updateQuery, [id])
  }
}

export const userHelper = new UserHelper()
