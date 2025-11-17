import type { UserResponse } from "@/api/authentication/register";
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { MyInfo } from "@/api/authentication/myInfo";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(
    // nếu muốn giữ sau khi reload
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const handleSetUser = (newUser: UserResponse | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };
  const resetAuth = () => {
    setUser(null);
  };
  // trong AuthContext
  const refreshUser = async () => {
    try {
      const user = await MyInfo();
      setUser(user);
    } catch (e) {
      console.error(e);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser: handleSetUser, resetAuth, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
