import { clientSignupInterface, freelancerSignupInterface } from '../interfaces'
import { pool } from '../databases'

class AuthHelper {
  async clientEmailSignup(data: clientSignupInterface) {
    const insertQuery = `
    INSERT INTO user_master
        (first_name,last_name,email,password,contact_number,type,skype_id,address,linkdin_profile)
    VALUES 
        (?,?,?,?,1,?,?)`
    return pool.query(insertQuery, [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.contactNumber,
      data.skypeId,
      data.address,
      data.linkedinProfile,
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
          github_profile
        )
    VALUES 
        (?,?,?,?,0,?,?,?,?,?,?,?)`
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
      data.linkdingProfile,
      data.githubProfile,
    ])
  }
}

export const authHelper = new AuthHelper()
