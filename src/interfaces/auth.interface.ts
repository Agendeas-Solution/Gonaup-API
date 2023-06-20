export interface clientSignupInterface {
  name: string
  email: string
  password: string
  contactNumber: string
  skypeId: string
  address: string
}

export interface freelancerSignupInterface {
  name: string
  email: string
  password: string
  contactNumber: string
  skypeId: string
  address: string
  englishLevel: number
  hourlyRate: number
  freelanceProfile: string
  linkdingProfile: string
  githubProfile: string
}

export interface loginInterface {
  email: string
  password: string
}
