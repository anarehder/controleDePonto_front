import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = 'http://localhost:4000';

function signIn(body) {
    return axios.post(`${BASE_URL}/login`, body);
}

function getTodayHours(token, day) {
    return axios.get(`${BASE_URL}/bank/today/${day}`, { headers: { Authorization: token } });
}

function postHours(body, token) {
    return axios.post(`${BASE_URL}/bank`, body, { headers: { Authorization: token } });
}

function getMonthHours(token, month) {
    return axios.get(`${BASE_URL}/bank/month/${month}`, { headers: { Authorization: token } });
}


const apiService = { signIn, getTodayHours, postHours, getMonthHours };

export default apiService;