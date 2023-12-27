import type { IProfile } from "./Profile"

export interface IDiscovery {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  ip_range: string
  profile_id: string
  profile: IProfile
  discovery_status: string
  message: string
}

export interface IDiscoveryCreate {
  ip_range: string
  profile_id: string | null
}
