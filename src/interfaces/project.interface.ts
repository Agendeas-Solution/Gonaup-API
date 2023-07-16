export interface saveOrUpdateProjectTitleAndDesc {
  title: string
  description: string
  companyId: number
  projectId?: number
}

export interface updateProjectBudget {
  budgetType: number
  fixedBudget: number
  minHourlyBudget: number
  maxHourlyBudget: number
  companyId: number
  projectId: number
}

export interface updateProjectRequirements {
  experienceNeeded: number
  projectDuration: number
  hourePerWeek: number
  companyId: number
  projectId: number
  isPublished: boolean
}
export interface applyForProject {
  suggestedRate: number
  userId: number
  projectId: number
}

export enum ProjectListType {
  ACTIVE = 'active',
  INVITED = 'invited',
  RECENTLY_FILLED = 'recently-filled',
}
