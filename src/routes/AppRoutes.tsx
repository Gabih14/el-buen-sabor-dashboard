import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

// Route Guards
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated but first login, redirect to change password
  if (currentUser?.isFirstLogin) {
    return <Navigate to="/change-password" />;
  }
  
  return <>{children}</>;
};

const RoleBasedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (isAuthenticated) {
    // If authenticated but first login, redirect to change password
    if (currentUser?.isFirstLogin) {
      return <Navigate to="/change-password" />;
    }
    // Otherwise, redirect to dashboard
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      
      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      
      {/* Role-restricted Routes */}
      <Route 
        path="/customers" 
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={['admin', 'manager', 'employee']}>
              <CustomersPage />
            </RoleBasedRoute>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/employees" 
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={['admin', 'manager']}>
              <EmployeesPage />
            </RoleBasedRoute>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/orders" 
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={['admin', 'manager', 'employee', 'delivery']}>
              <OrdersPage />
            </RoleBasedRoute>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/delivery" 
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={['admin', 'manager', 'delivery']}>
              <DeliveryPage />
            </RoleBasedRoute>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/reports" 
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={['admin', 'manager']}>
              <ReportsPage />
            </RoleBasedRoute>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={['admin']}>
              <SettingsPage />
            </RoleBasedRoute>
          </PrivateRoute>
        } 
      />
      
      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;