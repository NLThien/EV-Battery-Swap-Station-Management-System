export async function getAllBatteries() {
  // Giả lập API — thay bằng fetch hoặc axios
  return Promise.resolve([
    { id: 'BAT001', model: 'EVE-X1', capacity: '5.2 kWh', status: 'Full', health: 95 },
    { id: 'BAT002', model: 'EVE-X1', capacity: '5.2 kWh', status: 'Charging', health: 90 },
    { id: 'BAT003', model: 'EVE-X2', capacity: '7.5 kWh', status: 'Maintenance', health: 85 },
  ]);
}
