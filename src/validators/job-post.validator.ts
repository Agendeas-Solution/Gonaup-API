import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const jobPostSchema = {
  saveOrUpdateJobPostDetails: Joi.object({
    body: Joi.object({
      jobRole: Joi.string().required(),
      description: Joi.string().required(),
      skills: Joi.string().required(),
      hourlyRate: Joi.number().required(),
      jobPostId: Joi.number(),
    }).required(),
  }).unknown(),

  updateJobPostRequirements: Joi.object({
    body: Joi.object({
      experienceNeeded: Joi.number().required(),
      projectDuration: Joi.number().required(),
      hourePerWeek: Joi.number().required(),
      jobPostId: Joi.number().required(),
    }).required(),
  }).unknown(),

  recruiterJobList: Joi.object({
    query: Joi.object({
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}