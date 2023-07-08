import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const projectSchemas = {
  saveOrUpdateProjectTitleAndDesc: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      projectId: Joi.number(),
    }).required(),
  }).unknown(),

  updateProjectSkills: Joi.object({
    body: Joi.object({
      skills: Joi.string().required(),
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  projectDetails: Joi.object({
    query: Joi.object({
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  updateProjectBudget: Joi.object({
    body: Joi.object({
      budgetType: Joi.number().required(),
      fixedBudget: Joi.number(),
      minHourlyBudget: Joi.number(),
      maxHourlyBudget: Joi.number(),
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  updateProjectRequirements: Joi.object({
    body: Joi.object({
      experienceNeeded: Joi.number().required(),
      projectDuration: Joi.number().required(),
      hourePerWeek: Joi.number().required(),
      projectId: Joi.number().required(),
      isPublished: Joi.boolean().required(),
    }).required(),
  }).unknown(),

  clientProjectList: Joi.object({
    query: Joi.object({
      page: Joi.number(),
      size: Joi.number(),
      isDraft: Joi.boolean(),
    }).required(),
  }).unknown(),

  freelancerProjectList: Joi.object({
    query: Joi.object({
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}
