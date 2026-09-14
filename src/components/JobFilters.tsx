import RestartAltIcon from '@mui/icons-material/RestartAlt'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'

interface JobFiltersProps {
  searchTerm: string
  selectedArrangement: string
  selectedCity: string
  minimumSalary: string
  showSavedOnly: boolean
  availableCities: string[]
  onSearchChange: (value: string) => void
  onArrangementChange: (value: string) => void
  onCityChange: (value: string) => void
  onMinimumSalaryChange: (value: string) => void
  onShowSavedOnlyChange: (value: boolean) => void
  onReset: () => void
}

function JobFilters({
  searchTerm,
  selectedArrangement,
  selectedCity,
  minimumSalary,
  showSavedOnly,
  availableCities,
  onSearchChange,
  onArrangementChange,
  onCityChange,
  onMinimumSalaryChange,
  onShowSavedOnlyChange,
  onReset,
}: JobFiltersProps) {
  return (
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
          onChange={(event) => onSearchChange(event.target.value)}
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
              onArrangementChange(event.target.value)
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
            onChange={(event) => onCityChange(event.target.value)}
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
            onChange={(event) =>
              onMinimumSalaryChange(event.target.value)
            }
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
                onShowSavedOnlyChange(event.target.checked)
              }
            />
          }
          label="Saved jobs only"
        />

        <Button
          variant="contained"
          startIcon={<RestartAltIcon />}
          onClick={onReset}
        >
          Reset filters
        </Button>
      </Stack>
    </section>
  )
}

export default JobFilters