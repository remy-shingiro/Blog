

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';

// A tiny helper component to protect routes based on roles
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  
  if (requiredRole && user.role !== requiredRole) {
    // If a mechanic tries to access the dashboard, send them to inventory
    return <Navigate to="/inventory" replace />;
  }
  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Default route routing based on role */}
        <Route index element={<Navigate to={user.role === 'MANAGER' ? "/dashboard" : "/inventory"} replace />} />
        
        {/* Manager Only Routes */}
        <Route path="dashboard" element={
          <ProtectedRoute requiredRole="MANAGER"><Dashboard /></ProtectedRoute>
        } />
        <Route path="settings" element={
          <ProtectedRoute requiredRole="MANAGER"><Settings /></ProtectedRoute>
        } />

        {/* Shared Routes */}
        <Route path="inventory" element={<Inventory />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;