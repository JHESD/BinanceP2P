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

export const getUserWallets = async () => {
    const res = await axios.get(`${API}/wallets`, getAuthHeader());
    return res.data;
};

export const getCurrencies = async () => {
    const res = await axios.get(`${API}/currencies`, getAuthHeader());
    return res.data;
};

export const getWalletHistory = async (walletId) => {
    const response = await fetch(`/api/wallets/${walletId}/history`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) throw new Error("No se pudo cargar el historial");

    return await response.json();
};

export const createWallet = async (currencyId, balance) => {
    const res = await axios.post(`${API}/wallets`, {
        currencyId,
        balance,
    }, getAuthHeader());
    return res.data;
};
