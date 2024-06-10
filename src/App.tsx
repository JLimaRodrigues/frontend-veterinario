import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(location.pathname === '/login');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setIsLoginPage(location.pathname === '/login');
  }, [location]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={<Settings />} />
      </Routes>
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
