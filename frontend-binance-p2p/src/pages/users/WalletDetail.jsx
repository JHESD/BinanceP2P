import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWalletHistory } from "../../services/walletService";
import './WalletDetail.css';

export default function WalletDetail() {

  const { walletId } = useParams();
  console.log("Wallet ID desde params:", walletId);
  const [history, setHistory] = useState({ sent: [], received: [] });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getWalletHistory(walletId);
        console.log("Historial recibido:", data); // <--- AÑADE ESTO
        setHistory(data);
      } catch (error) {
        console.error("Error cargando historial:", error);
      }
    };

    fetchHistory();
  }, [walletId]);

console.log("Wallet ID desde params:", walletId);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, { 
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="wallet-detail-container">
      <h2 className="wallet-title">
        Historial de la Wallet <span className="wallet-id-highlight"></span>
      </h2>

      <div className="transaction-section">
        <h3 className="section-title">Recibidos</h3>
        {history.received && history.received.length > 0 ? (
          <ul className="transaction-list">
            {history.received.map((tx) => (
              <li key={tx.id} className="transaction-item received">
                <div className="tx-type">
                  <p><strong>Tipo:</strong> {tx.type}</p>
                </div>
                <div className="tx-amount">
                  <p><strong>Monto:</strong> {tx.amount}</p>
                </div>
                <div className="tx-peer">
                  <p><strong>De:</strong> Wallet #{tx.walletFromId}</p>
                </div>
                <div className="tx-date">
                  <p><strong>Fecha:</strong> {formatDate(tx.createdAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-transactions-message">No hay transacciones recibidas.</p>
        )}
      </div>

      <div className="transaction-section">
        <h3 className="section-title">Enviados</h3>
        {history.sent && history.sent.length > 0 ? (
          <ul className="transaction-list">
            {history.sent.map((tx) => (
              <li key={tx.id} className="transaction-item sent">
                <div className="tx-type">
                  <p><strong>Tipo:</strong> {tx.type}</p>
                </div>
                <div className="tx-amount">
                  <p><strong>Monto:</strong> {tx.amount}</p>
                </div>
                <div className="tx-peer">
                  <p><strong>Para:</strong> Wallet #{tx.walletToId}</p>
                </div>
                <div className="tx-date">
                  <p><strong>Fecha:</strong> {formatDate(tx.createdAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-transactions-message">No hay transacciones enviadas.</p>
        )}
      </div>
    </div>
  );
}