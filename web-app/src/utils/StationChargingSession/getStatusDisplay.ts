export const getStatusDisplay = (status: string): string => {
  const statusMap: any = {
    'ACTIVE': '🟢 Đang sạc',
    'COMPLETED': '✅ Hoàn thành', 
    'CANCELLED': '❌ Đã hủy',
    'PAUSED': '⏸️ Tạm dừng',
    'PENDING': '⏳ Chờ xử lý',
    'FAILED': '🔴 Lỗi'
  };
  return statusMap[status] || status;
};