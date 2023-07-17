import Joi from 'joi'
import { ProjectListType } from '../interfaces'

/**
 * Joi schema for Coupon route request validation
 */
export const jobSchema = {
  saveOrUpdateJobDetails: Joi.object({
    body: Joi.object({
      jobRole: Joi.string().required(),
      description: Joi.string().required(),
      skills: Joi.string().required(),
      hourlyRate: Joi.number().required(),
      jobId: Joi.number(),
    }).required(),
  }).unknown(),

  updateJobRequirements: Joi.object({
    body: Joi.object({
      experienceNeeded: Joi.number().required(),
      projectDuration: Joi.number().required(),
      hourePerWeek: Joi.number().required(),
      jobId: Joi.number().required(),
    }).required(),
  }).unknown(),

  recruiterJobList: Joi.object({
    query: Joi.object({
      type: Joi.string()
        .valid(...Object.values(ProjectListType))
        .required(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}
