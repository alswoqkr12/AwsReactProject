import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Spring Boot 서버 URL

// 로그인 API 호출
export const login = async (username, password) => {
    return axios.post(`${API_URL}/auth/login`, { username, password });
};
