import axios from 'axios';
import { getAccessToken, getUser } from './accessToken';

const API_URL = 'http://localhost:3001/chat';

export const isActive = async (chat_id) => {
    try {
        const token = getAccessToken();
        const response = await axios.post(`http://localhost:3001/gen/is-active`, {chat: chat_id}, {headers: {
            Authorization: `Bearer ${token}` 
        }});
        return response.data;
    } catch (error) {
        console.log(`Error fetching chat with id ${chat_id}: `, error);
        return false;
    }
}

export const getChatById = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}/${id}`, {headers: {
            Authorization: `Bearer ${token}` 
        }});
        return response.data;
    } catch (error) {
        console.log(`Error fetching chat with id ${id}: `, error);
        return false;
    }
}

export const getAllChats = async () => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}`, {headers: {
            Authorization: `Bearer ${token}` 
        }});
        return response.data;
    } catch (error) {
        console.log(`Error fetching chats: `, error);
        return false;
    }
}

export const addChat = async (name) => {
    try {
        const user_id = getUser().id
        const startedAt = new Date().toISOString();
        const data = {user: user_id, name, startedAt}
        const token = getAccessToken();
        const chat = await axios.post(API_URL, data, { headers: {
            Authorization: `Bearer ${token}` 
        }});
        await axios.post('http://localhost:3001/gen/new-chat', {id: chat.data._id}, { headers: {
            Authorization: `Bearer ${token}` 
        }});
      return chat; 
    } catch (error) {
        console.log(error);
        return false;
    }
};