import { LoginRequest, UserResponse } from "@/api/authenticationService/login";
import { createContext, useContext } from "react";

interface AuthCtx {
  user: UserResponse | null;
  token: string | null;
  loading: boolean;
  authLoading: boolean;
  signIn: (loginRequest: LoginRequest) => Promise<string>;
  updateUser: (partial: Partial<UserResponse>) => void;
  signOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthCtx>({
  user: null,
  token: null,
  loading: true,
  authLoading: false,
  signIn: async (_loginRequest: LoginRequest) => "",
  updateUser: () => {},
  signOut: async () => {},
});
export const useAuth = () => useContext(AuthContext);
