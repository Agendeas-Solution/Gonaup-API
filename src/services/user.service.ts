import { NotFoundException } from '../exceptions'
import { userHelper } from '../helpers'
import { MESSAGES } from '../constants'
import { saveFreelancerExperience } from '../interfaces'
import { FieldPacket, RowDataPacket } from 'mysql2'

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

  async saveFreelancerExperience(data: saveFreelancerExperience) {
    try {
      await userHelper.saveFreelancerExperience(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerExperienceList(data) {
    try {
      const [[experienceCount], row] = await Promise.all([
        userHelper.getFreelancerExperienceCount(data.userId),
        userHelper.getFreelancerExperienceList(data),
      ])

      if (!experienceCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      const experienceList = row[0] as [RowDataPacket[][], FieldPacket[]]

      for (const experience of experienceList) {
        experience['project_links'] = experience['project_links']
          ? experience['project_links'].split(',')
          : []
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
        data: {
          totalPage: experienceCount[0].total,
          experienceList: experienceList,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteFreelancerExperienceById(data) {
    try {
      await userHelper.deleteFreelancerExperienceById(
        data.experienceId,
        data.userId,
      )
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_REMOVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const userService = new UserService()
