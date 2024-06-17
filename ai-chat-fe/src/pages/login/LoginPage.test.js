import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

jest.mock('./LoginModal/LoginModal', () => () => <div>Mocked LoginModal</div>);

describe('LoginPage', () => {
  test('renders the header with correct content', () => {
    render(<LoginPage />);
    
    expect(screen.getByRole('heading', { name: /ALPHA AI/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Begin your jorney with our AI chat!/i })).toBeInTheDocument(); 
  });

  test('renders the LoginModal component', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Mocked LoginModal')).toBeInTheDocument();
  });

  test('renders the warning message', () => {
    render(<LoginPage />);
    
    expect(screen.getByText(/Alpha AI may display inaccurate info, including about people, so double-check its responses./i)).toBeInTheDocument();
  });
});

