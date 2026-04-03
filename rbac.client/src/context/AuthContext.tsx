import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { authClient } from '@/api/apiClient';

export interface User {
  empId: string;
  empName: string;
  email: string;
  role: string;
  department: string;
  token: string;
}

interface LoginCredentials { usernameOrEmail: string; password: string }
interface AuthContextValue {
  user: User | null;
  role: string | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const userStorageKey = 'rbac_user';
const tokenStorageKey = 'rbac_token';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(userStorageKey);
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const login = async (credentials: LoginCredentials) => {
    const response = await authClient.login(credentials);
    const data = response.data ?? response;
    const nextUser: User = {
      empId: data.empId,
      empName: data.empName,
      email: credentials.usernameOrEmail,
      role: data.role,
      department: data.department,
      token: data.token,
    };
    localStorage.setItem(userStorageKey, JSON.stringify(nextUser));
    localStorage.setItem(tokenStorageKey, nextUser.token);
    setUser(nextUser);
    return nextUser;
  };

  const logout = () => {
    localStorage.removeItem(userStorageKey);
    localStorage.removeItem(tokenStorageKey);
    setUser(null);
    window.location.href = '/login';
  };

  const value = useMemo(() => ({ user, role: user?.role ?? null, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
