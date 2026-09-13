# Developer Job Tracker — Project Scope

## 1. Project overview

The Developer Job Tracker is a web application for discovering and tracking software-development vacancies across multiple cities. Manchester will be the default city because it is the user's primary search area, but it will not be a permanent restriction.

The application will be built with TypeScript and React. Its first release will focus on a simple, reliable workflow: browse relevant jobs, narrow the results, save opportunities, and track application progress.

## 2. Objectives

- Make developer vacancies easy to browse, with Manchester selected by default.
- Allow users to change the city or view jobs from all supported cities.
- Allow users to find relevant roles using search and filters.
- Let users save jobs and track their application status.
- Present important job information consistently and clearly.
- Establish a maintainable foundation for future live job-data integrations.

## 3. Target users

The primary user is a software developer looking for work, initially focused on Manchester. This includes junior, mid-level, and senior candidates seeking onsite, hybrid, or remote roles.

## 4. MVP features

### Job discovery

- Display a list of developer vacancies.
- Show the job title, company, location, salary (when available), technologies, working arrangement, date found, and source link.
- Open the original vacancy in a new browser tab.
- Initially use typed sample data so the interface can be developed independently of an external API.

### Search and filtering

- Search by job title, company, or technology.
- Filter by working arrangement: onsite, hybrid, or remote.
- Filter by city, with Manchester selected by default.
- Filter by technology.
- Filter by minimum salary when salary information is available.
- Clearly display the number of matching jobs.
- Provide a way to reset all filters.

### Application tracking

- Save or unsave a vacancy.
- Assign an application status:
  - Not applied
  - Applied
  - Interviewing
  - Offer
  - Rejected
- Persist saved jobs and application statuses in browser `localStorage`.
- Provide a view or filter for saved and actively tracked jobs.

### User experience

- Support desktop and mobile screen sizes.
- Include useful loading, empty, and error states where applicable.
- Use accessible labels, keyboard controls, semantic HTML, and visible focus states.
- Clearly identify jobs with missing salary or other optional information.

## 5. Data model

Each job should contain:

- Unique ID
- Job title
- Company name
- Location
- Optional minimum and maximum salary
- List of technologies
- Working arrangement
- Source URL
- Date found

Application state should be stored separately from vacancy data so that jobs imported from different sources can share the same tracking workflow.

## 6. Technical scope

### Frontend

- React
- TypeScript
- Vite
- CSS with responsive layouts
- Browser `localStorage` for MVP persistence
- ESLint and TypeScript checks
- Automated tests for filtering and application-tracking behaviour

### Future data integration

Live vacancy data should be accessed through a backend or serverless API rather than directly from the React application. This will protect API credentials, handle CORS restrictions, normalise results from different providers, and support duplicate detection.

## 7. Out of scope for the MVP

- User registration and authentication
- Cloud synchronisation across devices
- Automated job applications
- CV or cover-letter generation
- Email, SMS, or push notifications
- Employer accounts or vacancy submission
- Machine-learning recommendations
- Salary analytics and reporting
- Native mobile applications
- Scraping websites without explicit permission

These may be considered after the core workflow has been validated.

## 8. Delivery phases

### Phase 1 — Frontend MVP

- Replace the default Vite interface.
- Add representative developer-job sample data from Manchester and other cities.
- Build job cards, search, filters, and responsive layouts.
- Add saved jobs and application-status tracking.
- Persist user state locally.
- Add tests and update project documentation.

### Phase 2 — Live vacancies

- Select a permitted job-data provider.
- Add a backend or serverless API layer.
- Normalise and validate incoming vacancy data.
- Filter results by city and prioritise Manchester by default.
- Handle pagination, rate limits, failures, and duplicate vacancies.

### Phase 3 — Accounts and enhancements

- Add authentication and cloud persistence if needed.
- Add reminders, notes, deadlines, and richer application history.
- Add analytics or personalised recommendations based on user feedback.

## 9. MVP acceptance criteria

The MVP is complete when a user can:

1. Open the application on desktop or mobile.
2. Browse a clearly presented list of developer jobs, initially filtered to Manchester.
3. Search and filter that list using the supported criteria.
4. Open the original vacancy source.
5. Save a job and update its application status.
6. Refresh or reopen the application without losing locally stored tracking data.
7. Understand when there are no matching jobs or when data cannot be loaded.

The project must also pass its TypeScript build, lint checks, and automated tests.

## 10. Success measures

- A user can find a relevant vacancy within a few interactions.
- Search and filtering produce predictable results.
- Saved jobs and statuses remain available after a browser refresh.
- The interface works without horizontal scrolling at common mobile widths.
- The architecture can accept a live data source without rewriting the core UI.

## 11. Key risks and constraints

- Job-data providers may impose fees, rate limits, or usage restrictions.
- Vacancy data may contain inconsistent locations, salaries, and technology names.
- Duplicate jobs may appear across multiple sources.
- City names and surrounding metropolitan areas must be normalised consistently.
- Remote roles require a clear policy for how they interact with the city filter.
