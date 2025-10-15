export async function getAllTransactions() {
  // Giả lập API — thay bằng fetch hoặc axios
  return Promise.resolve([
    {
      id: 'TX001',
      driverName: 'Nguyen Van A',
      batteryReturned: 'BAT001',
      batteryIssued: 'BAT004',
      payment: '150,000đ',
      time: '2025-10-14 10:25',
    },
    {
      id: 'TX002',
      driverName: 'Tran Thi B',
      batteryReturned: 'BAT002',
      batteryIssued: 'BAT003',
      payment: '120,000đ',
      time: '2025-10-14 11:10',
    },
  ]);
}
