// src/components/admin/AdminDashboard.jsx
import { Link } from "react-router-dom";
import "./AdminDashboard.css"; // Importamos el nuevo CSS

const AdminDashboard = () => {
    // Datos estáticos de ejemplo
    const stats = [
        { icon: "👥", value: "1,450", label: "Usuarios Totales" },
        { icon: "💹", value: "$250,680", label: "Volumen 24h (USD)" },
        { icon: "🔄", value: "789", label: "Transacciones Hoy" },
        { icon: "⏳", value: "12", label: "Verificaciones Pendientes" },
    ];

    const recentTransactions = [
        { id: "TXN740", user: "j.doe", amount: "500.00 USDT", status: "Completado" },
        { id: "TXN739", user: "a.smith", amount: "1,200.00 BTC", status: "Pendiente" },
        { id: "TXN738", user: "c.jones", amount: "250.50 ETH", status: "Completado" },
        { id: "TXN737", user: "m.williams", amount: "80.00 USDT", status: "Cancelado" },
        { id: "TXN736", user: "b.brown", amount: "3,500.00 USDT", status: "Completado" },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case "Completado": return "status-completed";
            case "Pendiente": return "status-pending";
            case "Cancelado": return "status-cancelled";
            default: return "";
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Panel de Control</h1>
                <p>Resumen general del sistema y actividad reciente.</p>
            </header>

            {/* --- Tarjetas de Estadísticas --- */}
            <div className="dashboard-stats">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* --- Contenido Principal (Grid) --- */}
            <div className="dashboard-main-content">
                {/* Columna Izquierda: Transacciones Recientes */}
                <div className="dashboard-card">
                    <h3>Transacciones Recientes</h3>
                    <ul className="recent-transactions-list">
                        {recentTransactions.map(tx => (
                            <li key={tx.id}>
                                <div className="tx-info">
                                    <span className="tx-id">{tx.id}</span>
                                    <span className="tx-user">{tx.user}</span>
                                </div>
                                <div className="tx-details">
                                    <span className="tx-amount">{tx.amount}</span>
                                    <span className={`status-badge ${getStatusClass(tx.status)}`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Columna Derecha: Acciones y Estado */}
                <div className="dashboard-side-panel">
                    <div className="dashboard-card">
                        <h3>Estado del Sistema</h3>
                        <ul className="system-status-list">
                            <li><span>🟢 Mercado P2P</span> <span>Operativo</span></li>
                            <li><span>🟢 Verificaciones KYC</span> <span>Activo</span></li>
                            <li><span>🟢 Pasarelas de Pago</span> <span>Online</span></li>
                            <li><span>🟠 Nivel de Soporte</span> <span>Ocupado</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;