export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

// Hàm này có thể đặt trong một file tiện ích (utility file)
/**
 * Chuyển đổi chuỗi ngày tháng ISO (ví dụ: "2025-11-17T...") thành chuỗi định dạng tiếng Việt.
 * @param isoString Chuỗi ngày tháng theo chuẩn ISO 8601 (có thể là undefined/null).
 * @returns Chuỗi ngày tháng đã định dạng, hoặc chuỗi rỗng nếu đầu vào không hợp lệ.
 */
export const formatDateTime = (isoString?: string | null): string => {
  // 1. Kiểm tra đầu vào: chấp nhận string, null, hoặc undefined.
  if (!isoString) {
    return "";
  }

  try {
    // 2. Tạo đối tượng Date. Chuỗi ISO 8601 là định dạng được new Date() hỗ trợ.
    const date = new Date(isoString);

    // Kiểm tra xem đối tượng Date có hợp lệ không (tránh lỗi "Invalid Date")
    if (isNaN(date.getTime())) {
      throw new Error("Chuỗi ngày tháng không hợp lệ.");
    }

    // 3. Tùy chỉnh định dạng theo locale 'vi-VN'
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Dùng định dạng 24 giờ (00:00:00 - 23:59:59)
    });
  } catch (error) {
    // 4. Xử lý lỗi và trả về chuỗi gốc (hoặc chuỗi rỗng)
    console.error("Lỗi định dạng ngày tháng:", isoString, error);
    return isoString; // Trả về chuỗi gốc nếu định dạng thất bại
  }
};
