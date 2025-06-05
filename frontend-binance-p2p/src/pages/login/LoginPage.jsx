import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import './LoginPage.css';

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Por favor, ingresa correo y contraseña.");
            return;
        }
        try {
            const { token } = await loginUser(email, password);
            login(token, false);
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="app-title">
                        <span className="app-title-main">Binance</span> <span className="app-title-sub">DAE.corp</span>
                    </h1>
                    <h2 className="form-title">Acceso de Usuario</h2>
                </div>

                {error && (
                    <div className="error-banner">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email-login" className="input-label">Correo Electrónico</label>
                        <input
                            id="email-login"
                            type="email"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password-login" className="input-label">Contraseña</label>
                        <input
                            id="password-login"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Iniciar Sesión
                    </button>

                    <p className="alternative-action">
                        ¿No tienes cuenta? <a href="/register" className="link-highlight">Regístrate aquí</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;