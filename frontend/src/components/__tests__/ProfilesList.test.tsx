import { render, screen, waitFor } from '@testing-library/react';
import ProfilesList from '../ProfilesList';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProfilesList', () => {
    it('renders profiles from API', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    handle: 'elonmusk',
                    activityCount: 5,
                    lastActivity: '2025-06-27T12:00:00Z',
                },
            ],
        });

        render(<ProfilesList />);

        await waitFor(() => {
            expect(screen.getByText(/elonmusk/i)).toBeInTheDocument();
            expect(screen.getAllByText('5')[0]).toBeInTheDocument();
            expect(screen.getByText(/2025/)).toBeInTheDocument();
        });
    });

    it('renders empty table if no profiles', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        render(<ProfilesList />);

        await waitFor(() => {
            expect(screen.queryByRole('row')).not.toBeNull(); // only header row remains
        });
    });
});
