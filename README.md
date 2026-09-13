# Developer Job Tracker

A responsive React application for discovering software-development vacancies and keeping track of promising roles throughout the application process.

The project is currently a frontend MVP. It uses typed sample vacancies so the search and tracking experience can be developed before connecting a live jobs provider.

## Current features

- Search by job title, company, or technology
- Filter by city, working arrangement, and minimum salary
- Limit results to saved vacancies
- See a live count of matching jobs and reset all filters
- Save and unsave jobs, with saved IDs persisted in browser `localStorage`
- Assign an application status: not applied, applied, interviewing, offer, or rejected
- Open the original vacancy in a new tab
- Use the interface across desktop and mobile screen sizes

Application statuses currently last for the active browser session. Persisting them is part of the remaining MVP work.

## Project goals

The long-term goal is to make developer vacancies easy to discover across multiple UK cities, with Manchester as the primary search area. The application should provide a consistent workflow for browsing jobs, narrowing results, saving opportunities, and tracking progress without tying the interface to a single data provider.

See [PROJECT_SCOPE.md](./PROJECT_SCOPE.md) for the full scope, acceptance criteria, delivery phases, and known constraints.

## Technology

- React 19 and TypeScript
- Vite
- Material UI and Emotion
- CSS responsive layouts
- ESLint
- Browser `localStorage`

## Getting started

### Requirements

- Node.js 20 or later
- npm

### Installation

```bash
git clone https://github.com/aaronleigh97/job-tracker.git
cd job-tracker
npm install
npm run dev
```

Vite will print the local development URL in the terminal, normally `http://localhost:5173`.

## Available commands

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

## Data and persistence

Vacancy records are currently defined in `src/data/sampleJobs.ts`. Each record includes a title, company, location, optional salary range, technologies, working arrangement, source URL, and date found.

Saved job IDs are stored locally in the user's browser. There is currently no account system, backend, or cross-device synchronisation.

## Roadmap

1. Finish the frontend MVP, including persisted application statuses and automated tests.
2. Add a backend or serverless layer for permitted live vacancy data, normalisation, pagination, and duplicate detection.
3. Consider accounts, cloud synchronisation, notes, reminders, and analytics after validating the core workflow.

Live-provider credentials should never be added directly to the React client or committed to this repository.
