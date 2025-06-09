import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./CurrencyManager.css";

const API = "http://localhost:3000/api";

const CurrencyManager = () => {
    const { user } = useAuth();
    const [currencies, setCurrencies] = useState([]);
    const [form, setForm] = useState({ name: "", valueInSus: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAuthHeader = useCallback(() => ({
        headers: { Authorization: `Bearer ${user.token}` },
    }), [user?.token]);

    const fetchCurrencies = useCallback(async () => {
        if (!user?.token) return;
        try {
            setLoading(true);
            const res = await axios.get(`${API}/currencies`, getAuthHeader());
            setCurrencies(res.data);
            setError(null);
        } catch (err) {
            setError("No se pudieron cargar las monedas.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [user?.token, getAuthHeader]);

    useEffect(() => {
        fetchCurrencies();
    }, [fetchCurrencies]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ name: "", valueInSus: "" });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = editingId ? "actualizar" : "crear";
        if (!window.confirm(`¿Estás seguro de que deseas ${action} esta moneda?`)) return;
        
        try {
            const currencyData = { ...form, valueInSus: parseFloat(form.valueInSus) };
            if (editingId) {
                await axios.put(`${API}/currencies/${editingId}`, currencyData, getAuthHeader());
            } else {
                await axios.post(`${API}/currencies`, currencyData, getAuthHeader());
            }
            resetForm();
            fetchCurrencies();
        } catch (err) {
            alert(`Error al ${action} la moneda.`);
            console.error(err);
        }
    };

    const handleEdit = (currency) => {
        setForm({ name: currency.name, symbol: currency.symbol || '', valueInSus: currency.valueInSus });
        setEditingId(currency.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Esta acción es irreversible. ¿Eliminar moneda?")) return;
        try {
            await axios.delete(`${API}/currencies/${id}`, getAuthHeader());
            fetchCurrencies();
        } catch (err) {
            alert("Error al eliminar la moneda.");
            console.error(err);
        }
    };

    return (
        <div className="currency-manager-container">
            <header className="manager-header">
                <h1>Gestión de Monedas</h1>
                <p>Añade, edita y elimina las monedas disponibles en la plataforma.</p>
            </header>

            <div className="currency-manager-layout">
                <div className="form-column">
                    <div className="manager-card form-card">
                        <h3>{editingId ? "📝 Editando Moneda" : " Añadir Nueva Moneda"}</h3>
                        <form onSubmit={handleSubmit} className="currency-form">
                            <div className="form-group">
                                <label htmlFor="name">Nombre de la Moneda</label>
                                <input id="name" name="name" placeholder="Ej: Bitcoin" value={form.name} onChange={handleChange} required className="form-input" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="valueInSus">Valor en $US</label>
                                <input id="valueInSus" name="valueInSus" placeholder="Ej: 68000.50" type="number" step="0.00000001" value={form.valueInSus} onChange={handleChange} required className="form-input" />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    {editingId ? "Actualizar" : "Crear Moneda"}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={resetForm} className="btn btn-secondary">
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Columna de la Tabla */}
                <div className="table-column">
                    <div className="manager-card">
                        <h3>Monedas Disponibles</h3>
                        {loading && <p className="feedback-message">Cargando...</p>}
                        {error && <p className="feedback-message error">{error}</p>}
                        {!loading && !error && (
                            <div className="table-wrapper">
                                <table className="currency-table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Valor en $US</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currencies.map((c) => (
                                            <tr key={c.id} className={c.id === editingId ? 'editing-highlight' : ''}>
                                                <td>{c.name}</td>
                                                <td>${parseFloat(c.valueInSus).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</td>
                                                <td className="actions-cell">
                                                    <button onClick={() => handleEdit(c)} className="btn-icon btn-edit" title="Editar">✏️</button>
                                                    <button onClick={() => handleDelete(c.id)} className="btn-icon btn-delete" title="Eliminar">🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                         {!loading && currencies.length === 0 && <p className="feedback-message">No hay monedas para mostrar.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyManager;