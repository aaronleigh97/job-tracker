import { config } from 'dotenv'
import express from 'express'
import { searchAdzunaJobs } from './adzunaClient'

config({ path: '.env.local' })

const app = express()
const port = 3001

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/jobs', async (request, response) => {
  const searchTerm =
    typeof request.query.what === 'string'
      ? request.query.what
      : 'software developer'

  const location =
    typeof request.query.where === 'string'
      ? request.query.where
      : undefined

  const requestedPage =
    typeof request.query.page === 'string'
      ? Number(request.query.page)
      : 1

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1

  try {
    const jobs = await searchAdzunaJobs({
      searchTerm,
      location,
      page,
    })

    response.json({ jobs })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unknown server error'

    console.error(message)

    response.status(500).json({
      error: 'Unable to retrieve jobs',
    })
  }
})

app.listen(port, () => {
  console.log(`Job API listening on http://localhost:${port}`)
})