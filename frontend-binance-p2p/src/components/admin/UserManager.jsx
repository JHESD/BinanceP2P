// src/components/admin/UsersManager.jsx
import { useEffect, useState } from "react";
import { listUsers, grantAdmin } from "../../services/userService";
import "./UserManager.css"; // Importamos el nuevo CSS

const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await listUsers();
            // Ordenamos para mostrar los administradores primero
            const sortedUsers = data.sort((a, b) => b.isAdmin - a.isAdmin);
            setUsers(sortedUsers);
            setError(null);
        } catch (error) {
            console.error("Error al cargar usuarios", error);
            setError("No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleGrantAdmin = async (userId) => {
        // Confirmación antes de una acción importante
        if (window.confirm("¿Estás seguro de que quieres otorgar privilegios de administrador a este usuario?")) {
            try {
                await grantAdmin(userId);
                fetchUsers(); // Recargar la lista para ver el cambio
            } catch (error) {
                console.error("Error al otorgar permisos", error);
                alert("Hubo un error al intentar otorgar los permisos.");
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="users-manager-container">
            <header className="users-manager-header">
                <h1>Gestión de Usuarios</h1>
                <p>Administra los roles y permisos de los usuarios del sistema.</p>
            </header>

            <div className="users-list-card">
                {loading && <p className="feedback-message">Cargando usuarios...</p>}
                {error && <p className="feedback-message error">{error}</p>}
                
                {!loading && !error && (
                    <div className="users-list">
                        {users.map((user) => (
                            <div key={user.id} className="user-row">
                                <div className="user-info">
                                    <p className="user-name">{user.name}</p>
                                    <p className="user-email">{user.email}</p>
                                </div>
                                <div className="user-actions">
                                    {user.isAdmin ? (
                                        <span className="role-badge admin-badge">👑 Administrador</span>
                                    ) : (
                                        <span className="role-badge user-badge">👤 Usuario</span>
                                    )}
                                    {!user.isAdmin && (
                                        <button
                                            className="grant-admin-btn"
                                            onClick={() => handleGrantAdmin(user.id)}
                                        >
                                            Otorgar Admin
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersManager;