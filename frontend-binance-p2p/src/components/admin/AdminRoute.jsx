import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CurrencyManager from "./CurrencyManager";
import UserManager from "./UserManager";
import AdminDashboard from "../../pages/admin/AdminDashboard";

const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "admin";
};

const AdminRoute = () => {
    if (!isAdmin()) {
        return <Navigate to="/admin" replace />;
    }

    return (
        <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="currencies" element={<CurrencyManager />} />
            <Route path="users" element={<UserManager />} />
        </Routes>
    );
};

export default AdminRoute;