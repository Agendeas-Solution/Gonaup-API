import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const userSchemas = {
  updateFreelancerProfileLinks: Joi.object({
    body: Joi.object({
      githubProfile: Joi.string().required(),
      linkdinProfile: Joi.string().required(),
      freelanceProfile: Joi.string().required(),
    }).required(),
  }).unknown(),

  saveFreelancerEducation: Joi.object({
    body: Joi.object({
      school: Joi.string().required(),
      degree: Joi.string().required(),
      studyIn: Joi.string().required(),
      description: Joi.string().required(),
      dateFrom: Joi.number().required(),
      dateTo: Joi.number().required(),
    }).required(),
  }).unknown(),

  gerFreelancerEducationDetails: Joi.object({
    query: Joi.object({
      educationId: Joi.number().required(),
    }).required(),
  }).unknown(),

  updateFreelancerEducation: Joi.object({
    body: Joi.object({
      school: Joi.string().required(),
      degree: Joi.string().required(),
      studyIn: Joi.string().required(),
      description: Joi.string().required(),
      dateFrom: Joi.number().required(),
      dateTo: Joi.number().required(),
      educationId: Joi.number().required(),
    }).required(),
  }).unknown(),

  deleteFreelancerEducation: Joi.object({
    body: Joi.object({
      educationId: Joi.number().required(),
    }).required(),
  }).unknown(),

  saveFreelancerExperience: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      company: Joi.string().required(),
      countryId: Joi.number().required(),
      countryName: Joi.string().required(),
      countryCode: Joi.string().required(),
      cityName: Joi.string().required(),
      isWorking: Joi.boolean(),
      workingFrom: Joi.string(),
      workgingTo: Joi.string(),
      description: Joi.string(),
    }).required(),
  }).unknown(),

  gerFreelancerExperienceDetails: Joi.object({
    query: Joi.object({
      experienceId: Joi.number().required(),
    }).required(),
  }).unknown(),

  updateFreelancerExperience: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      company: Joi.string().required(),
      countryId: Joi.number().required(),
      countryName: Joi.string().required(),
      countryCode: Joi.string().required(),
      cityId: Joi.number().required(),
      cityName: Joi.string().required(),
      isWorking: Joi.boolean(),
      workingFrom: Joi.string(),
      workgingTo: Joi.string(),
      description: Joi.string(),
      experienceId: Joi.number().required(),
    }).required(),
  }).unknown(),

  deleteFreelancerExperience: Joi.object({
    body: Joi.object({
      experienceId: Joi.number().required(),
    }).required(),
  }).unknown(),

  saveFreelancerProject: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      projectUrl: Joi.string().required(),
      description: Joi.string(),
      skills: Joi.string().required(),
      dateFrom: Joi.string(),
      dateTo: Joi.string(),
    }).required(),
  }).unknown(),

  gerFreelancerProjectDetails: Joi.object({
    query: Joi.object({
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  updateFreelancerProject: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      projectUrl: Joi.string().required(),
      description: Joi.string(),
      skills: Joi.string().required(),
      dateFrom: Joi.string(),
      dateTo: Joi.string(),
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  deleteFreelancerProject: Joi.object({
    body: Joi.object({
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  updateFreelancerRole: Joi.object({
    body: Joi.object({
      professionalRole: Joi.string().required(),
      description: Joi.string().required(),
    }).required(),
  }).unknown(),

  updateFreelancerSkillAndService: Joi.object({
    body: Joi.object({
      skills: Joi.string().required(),
      offerServices: Joi.string().required(),
    }).required(),
  }).unknown(),

  updateFreelancerHourlyRate: Joi.object({
    body: Joi.object({
      hourlyRate: Joi.number().required(),
    }).required(),
  }).unknown(),

  updateFreelancerContactDetails: Joi.object({
    body: Joi.object({
      contactNumber: Joi.string().required(),
      skypeId: Joi.string().required(),
      address: Joi.string().required(),
      countryId: Joi.number().required(),
      countryCode: Joi.string().required(),
      countryName: Joi.string().required(),
      stateId: Joi.number().required(),
      stateCode: Joi.string().required(),
      stateName: Joi.string().required(),
      cityId: Joi.number().required(),
      cityName: Joi.string().required(),
      zipCode: Joi.number(),
    }).required(),
  }).unknown(),

  updateUserNameAndEmail: Joi.object({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
    }).required(),
  }).unknown(),
}
