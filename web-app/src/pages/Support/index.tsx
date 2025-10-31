import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, MessageSquare, Headphones } from "lucide-react";

interface Feedback {
  id: string;
  user: string;
  userId: string;
  date: string;
  facility: number;
  speed: number;
  battery: number;
  price: number;
  staff: number;
  satisfaction: number;
  comment: string;
  adminReply?: string;
}

const FeedbackAdmin: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filtered, setFiltered] = useState<Feedback[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [replyModal, setReplyModal] = useState(false);
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [replyText, setReplyText] = useState("");

  // 🧩 Mock data (mô phỏng từ app)
  useEffect(() => {
    const mockData: Feedback[] = [
      {
        id: "1",
        user: "Nguyễn Văn A",
        userId: "U001",
        date: "2025-10-25",
        facility: 4,
        speed: 5,
        battery: 4,
        price: 3,
        staff: 5,
        satisfaction: 5,
        comment: "Trạm hoạt động tốt, nhân viên hỗ trợ nhiệt tình.",
        adminReply: "Cảm ơn bạn A, rất vui vì bạn hài lòng với dịch vụ!",
      },
      {
        id: "2",
        user: "Trần Thị B",
        userId: "U002",
        date: "2025-10-26",
        facility: 3,
        speed: 2,
        battery: 4,
        price: 3,
        staff: 4,
        satisfaction: 3,
        comment: "Cần cải thiện tốc độ đổi pin, hơi chậm vào giờ cao điểm.",
      },
      {
        id: "3",
        user: "Lê Văn C",
        userId: "U003",
        date: "2025-10-27",
        facility: 5,
        speed: 5,
        battery: 5,
        price: 4,
        staff: 5,
        satisfaction: 5,
        comment: "Ứng dụng rất tiện lợi, dễ sử dụng.",
        adminReply: "Cảm ơn bạn C đã góp ý, chúc bạn lái xe an toàn!",
      },
    ];
    setFeedbacks(mockData);
    setFiltered(mockData);
  }, []);

  // 🎯 Lọc dữ liệu
  useEffect(() => {
    let list = [...feedbacks];
    if (filterDate) list = list.filter((f) => f.date === filterDate);
    if (filterStatus === "responded") list = list.filter((f) => f.adminReply && f.adminReply.trim() !== "");
    if (filterStatus === "pending") list = list.filter((f) => !f.adminReply || f.adminReply.trim() === "");
    setFiltered(list);
  }, [filterDate, filterStatus, feedbacks]);

  // 📨 Mở modal phản hồi
  const handleOpenReply = (item: Feedback) => {
    setSelected(item);
    setReplyText(item.adminReply || "");
    setReplyModal(true);
  };

  // 💬 Gửi phản hồi
  const handleSubmitReply = () => {
    if (!selected) return;
    const updated = feedbacks.map((f) =>
      f.id === selected.id ? { ...f, adminReply: replyText } : f
    );
    setFeedbacks(updated);
    setReplyModal(false);
    setSelected(null);
    setReplyText("");
  };

  // 📊 Thống kê
  const total = feedbacks.length;
  const responded = feedbacks.filter((f) => f.adminReply && f.adminReply.trim() !== "").length;
  const percent = total > 0 ? Math.round((responded / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      {/* 🧠 Tiêu đề */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight flex items-center gap-3">
        <Headphones className="w-9 h-9 text-emerald-500 drop-shadow-sm transition-transform duration-200 hover:scale-110" />
        Hỗ trợ & Phản hồi người dùng
      </h1>

      {/* 📈 Thống kê tổng quan */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-5 text-center border-t-4 border-blue-400">
          <p className="text-2xl font-semibold text-blue-700">{total}</p>
          <p className="text-gray-600 text-sm mt-1">Tổng số phản hồi</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 text-center border-t-4 border-green-500">
          <p className="text-2xl font-semibold text-green-600">{responded}</p>
          <p className="text-gray-600 text-sm mt-1">Đã phản hồi</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 text-center border-t-4 border-amber-400">
          <p className="text-2xl font-semibold text-amber-600">{percent}%</p>
          <p className="text-gray-600 text-sm mt-1">Tỷ lệ phản hồi</p>
        </div>
      </div>

      {/* 🧮 Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <div>
          <label className="text-sm font-medium text-gray-700 mr-2">Ngày đánh giá:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded-lg px-3 py-1.5 focus:outline-green-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mr-2">Trạng thái:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-1.5 focus:outline-green-500"
          >
            <option value="all">Tất cả</option>
            <option value="responded">Đã phản hồi</option>
            <option value="pending">Chưa phản hồi</option>
          </select>
        </div>
      </div>

      {/* 📋 Danh sách phản hồi */}
      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500 italic text-center">Không có phản hồi nào.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition flex justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  {item.user}
                </h3>

                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <Clock size={14} className="text-blue-500" />
                  Ngày đánh giá:{" "}
                  <span className="text-gray-700 font-medium">{item.date}</span>
                </p>

                {/* ⭐ Hiển thị 6 tiêu chí */}
                <div className="grid grid-cols-2 gap-x-6 text-sm text-gray-700 mb-2">
                  <p>🏢 Cơ sở vật chất: <span className="font-semibold">{item.facility}⭐</span></p>
                  <p>⚡ Tốc độ đổi pin: <span className="font-semibold">{item.speed}⭐</span></p>
                  <p>🔋 Chất lượng pin: <span className="font-semibold">{item.battery}⭐</span></p>
                  <p>💰 Giá cả: <span className="font-semibold">{item.price}⭐</span></p>
                  <p>👨‍🔧 Nhân viên: <span className="font-semibold">{item.staff}⭐</span></p>
                  <p>😊 Hài lòng: <span className="font-semibold">{item.satisfaction}⭐</span></p>
                </div>

                <p className="text-gray-700 italic mb-2">“{item.comment}”</p>

                {item.adminReply && (
                  <div className="mt-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-gray-800 text-sm">
                      💬{" "}
                      <span className="font-semibold text-blue-700">
                        Phản hồi từ admin:
                      </span>{" "}
                      {item.adminReply}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                {item.adminReply && item.adminReply.trim() !== "" ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle size={18} /> Đã phản hồi
                  </span>
                ) : (
                  <span className="text-amber-600 font-medium flex items-center gap-1">
                    <Clock size={18} /> Chưa phản hồi
                  </span>
                )}

                <button
                  onClick={() => handleOpenReply(item)}
                  className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition text-sm shadow"
                >
                  <MessageSquare size={16} /> Ghi phản hồi
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 💬 Modal phản hồi */}
      {replyModal && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[420px] animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              Ghi phản hồi cho{" "}
              <span className="text-green-600">{selected.user}</span>
            </h2>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border rounded-lg p-3 h-28 focus:outline-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Nhập nội dung phản hồi..."
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setReplyModal(false)}
                className="!px-4 !py-2 !rounded-lg !bg-slate-200 !hover:bg-slate-300 !text-slate-700 !font-medium shadow-sm !hover:shadow-md !transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitReply}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white hover:opacity-90 shadow"
              >
                Gửi phản hồi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackAdmin;
