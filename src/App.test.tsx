import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest'
import App from './App'
import { sampleJobs } from './data/sampleJobs'
import { getJobs } from './services/jobService'

vi.mock('./services/jobService')

const mockedGetJobs = vi.mocked(getJobs)

describe('App', () => {
    beforeEach(() => {
        mockedGetJobs.mockResolvedValue(sampleJobs)
    })

    async function renderLoadedApp() {
        const renderedApp = render(<App />)

        await screen.findByText('3 jobs found')

        return renderedApp
    }

    it('displays all jobs initially', async () => {
        await renderLoadedApp()

        expect(
            screen.getByText('3 jobs found'),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'Junior React Developer',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'Frontend Developer',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'TypeScript Developer',
            }),
        ).toBeInTheDocument()
    })

    it('filters jobs by city', async () => {
        const user = userEvent.setup()

        await renderLoadedApp()

        await user.click(
            screen.getByRole('combobox', { name: 'City' }),
        )

        await user.click(
            screen.getByRole('option', { name: 'Manchester' }),
        )

        expect(
            screen.getByText('1 job found'),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'Junior React Developer',
            }),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Frontend Developer',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'TypeScript Developer',
            }),
        ).not.toBeInTheDocument()
    })

    it('filters jobs using a keyword', async () => {
        const user = userEvent.setup()

        await renderLoadedApp()

        await user.type(
            screen.getByRole('searchbox', {
                name: 'Job title, company, or technology',
            }),
            'JavaScript',
        )

        expect(
            screen.getByText('1 job found'),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'Frontend Developer',
            }),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Junior React Developer',
            }),
        ).not.toBeInTheDocument()
    })

    it('displays an empty state when no jobs match', async () => {
        const user = userEvent.setup()

        await renderLoadedApp()

        await user.type(
            screen.getByRole('searchbox', {
                name: 'Job title, company, or technology',
            }),
            'Rust',
        )

        expect(
            screen.getByText('0 jobs found'),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'No matching jobs',
            }),
        ).toBeInTheDocument()
    })

    it('allows a job to be saved', async () => {
        const user = userEvent.setup()

        await renderLoadedApp()

        const saveButtons = screen.getAllByRole('button', {
            name: 'Save job',
        })

        await user.click(saveButtons[0])

        expect(
            screen.getByRole('button', { name: 'Saved' }),
        ).toBeInTheDocument()
    })

    it('loads saved jobs from local storage', async () => {
        const user = userEvent.setup()

        const { unmount } = await renderLoadedApp()

        const saveButtons = screen.getAllByRole('button', {
            name: 'Save job',
        })

        await user.click(saveButtons[0])

        unmount()

        await renderLoadedApp()

        expect(
            screen.getByRole('button', { name: 'Saved' }),
        ).toBeInTheDocument()
    })

    it('persists an application status', async () => {
        const user = userEvent.setup()

        const { unmount } = await renderLoadedApp()

        const statusMenus = screen.getAllByRole('combobox', {
            name: 'Application status',
        })

        await user.click(statusMenus[0])

        await user.click(
            screen.getByRole('option', { name: 'Applied' }),
        )

        unmount()

        await renderLoadedApp()

        const restoredStatusMenus = screen.getAllByRole('combobox', {
            name: 'Application status',
        })

        expect(restoredStatusMenus[0]).toHaveTextContent('Applied')
    })

})