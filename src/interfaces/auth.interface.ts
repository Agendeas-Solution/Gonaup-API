export interface emailSignupInterface {
  name: string
  email: string
  password: string
  contactNumber: string
  type: number
  skypeId?: string
  address: string
}

export interface loginInterface {
  email: string
  password: string
}
