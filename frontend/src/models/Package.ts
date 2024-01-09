export interface IPackage {
  name: string
  count: number
  alternative_package: IAlternativePackage
}

interface IAlternativePackage {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  url: string
  package_name: string
}
