// tính mức pin hiện tại (giả lập tăng dần)
export const calculateCurrentBatteryLevel = (session: any) => {
  if (session.endBatteryLevel) {
    return session.endBatteryLevel; // Đã kết thúc
  }
  
  if (session.status !== 'ACTIVE') {
    return session.startBatteryLevel; // Chưa bắt đầu sạc
  }
  
  // Giả lập pin tăng dần theo thời gian
  // Trong thực tế, cần lấy từ API real-time
  const startTime = new Date(session.startTime).getTime();
  const now = new Date().getTime();
  const elapsedHours = (now - startTime) / (1000 * 60 * 60); // Giờ đã trôi qua
  
  // mỗi giờ tăng (maxChargingRate / batteryCapacity * 100) %
  const chargeRatePerHour = (session.maxChargingRate / session.batteryCapacity) * 100;
  const batteryIncrease = elapsedHours * chargeRatePerHour;
  const currentLevel = session.startBatteryLevel + batteryIncrease;
  
  return Math.min(Math.round(currentLevel), 80); // Không vượt quá 80%
};