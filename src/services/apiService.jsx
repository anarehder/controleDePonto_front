import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = 'http://localhost:4000';

function signIn(body) {
    return axios.post(`${BASE_URL}/login`, body);
}

function getTodayHours(token) {
    return axios.get(`${BASE_URL}/bank`, { headers: { Authorization: token } });
}

const apiService = { signIn, getTodayHours };

export default apiService;