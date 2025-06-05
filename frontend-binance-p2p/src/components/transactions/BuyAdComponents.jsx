import React, { useEffect, useState } from 'react';
import { createPurchaseTransaction, uploadReceipt } from '../services/transactionServices';
import { getUserWallets } from '../../services/walletService';

export default function BuyAdComponent({ ad }) {
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [receiptFile, setReceiptFile] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWallets = async () => {
        try {
            const res = await getUserWallets();
            setWallets(res);
        } catch {
            console.error("Error al obtener billeteras");
        }
        };
        fetchWallets();
    }, []);

    const handleBuy = async () => {
        if (!selectedWallet) {
        alert("Selecciona una billetera para comprar.");
        return;
        }

        setLoading(true);
        try {
        const tx = await createPurchaseTransaction({
            adId: ad.id,
            buyerWalletId: selectedWallet.id,
        });
        setTransaction(tx);
        alert("Compra iniciada. Ahora sube el comprobante si es necesario.");
        } catch (err) {
        alert("Error al iniciar la compra: " + err?.response?.data?.message || err.message);
        } finally {
        setLoading(false);
        }
    };

    const handleUploadReceipt = async () => {
        if (!receiptFile || !transaction) {
        alert("Falta seleccionar el archivo o no hay transacción activa.");
        return;
        }

        setLoading(true);
        try {
        await uploadReceipt(transaction.id, receiptFile);
        alert("Comprobante subido exitosamente.");
        } catch {
        alert("Error al subir comprobante.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 border rounded-lg shadow bg-white space-y-4">
        <h2 className="text-xl font-bold">Comprar a través del anuncio</h2>
        <p><strong>Criptomoneda:</strong> {ad.currency.name}</p>
        <p><strong>Precio:</strong> {ad.price} Bs</p>
        <p><strong>Cantidad disponible:</strong> {ad.amount}</p>

        <label className="block mt-4">
            <span className="text-sm font-medium">Selecciona tu billetera:</span>
            <select
            className="mt-1 w-full p-2 border rounded"
            value={selectedWallet?.id || ""}
            onChange={(e) => {
                const walletId = e.target.value;
                const wallet = wallets.find(w => w.id === walletId);
                setSelectedWallet(wallet);
            }}
            >
            <option value="">-- Seleccionar --</option>
            {wallets.map(wallet => (
                <option key={wallet.id} value={wallet.id}>
                {wallet.currency.name} - Saldo: {wallet.balance}
                </option>
            ))}
            </select>
        </label>

        <button
            onClick={handleBuy}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
            {loading ? "Procesando..." : "Confirmar Compra"}
        </button>

        {transaction && (
            <div className="mt-4 space-y-2">
            <h3 className="font-medium">Subir comprobante</h3>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setReceiptFile(e.target.files[0])}
                className="block"
            />
            <button
                onClick={handleUploadReceipt}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
            >
                Subir comprobante
            </button>
            </div>
        )}
        </div>
    );
}
