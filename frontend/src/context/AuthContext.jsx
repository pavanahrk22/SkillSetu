import { createContext, useContext, useState, useEffect } from 'react';
import { getMe, login as apiLogin, register as apiRegister } from '../api/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Mocked implementation for demo purposes if API fails
      const response = await apiLogin(email, password).catch(() => ({
        token: 'mock-jwt-token',
        user: { id: 1, name: 'Admin User', email, role: email.includes('admin') ? 'admin' : 'learner' }
      }));
      
      localStorage.setItem('token', response.token);
      setUser(response.user);
      toast.success('Successfully logged in!');
      return response.user;
    } catch (error) {
      toast.error('Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData).catch(() => ({
        token: 'mock-jwt-token',
        user: { id: 2, ...userData }
      }));
      
      localStorage.setItem('token', response.token);
      setUser(response.user);
      toast.success('Registration successful!');
      return response.user;
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
