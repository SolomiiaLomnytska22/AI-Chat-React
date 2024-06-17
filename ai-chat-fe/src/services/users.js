import axios from 'axios';
import { getAccessToken } from './accessToken';

const API_URL = 'http://localhost:3001/user';

export const getUserById = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}/${id}`, {headers: {
            Authorization: `Bearer ${token}` 
        }});
        return response.data;
    } catch (error) {
        console.log(`Error fetching user with id ${id}:`, error);
        return false;
    }
}

export const addUser = async (data) => {
    try {
        await axios.post(API_URL, data);
      return true; 
    } catch (error) {
        console.log(error);
        return false;
    }
};