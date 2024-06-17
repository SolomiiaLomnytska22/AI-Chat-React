import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SideMenu from './SideMenu';
import { ChatContext } from '../../../../context/ContextProvider';

jest.mock('../../../../services/login', () => ({
    completeLogout: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn()
}));

describe('SideMenu', () => {
    const mockSetChatData = jest.fn();
    const mockChatData = { currentChat: '' };
    const mockChats = [
        { _id: '1', name: 'Chat 1' },
        { _id: '2', name: 'Chat 2' }
    ];
    const mockHandleClick = jest.fn();
    const mockOnSelectChat = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <ChatContext.Provider value={{ setChatData: mockSetChatData, chatData: mockChatData }}>
                <SideMenu chats={mockChats} handleClick={mockHandleClick} onSelectChat={mockOnSelectChat} />
            </ChatContext.Provider>
        );
    });

    it('calls handleClick with new chat name when Add New Chat button is clicked', () => {
        const { getByText, getByPlaceholderText } = render(
            <ChatContext.Provider value={{ setChatData: mockSetChatData, chatData: mockChatData }}>
                <SideMenu chats={mockChats} handleClick={mockHandleClick} onSelectChat={mockOnSelectChat} />
            </ChatContext.Provider>
        );

        const input = getByPlaceholderText('New chat name');
        const button = getByText('Add New Chat');

        fireEvent.change(input, { target: { value: 'New Chat' } });
        fireEvent.click(button);

        expect(mockHandleClick).toHaveBeenCalledWith('New Chat');
    });

    it('calls setChatData and onSelectChat when a chat item is clicked', () => {
        const { getByText } = render(
            <ChatContext.Provider value={{ setChatData: mockSetChatData, chatData: mockChatData }}>
                <SideMenu chats={mockChats} handleClick={mockHandleClick} onSelectChat={mockOnSelectChat} />
            </ChatContext.Provider>
        );

        const chatItem = getByText('Chat 1');
        fireEvent.click(chatItem);

        expect(mockSetChatData).toHaveBeenCalledWith({ currentChat: '1' });
        expect(mockOnSelectChat).toHaveBeenCalledWith({ _id: '1', name: 'Chat 1' });
    });

    
});
