// import type { ReactNode } from "react";
// import { createContext, useContext, useState } from "react";

// // Định nghĩa kiểu dữ liệu
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(false);

//   const login = async (email: string, _password: string) => {
//     setLoading(true);
//     try {
//       // Mock login - sau này thay bằng API
//       const mockUser: User = {
//         id: "1",
//         name: "Nguyen Van A",
//         email: email,
//       };
//       setUser(mockUser);
//     } catch (error) {
//       console.error("Login failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
// src/contexts/AuthContext.tsx
import type { UserResponse } from "@/api/authentication/register";

import { createContext } from "react";

interface AuthContextType {
  userCurrent: UserResponse | null;
  setUserCurrent: (user: UserResponse | null) => void;
  refreshUser: () => void;
  resetAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
