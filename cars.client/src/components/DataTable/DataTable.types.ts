export interface DataTableRow {
  key: string
  data: string[]
}

export interface DataTableProps {
  columns: string[]
  rows: DataTableRow[] | undefined
}