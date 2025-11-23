// tính thời gian dự kiến, cho form thêm phiên sạc
export const calculateEstimatedTime = (sessionData: any) => {
  const energyNeeded = (sessionData.batteryCapacity * (80 - sessionData.startBatteryLevel)) / 100;
  const hours = energyNeeded / sessionData.maxChargingRate;
  
  if (hours < 1) {
    return `${Math.round(hours * 60)} phút`;
  } else {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours} giờ ${minutes} phút` : `${wholeHours} giờ`;
  }
};