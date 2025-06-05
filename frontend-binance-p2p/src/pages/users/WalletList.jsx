import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserWallets, createWallet, getCurrencies } from "../../services/walletService";
import './WalletList.css';

export default function WalletList() {
    const [wallets, setWallets] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadWallets();
        loadCurrencies();
    }, []);

    const loadWallets = async () => {
        try {
            const data = await getUserWallets();
            setWallets(data);
        } catch (err) {
            console.error("Error cargando billeteras:", err);
        }
    };

    const loadCurrencies = async () => {
        try {
            const data = await getCurrencies();
            setCurrencies(data);
        } catch (err) {
            console.error("Error cargando monedas:", err);
        }
    };

    const openCreateModal = () => {
        setError("");
        setSelectedCurrency("");
        setAmount("");
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleCreateWallet = async () => {
        setError("");
        if (!selectedCurrency) {
            setError("Por favor, selecciona una moneda.");
            return;
        }
        const initialAmount = parseFloat(amount) || 0;
        if (initialAmount < 0) {
            setError("El saldo inicial no puede ser negativo.");
            return;
        }

        try {
            await createWallet(selectedCurrency, initialAmount.toString());
            closeCreateModal();
            loadWallets();
        } catch (err) {
            console.error("Error creando billetera:", err);
            setError(err.response?.data?.message || "Error al crear la billetera.");
        }
    };
    
    const formatBalance = (balance, currencyTicker) => {
        const number = parseFloat(balance);
        return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: (currencyTicker === 'BTC' || currencyTicker === 'ETH') ? 8 : 2 });
    };


    return (
        <div className="wallets-page-container">
            <div className="page-header">
                <h1 className="page-main-title">Mis Billeteras</h1>
            </div>

            <div className="wallets-grid">
                {wallets.map((wallet) => (
                    <div
                        key={wallet.id}
                        className="wallet-card"
                        onClick={() => navigate(`/wallets/${wallet.id}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/wallets/${wallet.id}`); }}
                    >
                        <div className="wallet-card-header">
                            <div className="wallet-currency-icon">
                                {wallet.Currency.ticker || wallet.Currency.name.charAt(0)}
                            </div>
                            <h3 className="wallet-currency-name">{wallet.Currency.name}</h3>
                        </div>
                        <div className="wallet-card-body">
                            <p className="wallet-balance-label">Saldo Disponible</p>
                            <p className="wallet-balance-amount">
                                {formatBalance(wallet.balance, wallet.Currency.ticker)}
                                <span className="wallet-currency-ticker">{wallet.Currency.ticker}</span>
                            </p>
                        </div>
                        <div className="wallet-card-footer">
                            <span className="wallet-view-details">Ver Detalles &rarr;</span>
                        </div>
                    </div>
                ))}

                <div
                    onClick={openCreateModal}
                    className="add-wallet-card"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openCreateModal(); }}
                >
                    <div className="add-wallet-icon">＋</div>
                    <p className="add-wallet-text">Agregar Nueva Billetera</p>
                </div>
            </div>

            {showCreateModal && (
                <div className="modal-overlay" onClick={closeCreateModal} role="dialog" aria-modal="true">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Crear Nueva Billetera</h2>
                            <button onClick={closeCreateModal} className="modal-close-button" aria-label="Cerrar modal">
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            {error && <div className="error-banner-modal"><p>{error}</p></div>}
                            <div className="input-group">
                                <label htmlFor="currency-select" className="input-label">Moneda</label>
                                <select
                                    id="currency-select"
                                    value={selectedCurrency}
                                    onChange={(e) => setSelectedCurrency(e.target.value)}
                                    className="form-input"
                                >
                                    <option value="" disabled>Selecciona una moneda</option>
                                    {currencies.map((currency) => (
                                        <option key={currency.id} value={currency.id}>
                                            {currency.name} ({currency.ticker})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="initial-amount" className="input-label">Saldo Inicial (Opcional)</label>
                                <input
                                    id="initial-amount"
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="form-input"
                                    min="0"
                                    step="any"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeCreateModal} className="button-secondary modal-button">
                                Cancelar
                            </button>
                            <button 
                                onClick={handleCreateWallet} 
                                className="submit-button modal-button"
                                disabled={!selectedCurrency || parseFloat(amount) < 0}
                            >
                                Crear Billetera
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}