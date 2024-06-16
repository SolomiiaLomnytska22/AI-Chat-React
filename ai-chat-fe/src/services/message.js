import axios from 'axios';
import { getAccessToken, getUser } from './accessToken';

const API_URL = 'http://localhost:3001/message';

export const getMessagesByChatId = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}/chat-id/${id}`, {headers: {
            Authorization: `Bearer ${token}` 
        }});
        return response.data;
    } catch (error) {
        console.log(`Error fetching chat with id ${id}: `, error);
        return false;
    }
}

export const addMessage = async (data) => {
    try {
        //data: chat, text
        data.role = 'user'
        data.createdAt = new Date().toISOString();
        const token = getAccessToken();

        //add user message to database
        await axios.post(API_URL, data, { headers: {
            Authorization: `Bearer ${token}` 
        }});

        //generate ai response
        const response = {}
        const res = await axios.post('http://localhost:3001/gen/', {query: data.text, chat: data.chat}, { headers: {
            Authorization: `Bearer ${token}` 
        }});
        response.text = res.data
        //add ai messsage to database
        response.createdAt = new Date().toISOString();
        response.role = 'tool'
        response.chat = data.chat

        await axios.post(API_URL, response, { headers: {
            Authorization: `Bearer ${token}` 
        }});
      return true; 
    } catch (error) {
        console.log(error);
        return false;
    }
};