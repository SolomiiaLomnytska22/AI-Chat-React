import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InactiveInput from './MessageInput';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <div>Mocked FontAwesomeIcon</div>,
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faArrowUp: 'faArrowUp',
}));

describe('InactiveInput', () => {
  test('renders the text area with correct placeholder and disabled state', () => {
    render(<InactiveInput />);
    const textarea = screen.getByPlaceholderText(
      'This chat is in history mode. Create new chat to get your questions answered.'
    );
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeDisabled();
  });

  test('renders the send button with FontAwesomeIcon', () => {
    render(<InactiveInput />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Mocked FontAwesomeIcon')).toBeInTheDocument();
  });
});
