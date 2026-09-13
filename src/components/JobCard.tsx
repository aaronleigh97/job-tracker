import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import type { ApplicationStatus, Job } from '../types/job'

interface JobCardProps {
  job: Job
  isSaved: boolean
  onToggleSaved: (jobId: string) => void
  applicationStatus: ApplicationStatus
  onStatusChange: (
    jobId: string,
    status: ApplicationStatus,
  ) => void
}

function JobCard({
  job,
  isSaved,
  onToggleSaved,
  applicationStatus,
  onStatusChange,
}: JobCardProps) {
  const salary =
    job.salaryMin !== undefined && job.salaryMax !== undefined
      ? `£${job.salaryMin.toLocaleString()}–£${job.salaryMax.toLocaleString()}`
      : 'Salary not provided'

  return (
    <Card component="article" variant="outlined" sx={{ mt: 2.5 }}>
      <CardContent>
        <Stack
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <div>
            <Typography component="h3" variant="h6">
              {job.title}
            </Typography>

            <Typography color="text.secondary">
              {job.company}
            </Typography>
          </div>

          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Button
              variant={isSaved ? 'contained' : 'outlined'}
              startIcon={
                isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />
              }
              onClick={() => onToggleSaved(job.id)}
              aria-pressed={isSaved}
            >
              {isSaved ? 'Saved' : 'Save job'}
            </Button>

            <Chip
              label={job.workingArrangement}
              color="primary"
              variant="outlined"
              sx={{ textTransform: 'capitalize' }}
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 3,
            mt: 2,
          }}
        >
          <Typography>{job.location}</Typography>
          <Typography>{salary}</Typography>
        </Stack>

        <Stack
          sx={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 1,
            mt: 2,
          }}
        >
          {job.technologies.map((technology) => (
            <Chip
              key={technology}
              label={technology}
              size="small"
            />
          ))}
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 0,
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id={`status-${job.id}-label`}>
            Application status
          </InputLabel>

          <Select
            labelId={`status-${job.id}-label`}
            id={`status-${job.id}`}
            label="Application status"
            value={applicationStatus}
            onChange={(event) =>
              onStatusChange(
                job.id,
                event.target.value as ApplicationStatus,
              )
            }
          >
            <MenuItem value="not-applied">Not applied</MenuItem>
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="interviewing">Interviewing</MenuItem>
            <MenuItem value="offer">Offer</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <Button
          component="a"
          href={job.sourceUrl}
          target="_blank"
          rel="noreferrer"
          endIcon={<OpenInNewIcon />}
        >
          View vacancy
        </Button>
      </CardActions>
    </Card>
  )
}

export default JobCard