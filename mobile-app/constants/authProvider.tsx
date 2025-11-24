import { Authenticated } from "@/api/authenticationService/introspectToken";
import {
  Login,
  type LoginRequest,
  type UserResponse,
} from "@/api/authenticationService/login";
import { Logout } from "@/api/authenticationService/logout";
import { MyInfo } from "@/api/authenticationService/myInfo";
import { refreshToken } from "@/api/authenticationService/refeshToken";
import {
  getSecureToken,
  removeSecureToken,
  removeSecureUser,
  saveSecureToken,
  saveSecureUser,
} from "@/utils/tokenStorage";
import { useRouter } from "expo-router";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // loading khi ĐĂNG NHẬP
  const [authLoading, setAuthLoading] = useState(false);

  // Load auth khi mở app
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await getSecureToken();
        if (!storedToken) {
          // chưa đăng nhập
          return;
        }

        // gọi API introspect
        const res = await Authenticated(storedToken);
        console.log("đang xác thực token");

        if (res.valid) {
          // token vẫn còn dùng được
          setToken(storedToken);
          const me = await MyInfo(storedToken);
          setUser(me);
          await saveSecureUser(me);
        } else {
          // token hết hạn → thử refresh
          try {
            const refreshed = await refreshToken(storedToken);
            const newToken = refreshed.token;

            if (!newToken) {
              throw new Error("Backend không trả về token mới");
            }

            setToken(newToken);
            await saveSecureToken(newToken);
            console.log("Token đọc lại từ SecureStore:", newToken);

            const me = await MyInfo(newToken);
            setUser(me);
            await saveSecureUser(me);
          } catch (error) {
            console.log("Refresh token thất bại, cần login lại:", error);
            await removeSecureToken();
            await removeSecureUser();
            setUser(null);
            setToken(null);
          }
        }
      } catch (error) {
        console.log("Lỗi khi load auth, hãy đăng nhập lại:", error);
        await removeSecureToken();
        await removeSecureUser();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  // Đăng nhập
  const signIn = async ({ phoneNumber, password }: LoginRequest) => {
    try {
      // gọi login API
      setAuthLoading(true);
      const res = await Login({ phoneNumber, password });
      const newToken = res.token;

      await saveSecureToken(newToken);

      console.log("đăng nhập thành công: ", res);

      setToken(newToken);
      const token = await getSecureToken();
      console.log("token" + token);
      const me = await MyInfo(newToken);

      const roles = me.roles || [];

      if (!roles.includes("USER")) {
        // Xóa token cũ (chỗ này kh cần thiết lắm)
        await removeSecureToken();
        await removeSecureUser();
        await signOut();
        throw new Error("ROLE_NOT_ALLOWED");
      }

      // 4. LƯU THÔNG TIN USER VÀO BỘ NHỚ BỀN VỮNG

      // 5. CẬP NHẬT STATE (Để trigger giao diện)
      setUser(me);
      await saveSecureUser(me);

      return newToken; // signIn return string
    } catch (err) {
      console.log("Lỗi signIn:", err);

      await removeSecureToken?.();
      await removeSecureUser?.();

      throw err; // quan trọng: ném lỗi cho UI xử lý
    } finally {
      setAuthLoading(false);
    }
  };

  // Đăng xuất
  const signOut = async () => {
    const token = await getSecureToken();

    if (!token) {
      // Không có token -> coi như đã logout hoặc session hết hạn
      // Có thể clear state, chuyển màn hình, rồi return
      await removeSecureToken();
      await removeSecureUser();
      setUser(null);
      setToken(null);
      router.replace("/(auth)/log-in");
      return;
    }

    try {
      await Logout(token);
    } catch (error) {
      console.log("logout failed:", error);
    } finally {
      await removeSecureToken();
      await removeSecureUser();
      setUser(null);
      setToken(null);

      router.replace("/(auth)/log-in");
    }
  };

  const updateUser = (partial: Partial<UserResponse>) => {
    setUser((prev) => {
      if (!prev) return prev;

      const newUser = { ...prev, ...partial };

      // Lưu lại vào SecureStore / localStorage
      saveSecureUser(newUser);

      return newUser;
    });
  };
  return (
    <AuthContext.Provider
      value={{ user, token, authLoading, loading, updateUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
