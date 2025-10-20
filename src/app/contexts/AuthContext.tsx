import { httpClient } from "@app/services/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, use, useCallback, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  belt: "white" | "blue" | "purple" | "brown" | "black";
  phone: string;
  birthDate: string;
  gender: "male" | "female";
  totalCheckins: number;
};

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  email: string;
  password: string;
  name: string;
  beltId: string;
  birthDate: string;
  phone: string;
  gender: string;
};

interface IAuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn: (params: SignInParams) => Promise<void>;
  signUp: (params: SignUpParams) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

const TOKEN_STORAGE_KEY = "@another-app::token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  const queryClient = useQueryClient();

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post("/login", params);
      setToken(data.token);
      setIsLoadingToken(false);
    },
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => {
      await httpClient.post("/register", params);
    },
  });

  const { data: user, isFetching } = useQuery({
    enabled: !!token,
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await httpClient.get<{ user: User }>("/me");

      const { user } = data;

      return user;
    },
  });

  const signOut = useCallback(async () => {
    setToken(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    async function load() {
      const data = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      setToken(data);
      setIsLoadingToken(false);
    }

    load();
  }, []);

  useEffect(() => {
    async function run() {
      if (!token) {
        httpClient.defaults.headers.common["Authorization"] = null;
        return;
      }

      httpClient.defaults.headers.common["Authorization"] = `${token}`;
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    }

    run();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        isLoading: isLoadingToken || isFetching,
        user: user ?? null,
        signIn,
        signUp,
        signOut,
      }}
    >
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
