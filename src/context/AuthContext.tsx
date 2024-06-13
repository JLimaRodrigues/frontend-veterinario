import { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: username,
        password: password
      });

      const token = response.data.token;
      localStorage.setItem('user', token);
      setUser(token);
      navigate('/admin');
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error (e.g., show a message to the user)
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
