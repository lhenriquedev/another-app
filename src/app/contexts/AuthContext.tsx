import { createContext, use } from "react";

interface IAuthContextValue {
  isLoggedIn: boolean;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isLoggedIn = true;

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = use(AuthContext);

  if (!value) {
    throw new Error("`useAuth` must be used only inside <AuthProvider/>");
  }

  return value;
}
