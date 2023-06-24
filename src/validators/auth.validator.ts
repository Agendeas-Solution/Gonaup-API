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
      countryId: Joi.number().required(),
      countryName: Joi.string().required(),
      countryCode: Joi.string().required(),
      stateId: Joi.number().required(),
      stateName: Joi.string().required(),
      stateCode: Joi.string().required(),
      cityId: Joi.number().required(),
      cityName: Joi.string().required(),
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
      linkedinProfile: Joi.string(),
      githubProfile: Joi.string(),
      countryId: Joi.number().required(),
      countryName: Joi.string().required(),
      countryCode: Joi.string().required(),
      stateId: Joi.number().required(),
      stateName: Joi.string().required(),
      stateCode: Joi.string().required(),
      cityId: Joi.number().required(),
      cityName: Joi.string().required(),
    }).required(),
  }).unknown(),

  login: Joi.object({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).unknown(),
}
