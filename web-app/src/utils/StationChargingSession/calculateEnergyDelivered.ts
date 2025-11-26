export const calculateEnergyDelivered = (session: any, currentBatteryLevel: number): number => {
  if (!session) return 0;
  const batteryIncrease = currentBatteryLevel - session.startBatteryLevel;
  return (session.batteryCapacity * batteryIncrease) / 100;
};