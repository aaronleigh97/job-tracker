export interface AdzunaJob {
  id: string
  title: string
  description?: string
  created: string
  redirect_url: string
  salary_min?: number
  salary_max?: number
  company?: {
    display_name?: string
  }
  location?: {
    display_name?: string
    area?: string[]
  }
}

export interface AdzunaSearchResponse {
  count: number
  results: AdzunaJob[]
}