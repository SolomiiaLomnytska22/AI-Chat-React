import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MessageInput from './MessageInput';

test('should update input value when user types', () => {
  const { getByPlaceholderText } = render(<MessageInput />);

  const input = getByPlaceholderText('Write you prompt...');
  fireEvent.change(input, { target: { value: 'Hello World!' } });

  expect(input.value).toBe('Hello World!');
});

jest.spyOn(console, 'log'); 

test('should call handleSendMessage on Enter key press', () => {
  const { getByPlaceholderText } = render(<MessageInput />);

  const input = getByPlaceholderText('Write you prompt...');
  fireEvent.change(input, { target: { value: 'Some message' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 13 });

  expect(console.log).toHaveBeenCalledWith('Message sent:', 'Some message');
});

test('should send message with trimmed input', () => {
    const { getByPlaceholderText } = render(<MessageInput />);
  
    const input = getByPlaceholderText('Write you prompt...');
    fireEvent.change(input, { target: { value: '  Some message  ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
  
    expect(console.log).toHaveBeenCalledWith('Message sent:', 'Some message');
  });

  test('should not send message with empty input', () => {
    const { getByPlaceholderText } = render(<MessageInput />);
  
    const input = getByPlaceholderText('Write you prompt...');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
  
    expect(console.log).not.toHaveBeenCalled();
  });

