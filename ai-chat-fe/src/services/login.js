import axios from "axios";

export const completeLogin = async (login, password) => {
    const response = await axios.post('http://localhost:3001/login', {login: login, password: password});
    document.cookie = `accessToken=${response.data.accessToken}; path=/;`;
    return response.data;
}