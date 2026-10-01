import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthView, UserProfile } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  authView: AuthView;
  setAuthView: (view: AuthView) => void;
  pendingEmail: string;
  setPendingEmail: (email: string) => void;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password?: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<boolean>;
  resendVerificationCode: () => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (newPassword: string) => Promise<boolean>;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'socialpulse_auth_user';

const defaultUser: UserProfile = {
  id: 'usr_1',
  firstName: 'Alex',
  lastName: 'Rivera',
  email: 'alex.rivera@agency.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Lead Growth Architect',
  isEmailVerified: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return defaultUser; // Start with authenticated default user for immediate app demo, can logout to test auth
  });

  const [authView, setAuthView] = useState<AuthView>('login');
  const [pendingEmail, setPendingEmail] = useState<string>('alex.rivera@agency.io');

  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } catch {
        // Ignore
      }
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  const login = async (email: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      firstName: email.split('@')[0] || 'User',
      lastName: '',
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Media Manager',
      isEmailVerified: true,
    };
    setCurrentUser(user);
    return true;
  };

  const [pendingUser, setPendingUser] = useState<{ firstName: string; lastName: string; email: string }>({
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@agency.io',
  });

  const signup = async (
    firstName: string,
    lastName: string,
    email: string
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setPendingEmail(email);
    setPendingUser({ firstName, lastName, email });
    // Move to verify email page
    setAuthView('verify_email');
    return true;
  };

  const verifyEmail = async (_code: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      firstName: pendingUser.firstName || pendingEmail.split('@')[0] || 'Member',
      lastName: pendingUser.lastName || '',
      email: pendingEmail,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Growth Creator',
      isEmailVerified: true,
    };
    setCurrentUser(user);
    return true;
  };

  const resendVerificationCode = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setPendingEmail(email);
    setAuthView('reset_password');
    return true;
  };

  const resetPassword = async (_newPassword: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setAuthView('login');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthView('login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        authView,
        setAuthView,
        pendingEmail,
        setPendingEmail,
        login,
        signup,
        verifyEmail,
        resendVerificationCode,
        requestPasswordReset,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
