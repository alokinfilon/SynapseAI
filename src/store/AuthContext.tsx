import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types/index';

interface AuthContextType {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  user: UserProfile | null;
  completeOnboarding: () => void;
  signIn: (email: string) => void;
  signUp: (user: UserProfile) => void;
  signOut: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const completeOnboarding = () => setIsOnboarded(true);

  const signIn = (email: string) => {
    setUser({
      id: 'usr_1',
      fullName: 'Andrew Ainsley',
      email,
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
    });
    setIsAuthenticated(true);
  };

  const signUp = (newUser: UserProfile) => {
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev: UserProfile | null) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isOnboarded,
        user,
        completeOnboarding,
        signIn,
        signUp,
        signOut,
        updateProfile,
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
