// sạc thực tế
import {calculateCurrentBatteryLevel} from './calculateCurrentBatteryLevel'

export const calculateActualEnergyDelivered = (session: any) => {
  if (session.energy_delivered || session.energyDelivered) {
    return session.energy_delivered || session.energyDelivered;
  }
  
  if (session.status !== 'ACTIVE') {
    return 0; // Chưa sạc
  }
  
  const currentLevel = session.currentBatteryLevel || calculateCurrentBatteryLevel(session);
  const startLevel = session.start_battery_level || session.startBatteryLevel;
  const batteryCapacity = session.battery_capacity || session.batteryCapacity;
  
  const batteryIncrease = currentLevel - startLevel;
  return (batteryCapacity * batteryIncrease) / 100;
};