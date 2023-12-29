import type { IDiscovery } from "./Discovery"

export interface IAsset {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  hostname: string
  address: string
  serial_number: string
  package_count: number
  vendor: string
  model: string
  discovery_id: string
  discovery: IDiscovery
  packages: any
}
