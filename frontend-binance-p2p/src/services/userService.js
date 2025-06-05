import axios from 'axios';

const API = 'http://localhost:3000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const listUsers = async () => {
    const res = await axios.get(`${API}/users`, getAuthHeader());
    return res.data;
};

export const grantAdmin = async (userId) => {
    const res = await axios.put(`${API}/users/${userId}/grant-admin`, {}, getAuthHeader());
    return res.data;
};