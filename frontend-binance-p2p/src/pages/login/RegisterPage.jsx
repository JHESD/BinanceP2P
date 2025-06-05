import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!form.username || !form.email || !form.password) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError("Por favor, introduce un correo electrónico válido.");
            return;
        }
        if (form.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", form);
            setSuccess(res.data.message || "¡Registro exitoso! Serás redirigido al login.");
            setTimeout(() => navigate("/login"), 2500);
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrar. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div className="register-page-container">
            <div className="register-card">
                <div className="register-header">
                    <h1 className="app-title">
                        <span className="app-title-main">Binance</span> <span className="app-title-sub">DAE.corp</span>
                    </h1>
                    <h2 className="form-title">Crear Nueva Cuenta</h2>
                </div>

                {error && (
                    <div className="error-banner">
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div className="success-banner">
                        <p>{success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor="username-register" className="input-label">Nombre de Usuario</label>
                        <input
                            id="username-register"
                            name="username"
                            type="text"
                            placeholder="Tu nombre de usuario único"
                            value={form.username}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email-register" className="input-label">Correo Electrónico</label>
                        <input
                            id="email-register"
                            name="email"
                            type="email"
                            placeholder="tu@correo.com"
                            value={form.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password-register" className="input-label">Contraseña</label>
                        <input
                            id="password-register"
                            name="password"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={form.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Registrarse
                    </button>

                    <p className="alternative-action">
                        ¿Ya tienes una cuenta?
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="link-highlight button-as-link"
                        >
                            Inicia sesión
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;