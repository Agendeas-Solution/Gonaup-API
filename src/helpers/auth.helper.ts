import { clientSignupInterface, freelancerSignupInterface } from '../interfaces'
import { pool } from '../databases'

class AuthHelper {
  async clientEmailSignup(data: clientSignupInterface) {
    const insertQuery = `
    INSERT INTO user_master
        (
          first_name,
          last_name,
          email,
          password,
          contact_number,
          type,
          skype_id,
          address,
          linkdin_profile,
          country_id,
          country_name,
          country_code,
          state_id,
          state_name,
          state_code,
          city_id,
          city_name
        )
    VALUES 
        (?,?,?,?,?,1,?,?,?,?,?,?,?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.contactNumber,
      data.skypeId,
      data.address,
      data.linkedinProfile,
      data.countryId,
      data.countryName,
      data.countryCode,
      data.stateId,
      data.stateName,
      data.stateCode,
      data.cityId,
      data.cityName,
    ])
  }

  async freelancerEmailSignup(data: freelancerSignupInterface) {
    const insertQuery = `
    INSERT INTO user_master
        (
          first_name,
          last_name,
          email,
          password,
          contact_number,
          type,
          skype_id,
          address,
          english_level,
          hourly_rate,
          freelance_profile,
          linkdin_profile,
          github_profile,
          country_id,
          country_name,
          country_code,
          state_id,
          state_name,
          state_code,
          city_id,
          city_name
        )
    VALUES 
        (?,?,?,?,?,0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    return pool.query(insertQuery, [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.contactNumber,
      data.skypeId,
      data.address,
      data.englishLevel,
      data.hourlyRate,
      data.freelanceProfile,
      data.linkdinProfile,
      data.githubProfile,
      data.countryId,
      data.countryName,
      data.countryCode,
      data.stateId,
      data.stateName,
      data.stateCode,
      data.cityId,
      data.cityName,
    ])
  }
}

export const authHelper = new AuthHelper()
