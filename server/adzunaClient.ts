import type {
    Job,
    WorkingArrangement,
} from '../src/types/job'
import type {
    AdzunaJob,
    AdzunaSearchResponse,
} from './types'

interface SearchOptions {
    searchTerm?: string
    location?: string
    page?: number
}

interface CachedSearch {
    jobs: Job[]
    expiresAt: number
}

const searchCache = new Map<string, CachedSearch>()

const CACHE_DURATION_MS = 15 * 60 * 1000

const knownTechnologies = [
    'TypeScript',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'C#',
    '.NET',
    'PHP',
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'PostgreSQL',
    'SQL',
] as const

function detectWorkingArrangement(
    job: AdzunaJob,
): WorkingArrangement {
    const text = `${job.title} ${job.description ?? ''}`.toLowerCase()

    if (text.includes('hybrid')) {
        return 'hybrid'
    }

    if (
        text.includes('remote') ||
        text.includes('work from home') ||
        text.includes('home based')
    ) {
        return 'remote'
    }

    if (
        text.includes('on-site') ||
        text.includes('onsite') ||
        text.includes('office based')
    ) {
        return 'onsite'
    }

    return 'unknown'
}

function detectTechnologies(job: AdzunaJob): string[] {
    const text = `${job.title} ${job.description ?? ''}`.toLowerCase()

    return knownTechnologies.filter((technology) =>
        text.includes(technology.toLowerCase()),
    )
}

function normaliseJob(job: AdzunaJob): Job {
    return {
        id: `adzuna-${job.id}`,
        title: job.title,
        company: job.company?.display_name ?? 'Unknown company',
        location: job.location?.display_name ?? 'Location not provided',
        salaryMin: job.salary_min,
        salaryMax: job.salary_max,
        technologies: detectTechnologies(job),
        workingArrangement: detectWorkingArrangement(job),
        sourceUrl: job.redirect_url,
        dateFound: job.created.slice(0, 10),
    }
}

export async function searchAdzunaJobs({
    searchTerm = 'software developer',
    location,
    page = 1,
}: SearchOptions = {}): Promise<Job[]> {
    const appId = process.env.ADZUNA_APP_ID
    const appKey = process.env.ADZUNA_APP_KEY

    if (!appId || !appKey) {
        throw new Error('Adzuna credentials are not configured')
    }

    const cacheKey = [
        searchTerm.trim().toLowerCase(),
        location?.trim().toLowerCase() ?? '',
        page,
    ].join('|')

    const cachedSearch = searchCache.get(cacheKey)

    if (cachedSearch && cachedSearch.expiresAt > Date.now()) {
        return cachedSearch.jobs
    }

    if (cachedSearch) {
        searchCache.delete(cacheKey)
    }

    const parameters = new URLSearchParams({
        app_id: appId,
        app_key: appKey,
        results_per_page: '50',
        what: searchTerm,
        category: 'it-jobs',
        'content-type': 'application/json',
    })

    if (location) {
        parameters.set('where', location)
    }

    const url =
        `https://api.adzuna.com/v1/api/jobs/gb/search/${page}` +
        `?${parameters.toString()}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(
            `Adzuna request failed with status ${response.status}`,
        )
    }

    const data = (await response.json()) as AdzunaSearchResponse

    const jobs = data.results.map(normaliseJob)

    searchCache.set(cacheKey, {
        jobs,
        expiresAt: Date.now() + CACHE_DURATION_MS,
    })

    return jobs
}