import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const UserNav = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        closeMenu();
        logout();
        navigate('/login');
    };

    useEffect(() => {
        closeMenu();
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
    <nav className="user-nav-horizontal">
        <div className="user-nav-logo">
            <NavLink to="/home" className="logo-link">
                <span className="logo-highlight">Binance</span>{" "}
                <span className="logo-sub">DAE.corp</span>
            </NavLink>
        </div>

        <div className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={handleToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>

        <ul className={`user-nav-links ${menuOpen ? "show" : ""}`}>
            <li>
                <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                    🏠 Inicio
                </NavLink>
            </li>
            <li>
                <NavLink to="/wallets" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                    👛 Billeteras
                </NavLink>
            </li>
            <li>
                <NavLink to="/buy" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                    💱 Comprar
                </NavLink>
            </li>
            <li>
                <NavLink to="/sell" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                    📤 Vender
                </NavLink>
            </li>
            <li>
                <NavLink to="/transfer" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                    🔁 Transferir
                </NavLink>
            </li>
            <li>
                <NavLink to="/transactions/all" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                    🧾 Transacciones
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

export default UserNav;