import type { Job } from '../types/job'

interface JobsResponse {
  jobs: Job[]
}

export async function getJobs(): Promise<Job[]> {
  const parameters = new URLSearchParams({
    what: 'software developer',
  })

  const response = await fetch(`/api/jobs?${parameters.toString()}`)

  if (!response.ok) {
    throw new Error(
      `Job request failed with status ${response.status}`,
    )
  }

  const data = (await response.json()) as JobsResponse

  return data.jobs
}