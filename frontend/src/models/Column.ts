export interface IColumn {
  title?: string
  key?: string
  filterable?: boolean
  sorter?: string
  width?: number
  ellipsis?: {
    tooltip: boolean
  }
  render?: (record: any) => any
  type?: string
  options?: string[]
  filter?: (value: any, row: any) => boolean
  filterOptions?: any
  customFilter?: boolean
  defaultFilterOptionValues?: any
  renderExpand?: (record: any) => any
  resizable?: boolean
}
