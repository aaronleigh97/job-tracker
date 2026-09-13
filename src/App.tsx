import './App.css'
import JobCard from './components/JobCard'
import { sampleJobs } from './data/sampleJobs'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import type { ApplicationStatus } from './types/job'

function App() {
  const [selectedCity, setSelectedCity] = useState('all')
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArrangement, setSelectedArrangement] = useState('all')
  const [minimumSalary, setMinimumSalary] = useState('0')
  const [applicationStatuses, setApplicationStatuses] = useState<
    Record<string, ApplicationStatus>
  >({})
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
    localStorage.setItem('savedJobIds', JSON.stringify(savedJobIds))
  }, [savedJobIds])

  const availableCities = [
    ...new Set(sampleJobs.map((job) => job.location)),
  ].sort()

  const filteredJobs = sampleJobs.filter((job) => {
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
      (job.salaryMax !== undefined &&
        job.salaryMax >= salaryThreshold)

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

      <section className="filters" aria-labelledby="search-heading">
        <h2 id="search-heading">Search jobs</h2>

        <div className="filters__grid">
          <TextField
            id="job-search"
            label="Job title, company, or technology"
            placeholder="For example: React"
            type="search"
            size="small"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <FormControl size="small">
            <InputLabel id="arrangement-label">
              Working arrangement
            </InputLabel>

            <Select
              labelId="arrangement-label"
              id="working-arrangement"
              label="Working arrangement"
              value={selectedArrangement}
              onChange={(event) =>
                setSelectedArrangement(event.target.value)
              }
            >
              <MenuItem value="all">All arrangements</MenuItem>
              <MenuItem value="onsite">Onsite</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel id="city-label">City</InputLabel>

            <Select
              labelId="city-label"
              id="city"
              label="City"
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
            >
              <MenuItem value="all">All cities</MenuItem>

              {availableCities.map((city) => (
                <MenuItem key={city} value={city.toLowerCase()}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel id="salary-label">Minimum salary</InputLabel>

            <Select
              labelId="salary-label"
              id="minimum-salary"
              label="Minimum salary"
              value={minimumSalary}
              onChange={(event) => setMinimumSalary(event.target.value)}
            >
              <MenuItem value="0">Any salary</MenuItem>
              <MenuItem value="30000">£30,000+</MenuItem>
              <MenuItem value="35000">£35,000+</MenuItem>
              <MenuItem value="40000">£40,000+</MenuItem>
              <MenuItem value="45000">£45,000+</MenuItem>
              <MenuItem value="50000">£50,000+</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Stack
          sx={{
            mt: 2.5,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={showSavedOnly}
                onChange={(event) =>
                  setShowSavedOnly(event.target.checked)
                }
              />
            }
            label="Saved jobs only"
          />

          <Button
            variant="contained"
            startIcon={<RestartAltIcon />}
            onClick={resetFilters}
          >
            Reset filters
          </Button>
        </Stack>
      </section>

      <section aria-labelledby="results-heading">
        <h2 id="results-heading">Available jobs</h2>
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
      </section>
    </main>
  )
}

export default App
