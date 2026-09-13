export type WorkingArrangement = "onsite" | "hybrid" | "remote";

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