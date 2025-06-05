import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import './AdminLoginPage.css';

function AdminLoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            const { token } = await loginAdmin(email, password);
            login(token, true);
            navigate("/admin");
        } catch (err) {
            setError(err.response?.data?.message || "Error al iniciar sesión como administrador");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h2 className="admin-login-title">Panel Administrativo</h2>
                {error && <div className="admin-error-banner">{error}</div>}

                <form onSubmit={handleLogin} className="admin-login-form">
                    <label className="admin-label" htmlFor="admin-email">Correo</label>
                    <input
                        id="admin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="admin-input"
                        required
                    />

                    <label className="admin-label" htmlFor="admin-password">Contraseña</label>
                    <input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="admin-input"
                        required
                    />

                    <button type="submit" className="admin-submit-button">
                        Iniciar como Admin
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLoginPage;
