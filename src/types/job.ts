export type WorkingArrangement =
  | 'onsite'
  | 'hybrid'
  | 'remote'
  | 'unknown'

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salaryMin?: number;
    salaryMax?: number;
    technologies: string[];
    workingArrangement: WorkingArrangement;
    sourceUrl: string;
    dateFound: string;
}

export type ApplicationStatus =
  | 'not-applied'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'

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