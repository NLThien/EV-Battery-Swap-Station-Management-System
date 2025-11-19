import React, { useState, useMemo } from "react";

type Transaction = {
  id: string;
  stationId: string;
  type: "swap" | "rental" ;
  amount: number;
  date: string;
  hour?: number;
  packageName?: string;
};

const showTooltip = (e: React.MouseEvent, text: string) => {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.textContent = text;
    tooltip.classList.remove("hidden");
    tooltip.style.left = `${e.pageX + 12}px`;
    tooltip.style.top = `${e.pageY - 28}px`;
  }
};

const hideTooltip = () => {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) tooltip.classList.add("hidden");
};

const STATIONS = [
  { id: "s1", name: "Trạm A" },
  { id: "s2", name: "Trạm B" },
  { id: "s3", name: "Trạm C" },
  { id: "s4", name: "Trạm D" },
];

// 🔹 Giả lập dữ liệu giao dịch
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", stationId: "s1", type: 'swap', amount: 50_000_000, date: new Date().toISOString(), hour: 9, packageName: "Gói tiêu chuẩn" },
  { id: "2", stationId: "s1", type: 'swap', amount: 120_000_000, date: new Date(Date.now() - 86400000).toISOString(), hour: 14, packageName: "Gói cơ bản" },
  { id: "3", stationId: "s2", type: 'rental', amount: 200_000_000, date: new Date(Date.now() - 2 * 86400000).toISOString(), hour: 17, packageName: "Gói VIP" },
  ...Array.from({ length: 40 }).map((_, i) => ({
    id: `t-${i}`,
    stationId: STATIONS[Math.floor(Math.random() * STATIONS.length)].id,
    type: Math.random() > 0.5 ? "swap" : "rental" as "swap" | "rental",
    amount: 30_000_000 + Math.random() * 150_000_000,
    date: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toISOString(),
    hour: Math.floor(Math.random() * 24),
    packageName: ["Gói cơ bản", "Gói tiêu chuẩn", "Gói VIP", "Gói doanh nghiệp", "Gói linh hoạt"][Math.floor(Math.random() * 5)],
  })),
];

const AdminReportDashboard: React.FC = () => {
  const [view, setView] = useState<"week" | "month" | "year">("week");
  const [selectedStation, setSelectedStation] = useState<string>("Tất cả");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [visibleRows, setVisibleRows] = useState<number>(10);

  const filteredData = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((t) => {
      const stationName = STATIONS.find((s) => s.id === t.stationId)?.name ?? "Không xác định";
      const matchStation = selectedStation === "Tất cả" || stationName === selectedStation;
      const matchStart = !startDate || new Date(t.date) >= new Date(startDate);
      const matchEnd = !endDate || new Date(t.date) <= new Date(endDate);
      return matchStation && matchStart && matchEnd;
    });
  }, [selectedStation, startDate, endDate]);

  const totalRevenue = useMemo(() => filteredData.reduce((acc, t) => acc + t.amount, 0), [filteredData]);
  const totalSwap = useMemo(() => filteredData.filter(t => t.type === "swap").length, [filteredData]);
  const totalRental = useMemo(() => filteredData.filter(t => t.type === "rental").length, [filteredData]);

  // 🔹 Gom dữ liệu theo view và sắp thứ tự tuần chuẩn
  const groupedData = useMemo(() => {
    const map = new Map<string, number>();
    const days = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];

    if (view === "week") {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7)); // Thứ 2 đầu tuần

      const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const label = `${days[i]} - ${d.getDate()}/${d.getMonth() + 1}`;
        return { label, date: d };
      });

      weekDays.forEach(({ label, date }) => {
        const total = filteredData
          .filter(t => new Date(t.date).toDateString() === date.toDateString())
          .reduce((acc, t) => acc + t.amount, 0);
        map.set(label, total);
      });
    } else if (view === "month") {
      filteredData.forEach(t => {
        const d = new Date(t.date);
        const key = `Tuần ${Math.ceil(d.getDate() / 7)}`;
        map.set(key, (map.get(key) || 0) + t.amount);
      });
    } else {
      filteredData.forEach(t => {
        const d = new Date(t.date);
        const key = `Tháng ${d.getMonth() + 1}`;
        map.set(key, (map.get(key) || 0) + t.amount);
      });
    }

    // 👉 Sắp xếp đúng thứ tự ngày trong tuần
    return Array.from(map.entries()).sort((a, b) => {
      const order = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];
      const aDay = order.findIndex(d => a[0].startsWith(d));
      const bDay = order.findIndex(d => b[0].startsWith(d));
      return aDay - bDay;
    });
  }, [filteredData, view]);

  // 🔹 Tần suất đổi pin 7 ngày gần nhất
  const frequencyData = useMemo(() => {
    const days = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dayLabel = `${days[i]} - ${date.getDate()}/${date.getMonth() + 1}`;
      const count = filteredData.filter(
        t => t.type === "swap" && new Date(t.date).toDateString() === date.toDateString()
      ).length;
      return { label: dayLabel, count };
    });
  }, [filteredData]);

  const peakHourData = useMemo(() => {
    const map = new Map<number, number>();
    filteredData.forEach(t => {
      const hour = t.hour ?? 0;
      map.set(hour, (map.get(hour) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [filteredData]);

  const topPackages = useMemo(() => {
    const map = new Map<string, number>();
    filteredData.forEach(t => {
      if (t.packageName && t.type === "rental") {
        map.set(t.packageName, (map.get(t.packageName) || 0) + 1);
      }
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [filteredData]);

  return (
    <div className="p-4 max-w-6xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-4 text-center">📊 Thống kê & Báo cáo Doanh thu Trạm</h1>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <select className="border p-2 rounded" value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)}>
          <option value="Tất cả">Tất cả trạm</option>
          {STATIONS.map((s) => (<option key={s.id} value={s.name}>{s.name}</option>))}
        </select>
        <select className="border p-2 rounded" value={view} onChange={(e) => setView(e.target.value as any)}>
          <option value="week">Theo tuần</option>
          <option value="month">Theo tháng</option>
          <option value="year">Theo năm</option>
        </select>
        <input type="date" className="border p-2 rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" className="border p-2 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      {/* Tổng quan */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-blue-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Tổng doanh thu</p>
          <p className="text-xl font-bold text-blue-600">{(totalRevenue / 1_000_000).toFixed(1)} triệu</p>
        </div>
        <div className="bg-green-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Lượt đổi pin</p>
          <p className="text-xl font-bold text-green-600">{totalSwap}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Lượt thuê pin</p>
          <p className="text-xl font-bold text-yellow-600">{totalRental}</p>
        </div>
      </div>

      {/* Tooltip */}
      <div id="tooltip" className="hidden absolute bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none"></div>

      {/* ======= Biểu đồ doanh thu & Tần suất đổi pin ======= */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  {/* Biểu đồ doanh thu */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="font-semibold text-lg mb-2 text-center">Doanh thu theo {view}</h2>
    <div className="relative flex items-end gap-3 border-l border-b border-gray-300 px-6 h-64">
      {/* Trục Y */}
      <div className="absolute left-0 bottom-0 flex flex-col justify-between h-full py-2 text-xs text-gray-500">
        {[...Array(6)].map((_, i) => {
          const maxVal = Math.max(...groupedData.map(([_, v]) => v)) || 1;
          const roundedMax = Math.ceil(maxVal / 10_000_000) * 10_000_000;
          const val = Math.round((roundedMax / 5) * (5 - i));
          return <div key={i}>{(val / 1_000_000).toFixed(0)}tr</div>;
        })}
      </div>

      {/* Cột */}
      <div className="flex items-end gap-3 w-full ml-8">
        {groupedData.map(([label, value], i) => {
          const maxValue = Math.max(...groupedData.map(([_, v]) => v)) || 1;
          const height = (value / (maxValue * 1.1)) * 200;
          return (
            <div key={i} className="flex flex-col items-center w-10 relative group hover:z-10 overflow-visible">
              <div
                className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap"
                style={{ 
                  backgroundColor: 'rgba(62, 41, 41, 0.75)',
                  color: '#8df0efff',
                  transform: "translateY(-4px)",
                 }}
              >
                {label}: {value.toLocaleString()}₫
              </div>
              <div
                className="bg-blue-500 w-full rounded-t shadow-md transition-all duration-300 group-hover:bg-blue-600"
                style={{ height: `${height}px` }}
              ></div>
              <span className="text-xs mt-1 text-center">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>

  {/* Biểu đồ tần suất đổi pin */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="font-semibold text-lg mb-2 text-center">Tần suất đổi pin 7 ngày gần nhất</h2>
    <div className="relative w-full h-64 flex items-end gap-4 border-l border-b border-gray-300 px-6">
      {frequencyData.map(({ label, count }, i) => {
        const maxFreq = Math.max(...frequencyData.map((f) => f.count)) || 1;
        const height = (count / (maxFreq * 1.1)) * 200;
        return (
          <div key={i} className="flex flex-col items-center w-10 relative group">
            <div
              className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2"
              style={{ 
                backgroundColor: 'rgba(62, 41, 41, 0.75)',
                color: '#8df0efff',
                transform: "translateY(-4px)" }}
            >
              {count} lượt
            </div>
            <div
              className="bg-green-500 w-full rounded-t shadow-md transition-all duration-300 group-hover:bg-green-600"
              style={{ height: `${height}px` }}
            ></div>
            <span className="text-xs mt-1 text-center">{label}</span>
          </div>
        );
      })}
    </div>
  </div>
</div>

{/* ======= Giờ cao điểm & Top 5 gói thuê ======= */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
  {/* Giờ cao điểm - chiếm 2/3 */}
  <div className="md:col-span-2 bg-white p-4 rounded shadow">
    <h2 className="font-semibold text-lg mb-2 text-center">Giờ cao điểm (0h - 23h)</h2>
    <div className="relative w-full h-64 flex items-end gap-[3px] border-l border-b border-gray-300 px-4 overflow-hidden">
      {Array.from({ length: 24 }).map((_, hour) => {
        // Lấy số lượt tương ứng giờ này (nếu không có => 0)
        const found = peakHourData.find(([h]) => h === hour);
        const count = found ? found[1] : 0;

        const maxVal = Math.max(...peakHourData.map(([, c]) => c)) || 1;
        const height = count > 0 ? (count / (maxVal * 1.1)) * 200 : 0;

        return (
          <div key={hour} className="flex flex-col items-center w-6 relative group hover:z-10 overflow-visible">
            {/* Tooltip khi hover */}
            {count > 0 && (
              <div
                className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-20"
                style={
                  { backgroundColor: 'rgba(62, 41, 41, 0.75)',
                  color: '#8df0efff',
                  transform: "translateY(-4px)" }}
              >
                {hour}h: {count} lượt
              </div>
            )}

            {/* Cột */}
            <div
              className={`w-full rounded-t shadow-md transition-all duration-300 ${
                count > 0 ? "bg-orange-500 group-hover:bg-orange-600" : "bg-transparent"
              }`}
              style={{ height: `${height}px` }}
            ></div>

            {/* Nhãn giờ */}
            <span className="text-[10px] mt-1 text-center">{hour}</span>
          </div>
        );
      })}
    </div>
  </div>

  {/* Top 5 gói thuê - chiếm 1/3 */}
  <div className="bg-white p-4 rounded shadow flex flex-col h-full">
    <h2 className="font-semibold text-lg mb-2 text-center">Top 5 gói thuê phổ biến nhất</h2>
    <table className="min-w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Tên gói</th>
          <th className="border p-2">Số lượt thuê</th>
        </tr>
      </thead>
      <tbody>
        {topPackages.map(([name, count]) => (
          <tr key={name} className="odd:bg-white even:bg-gray-50">
            <td className="border p-2">{name}</td>
            <td className="border p-2 text-center">{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



      {/* Bảng chi tiết */}
      <h2 className="font-semibold text-lg mt-6 mb-2">Chi tiết giao dịch</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Trạm</th>
              <th className="border p-2">Loại</th>
              <th className="border p-2">Số tiền</th>
              <th className="border p-2">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, visibleRows).map((t) => (
              <tr key={t.id} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2 text-center">{t.id}</td>
                <td className="border p-2">{STATIONS.find((s) => s.id === t.stationId)?.name ?? "?"}</td>
                <td className="border p-2 text-center">{t.type === "swap" ? "Đổi pin" : "Thuê pin"}</td>
                <td className="border p-2 text-right">{t.amount.toLocaleString()} ₫</td>
                <td className="border p-2 text-center">{new Date(t.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleRows < filteredData.length && (
        <div className="text-center mt-4">
          <button
            className="px-4 py-2 text-white rounded shadow hover:opacity-80 transition"
            style={{backgroundColor: "#8df0efff"}}
            onClick={() => setVisibleRows((prev) => prev + 10)}
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminReportDashboard;
