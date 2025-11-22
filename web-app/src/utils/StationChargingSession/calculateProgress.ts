// tiến độ sạc thực tế
export const calculateProgress = (session: any) => {
  if (session.endBatteryLevel) {
    return 100;
  }
  
  // Nếu đang sạc, tính % thực tế dựa trên startBatteryLevel và target 80%
  const targetBatteryLevel = 100;
  const currentLevel = session.currentBatteryLevel || session.startBatteryLevel;
  const progress = ((currentLevel - session.startBatteryLevel) / 
                   (targetBatteryLevel - session.startBatteryLevel)) * 100;
  
  return Math.min(Math.max(progress, 0), 100);
};