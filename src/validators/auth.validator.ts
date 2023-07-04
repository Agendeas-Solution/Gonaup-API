import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const authSchemas = {
  freelancerOrClientEmailSignup: Joi.object({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).unknown(),

  login: Joi.object({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).unknown(),
}
