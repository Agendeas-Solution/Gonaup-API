export interface saveOrUpdateJobPostDetails {
  jobRole: string
  description: string
  skills: string
  hourlyRate: number
  companyId: number
  jobPostId?: number
}

export interface updateJobPosttRequirements {
  experienceNeeded: number
  projectDuration: number
  hourePerWeek: number
  companyId: number
  jobPostId: number
}
