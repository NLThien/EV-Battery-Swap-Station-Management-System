// sạc thực tế
import {calculateCurrentBatteryLevel} from './calculateCurrentBatteryLevel'

export const calculateActualEnergyDelivered = (session: any) => {
  if (session.energyDelivered) {
    return session.energyDelivered; // Đã có data từ server
  }
  
  if (session.status !== 'ACTIVE') {
    return 0; // Chưa sạc
  }
  
  const currentLevel = calculateCurrentBatteryLevel(session);
  const batteryIncrease = currentLevel - session.startBatteryLevel;
  return (session.batteryCapacity * batteryIncrease) / 100;
};