import { FieldPacket, RowDataPacket } from 'mysql2'
import { MESSAGES } from '../constants'
import { jobHelper } from '../helpers'
import { saveOrUpdateJobDetails, updateJobRequirements } from '../interfaces'
import { NotFoundException } from '../exceptions'
import { getSkillList } from '../utils'

class JobService {
  async saveOrUpdateJobDetails(data: saveOrUpdateJobDetails) {
    try {
      let jobId
      if (data.jobId) {
        await jobHelper.updateJobDetails(data)
      } else {
        const [jobPost] = await jobHelper.saveJobDetails(data)
        jobId = jobPost['insertId']
      }
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
        data: {
          jobId,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateJobRequirements(data: updateJobRequirements) {
    try {
      await jobHelper.updateJobRequirements(data)
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
        jobHelper.getRecruiterJobCount(data),
        jobHelper.getRecruiterJobList(data),
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

export const jobService = new JobService()
