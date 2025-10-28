import React, { useMemo, useState } from "react";

// AdminReportDashboard.tsx
// - Single-file React + TypeScript component for a Vite project
// - Uses Tailwind CSS utility classes for styling (if you don't have Tailwind, basic classes will still work but styling will be reduced)
// - Draws charts using plain HTML + CSS (no chart libraries)
// - Mock data included and simulated aggregation functions

type Station = { id: string; name: string; area?: string };
type TxType = "swap" | "rental";
type Transaction = {
  id: string;
  stationId: string;
  type: TxType;
  amount: number; // VND (or arbitrary)
  packageId?: string; // for rentals
  timestamp: string; // ISO
};

const mockStations: Station[] = [
  { id: "s1", name: "Trạm A", area: "Quận 1" },
  { id: "s2", name: "Trạm B", area: "Quận 2" },
  { id: "s3", name: "Trạm C", area: "Quận 3" },
];

// generate some mock transactions over 90 days
function generateMockTransactions(): Transaction[] {
  const txs: Transaction[] = [];
  const now = new Date();
  for (let d = 0; d < 120; d++) {
    const day = new Date(now);
    day.setDate(now.getDate() - d);
    // random number of events per day
    const events = Math.floor(Math.random() * 8) + 2;
    for (let i = 0; i < events; i++) {
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const ts = new Date(day);
      ts.setHours(hour, minute, Math.floor(Math.random() * 60));
      const station = mockStations[Math.floor(Math.random() * mockStations.length)];
      const isRental = Math.random() < 0.35; // 35% rentals
      txs.push({
        id: `${d}-${i}-${Math.random().toString(36).slice(2, 8)}`,
        stationId: station.id,
        type: isRental ? "rental" : "swap",
        amount: isRental ? (Math.floor(Math.random() * 500) + 200) * 1000 : (Math.floor(Math.random() * 150) + 20) * 1000,
        packageId: isRental ? `pkg-${Math.floor(Math.random() * 4) + 1}` : undefined,
        timestamp: ts.toISOString(),
      });
    }
  }
  return txs;
}

const MOCK_TRANSACTIONS = generateMockTransactions();

// Helpers for grouping
function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function formatShortDate(d: Date) {
  return d.toLocaleDateString();
}

function getMonthIndex(d: Date) {
  return d.getFullYear() * 100 + d.getMonth() + 1; // e.g. 202510
}

function getWeekKey(date: Date) {
  // simple ISO week-year key
  const temp = new Date(date.getTime());
  temp.setHours(0, 0, 0, 0);
  temp.setDate(temp.getDate() + 4 - (temp.getDay() || 7));
  const yearStart = new Date(temp.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((temp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${temp.getFullYear()}-W${weekNo}`;
}

export default function AdminReportDashboard() {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [selectedStation, setSelectedStation] = useState<string | "all">("all");
  const [groupBy, setGroupBy] = useState<"week" | "month" | "year">("week");
  const [fromDate, setFromDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });
  const [toDate, setToDate] = useState<string>(() => new Date().toISOString().slice(0, 10));

  // Filtered txs
  const filtered = useMemo(() => {
    const f = transactions.filter((t) => {
      if (selectedStation !== "all" && t.stationId !== selectedStation) return false;
      const tdate = new Date(t.timestamp);
      const from = new Date(fromDate + "T00:00:00");
      const to = new Date(toDate + "T23:59:59");
      return tdate >= from && tdate <= to;
    });
    return f;
  }, [transactions, selectedStation, fromDate, toDate]);

  // Aggregations for revenue grouping
  const revenueBuckets = useMemo(() => {
    if (groupBy === "week") {
      // show last 7 days as 7 columns
      const days: { label: string; value: number }[] = [];
      const end = new Date(toDate + "T23:59:59");
      for (let i = 6; i >= 0; i--) {
        const d = new Date(end);
        d.setDate(end.getDate() - i);
        const label = d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });
        const start = startOfDay(d).toISOString();
        const endDay = new Date(d);
        endDay.setHours(23, 59, 59, 999);
        const value = filtered
          .filter((t) => new Date(t.timestamp) >= new Date(start) && new Date(t.timestamp) <= endDay)
          .reduce((s, t) => s + t.amount, 0);
        days.push({ label, value });
      }
      return days;
    }

    if (groupBy === "month") {
      // 4 main weeks of the selected month range: split by 4 equal parts between fromDate and toDate
      const start = new Date(fromDate + "T00:00:00");
      const end = new Date(toDate + "T23:59:59");
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (24 * 3600 * 1000)) + 1;
      const chunk = Math.max(1, Math.ceil(totalDays / 4));
      const buckets: { label: string; value: number }[] = [];
      for (let i = 0; i < 4; i++) {
        const s = new Date(start);
        s.setDate(start.getDate() + i * chunk);
        const e = new Date(s);
        e.setDate(s.getDate() + chunk - 1);
        if (s > end) {
          buckets.push({ label: `W${i + 1}`, value: 0 });
          continue;
        }
        if (e > end) e.setTime(end.getTime());
        const value = filtered.filter((t) => new Date(t.timestamp) >= s && new Date(t.timestamp) <= e).reduce((s, t) => s + t.amount, 0);
        buckets.push({ label: `${formatShortDate(s)} - ${formatShortDate(e)}`, value });
      }
      return buckets;
    }

    // year -> 12 months
    if (groupBy === "year") {
      const start = new Date(fromDate + "T00:00:00");
      const end = new Date(toDate + "T23:59:59");
      const buckets: { label: string; value: number }[] = [];
      // determine months between start and end but render 12 columns for calendar year if range spans less
      const monthsMap = new Map<number, number>();
      let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
      while (cursor <= end) {
        const key = cursor.getFullYear() * 100 + cursor.getMonth();
        monthsMap.set(key, 0);
        cursor.setMonth(cursor.getMonth() + 1);
      }
      // Ensure at least 12 months (last 12)
      if (monthsMap.size < 12) {
        monthsMap.clear();
        cursor = new Date();
        cursor.setMonth(cursor.getMonth() - 11, 1);
        for (let i = 0; i < 12; i++) {
          const key = cursor.getFullYear() * 100 + cursor.getMonth();
          monthsMap.set(key, 0);
          cursor.setMonth(cursor.getMonth() + 1);
        }
      }
      // sum
      Array.from(monthsMap.keys()).forEach((k) => monthsMap.set(k, 0));
      filtered.forEach((t) => {
        const dt = new Date(t.timestamp);
        const key = dt.getFullYear() * 100 + dt.getMonth();
        if (monthsMap.has(key)) monthsMap.set(key, (monthsMap.get(key) || 0) + t.amount);
      });
      for (const key of monthsMap.keys()) {
        const year = Math.floor(key / 100);
        const month = key % 100;
        const label = new Date(year, month).toLocaleString(undefined, { month: "short", year: "numeric" });
        buckets.push({ label, value: monthsMap.get(key) || 0 });
      }
      return buckets;
    }

    return [];
  }, [filtered, groupBy, fromDate, toDate]);

  // total revenue
  const totalRevenue = useMemo(() => filtered.reduce((s, t) => s + t.amount, 0), [filtered]);

  // swaps count & rentals count
  const swapsCount = useMemo(() => filtered.filter((t) => t.type === "swap").length, [filtered]);
  const rentalsCount = useMemo(() => filtered.filter((t) => t.type === "rental").length, [filtered]);

  // frequency: swaps per day (simple example: show counts for last 7 days)
  const frequencyBuckets = useMemo(() => {
    const end = new Date(toDate + "T23:59:59");
    const arr: { label: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      const s = startOfDay(d);
      const e = new Date(s);
      e.setHours(23, 59, 59, 999);
      const value = filtered.filter((t) => t.type === "swap" && new Date(t.timestamp) >= s && new Date(t.timestamp) <= e).length;
      arr.push({ label: d.toLocaleDateString(undefined, { weekday: "short" }), value });
    }
    return arr;
  }, [filtered, toDate]);

  // peak hours
  const peakHours = useMemo(() => {
    const buckets = new Array(24).fill(0);
    filtered.forEach((t) => {
      const h = new Date(t.timestamp).getHours();
      buckets[h]++;
    });
    return buckets.map((v, i) => ({ hour: i, value: v })).sort((a, b) => b.value - a.value).slice(0, 5);
  }, [filtered]);

  // popular packages
  const popularPackages = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((t) => {
      if (t.type === "rental" && t.packageId) map.set(t.packageId, (map.get(t.packageId) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [filtered]);

  // helpers for rendering bar heights
  function normalize(values: number[]) {
    const max = Math.max(...values, 1);
    return values.map((v) => Math.round((v / max) * 100));
  }

  const revenuePercents = normalize(revenueBuckets.map((b) => b.value));
  const frequencyPercents = normalize(frequencyBuckets.map((b) => b.value));

  return (
    <div className="p-4 max-w-full">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Báo cáo - Thống kê cho Admin</h1>
        <div className="flex gap-3 items-center">
          <select
            className="border p-2 rounded"
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value as any)}
          >
            <option value="all">Tất cả trạm</option>
            {mockStations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.area}
              </option>
            ))}
          </select>

          <select className="border p-2 rounded" value={groupBy} onChange={(e) => setGroupBy(e.target.value as any)}>
            <option value="week">Tuần</option>
            <option value="month">Tháng (4 tuần)</option>
            <option value="year">Năm (12 tháng)</option>
          </select>

          <input className="border p-2 rounded" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <input className="border p-2 rounded" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Doanh thu (tổng)</div>
          <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} đ</div>
          <div className="text-sm text-gray-600 mt-2">(Đổi pin + Thuê pin)</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Lượt đổi pin</div>
          <div className="text-2xl font-bold">{swapsCount}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Lượt thuê pin</div>
          <div className="text-2xl font-bold">{rentalsCount}</div>
        </div>
      </section>

      {/* Revenue Chart */}
      <section className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Báo cáo doanh thu — {groupBy}</h2>
        <div className="w-full h-56 flex items-end gap-2">
          {revenueBuckets.map((b, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t transition-all origin-bottom"
                style={{ height: `${revenuePercents[idx]}%`, background: "linear-gradient(180deg,#60a5fa, #3b82f6)" }}
                title={`${b.label}: ${b.value.toLocaleString()} đ`}
              />
              <div className="text-xs mt-2 text-center">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequency chart */}
      <section className="mb-8 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Tần suất đổi pin (7 ngày gần nhất)</h3>
        <div className="w-full h-40 flex items-end gap-3">
          {frequencyBuckets.map((b, i) => (
            <div className="flex-1 flex flex-col items-center" key={i}>
              <div
                className="w-2/3 rounded-t transition-all origin-bottom"
                style={{ height: `${frequencyPercents[i]}%`, background: "linear-gradient(180deg,#34d399,#10b981)" }}
                title={`${b.label}: ${b.value} lượt`}
              />
              <div className="text-xs mt-2">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Peak hours and popular packages */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-semibold mb-3">Giờ cao điểm (top 5)</h4>
          <ul className="space-y-2">
            {peakHours.map((p) => (
              <li key={p.hour} className="flex justify-between">
                <span>Giờ {p.hour}:00</span>
                <span className="font-medium">{p.value} lượt</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-semibold mb-3">Gói thuê đắt khách (top 5)</h4>
          {popularPackages.length ? (
            <ol className="list-decimal pl-5">
              {popularPackages.map(([pkg, count]) => (
                <li key={pkg} className="mb-1">
                  <div className="flex justify-between">
                    <span>{pkg}</span>
                    <span className="font-medium">{count} lượt</span>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="text-sm text-gray-500">Không có dữ liệu thuê trong khoảng thời gian này</div>
          )}
        </div>
      </section>

      {/* Detail table (simple) */}
      <section className="mt-6 bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-3">Chi tiết giao dịch (một vài dòng)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Thời gian</th>
                <th className="p-2">Trạm</th>
                <th className="p-2">Loại</th>
                <th className="p-2">Gói (nếu có)</th>
                <th className="p-2">Số tiền</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 30).map((t, i) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{new Date(t.timestamp).toLocaleString()}</td>
                  <td className="p-2">{mockStations.find((s) => s.id === t.stationId)?.name || t.stationId}</td>
                  <td className="p-2">{t.type}</td>
                  <td className="p-2">{t.packageId ?? "-"}</td>
                  <td className="p-2">{t.amount.toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
  