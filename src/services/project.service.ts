import { companyHelper, projectHelper } from '../helpers'
import { MESSAGES } from '../constants'
import { saveClientProjectDetailInterface } from '../interfaces'
import { NotFoundException } from '../exceptions'

class ProjectService {
  async saveClientProjectDetails(data: saveClientProjectDetailInterface) {
    try {
      await projectHelper.saveClientProjectDetails(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getProjectDetailsById(projectId: number) {
    try {
      const [projectDetail] = await projectHelper.getProjectDetailsById(
        projectId,
      )

      if (!projectDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: projectDetail[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getClientProjectList(data) {
    try {
      const [[projectCount], projectList] = await Promise.all([
        projectHelper.getClientProjectsCount(data.companyId),
        projectHelper.getClientProjectList(data),
      ])

      if (!projectCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: projectCount[0].total,
          projectList: projectList[0],
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerProjectList(data) {
    try {
      const [[projectCount], projectList] = await Promise.all([
        projectHelper.getFreeLancerProjectsCount(data.userId),
        projectHelper.getFreelancerProjectList(data),
      ])

      if (!projectCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: projectCount[0].total,
          projectList: projectList[0],
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const projectService = new ProjectService()
