// từ 0 về +84
export function formatPhoneNumberVN(phone: string): string {
  // Bỏ ký tự không phải số
  let cleaned = phone.replace(/[^\d+]/g, "");

  // Nếu bắt đầu bằng 0 -> thay bằng +84
  if (cleaned.startsWith("0")) {
    cleaned = "+84" + cleaned.slice(1);
  } else if (!cleaned.startsWith("+84")) {
    cleaned = "+84" + cleaned;
  }

  return cleaned;
}

// từ +84 về 0
export function formatPhoneNumberLocal(phone: string): string {
  if (!phone) return "";

  // Xóa các ký tự không phải số hoặc dấu +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Nếu bắt đầu bằng +84 → đổi thành 0
  if (cleaned.startsWith("+84")) {
    return "0" + cleaned.slice(3);
  }

  // Nếu đã bắt đầu bằng 0 → giữ nguyên
  if (cleaned.startsWith("0")) {
    return cleaned;
  }

  // Nếu NHẬP lung tung (vd: 8497xxx...) → tự chuẩn hóa
  if (cleaned.startsWith("84")) {
    return "0" + cleaned.slice(2);
  }

  // Mọi trường hợp còn lại
  return cleaned;
}
