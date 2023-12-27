export interface IColumn {
  title?: string
  key?: string
  filterable?: boolean
  sorter?: string
  width?: number
  ellipsis?: {
    tooltip: boolean
  }
  render?: (record: any) => JSX.Element
  type?: string
  options?: string[]
  filter?: (value: any) => boolean
  filterOptions?: any
  customFilter?: boolean
  defaultFilterOptionValues?: any
  renderExpand?: (record: any) => JSX.Element
  resizable?: boolean
}
