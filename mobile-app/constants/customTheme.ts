// app/theme.ts
import {
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from "@react-navigation/native";

export const AppTheme: Theme = {
  ...NavigationDefaultTheme,
  dark: false, // chỉ 1 theme cố định
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: "#4e8cff", // màu điểm nhấn
    background: "#7FBDFF", // nền toàn app
    card: "#fff", // nền header/tab/card
    text: "#000", // màu chữ chính
    // viền
    notification: "#ff3b30", // badge/thông báo
  },
  // Nếu bạn có cấu hình fonts riêng, thêm ở đây:
  // fonts: { ... }
};
