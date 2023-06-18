import { NotFoundException } from '../exceptions'
import { userHelper } from '../helpers'
import { MESSAGES } from '../constants'
import { saveFreelancerExperience } from '../interfaces'

class UserService {
  async getUserDetailsById(userId: number) {
    try {
      const [userDetail] = await userHelper.getUserDetailsById(userId)

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
      const [[experienceCount], experienceList] = await Promise.all([
        userHelper.getFreelancerExperienceCount(data.userId),
        userHelper.getFreelancerExperienceList(data),
      ])

      if (!experienceCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
        data: {
          totalPage: experienceCount[0].total,
          experienceList: experienceList[0],
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
