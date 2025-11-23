import '../../styles/Dashboard.css';
import { OverviewCards } from '../../components/ManagementStationsDashboard/OverviewCards';
import { EnergyConsumption } from '../../components/ManagementStationsDashboard/EnergyConsumption';
import { StationStatus } from '../../components/ManagementStationsDashboard/StationStatus';
import { AlertsPanel } from '../../components/ManagementStationsDashboard/AlertsPanel';
import { EnvironmentalStats } from '../../components/ManagementStationsDashboard/EnvironmentalStats';

function Index() {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard Quản Lý Trạm Sạc</h1>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-row-1">
          <OverviewCards />
        </div>

        <div className="dashboard-row-2">
          <EnvironmentalStats />
          <AlertsPanel />
        </div>

        <div className="dashboard-row-3">
          <EnergyConsumption />
        </div>

        <div className="dashboard-row-4">
          <StationStatus />
        </div>
      </div>
    </div>
  );
}

export default Index;
