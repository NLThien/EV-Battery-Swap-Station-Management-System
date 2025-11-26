// api/feedbackApi.ts
import axios from "axios";
import { FeedbackItem } from "./mockApi"; // Giữ lại type

type FeedbackBE = {
    id: number; // BE dùng Long/number
    userName: string;
    userId: string;
    date: string; // BE dùng LocalDate, được serialize thành string "YYYY-MM-DD"
    facility: number;
    speed: number;
    battery: number;
    price: number;
    staff: number;
    satisfaction: number;
    comment: string; // Tương ứng với description/comment ở FE
    adminReply: string;
};

// Đổi sang IP cục bộ của máy tính nếu chạy trên thiết bị vật lý/giả lập
// Ví dụ: http://192.168.1.100:8080/api/feedbacks
// api/feedbackApi.ts

// ✅ Dùng cho Android Emulator (địa chỉ 10.0.2.2, cổng 8082)
const API_BASE_URL = "http://10.33.24.34:8082/api/feedbacks";
// ✅ 1. Lấy tất cả feedback (GET /api/feedbacks)
export async function fetchFeedbacks(): Promise<FeedbackItem[]> {
  try {
    // 👈 Sửa lỗi: Chỉ định rõ response.data là FeedbackBE[]
    const response = await axios.get<FeedbackBE[]>(API_BASE_URL); 
    
    // Vì response.data đã có kiểu, ta có thể bỏ (item: any)
    const transformedData: FeedbackItem[] = response.data.map((item) => ({
      ...item,
      // Đảm bảo id là string và date được chuyển đổi
      createdAt: new Date(item.date).toISOString(), 
      id: item.id.toString(),
      // Thêm trường description (Nếu FeedbackItem có trường này)
      description: item.comment, 
    }));

    return transformedData;
  } catch (error) {
    console.error("Lỗi khi tải feedback:", error);
    return []; // Trả về mảng rỗng khi lỗi
  }
}

// ✅ 2. Tạo feedback mới (POST /api/feedbacks)
// Dùng type cho request để đảm bảo đúng cấu trúc
type CreateFeedbackPayload = {
  userId: string; // Tạm thời
  facility: number;
  speed: number;
  battery: number;
  price: number;
  staff: number;
  satisfaction: number;
  comment: string;
}

export async function createNewFeedback(data: CreateFeedbackPayload): Promise<FeedbackItem> {
  try {
    // 👈 Sửa lỗi: Chỉ định rõ response.data trả về là FeedbackBE
    const response = await axios.post<FeedbackBE>(API_BASE_URL, data);
    
    const createdItem: FeedbackItem = {
      ...response.data,
      id: response.data.id.toString(),
      createdAt: new Date(response.data.date).toISOString(),
      description: response.data.comment, // Map comment sang description
    };
    return createdItem;
  } catch (error) {
    console.error("Lỗi khi tạo feedback:", error);
    throw new Error("Không thể gửi phản hồi.");
  }
}

// ✅ 3. Lấy chi tiết feedback theo ID (GET /api/feedbacks/{id})
export async function fetchFeedbackDetail(id: string): Promise<FeedbackItem | null> {
  try {
    // 👈 Sửa lỗi: Chỉ định rõ response.data là FeedbackBE
    const response = await axios.get<FeedbackBE>(`${API_BASE_URL}/${id}`);
    const item = response.data;
    
    const transformedItem: FeedbackItem = {
      ...item,
      id: item.id.toString(),
      createdAt: new Date(item.date).toISOString(), 
      description: item.comment, 
    };
    
    return transformedItem;
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết feedback ID ${id}:`, error);
    return null; 
  }
}
// (Có thể thêm API getById, reply, delete nếu cần)