export interface clientSignupInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  contactNumber: string
  skypeId: string
  address: string
  linkedinProfile: string
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
}

export interface loginInterface {
  email: string
  password: string
}
