import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessageArea from './MessageArea';
import { ChatContext } from '../../../../context/ContextProvider';
import { getUser } from '../../../../services/accessToken';

jest.mock('../../../../services/accessToken', () => ({
  getUser: jest.fn(),
}));

jest.mock('react-markdown', () => (props) => <div>{props.children}</div>);

describe('MessageArea', () => {
  const mockChatData = { currentChat: null };
  const mockMessages = [
    { _id: '1', role: 'user', text: 'Hello', createdAt: '2024-06-17T12:00:00Z' },
    { _id: '2', role: 'bot', text: 'Hi there!', createdAt: '2024-06-17T12:01:00Z' },
  ];

  const mockAddChat = jest.fn();
  const mockSendMessage = jest.fn();
  const mockUser = { name: 'Test User' };

  beforeEach(() => {
    jest.clearAllMocks();
    getUser.mockReturnValue(mockUser);
  });

  test('renders initial state correctly', () => {
    render(
      <ChatContext.Provider value={{ chatData: mockChatData }}>
        <MessageArea messages={[]} isLoading={false} onAddChat={mockAddChat} onSendMessage={mockSendMessage} />
      </ChatContext.Provider>
    );

    expect(screen.getByText(`Hey, ${mockUser.name}!`)).toBeInTheDocument();
    expect(screen.getByText('How can I help you today?')).toBeInTheDocument();
    expect(screen.getByText('Content calendar for tiktok')).toBeInTheDocument();
    expect(screen.getByText('Explain superconstructors')).toBeInTheDocument();
    expect(screen.getByText('Text inviting friend to wedding')).toBeInTheDocument();
  });

  test('handles clicking on initial chat blocks', async () => {
    render(
      <ChatContext.Provider value={{ chatData: mockChatData }}>
        <MessageArea messages={[]} isLoading={false} onAddChat={mockAddChat} onSendMessage={mockSendMessage} />
      </ChatContext.Provider>
    );

    const initialBlock = screen.getByText('Content calendar for tiktok');
    fireEvent.click(initialBlock);

    expect(mockAddChat).toHaveBeenCalledWith('Content calendar for tiktok');
  });

  test('renders messages correctly', () => {
    render(
      <ChatContext.Provider value={{ chatData: { currentChat: true } }}>
        <MessageArea messages={mockMessages} isLoading={false} onAddChat={mockAddChat} onSendMessage={mockSendMessage} />
      </ChatContext.Provider>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
    expect(screen.getByText('June 17, 2024 at 03:00 PM')).toBeInTheDocument();
    expect(screen.getByText('June 17, 2024 at 03:01 PM')).toBeInTheDocument();
  });

  test('renders loader when isLoading is true', () => {
    render(
      <ChatContext.Provider value={{ chatData: { currentChat: true } }}>
        <MessageArea messages={[]} isLoading={true} onAddChat={mockAddChat} onSendMessage={mockSendMessage} />
      </ChatContext.Provider>
    );

    const loader = document.getElementsByClassName('loader')[0];
    expect(loader).toBeInTheDocument();
  });
});
