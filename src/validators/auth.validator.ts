import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const authSchemas = {
  clientEmailSignup: Joi.object({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      contactNumber: Joi.string(),
      skypeId: Joi.string().required(),
      address: Joi.string().required(),
      linkedinProfile: Joi.string(),
    }).required(),
  }).unknown(),

  freelancerEmailSignup: Joi.object({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      contactNumber: Joi.string(),
      skypeId: Joi.string().required(),
      address: Joi.string().required(),
      englishLevel: Joi.number().required(),
      hourlyRate: Joi.number(),
      freelanceProfile: Joi.string(),
      linkdingProfile: Joi.string(),
      githubProfile: Joi.string(),
    }).required(),
  }).unknown(),

  login: Joi.object({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).unknown(),
}
