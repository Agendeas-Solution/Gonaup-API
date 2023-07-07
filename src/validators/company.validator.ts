import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const companySchema = {
  saveCompanyDetails: Joi.object({
    body: Joi.object({
      companyName: Joi.string().required(),
      position: Joi.string().required(),
      website: Joi.string().required(),
      linkdinProfile: Joi.string().required(),
      size: Joi.number().required(),
    }).required(),
  }).unknown(),
}
