import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import '@testing-library/jest-dom';

// Mocka Sanity-klienten
vi.mock('./sanity/client', () => ({
  client: {
    fetch: () => Promise.resolve([
      {
        _id: '1',
        name: 'Misse',
        species: 'Katt',
        imageUrl: '',
        description: 'En söt katt',
        livesWith: 'Emma',
        personality: ['Lekfull'],
        hobbies: ['Jaga möss'],
        talent: 'Kurrar högt',
      }
    ])
  }
}));

beforeEach(() => {
  // Sätt rätt path så <BrowserRouter basename="/sanity-react-cms-app"> funkar
  window.history.pushState({}, '', '/sanity-react-cms-app/');
});

describe('App', () => {
  it('visar rubriken "Alla husdjur"', async () => {
    render(<App />);
    const heading = await screen.findByText(/Alla husdjur/i);
    expect(heading).toBeInTheDocument();
  });
});
