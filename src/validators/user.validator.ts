import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const userSchemas = {
  userDetailsById: Joi.object({
    query: Joi.object({
      userId: Joi.number().required(),
    }).required(),
  }).unknown(),

  saveFreelancerExperience: Joi.object({
    body: Joi.object({
      frameworkId: Joi.number().required(),
      experiencedYears: Joi.number().required(),
      projectLinks: Joi.array(),
      description: Joi.string().required(),
    }).required(),
  }).unknown(),

  deleteFreelancerExperience: Joi.object({
    body: Joi.object({
      experienceId: Joi.number().required(),
    }).required(),
  }).unknown(),

  freelancerExperienceList: Joi.object({
    body: Joi.object({
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}
