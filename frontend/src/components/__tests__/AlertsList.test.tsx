import { render, screen, waitFor } from '@testing-library/react';
import AlertsList from '../AlertsList';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AlertsList', () => {
    it('shows message when no alerts', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        render(<AlertsList />);

        await waitFor(() => {
            expect(screen.getByText(/No inactive profiles/i)).toBeInTheDocument();
        });
    });

    it('renders alerts from API', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    handle: 'inactiveUser',
                    lastActivity: '2025-06-27T12:00:00Z',
                },
            ],
        });

        render(<AlertsList />);

        await waitFor(() => {
            expect(screen.getByText(/inactiveUser/)).toBeInTheDocument();
            expect(screen.getByText(/last activity/i)).toBeInTheDocument();
        });
    });
});

