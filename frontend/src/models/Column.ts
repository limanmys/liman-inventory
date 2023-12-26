export interface IColumn {
    title?: string
    key?: string
    filterable?: boolean
    sorter?: string
    width?: number
    ellipsis?: {
      tooltip: boolean
    }
    render?: Function
    type?: string
    options?: string[]
    filter?: Function
    filterOptions?: any
    customFilter?: boolean
    defaultFilterOptionValues?: any
    renderExpand?: Function 
  }