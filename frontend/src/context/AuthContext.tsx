import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  userService,
} from "../services/api";

interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Try to get user profile with existing tokens
          const profile = await userService.getProfile();
          setUser(profile);
        } catch (error) {
          // If failed, clear tokens
          setAccessToken(null);
          setRefreshToken(null);
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await userService.login(email, password);

    // Store tokens
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);

    // Set user
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await userService.logout();
    } catch (error) {
      // Ignore error, logout anyway
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
