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
        <div className="header-actions">
          <button className="btn-primary">Báo Cáo</button>
          <button className="btn-secondary">Cài Đặt</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-left">
          <OverviewCards />
          <EnergyConsumption />
          <EnvironmentalStats />
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          <StationStatus />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}

export default Index;
