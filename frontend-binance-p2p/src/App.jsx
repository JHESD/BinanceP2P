import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import LoginAdminPage from "./pages/admin/LoginAdmin";
import RegisterPage from "./pages/login/RegisterPage";
import UserDashboard from "./pages/users/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";

import PrivateRoute from "./components/auth/PrivateRoute";
import HomePage from "./pages/users/HomePage";
import WalletList from "./pages/users/WalletList";
import WalletDetail from "./pages/users/WalletDetail";
import BuyMarket from "./pages/users/BuyMarket";

import CreateBuyAd from "./pages/users/CreateBuyAd";
import BuyAdDetail from "./pages/users/BuyAdDetail";
import SellMarket from "./pages/users/SellMarket";
import CreateSellAd from "./pages/users/CreateSellAd";
import SellAdDetail from "./pages/users/SellAdDetail";

import TransferForm from "./pages/users/TransferForm";
import TransactionDetail from "./pages/users/TransactionDetail";
import CurrencyManager from "./components/admin/CurrencyManager";
import UserManager from "./components/admin/UserManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginAdminPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="currencies" element={<CurrencyManager />} />
          <Route path="users" element={<UserManager />} />
        </Route>

        <Route path="/" element={<PrivateRoute><UserDashboard /></PrivateRoute>}>
          <Route path="home" element={<HomePage />} />
          <Route path="wallets" element={<WalletList />} />
          <Route path="wallets/:walletId" element={<WalletDetail />} />
          <Route path="buy" element={<BuyMarket />} />
          <Route path="buy/new" element={<CreateBuyAd />} />
          <Route path="buy/:id" element={<BuyAdDetail />} />
          <Route path="sell" element={<SellMarket />} />
          <Route path="sell/new" element={<CreateSellAd />} />
          <Route path="sell/:id" element={<SellAdDetail />} />
          <Route path="transfer" element={<TransferForm />} />
          <Route path="transactions/:id" element={<TransactionDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
