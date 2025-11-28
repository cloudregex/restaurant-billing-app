import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';
import TitleBar from './components/TitleBar';
import ErrorBoundary from './components/ErrorBoundary';
import ToastConfig from './components/ToastConfig';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OTP from './pages/auth/OTP';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import SupplierIndex from './pages/supplier/SupplierIndex';
import CategoriesIndex from './pages/categories/CategoriesIndex';
import CustomerIndex from './pages/customer/CustomerIndex';
import TaxIndex from './pages/tax/TaxIndex';
import MenuIndex from './pages/menu/MenuIndex';
import TableIndex from './pages/table/TableIndex';
import BillingIndex from './pages/billing/BillingIndex';
import TableSelect from './pages/billing/TableSelect';
import BillingCreate from './pages/billing/BillingCreate';

const Layout = () => {
  const location = useLocation();
  const isAuthPage = ['/', '/register', '/otp', '/forgot-password', '/reset-password'].includes(location.pathname);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900 flex flex-col">
      <TitleBar />
      <div className={`flex-1 w-full bg-gray-50 dark:bg-gray-900 ${isAuthPage ? 'overflow-y-auto no-scrollbar' : 'overflow-y-auto overflow-x-hidden'}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/supplier" element={<SupplierIndex />} />
          <Route path="/category" element={<CategoriesIndex />} />
          <Route path="/customer" element={<CustomerIndex />} />
          <Route path="/tax" element={<TaxIndex />} />
          <Route path="/menu" element={<MenuIndex />} />
          <Route path="/table" element={<TableIndex />} />
          <Route path="/billing" element={<BillingIndex />} />
          <Route path="/billing/table-select" element={<TableSelect />} />
          <Route path="/billing/create/:tableNumber" element={<BillingCreate />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ThemeProvider>
      <Router>
        <ErrorBoundary>
          <Layout />
          <ToastConfig />
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
