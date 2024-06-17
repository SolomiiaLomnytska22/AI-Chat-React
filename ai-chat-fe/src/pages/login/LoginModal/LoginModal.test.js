import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginModal from './LoginModal';
import { completeLogin } from '../../../services/login';
import { getUser } from '../../../services/accessToken';
import { ChatContext } from '../../../context/ContextProvider';
import { toast } from 'react-toastify';

// Mock the completeLogin function
jest.mock('../../../services/login', () => ({
  completeLogin: jest.fn(),
}));
jest.mock('../../../services/accessToken', () => ({
  getUser: jest.fn(),
}));

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('LoginModal', () => {
  const mockNavigate = jest.fn();
  const mockSetUserData = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <ChatContext.Provider {...providerProps}>{ui}</ChatContext.Provider>,
      renderOptions
    );
  };

  test('renders the login modal with correct content', () => {
    const providerProps = {
      value: { setUserData: mockSetUserData },
    };

    renderWithProviders(
      <MemoryRouter>
        <LoginModal />
      </MemoryRouter>,
      { providerProps }
    );

    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('calls completeLogin and navigates to /chat on successful login', async () => {
    const providerProps = {
      value: { setUserData: mockSetUserData },
    };

    completeLogin.mockResolvedValueOnce();
    getUser.mockReturnValueOnce({ username: 'testuser' });

    renderWithProviders(
      <MemoryRouter>
        <LoginModal />
      </MemoryRouter>,
      { providerProps }
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(completeLogin).toHaveBeenCalledWith('testuser', 'password');
      expect(mockSetUserData).toHaveBeenCalledWith({ username: 'testuser' });
      expect(mockNavigate).toHaveBeenCalledWith('/chat');
    });
  });

  test('displays error toast and does not navigate on failed login', async () => {
    const providerProps = {
      value: { setUserData: mockSetUserData },
    };

    completeLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    getUser.mockReturnValueOnce(null);

    renderWithProviders(
      <MemoryRouter>
        <LoginModal />
      </MemoryRouter>,
      { providerProps }
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(completeLogin).toHaveBeenCalledWith('testuser', 'password');
      expect(mockSetUserData).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('❌Invalid credentials', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
      });
    });
  });

  test('navigates to /register when register button is clicked', () => {
    const providerProps = {
      value: { setUserData: mockSetUserData },
    };

    renderWithProviders(
      <MemoryRouter>
        <LoginModal />
      </MemoryRouter>,
      { providerProps }
    );

    fireEvent.click(screen.getByText(/Don't have account\? Register/i));
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
