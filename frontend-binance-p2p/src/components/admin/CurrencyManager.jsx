import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:3000/api";

const getAuthHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

const CurrencyManager = () => {
    const { user } = useAuth();
    const [currencies, setCurrencies] = useState([]);
    const [form, setForm] = useState({ name: "", valueInSus: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchCurrencies = async () => {
        try {
            const res = await axios.get(`${API}/currencies`, getAuthHeader(user.token));
            setCurrencies(res.data);
        } catch {
            alert("Error al cargar monedas");
        }
    };

    useEffect(() => {
        if (user?.token) fetchCurrencies();
    }, [user, fetchCurrencies]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(
                    `${API}/currencies/${editingId}`,
                    { ...form },
                    getAuthHeader(user.token)
                );
            } else {
                await axios.post(`${API}/currencies`, form, getAuthHeader(user.token));
            }
            setForm({ name: "", valueInSus: "" });
            setEditingId(null);
            fetchCurrencies();
        } catch {
            alert("Error al guardar moneda");
        }
    };

    const handleEdit = (currency) => {
        setForm({ name: currency.name, valueInSus: currency.valueInSus });
        setEditingId(currency.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar moneda?")) return;
        try {
            await axios.delete(`${API}/currencies/${id}`, getAuthHeader(user.token));
            fetchCurrencies();
        } catch {
            alert("Error al eliminar moneda");
        }
    };

    return (
        <div>
            <h2>Gestión de Monedas</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="valueInSus"
                    placeholder="Valor en $US"
                    type="number"
                    step="0.0001"
                    value={form.valueInSus}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
                {editingId && (
                    <button type="button" onClick={() => { setForm({ name: "", valueInSus: "" }); setEditingId(null); }}>
                        Cancelar
                    </button>
                )}
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Valor en $US</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map((c) => (
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.valueInSus}</td>
                            <td>
                                <button onClick={() => handleEdit(c)}>Editar</button>
                                <button onClick={() => handleDelete(c.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrencyManager;