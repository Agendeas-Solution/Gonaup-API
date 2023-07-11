import { FieldPacket, RowDataPacket } from 'mysql2'
import { MESSAGES } from '../constants'
import { jobPostHelper } from '../helpers'
import {
  saveOrUpdateJobPostDetails,
  updateJobPosttRequirements,
} from '../interfaces'
import { NotFoundException } from '../exceptions'
import { getSkillList } from '../utils'

class JobPostService {
  async saveOrUpdateJobPostDetails(data: saveOrUpdateJobPostDetails) {
    try {
      let jobPostId
      if (data.jobPostId) {
        await jobPostHelper.updateJobPostDetails(data)
      } else {
        const [jobPost] = await jobPostHelper.saveJobPostDetails(data)
        jobPostId = jobPost['insertId']
      }
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
        data: {
          jobPostId,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateJobPostRequirements(data: updateJobPosttRequirements) {
    try {
      await jobPostHelper.updateJobPostRequirements(data)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATE_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getRecruiterJobList(data) {
    try {
      const [[jobCount], [jobRecords]] = await Promise.all([
        jobPostHelper.getRecruiterJobCount(data),
        jobPostHelper.getRecruiterJobList(data),
      ])

      const jobList = jobRecords as [RowDataPacket[][], FieldPacket[]]

      if (!jobCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      for (const job of jobList) {
        if (job['skills']) {
          job['skills'] = await getSkillList(job, 'skills', true)
        }
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: jobCount[0].total,
          jobList,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const jobPostService = new JobPostService()
