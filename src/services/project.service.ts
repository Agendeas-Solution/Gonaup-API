import { companyHelper, projectHelper } from '../helpers'
import { MESSAGES } from '../constants'
import {
  applyForProject,
  saveOrUpdateProjectTitleAndDesc,
  updateProjectBudget,
  updateProjectRequirements,
} from '../interfaces'
import { BadRequestException, NotFoundException } from '../exceptions'
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
      const [projectPublishedStatus] =
        await projectHelper.getProjectPublishedStatus(
          data.companyId,
          data.projectId,
        )

      if (projectPublishedStatus[0] && projectPublishedStatus[0].published_at)
        throw new BadRequestException(MESSAGES.PROJECT.BUDGET_NOT_UPDATED)

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
      if (data.isPublished) {
        const [companiesDetails] = await companyHelper.getCompanyDetailById(
          data.companyId,
        )

        const [project] = await projectHelper.getProjectTitle(data.projectId)
        await projectHelper.saveNotfication({
          title: companiesDetails[0].company_name + ' has published a project',
          content:
            companiesDetails[0].company_name +
            ' has published a project for ' +
            project[0].title,
          userId: data.userId,
          projectId: data.projectId,
        })
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getClientProjectDetailsById(projectId: number, companyId: number) {
    try {
      const [projectDetail] = await projectHelper.getClientProjectDetailsById(
        projectId,
        companyId,
      )

      if (!projectDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (projectDetail[0].skills) {
        projectDetail[0].skills = await getSkillList(projectDetail[0], 'skills')
      }

      const [candidates] = await projectHelper.getCandidateListByStatus(
        projectId,
        2,
      )
      projectDetail[0].suggestedTalents = candidates

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
      const [[projectCount], [projectRecords]] = await Promise.all([
        projectHelper.getFreeLancerProjectsCount(data),
        projectHelper.getFreelancerProjectList(data),
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

  async getFreelancerProjectDetailsById(projectId: number, userId: number) {
    try {
      const [projectDetail] =
        await projectHelper.getFreelancerProjectDetailsById(projectId, userId)

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

  async applyForProject(data: applyForProject) {
    try {
      await projectHelper.applyForProject(data)
      await projectHelper.saveNotfication({
        title: 'apply for a project',
        content: 'user has shown interest in project',
        userId: data.userId,
        projectId: data.projectId,
      })
      return {
        message: MESSAGES.PROJECT.APPLIED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async closeProject(
    reason: string,
    projectId: number,
    companyId: number,
    userId: number,
  ) {
    try {
      await projectHelper.closeProject(reason, projectId, companyId)
      const [companiesDetails] = await companyHelper.getCompanyDetailById(
        companyId,
      )

      const [project] = await projectHelper.getProjectTitle(projectId)
      await projectHelper.saveNotfication({
        title: companiesDetails[0].company_name + ' has closed a project',
        content:
          companiesDetails[0].company_name +
          ' has closed a project of ' +
          project[0].title +
          ' for the reason of ' +
          reason,
        userId: userId,
        projectId: projectId,
      })

      return {
        message: MESSAGES.PROJECT.CLOSED_SUCCEESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const projectService = new ProjectService()
