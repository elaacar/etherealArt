import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface JwtPayload {
  id: number;
  email: string;
  isAdmin: boolean;
  username?: string;
  exp: number;
  iat: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setUser({
          id: decoded.id.toString(),
          email: decoded.email,
          isAdmin: decoded.isAdmin,
          username: decoded.username || ''
        });
      } catch (e) {
        console.error("Token çözümleme hatası:", e);
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) return false;
      const data = await res.json();

      const decoded: JwtPayload = jwtDecode(data.token);
      localStorage.setItem('token', data.token);

      setUser({
        id: decoded.id.toString(),
        email: decoded.email,
        isAdmin: decoded.isAdmin,
        username: decoded.username || ''
      });

      return true;
    } catch (err) {
      console.error("Login error", err);
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) return false;

      const data = await res.json();
      setUser({
        id: data.id.toString(),
        email: data.email,
        isAdmin: data.is_admin
      });

      return true;
    } catch (err) {
      console.error("Register error", err);
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:5050/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      return res.ok;
    } catch (err) {
      console.error("Şifre sıfırlama hatası", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) return false;

      const data = await response.json();
      const token = data.token;

      if (!token) return false;

      localStorage.setItem("token", token);

      const decoded: JwtPayload = jwtDecode(token);

      if (decoded.isAdmin !== true) return false;

      setUser({
        id: decoded.id.toString(),
        email: decoded.email,
        isAdmin: true,
        username: decoded.username || ''
      });

      return true;
    } catch (error) {
      console.error('Admin login error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, forgotPassword, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
