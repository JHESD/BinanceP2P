import axios from 'axios';

const API = 'http://localhost:3000/api';
// Auth header helper, gets token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Usuario no autenticado.");
        throw new Error("Usuario no autenticado.");
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const createAd = async (adData) => {
    const formData = new FormData();
    // Append all required fields
    formData.append('type', adData.type);
    formData.append('pricePerUnit', adData.pricePerUnit);
    formData.append('quantity', adData.quantity);
    formData.append('description', adData.description);
    formData.append('currencyId', adData.currencyId);
    if (adData.paymentImage) {
        formData.append('paymentImage', adData.paymentImage);
    }
    const res = await axios.post(`${API}/advertisement`, formData, {
        ...getAuthHeader(),
        headers: {
            ...getAuthHeader().headers,
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

// Get advertisements by currencyId and type (and optionally status)
export const getAdsByCurrencyAndType = async (params) => {
    // params: { currencyId, type, status }
    const res = await axios.get(`${API}/advertisement`, {
        ...getAuthHeader(),
        params,
    });
    return res.data;
};

// Get advertisement by ID
export const getAdById = async (id) => {
    const res = await axios.get(`${API}/advertisement/${id}`, getAuthHeader());
    return res.data;
};
