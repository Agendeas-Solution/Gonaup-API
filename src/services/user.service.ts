import { BadRequestException, NotFoundException } from '../exceptions'
import { userHelper } from '../helpers'
import { MESSAGES, S3, TABLE } from '../constants'
import {
  saveFreelancerEducation,
  saveFreelancerExperience,
  saveFreelancerProjects,
  updateFreelancerContactDetails,
  updateFreelancerProfileLinks,
  updateFreelancerRole,
  updateFreelancerSkillAndServices,
} from '../interfaces'
import { FieldPacket, RowDataPacket } from 'mysql2'
import { getMultiImgArray, getServiceList, getSkillList } from '../utils'

class UserService {
  async getUserProfile(userId: number) {
    try {
      const [userDetail] = await userHelper.getUserProfile(userId)

      if (!userDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: userDetail[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerSignupSteps(userId: number) {
    try {
      const [userDetail] = await userHelper.getUserDetailForCompleteSignup(
        userId,
      )

      if (!userDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (userDetail[0].signup_completed)
        throw new BadRequestException(MESSAGES.USER.SIGNUP_ALREADY_COMPLETED)

      const stepStatus = await this.getStepStatus(userDetail[0], userId)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: { stepStatus },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getStepStatus(userDetail: any, userId: number) {
    const [[fEducationCount], [fExperienceCount], [fProjectCount]] =
      await Promise.all([
        userHelper.getFreelancerEducationCount(userId),
        userHelper.getFreelancerExperienceCount(userId),
        userHelper.getFreelancerProjectsCount(userId),
      ])

    if (
      !(
        userDetail.github_profile &&
        userDetail.linkdin_profile &&
        userDetail.freelance_profile
      )
    ) {
      return 1
    } else if (fEducationCount[0].total <= 0) {
      return 2
    } else if (fExperienceCount[0].total <= 0) {
      return 3
    } else if (fProjectCount[0].total <= 0) {
      return 4
    } else if (!(userDetail.professional_role && userDetail.description)) {
      return 5
    } else if (!(userDetail.services_offer && userDetail.skills)) {
      return 6
    } else if (!userDetail.hourly_rate) {
      return 7
    } else if (!(userDetail.contact_number && userDetail.skype_id)) {
      return 8
    }

    return 0
  }

  async updateFreelancerProfileLinks(data: updateFreelancerProfileLinks) {
    try {
      await userHelper.updateFreelancerProfileLinks(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerProfileLinksById(userId: number) {
    try {
      const [profileLinks] = await userHelper.getFreelancerProfileLinksById(
        userId,
      )

      if (!profileLinks)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        profileLinks: profileLinks[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async saveFreelancerEducation(data: saveFreelancerEducation, userId: number) {
    try {
      await userHelper.saveFreelancerEducation(data, userId)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerEducationList(userId: number) {
    try {
      const [educationList] = await userHelper.getFreelancerEducationList(
        userId,
      )

      if (!educationList)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        educationList,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerEducationDetailById(educationId: number, userId: number) {
    try {
      const [educationDetail] =
        await userHelper.getFreelancerEducationDetailById(educationId, userId)

      if (!educationDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        educationDetail: educationDetail[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateFreelancerEducationById(
    data: saveFreelancerEducation,
    educationId: number,
    userId: number,
  ) {
    try {
      await userHelper.updateFreelancerEducationById(data, educationId, userId)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteFreelancerEducationById(educationId: number, userId: number) {
    try {
      await userHelper.deleteRecordByIdAndUserId(
        TABLE.FREELANCER.EDUCATION,
        educationId,
        userId,
      )
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_REMOVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async saveFreelancerExperience(
    data: saveFreelancerExperience,
    userId: number,
  ) {
    try {
      await userHelper.saveFreelancerExperience(data, userId)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerExperienceList(userId: number) {
    try {
      const [experienceList] = await userHelper.getFreelancerExperienceList(
        userId,
      )

      if (!experienceList)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        experienceList,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerExperienceDetailById(
    experienceId: number,
    userId: number,
  ) {
    try {
      const [experienceDetail] =
        await userHelper.getFreelancerExperienceDetailById(experienceId, userId)

      if (!experienceDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        experienceDetail: experienceDetail[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateFreelancerExperienceById(
    data: saveFreelancerExperience,
    experienceId: number,
    userId: number,
  ) {
    try {
      await userHelper.updateFreelancerExperienceById(
        data,
        experienceId,
        userId,
      )
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteFreelancerExperienceById(experienceId: number, userId: number) {
    try {
      await userHelper.deleteRecordByIdAndUserId(
        TABLE.FREELANCER.EXPERIENCE,
        experienceId,
        userId,
      )
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_REMOVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async saveFreelancerProjects(
    projectImage: string[],
    data: saveFreelancerProjects,
    userId: number,
  ) {
    try {
      await userHelper.saveFreelancerProjects(projectImage, data, userId)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerProjectList(userId: number) {
    try {
      const [projectList] = (await userHelper.getFreelancerProjectList(
        userId,
      )) as [RowDataPacket[][], FieldPacket[]]

      if (!projectList.length)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      for (const project of projectList) {
        if (project['project_image_url']) {
          project['project_image_url'] = getMultiImgArray(
            project['project_image_url'],
            S3.PORTFOLIO_FILE,
          )[0]
        }
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        projectList,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerProjectDetailById(projectId: number, userId: number) {
    try {
      const [projectDetail] = await userHelper.getFreelancerProjectDetailById(
        projectId,
        userId,
      )

      if (!projectDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (projectDetail[0].skills) {
        projectDetail[0].skills = await getSkillList(projectDetail[0], 'skills')
      }

      if (projectDetail[0]['project_image_url']) {
        projectDetail[0]['projectImageArray'] = getMultiImgArray(
          projectDetail[0]['project_image_url'],
          S3.PORTFOLIO_FILE,
        )
      }

      delete projectDetail[0]['project_image_url']
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        projectDetail: projectDetail[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateFreelancerProjectById(
    projectImage: string[],
    data: saveFreelancerProjects,
    projectId: number,
    userId: number,
  ) {
    try {
      await userHelper.updateFreelancerProjectById(
        projectImage,
        data,
        projectId,
        userId,
      )
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteFreelancerProjectById(projectId: number, userId: number) {
    try {
      await userHelper.deleteRecordByIdAndUserId(
        TABLE.FREELANCER.PROJECTS,
        projectId,
        userId,
      )
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_REMOVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateFreelancerRole(data: updateFreelancerRole) {
    try {
      await userHelper.updateFreelancerRole(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateFreelancerSkillAndServices(
    data: updateFreelancerSkillAndServices,
  ) {
    try {
      await userHelper.updateFreelancerSkillAndServices(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateFreelancerHourlyRate(hourlyRate: number, userId: number) {
    try {
      await userHelper.updateFreelancerHourlyRate(hourlyRate, userId)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerWorkDetails(userId: number) {
    try {
      const [workDetails] = await userHelper.getFreelancerWorkDetails(userId)

      if (!workDetails[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (workDetails[0].services_offer) {
        workDetails[0].services_offer = await getServiceList(
          workDetails[0],
          'services_offer',
        )
      }

      if (workDetails[0].skills) {
        workDetails[0].skills = await getSkillList(workDetails[0], 'skills')
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        workDetails: workDetails[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateFreelancerContactDetails(data: updateFreelancerContactDetails) {
    try {
      await userHelper.updateFreelancerContactDetails(data)

      const [userSignupStatus] = await userHelper.getUserSignupStatus(
        data.userId,
      )

      if (userSignupStatus[0] && !userSignupStatus[0].signup_completed) {
        await userHelper.updateUserSignupStatus(data.userId)
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const userService = new UserService()
