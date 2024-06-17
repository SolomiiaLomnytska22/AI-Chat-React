import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import { completeRegistarion } from '../../../services/login';
import { getUser } from '../../../services/accessToken';
import { ChatContext } from '../../../context/ContextProvider';
import { toast } from 'react-toastify';

jest.mock('../../../services/login', () => ({
    completeRegistarion: jest.fn(),
}));

jest.mock('../../../services/accessToken', () => ({
    getUser: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
      error: jest.fn(),
    },
  }));


describe('RegisterModal', () => {
    const mockSetUserData = jest.fn();

    const userData = { id: '1', profilePictureUrl: 'https://example.com/image.png' };

    beforeEach(() => {
        jest.clearAllMocks();
        getUser.mockReturnValue(userData);
    });

    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <ChatContext.Provider value={{ setUserData: mockSetUserData }}>
                    <RegisterModal />
                </ChatContext.Provider>
            </MemoryRouter>
        );
    });

    it('handles registration', async () => {
        const login = 'testuser';
        const name = 'Test User';
        const password = 'password';
        const profilePictureUrl = 'https://example.com/profile.png';
    
        completeRegistarion.mockResolvedValue(true)
        
        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <ChatContext.Provider value={{ setUserData: mockSetUserData }}>
                    <RegisterModal />
                </ChatContext.Provider>
            </MemoryRouter>
        );
    
        fireEvent.change(getByLabelText('Your Display Name:'), { target: { value: name } });
        fireEvent.change(getByLabelText('Username:'), { target: { value: login } });
        fireEvent.change(getByLabelText('Password:'), { target: { value: password } });
        fireEvent.change(getByLabelText('Type your password again:'), { target: { value: password } });
        fireEvent.change(getByLabelText('Upload your profile picture:'), { target: { value: profilePictureUrl } });
        
        fireEvent.submit(getByText('Create Account'));
        
        await waitFor(() => {
            expect(completeRegistarion).toHaveBeenCalledWith({ login, password, name, profilePictureUrl });
            expect(getUser).toHaveBeenCalled();
            expect(mockSetUserData).toHaveBeenCalledWith(userData);
        });
    });

    it('displays error message on registration failure', async () => {
        completeRegistarion.mockRejectedValue(new Error('Registration failed'));

        const { getByText } = render(
            <MemoryRouter>
                <ChatContext.Provider value={{ setUserData: mockSetUserData }}>
                    <RegisterModal />
                </ChatContext.Provider>
            </MemoryRouter>
        );

        fireEvent.submit(getByText('Create Account'));

        await waitFor(() => {
            expect(completeRegistarion).toHaveBeenCalledWith({ login: '', password: '', name: '', profilePictureUrl: '' });
            expect(mockSetUserData).not.toHaveBeenCalled();
            expect(toast.error).toHaveBeenCalledWith('❌Registration failed', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: 'light',
            });
          });
    });
});
