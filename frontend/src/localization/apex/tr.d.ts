type ApexLocale = {
  name?: string
  options?: {
    months?: string[]
    shortMonths?: string[]
    days?: string[]
    shortDays?: string[]
    toolbar?: {
      download?: string
      selection?: string
      selectionZoom?: string
      zoomIn?: string
      zoomOut?: string
      pan?: string
      reset?: string
    }
  }
}

declare const apexTR: ApexLocale
export { ApexLocale }
export default apexTR
