import { projectHelper, userHelper } from '../helpers'
import { MESSAGES } from '../constants'
import {
  saveOrUpdateProjectTitleAndDesc,
  updateProjectBudget,
  updateProjectRequirements,
} from '../interfaces'
import { NotFoundException } from '../exceptions'
import { FieldPacket, RowDataPacket } from 'mysql2'
import { getSkillList } from '../utils'

class ProjectService {
  async saveOrUpdateProjectTitleAndDesc(data: saveOrUpdateProjectTitleAndDesc) {
    try {
      let projectId
      if (data.projectId) {
        await projectHelper.updateProjectTitleAndDesc(data)
      } else {
        const [project] = await projectHelper.saveProjectTitleAndDesc(data)
        projectId = project['insertId']
      }
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
        data: {
          projectId,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateProjectSkillsAndService(data, companyId: number) {
    try {
      await projectHelper.updateProjectSkillsAndService(
        data.skills,
        data.serviceId,
        data.projectId,
        companyId,
      )
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateProjectBudget(data: updateProjectBudget) {
    try {
      await projectHelper.updateProjectBudget(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateProjectRequirements(data: updateProjectRequirements) {
    try {
      await projectHelper.updateProjectRequirements(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getClientProjectDetailsById(projectId: number) {
    try {
      const [projectDetail] = await projectHelper.getClientProjectDetailsById(
        projectId,
      )

      if (!projectDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (projectDetail[0].skills) {
        projectDetail[0].skills = await getSkillList(projectDetail[0], 'skills')
      }
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
      const [[projectCount], [projectRecords]] = await Promise.all([
        projectHelper.getClientProjectsCount(data),
        projectHelper.getClientProjectList(data),
      ])

      const projectList = projectRecords as [RowDataPacket[][], FieldPacket[]]

      if (!projectCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      for (const project of projectList) {
        if (project['skills']) {
          project['skills'] = await getSkillList(project, 'skills', true)
        }
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: projectCount[0].total,
          projectList: projectList,
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
