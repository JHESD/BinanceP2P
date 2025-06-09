// components/admin/AdminLayout.jsx
import AdminNavBar from "./AdminNavBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <>
            <AdminNavBar />
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
};

export default AdminLayout;
