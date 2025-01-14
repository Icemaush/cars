export interface Car {
  id: number
  make: string
  model: string
  year: number
  colour: string
}

export interface CarSearchFilterObject {
  make?: string
  model?: string
}

export interface CarSearchFilterProps {
  setFilters: (obj: CarSearchFilterObject) => void
}