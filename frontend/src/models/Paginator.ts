export interface IPaginator<RecordType> {
    current_page: number
    records: RecordType[]
    total_pages: number
    total_records: number
  }
  