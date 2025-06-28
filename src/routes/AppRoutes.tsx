import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0, GetTokenSilentlyOptions } from '@auth0/auth0-react';

// Pages
import LoginPage from '../pages/auth/LoginPage';
import ChangePasswordPage from '../pages/auth/ChangePasswordPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import CustomersPage from '../pages/CustomersPage';
import EmployeesPage from '../pages/EmployeesPage';
import OrdersPage from '../pages/OrdersPage';
import DeliveryPage from '../pages/DeliveryPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import { CallbackPage } from '../pages/CallbackPage';
import ProductsPage from '../pages/ProductsPage';
import ProductCategoriesPage from '../pages/ProductCategoriesPage';

// Component
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { setTokenGetter } from '../api/apiClient';
import SuppliesPage from '../pages/SuppliesPage';

// Roles
const ALL_ROLES = ['admin', 'manager', 'employee', 'delivery'];
const ADMIN_MANAGER = ['admin', 'manager'];
const ADMIN = ['admin'];
const ADMIN_MANAGER_DELIVERY = ['admin', 'manager', 'delivery'];
const ADMIN_MANAGER_EMPLOYEE = ['admin', 'manager', 'employee'];

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <p>Cargando...</p>;
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const options: GetTokenSilentlyOptions = {
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    };
    setTokenGetter(() => getAccessTokenSilently(options));
  }, [getAccessTokenSilently]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={ALL_ROLES}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute allowedRoles={ADMIN_MANAGER_EMPLOYEE}>
            <CustomersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute allowedRoles={ADMIN_MANAGER}>
            <EmployeesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={ALL_ROLES}>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supplies"
        element={
          <ProtectedRoute allowedRoles={ADMIN_MANAGER}>
            <SuppliesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute allowedRoles={ADMIN_MANAGER}>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/categories"
        element={
          <ProtectedRoute allowedRoles={ADMIN_MANAGER}>
            <ProductCategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delivery"
        element={
          <ProtectedRoute allowedRoles={ADMIN_MANAGER_DELIVERY}>
            <DeliveryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={ADMIN_MANAGER}>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={ADMIN}>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
