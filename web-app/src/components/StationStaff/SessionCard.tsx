// components/SessionCard.tsx
import { calculateActualEnergyDelivered } from '../../utils/StationChargingSession/calculateActualEnergyDelivered';
import { calculateCurrentBatteryLevel } from '../../utils/StationChargingSession/calculateCurrentBatteryLevel';
import { calculateElapsedTime } from '../../utils/StationChargingSession/calculateElapsedTime';
import { calculateProgress } from '../../utils/StationChargingSession/calculateProgress';
import { getStatusDisplay } from '../../utils/StationChargingSession/getStatusDisplay';
import { getStatusBadgeClass } from '../../utils/StationChargingSession/getStatusBadgeClass';
import './SessionCard.css';

interface SessionCardProps {
  session: any;
  onComplete: (sessionId: string, targetBatteryLevel?: number) => void;
  onPause: (sessionId: string) => void;
  onResume: (sessionId: string) => void;
  onCancel: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
}

export const SessionCard = ({ 
  session, 
  onComplete, 
  onPause, 
  onResume, 
  onCancel, 
  onDelete 
}: SessionCardProps) => {
  return (
    <div className="session-card">
      <div className="session-header">
        <span className={getStatusBadgeClass(session.status)}>
          {getStatusDisplay(session.status)}
        </span>
        <span className="session-id">#{session.id.slice(-8)}</span>
      </div>
      
      <div className="session-info">
        <div className="info-row">
          <span className="label">User:</span>
          <span className="value">{session.userId}</span>
        </div>
        <div className="info-row">
          <span className="label">Xe:</span>
          <span className="value">{session.vehicleType}</span>
        </div>
        <div className="info-row">
          <span className="label">Dung lượng pin:</span>
          <span className="value">{session.batteryCapacity} kWh</span>
        </div>
        
        <div className="charging-info">
          <div className="info-row">
            <span className="label">Sạc từ:</span>
            <span className="value">{session.startBatteryLevel}%</span>
          </div>
          <div className="info-row">
            <span className="label">Hiện tại:</span>
            <span className="value">
              {session.status === 'ACTIVE' 
                ? `${calculateCurrentBatteryLevel(session)}%` 
                : session.endBatteryLevel 
                  ? `${session.endBatteryLevel}%` 
                  : `${session.startBatteryLevel}%`
              }
            </span>
          </div>
          
          {/* hiện thị năng lượng sạc */}
          <div className="info-row">
            <span className="label">Đã sạc:</span>
            <span className="value">
              {calculateActualEnergyDelivered(session).toFixed(2)} kWh
            </span>
          </div>
          
          {/* hiển thị thời gian đã sạc */}
          <div className="info-row">
            <span className="label">Thời gian:</span>
            <span className="value">{calculateElapsedTime(session)}</span>
          </div>
        </div>

        {/* thanh % làm cho đẹp */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${calculateProgress(session)}%` }}
            />
          </div>
          <span className="progress-text">{Math.round(calculateProgress(session))}%</span>
        </div>
      </div>

      <div className="session-actions">
        {session.status === 'ACTIVE' && (
          <>
            <button className="btn-success" onClick={() => onComplete(session.id, 100)}>Kết Thúc</button>
            <button className="btn-warning" onClick={() => onPause(session.id)}>Tạm Dừng</button>
            <button className="btn-error" onClick={() => onCancel(session.id)}>Hủy</button>
          </>
        )}
        
        {session.status === 'PAUSED' && (
          <>
            <button className="btn-success" onClick={() => onResume(session.id)}>Tiếp Tục</button>
            <button className="btn-error" onClick={() => onCancel(session.id)}>Hủy</button>
          </>
        )}
        
        {(session.status === 'COMPLETED' || session.status === 'CANCELLED') && (
          <button className="btn-secondary" onClick={() => onDelete(session.id)}>Xóa</button>
        )}
      </div>
    </div>
  );
};