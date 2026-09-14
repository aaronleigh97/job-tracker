import './App.css'
import JobCard from './components/JobCard'
import { getJobs } from './services/jobService'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import type { ApplicationStatus, Job } from './types/job'
import JobFilters from './components/JobFilters'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState('all')
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArrangement, setSelectedArrangement] = useState('all')
  const [minimumSalary, setMinimumSalary] = useState('0')
  const [applicationStatuses, setApplicationStatuses] = useState<
    Record<string, ApplicationStatus>
  >(() => {
    const storedStatuses = localStorage.getItem('applicationStatuses')

    if (!storedStatuses) {
      return {}
    }

    try {
      return JSON.parse(storedStatuses) as Record<
        string,
        ApplicationStatus
      >
    } catch {
      return {}
    }
  })

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const storedIds = localStorage.getItem('savedJobIds')

    if (!storedIds) {
      return []
    }

    try {
      return JSON.parse(storedIds) as string[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    let cancelled = false

    async function loadJobs() {
      try {
        const loadedJobs = await getJobs()

        if (!cancelled) {
          setJobs(loadedJobs)
        }
      } catch {
        if (!cancelled) {
          setLoadError(
            'Jobs could not be loaded. Please try again later.',
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadJobs()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('savedJobIds', JSON.stringify(savedJobIds))
  }, [savedJobIds])

  useEffect(() => {
    localStorage.setItem(
      'applicationStatuses',
      JSON.stringify(applicationStatuses),
    )
  }, [applicationStatuses])

  const availableCities = [
    ...new Set(jobs.map((job) => job.location)),
  ].sort()

  const filteredJobs = jobs.filter((job) => {
    const matchesCity =
      selectedCity === 'all' ||
      job.location.toLowerCase() === selectedCity

    const searchableText = [
      job.title,
      job.company,
      ...job.technologies,
    ]
      .join(' ')
      .toLowerCase()

    const matchesSearch = searchableText.includes(
      searchTerm.trim().toLowerCase(),
    )

    const matchesArrangement =
      selectedArrangement === 'all' ||
      job.workingArrangement === selectedArrangement

    const salaryThreshold = Number(minimumSalary)

    const matchesSaved =
      !showSavedOnly || savedJobIds.includes(job.id)

    const matchesSalary =
      salaryThreshold === 0 ||
      (job.salaryMin !== undefined &&
        job.salaryMin >= salaryThreshold)

    return (
      matchesCity &&
      matchesSearch &&
      matchesArrangement &&
      matchesSalary &&
      matchesSaved)
  })

  function toggleSavedJob(jobId: string) {
    setSavedJobIds((currentIds) =>
      currentIds.includes(jobId)
        ? currentIds.filter((id) => id !== jobId)
        : [...currentIds, jobId],
    )
  }

  function updateApplicationStatus(
    jobId: string,
    status: ApplicationStatus,
  ) {
    setApplicationStatuses((currentStatuses) => ({
      ...currentStatuses,
      [jobId]: status,
    }))
  }

  function resetFilters() {
    setSearchTerm('')
    setSelectedArrangement('all')
    setSelectedCity('all')
    setMinimumSalary('0')
    setShowSavedOnly(false)
  }

  return (
    <main>
      <header>
        <p>Developer Jobs</p>
        <h1>Find your next developer role</h1>
        <p>
          Search and track software development opportunities across the country
        </p>
      </header>

      <JobFilters
        searchTerm={searchTerm}
        selectedArrangement={selectedArrangement}
        selectedCity={selectedCity}
        minimumSalary={minimumSalary}
        showSavedOnly={showSavedOnly}
        availableCities={availableCities}
        onSearchChange={setSearchTerm}
        onArrangementChange={setSelectedArrangement}
        onCityChange={setSelectedCity}
        onMinimumSalaryChange={setMinimumSalary}
        onShowSavedOnlyChange={setShowSavedOnly}
        onReset={resetFilters}
      />

      <section aria-labelledby="results-heading">
        <h2 id="results-heading">Available jobs</h2>

        {isLoading ? (
          <div className="loading-state">
            <CircularProgress size={32} />
            <p>Loading jobs...</p>
          </div>
        ) : loadError ? (
          <Alert severity="error">{loadError}</Alert>
        ) : (
          <>
            <p>
              {filteredJobs.length}{' '}
              {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>

            {filteredJobs.length === 0 ? (
              <div className="empty-state">
                <h3>No matching jobs</h3>
                <p>Try changing your search or resetting the filters.</p>

                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={resetFilters}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <div>
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSaved={toggleSavedJob}
                    applicationStatus={
                      applicationStatuses[job.id] ?? 'not-applied'
                    }
                    onStatusChange={updateApplicationStatus}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default App
