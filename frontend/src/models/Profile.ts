export interface IProfile {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  name: string
  username: string
  password: string
  discoveries: any[]
}

export interface IProfileCreate {
  name: string
  username: string
  password: string
}
