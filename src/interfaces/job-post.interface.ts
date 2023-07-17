export interface saveOrUpdateJobDetails {
  jobRole: string
  description: string
  skills: string
  hourlyRate: number
  companyId: number
  jobId?: number
}

export interface updateJobRequirements {
  experienceNeeded: number
  projectDuration: number
  hourePerWeek: number
  companyId: number
  jobId: number
}
