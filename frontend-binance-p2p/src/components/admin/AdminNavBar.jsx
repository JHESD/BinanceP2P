import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminNavbar.css";

const AdminNavBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const handleLogout = () => {
        closeMenu();
        logout();
        navigate("/admin/login");
    };

    useEffect(() => closeMenu(), [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) closeMenu();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="admin-nav-horizontal">
            <div className="admin-nav-logo">
                <NavLink to="/admin/dashboard" className="logo-link">
                    <span className="logo-highlight">Admin</span>{" "}
                    <span className="logo-sub">DAE.corp</span>
                </NavLink>
            </div>

            <div className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={handleToggle}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <ul className={`admin-nav-links ${menuOpen ? "show" : ""}`}>
                <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                        📊 Panel
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                        👥 Usuarios
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/currencies" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                        💰 Monedas
                    </NavLink>
                </li>
                <li>
                    <button onClick={handleLogout} className="logout-button">
                        🚪 Cerrar sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavBar;
