import React, { useState, useEffect } from 'react';
import { transferBetweenWallets } from '../../services/transactionService';
import { getUserWallets } from '../../services/walletService';
import './TransferForm.css';

const TransferForm = () => {
    const [wallets, setWallets] = useState([]);
    const [form, setForm] = useState({
        walletFromId: '',
        walletToId: '',
        amount: '',
        description: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadWallets = async () => {
            try {
                const data = await getUserWallets();
                setWallets(data);
            } catch (err) {
                console.error("Error cargando wallets:", err);
                setError("No se pudieron cargar las billeteras.");
            }
        };
        loadWallets();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (form.walletFromId === form.walletToId) {
        setError("Las billeteras deben ser diferentes.");
        return;
    }

    const parsedAmount = parseFloat(form.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError("El monto debe ser un número positivo.");
        return;
    }

    try {
        const response = await transferBetweenWallets({
            ...form,
            amount: parsedAmount.toFixed(8)
        });
        setMessage(response.message);
    } catch (err) {
        console.error("Error en la transferencia:", err);
        setError(err.response?.data?.message || "Error al procesar la transferencia.");
    }
};

    return (
        <div className="transfer-form-container">
            <h2 className="form-title">Transferencia entre tus billeteras</h2>

            <form onSubmit={handleSubmit} className="transfer-form">
                <div className="form-group">
                    <label htmlFor="walletFromId">Desde</label>
                    <select
                        name="walletFromId"
                        value={form.walletFromId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una billetera</option>
                        {wallets.map(wallet => (
                            <option key={wallet.id} value={wallet.id}>
                                {wallet.Currency.name} ({wallet.Currency.ticker}) - Saldo: {wallet.balance}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="walletToId">Hacia</label>
                    <select
                        name="walletToId"
                        value={form.walletToId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una billetera</option>
                        {wallets.map(wallet => (
                            <option key={wallet.id} value={wallet.id}>
                                {wallet.Currency.name} ({wallet.Currency.ticker}) - Saldo: {wallet.balance}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Monto</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        min="0.00000001"
                        step="any"
                        placeholder="0.00"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="(Opcional)"
                    />
                </div>

                <button type="submit" className="submit-button">Transferir</button>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default TransferForm;
