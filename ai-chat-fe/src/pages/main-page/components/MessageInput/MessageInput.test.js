import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessageInput from './MessageInput';

test('renders message input with placeholder', () => {
  const { getByPlaceholderText } = render(<MessageInput />);
  const inputElement = getByPlaceholderText('Write you prompt...');
  expect(inputElement).toBeInTheDocument();
});

test('updates input value on change', () => {
  const { getByPlaceholderText } = render(<MessageInput />);
  const inputElement = getByPlaceholderText('Write you prompt...');
  fireEvent.change(inputElement, { target: { value: 'Test message' } });
  expect(inputElement.value).toBe('Test message');
});

test('calls onSendMessage with input value on send button click', () => {
  const mockOnSendMessage = jest.fn();
  const { getByRole, getByPlaceholderText } = render(<MessageInput onSendMessage={mockOnSendMessage} />);
  const inputElement = getByPlaceholderText('Write you prompt...');
  const sendButton = document.getElementsByClassName('send-button')[0];
 

  fireEvent.change(inputElement, { target: { value: 'Test message' } });
  fireEvent.click(sendButton);

  expect(mockOnSendMessage).toHaveBeenCalledWith('Test message');
});

test('calls onSendMessage with input value on Enter key press', () => {
  const mockOnSendMessage = jest.fn();
  const { getByPlaceholderText } = render(<MessageInput onSendMessage={mockOnSendMessage} />);
  const inputElement = getByPlaceholderText('Write you prompt...');

  fireEvent.change(inputElement, { target: { value: 'Test message' } });
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

  expect(mockOnSendMessage).toHaveBeenCalledWith('Test message');
});
