// app/theme.ts
import { FeedbackItem } from "@/api/mockApi";
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
export const data: FeedbackItem[] = [
  {
    id: 1,
    description: "Nhân viên hỗ trợ tốt, trạm sạch sẽ.",
    createdAt: "2025-10-25T08:30:00Z",
    adminReply: "Cảm ơn bạn, chúng tôi sẽ cố gắng giữ phong độ!",
  },
  {
    id: 2,
    description: "Đổi pin hơi chậm vào giờ cao điểm.",
    createdAt: "2025-10-26T14:15:00Z",
    adminReply: null,
  },
  {
    id: 3,
    description: "Ứng dụng rất tiện lợi.",
    createdAt: "2025-10-27T10:00:00Z",
    adminReply: "Cảm ơn bạn đã phản hồi ❤️",
  },
];
