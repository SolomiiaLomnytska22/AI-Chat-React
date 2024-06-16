import axios from "axios";
import { addUser } from "./users";

export const completeLogin = async (login, password) => {
    const response = await axios.post('http://localhost:3001/login', {login: login, password: password});
    document.cookie = `accessToken=${response.data.accessToken}; path=/;`;
    return response.data;
}

export const completeRegistarion = async (data) => {
    const res = await addUser(data);
    const response = await axios.post('http://localhost:3001/login', {login: data.login, password: data.password});
    document.cookie = `accessToken=${response.data.accessToken}; path=/;`;
    return response.data;
}

export const completeLogout = async () => {
    const response = await axios.get('http://localhost:3001/logout', {
        withCredentials: true  
     });
    return response.data;
}