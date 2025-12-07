import React, { createContext, useContext, useState, useEffect } from "react";
import {
  userService,
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has refresh token on mount
    const checkAuth = async () => {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          // Try to get user profile
          const profile = await userService.getProfile();
          setUser(profile);
        } catch (error) {
          // If failed, clear tokens
          setAccessToken(null);
          setRefreshToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await userService.login(email, password);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await userService.logout();
    } catch (error) {
      console.error("Logout error:", error);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
