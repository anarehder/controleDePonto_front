import axios from "axios";

const BASE_URL = "http://localhost:4000";

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

function signOut(token) {
    return axios.delete(`${BASE_URL}/login/logout`, { headers: { Authorization: token } });
}

function getUsers(token) {
    return axios.get(`${BASE_URL}/users`, { headers: { Authorization: token } });
}

function getUserReport(token, body) {
    return axios.post(`${BASE_URL}/bank/userReport`, body, { headers: { Authorization: token } });
}

function createUser(token, body) {
    return axios.post(`${BASE_URL}/users`, body, { headers: { Authorization: token } });
}

function checkSession(body) {
    return axios.post(`${BASE_URL}/session`, body);
}

function changePassword(token, body) {
    return axios.post(`${BASE_URL}/users/changepassword`, body, { headers: { Authorization: token } });
}

const apiService = { signIn, getTodayHours, postHours, getMonthHours, signOut, getUsers, getUserReport, createUser, checkSession, changePassword };

export default apiService;