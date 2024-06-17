import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import { getAccessToken } from '../../services/accessToken';


jest.mock('../../services/accessToken');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LandingPage', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the landing page with correct content', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Welcome to ALPHA AI/i })).toBeInTheDocument();
    expect(screen.getByText(/This AI chat is a cutting-edge platform/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Started ✨/i })).toBeInTheDocument();
  });

  test('navigates to /chat if user has access token', () => {
    getAccessToken.mockReturnValue(true);

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Get Started ✨/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/chat');
  });

  test('navigates to /login if user does not have access token', () => {
    getAccessToken.mockReturnValue(false);

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Get Started ✨/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
