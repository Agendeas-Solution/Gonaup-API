export interface clientSignupInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  contactNumber: string
  skypeId: string
  address: string
  linkedinProfile: string
  countryId?: number
  countryName?: string
  countryCode: string
  stateId?: number
  stateName?: string
  stateCode: string
  cityId?: number
  cityName?: string
}

export interface freelancerSignupInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  contactNumber: string
  skypeId: string
  address: string
  englishLevel: number
  hourlyRate: number
  freelanceProfile: string
  linkdinProfile: string
  githubProfile: string
  countryId?: number
  countryName?: string
  countryCode: string
  stateId?: number
  stateName?: string
  stateCode: string
  cityId?: number
  cityName?: string
}

export interface loginInterface {
  email: string
  password: string
}
