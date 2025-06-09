import axios from 'axios';

const API = 'http://localhost:3000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token no disponible");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const createPurchaseTransaction = async ({ adId, buyerWalletId }) => {
    const res = await axios.post(`${API}/transactions/comprar`, {
        adId,
        buyerWalletId,
    }, getAuthHeader());
    return res.data;
};

export const createSellTransaction = async ({ adId, sellerWalletId }) => {
    const res = await axios.post(`${API}/transactions/vender`, {
        adId,
        sellerWalletId,
    }, getAuthHeader());
    return res.data;
};

export const uploadReceipt = async (transactionId, receiptFile) => {
    const formData = new FormData();
    formData.append('receiptImage', receiptFile);

    const res = await axios.post(`${API}/transactions/comprobante/${transactionId}`, formData, {
        ...getAuthHeader(),
        headers: {
            ...getAuthHeader().headers,
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const finalizeTransaction = async (transactionId) => {
    const res = await axios.put(`${API}/transactions/finalizar/${transactionId}`, {}, getAuthHeader());
    return res.data;
};

export const cancelTransaction = async (transactionId) => {
    const res = await axios.put(`${API}/transactions/cancelar/${transactionId}`, {}, getAuthHeader());
    return res.data;
};

export const transferBetweenWallets = async ({ walletFromId, walletToId, amount, description }) => {
    
    const res = await axios.post(`${API}/transactions/transferir`, {
        walletFromId,
        walletToId,
        amount,
        description,
    }, getAuthHeader());
    return res.data;
};
