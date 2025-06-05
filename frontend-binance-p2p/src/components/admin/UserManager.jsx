import { useEffect, useState } from "react";
import { listUsers, grantAdmin } from "../../services/userService";

const UsersManager = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const data = await listUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error al cargar usuarios", error);
        }
    };

    const handleGrantAdmin = async (userId) => {
        try {
            await grantAdmin(userId);
            fetchUsers();
        } catch (error) {
            console.error("Error al otorgar permisos", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id} className="flex justify-between items-center p-2 border-b">
                        <div>
                            <p><strong>{u.name}</strong> ({u.email})</p>
                        </div>
                        {!u.isAdmin && (
                            <button
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                                onClick={() => handleGrantAdmin(u.id)}
                            >
                                Otorgar Admin
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersManager;
