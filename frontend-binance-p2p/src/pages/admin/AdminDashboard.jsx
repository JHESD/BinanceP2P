import { Link, Routes, Route } from "react-router-dom";
import UserManager from "../../components/admin/UserManager";
import CurrencyManager from "../../components/admin/CurrencyManager";

const AdminDashboard = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Panel de Administración</h2>
            <ul className="space-y-2">
                <li>
                    <Link className="text-blue-700 underline" to="/admin/users">
                        Gestionar Usuarios
                    </Link>
                </li>
                <li>
                    <Link className="text-blue-700 underline" to="/admin/currencies">
                        Gestionar Monedas
                    </Link>
                </li>
            </ul>
            <div className="mt-6">
                <Routes>
                    <Route path="users" element={<UserManager />} />
                    <Route path="currencies" element={<CurrencyManager />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
