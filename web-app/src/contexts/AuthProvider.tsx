import type { UserResponse } from "@/api/authentication/register";
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { MyInfo } from "@/api/authentication/myInfo";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userCurrent, setUserCurrent] = useState<UserResponse | null>(
    // nếu muốn giữ sau khi reload
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const handleSetUser = (newUser: UserResponse | null) => {
    setUserCurrent(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };
  const resetAuth = () => {
    setUserCurrent(null);
  };
  // trong AuthContext
  const refreshUser = async () => {
    try {
      const user = await MyInfo();
      setUserCurrent(user);
    } catch (e) {
      console.error(e);
      setUserCurrent(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userCurrent,
        setUserCurrent: handleSetUser,
        resetAuth,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
