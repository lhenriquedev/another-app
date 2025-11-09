import { useForceRender } from "@app/hooks/useForceRender";
import { useProfile } from "@app/hooks/useProfile";
import { httpClient } from "@app/services/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import {
  createContext,
  use,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  belt: "white" | "blue" | "purple" | "brown" | "black";
  phone: string;
  birthDate: string;
  gender: "male" | "female";
  totalCheckins: number;
  avatar?: string;
  avatarUpdatedAt?: string;
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
  gender: string;
};

interface IAuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  signIn: (params: SignInParams) => Promise<void>;
  signUp: (params: SignUpParams) => Promise<void>;
  signOut: () => Promise<void>;
}

SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext({} as IAuthContextValue);

const TOKEN_STORAGE_KEY = "@another-app::token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const { user, loadProfile } = useProfile({ enabled: false });
  console.log(user);

  const queryClient = useQueryClient();
  const forceRender = useForceRender();

  const setupAuth = useCallback(async (token: string) => {
    httpClient.defaults.headers.common["Authorization"] = token;

    await loadProfile();
    SplashScreen.hideAsync();
    setIsReady(true);
  }, []);

  useLayoutEffect(() => {
    async function load() {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

      if (!token) {
        setIsReady(true);
        SplashScreen.hideAsync();
        return;
      }

      await setupAuth(token);
    }

    load();
  }, [loadProfile]);

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post("/login", params);
      console.log(data);

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      await setupAuth(data.token);
    },
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => {
      await httpClient.post("/register", params);
    },
  });

  const signOut = useCallback(async () => {
    httpClient.defaults.headers.common["Authorization"] = undefined;
    queryClient.clear();
    forceRender();
    await AsyncStorage.clear();
  }, [queryClient]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
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
