import axios from 'axios';

const API = 'http://localhost:3000/api';

export const loginUser = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    return res.data;
};

export const loginAdmin = async (email, password) => {
    const res = await axios.post(`${API}/auth/admin-login`, { email, password });
    return res.data;
};
