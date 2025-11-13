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
