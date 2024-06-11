import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';
import Settings from '@/components/Settings';
import Navbar from '@/components/Bar/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import Users from './pages/Users';
import Products from './pages/Products';
import Services from './pages/Services';

function App() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(location.pathname === '/login');
  const [isAdminPage, setIsAdminPage] = useState(location.pathname.startsWith('/admin'));
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setIsLoginPage(location.pathname === '/login');
    setIsAdminPage(location.pathname.startsWith('/admin'));
  }, [location]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {!isLoginPage && !isAdminPage && <Navbar />}
      {isAdminPage && (
        <Routes>
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<Settings isOpen={false} setIsOpen={() => {}} />} />
        </Routes>
      )}
      {!isAdminPage && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  );
}
