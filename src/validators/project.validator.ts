import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const projectSchemas = {
  saveProject: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      budgetType: Joi.number().required(),
      fixedBudget: Joi.number(),
      hourlyBudget: Joi.string(),
      skills: Joi.string().required(),
      projectDuration: Joi.number().required(),
      englishLevel: Joi.number().required(),
    }).required(),
  }).unknown(),

  projectDetails: Joi.object({
    query: Joi.object({
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  projectList: Joi.object({
    query: Joi.object({
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}
