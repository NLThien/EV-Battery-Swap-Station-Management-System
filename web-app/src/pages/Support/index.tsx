import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, MessageSquare, Headphones, RefreshCcw } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:8088/api/feedbacks"; // đổi port theo gateway của bạn

interface Feedback {
  id: number;
  userName: string;
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
  const [filterStars, setFilterStars] = useState(0);
  const [searchName, setSearchName] = useState("");

  const [replyModal, setReplyModal] = useState(false);
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [replyText, setReplyText] = useState("");

  // =============================
  // 🔥 Fetch danh sách feedback
  // =============================
  const loadFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data;

      setFeedbacks(data);
      setFiltered(data);
    } catch (e) {
      console.error("Lỗi tải feedback:", e);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // =============================
  // 🔥 Lọc dữ liệu
  // =============================
  useEffect(() => {
    let list = [...feedbacks];

    if (filterDate) list = list.filter(f => f.date === filterDate);
    if (filterStatus === "responded") list = list.filter(f => f.adminReply);
    if (filterStatus === "pending") list = list.filter(f => !f.adminReply);

    if (filterStars > 0) {
      list = list.filter(f =>
        Math.round((f.facility + f.speed + f.battery + f.price + f.staff + f.satisfaction) / 6) === filterStars
      );
    }

    if (searchName.trim() !== "")
      list = list.filter(f =>
        f.userName.toLowerCase().includes(searchName.toLowerCase())
      );

    setFiltered(list);
  }, [filterDate, filterStatus, filterStars, searchName, feedbacks]);

  const resetFilters = () => {
    setFilterDate("");
    setFilterStatus("all");
    setFilterStars(0);
    setSearchName("");
    setFiltered(feedbacks);
  };

  // =============================
  // 🔥 API gửi phản hồi admin
  // =============================
  const handleSubmitReply = async () => {
    if (!selected || !replyText.trim()) return;

    try {
      await axios.put(`${API_URL}/${selected.id}/reply`, {
        reply: replyText,
      });

      await loadFeedbacks();

      setReplyText("");
      setSelected(null);
      setReplyModal(false);
    } catch (e) {
      console.error("Lỗi gửi phản hồi:", e);
    }
  };

  const total = feedbacks.length;
  const responded = feedbacks.filter(f => f.adminReply).length;
  const percent = total > 0 ? Math.round((responded / total) * 100) : 0;

  return (
    <div className="min-h-screen p-8" style={{ background: "var(--background)" }}>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: "var(--matching-color)" }}>
        <Headphones className="w-9 h-9 text-emerald-500" /> Hỗ trợ & Phản hồi người dùng
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Tổng số phản hồi", value: total, color: "var(--primary-color)" },
          { label: "Đã phản hồi", value: responded, color: "var(--success)" },
          { label: "Tỷ lệ phản hồi", value: `${percent}%`, color: "var(--secondary-color)" },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-xl shadow text-center bg-white border-l-4"
            style={{ borderColor: item.color }}>
            <p className="text-2xl font-semibold" style={{ color: item.color }}>{item.value}</p>
            <p className="text-gray-600 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl shadow-md border mb-6 text-[15px]"
        style={{ fontWeight: 500 }}>
        <div className="grid grid-cols-4 gap-4 mb-4">
          
          <div className="flex flex-col gap-1">
            <label className="text-[var(--matching-color)]">Ngày đánh giá</label>
            <input type="date" value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none w-full"/>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[var(--matching-color)]">Trạng thái</label>
            <select value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none">
              <option value="all">Tất cả</option>
              <option value="responded">Đã phản hồi</option>
              <option value="pending">Chưa phản hồi</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[var(--matching-color)]">Sao trung bình</label>
            <select value={filterStars}
              onChange={(e) => setFilterStars(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 focus:outline-none">
              <option value={0}>Tất cả</option>
              {[1,2,3,4,5].map(s => <option key={s} value={s}>{s} ⭐</option>)}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full py-2 rounded-lg font-medium  text-white hover:opacity-90 transition flex items-center justify-center gap-2"
              style={{ backgroundColor: "#527ea4ff" }}>
              <RefreshCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[var(--matching-color)]">Tìm kiếm theo tên</label>
          <input
            type="text"
            placeholder="Nhập tên người đánh giá..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none w-full"/>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="mt-4 grid gap-4">
        {filtered.map(item => {
          const stars = [
            { label: "Cơ sở vật chất", value: item.facility },
            { label: "Tốc độ đổi pin", value: item.speed },
            { label: "Chất lượng pin", value: item.battery },
            { label: "Giá cả", value: item.price },
            { label: "Nhân viên", value: item.staff },
            { label: "Hài lòng", value: item.satisfaction },
          ];

          return (
            <div
              key={item.id}
              className="p-5 rounded-xl shadow bg-white border relative overflow-visible grid grid-cols-[1fr,160px]"
            >
              <div>
                <h3 className="font-semibold text-lg text-[var(--matching-color)] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-500" /> {item.userName}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  Ngày đánh giá: <span className="text-gray-800 font-medium">{item.date}</span>
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[15px] mb-3">
                  {stars.map((s, idx) => (
                    <p key={idx} className="flex items-center gap-1">
                      {s.label}: <span className="font-semibold text-amber-500">{s.value}⭐</span>
                    </p>
                  ))}
                </div>

                <p className="italic text-gray-900 mb-3">“{item.comment}”</p>

                {item.adminReply && (
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "var(--primary-bg)",
                      border: "1px solid var(--primary-color)",
                    }}
                  >
                    <p className="text-sm text-[var(--text-primary)]">
                      💬 <span className="font-semibold" style={{ color: "var(--secondary-dark)" }}>
                        Phản hồi từ admin:
                      </span> {item.adminReply}
                    </p>
                  </div>
                )}
              </div>

              <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                <span className={`flex items-center gap-1 text-sm font-semibold ${
                  item.adminReply ? "text-[var(--success)]" : "text-[var(--warning)]"
                }`}>
                  {item.adminReply ? (
                    <>
                      <CheckCircle className="w-5 h-5" /> Đã phản hồi
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5" /> Chưa phản hồi
                    </>
                  )}
                </span>

                <button
                  onClick={() => {
                    setSelected(item);
                    setReplyModal(true);
                    setReplyText(item.adminReply || "");
                  }}
                  className="px-3 py-2 text-sm font-medium rounded-lg !bg-green-600 text-white hover:opacity-90 transition shadow"
                  style={{
                    background: "var(--primary-color)",
                    width: "150px",
                    textAlign: "center",
                  }}
                >
                  Ghi phản hồi
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply Modal */}
      {replyModal && selected && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] relative">
            <h3 className="text-lg font-semibold mb-3">Phản hồi {selected.userName}</h3>
            <textarea
              className="w-full border rounded-lg p-2 mb-4"
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReplyModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitReply}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
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
