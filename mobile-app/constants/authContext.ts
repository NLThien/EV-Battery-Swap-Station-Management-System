import { createContext, useContext } from "react";

export type User = { id: string; name?: string };
type AuthCtx = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};
export const AuthContext = createContext<AuthCtx>({
  user: null,
  token: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});
export const useAuth = () => useContext(AuthContext);
