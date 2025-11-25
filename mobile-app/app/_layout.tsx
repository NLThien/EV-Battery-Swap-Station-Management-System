import AuthProvider from "@/constants/authProvider";
import { AppTheme } from "@/constants/customTheme";
import "@/styles/global.css";
import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  // const [user, setUser] = useState<User | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);

  // // Load token khi mở app
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const saved = await getToken();
  //       if (saved) {
  //         setToken(saved);
  //         // Option: decode JWT hoặc gọi /me để lấy user thật
  //         setUser({ id: "u_1", name: "Demo" });
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  // const signIn = async (username: string, password: string) => {
  //   // TODO: gọi API login thật
  //   const issuedToken = "FAKE.JWT.TOKEN";
  //   await saveToken(issuedToken);
  //   setToken(issuedToken);
  //   setUser({ id: "u_1", name: username });
  // };

  // const signOut = async () => {
  //   await deleteToken();
  //   setToken(null);
  //   setUser(null);
  // };
  return (
    <AuthProvider>
      <ThemeProvider value={AppTheme}>
        <Slot />
        <StatusBar />
      </ThemeProvider>
    </AuthProvider>
  );
}

//   return (

//     <ThemeProvider value={AppTheme}>
//       <SafeAreaProvider>
//         <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen
//             name="modal"
//             options={{ presentation: "modal", title: "Modal" }}
//           />
//         </Stack>
//         <StatusBar />
//       </SafeAreaProvider>
//     </ThemeProvider>
//   );
