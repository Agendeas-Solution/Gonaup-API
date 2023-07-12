export interface updateFreelancerProfileLinks {
  githubProfile: string
  linkdinProfile: string
  freelanceProfile: string
  userId: number
}

export interface saveFreelancerEducation {
  school: string
  degree: string
  studyIn: string
  description: string
  dateFrom: number
  dateTo: number
}

export interface saveFreelancerExperience {
  title: string
  company: string
  countryId: number
  countryName: string
  countryCode: string
  cityName: string
  isWorking: boolean
  workingFrom: string
  workgingTo: string
  description: string
}

export interface saveFreelancerProjects {
  projectImageUrl: string[]
  title: string
  projectUrl: string
  description: string
  skills: string
  dateFrom: string
  dateTo: string
}

export interface updateFreelancerRole {
  professionalRole: string
  description: string
  userId: number
}

export interface updateFreelancerSkillAndServices {
  skills: string
  offerServices: string
  userId: number
}

export interface updateFreelancerContactDetails {
  profileImage: string
  contactNumber: string
  skypeId: string
  address: string
  countryId: number
  countryCode: string
  countryName: string
  stateId: number
  stateCode: string
  stateName: string
  cityId: number
  cityName: string
  zipCode: number
  userId: number
}

export interface updateUserNameAndEmail {
  firstName: string
  lastName: string
  email: string
  userId: number
}
