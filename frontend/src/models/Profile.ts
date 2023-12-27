import type { IDiscovery } from "./Discovery"

export interface IProfile {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  username: string
  password: string
  discoveries: IDiscovery[]
}

export interface IProfileCreate {
  name: string
  username: string
  password: string
}
