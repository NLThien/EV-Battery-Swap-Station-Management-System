import { useChargingSessions } from '../../hooks/useChargingSessions';
import { useEffect, useState } from 'react';
import './StationChargingSessions.css'
import { calculateActualEnergyDelivered } from '../../utils/StationChargingSession/calculateActualEnergyDelivered'
import { calculateCurrentBatteryLevel } from '../../utils/StationChargingSession/calculateCurrentBatteryLevel'
import { calculateElapsedTime } from '../../utils/StationChargingSession/calculateElapsedTime'
import { calculateEnergyDelivered } from '../../utils/StationChargingSession/calculateEnergyDelivered'
import { calculateProgress } from '../../utils/StationChargingSession/calculateProgress'
import { getStatusDisplay} from '../../utils/StationChargingSession/getStatusDisplay'
import { getStatusBadgeClass} from '../../utils/StationChargingSession/getStatusBadgeClass'

interface StationChargingSessionsProps {
  stationId: string;
}

export const StationChargingSessions = ({ stationId }: StationChargingSessionsProps) => {
  const { 
    sessions, 
    getActiveSessionsByStation,
    getSessionsByStation,
    getSessionsByStatus,
    startSession,
    completeSession, 
    cancelSession,
    deleteSession,
    pauseSession,
    resumeSession,
    loading, 
    error 
  } = useChargingSessions();

  const [showAddForm, setShowAddForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [displaySessions, setDisplaySessions] = useState<any[]>([]);
  const [newSession, setNewSession] = useState({
    userId: '',
    vehicleName: '',
    batteryCapacity: 50,
    startBatteryLevel: 20,
    maxChargingRate: 7.4
  });

  useEffect(() => {
    if (stationId) {
      loadSessions();
    }
  }, [stationId, statusFilter]);

  // cập nhật thực tế
  useEffect(() => {
    const activeSessions = displaySessions.filter(s => s.status === 'ACTIVE');
    if (activeSessions.length === 0) return;
    
    const interval = setInterval(() => {
      setDisplaySessions(prev => prev.map(session => 
        session.status === 'ACTIVE' 
          ? { ...session, currentBatteryLevel: calculateCurrentBatteryLevel(session) }
          : session
      ));
    }, 30000);
    
    return () => clearInterval(interval);
  }, [displaySessions]);

  // lọc phiên sạc
  useEffect(() => {
    const filtered = sessions.filter(session => 
      session.stationId === stationId && 
      (statusFilter === 'ALL' || session.status === statusFilter)
    );
    setDisplaySessions(filtered);
  }, [sessions, statusFilter, stationId]);

  //gộp các handle
  const handleSessionAction = async (action: Function, sessionId: string, callback?: Function) => {
    try {
      await action(sessionId);
      if (callback) callback();
      loadSessions();
    } catch (error) {
      console.error(`Error in session action:`, error);
    }
  };

  // load toàn bộ phiên
  const loadSessions = async () => {
    try {
      if (statusFilter === 'ACTIVE') {
        await getActiveSessionsByStation(stationId);
      } else if (statusFilter === 'ALL') {
        await getSessionsByStation(stationId);
      } else {
        await getSessionsByStatus(statusFilter as any);
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  // tạo phiên sạc mới
  const handleCreateSession = async () => {
    try {
      await startSession({
        stationId,
        userId: newSession.userId,
        vehicleType: newSession.vehicleName,
        batteryCapacity: newSession.batteryCapacity,
        startBatteryLevel: newSession.startBatteryLevel,
        maxChargingRate: newSession.maxChargingRate
      });
      setShowAddForm(false);
      setNewSession({
        userId: '', vehicleName: '', batteryCapacity: 50, startBatteryLevel: 20, maxChargingRate: 7.4
      });
      loadSessions();
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };
  // hoàn thành phiên sạc thì cập nhật lên database
  const handleCompleteSession = async (sessionId: string, targetBatteryLevel: number = 80) => {
    try {
      const session = sessions.find(s => s.id === sessionId);
      if (!session) return;
      
      const energyDelivered = calculateEnergyDelivered(session, targetBatteryLevel);
      await completeSession(sessionId, {
        endBatteryLevel: targetBatteryLevel,
        energyDelivered: energyDelivered
      });
      loadSessions();
    } catch (error) {
      console.error('Error completing session:', error);
    }
  };

  // xử lý dừng phiên
  const handlePauseSession = (sessionId: string) => 
    handleSessionAction(pauseSession, sessionId);
  // tiếp tục
  const handleResumeSession = (sessionId: string) => 
    handleSessionAction(resumeSession, sessionId);
  // hủy
  const handleCancelSession = (sessionId: string) => 
    handleSessionAction(cancelSession, sessionId);
  // xóa
  const handleDeleteSession = (sessionId: string) => 
    handleSessionAction(deleteSession, sessionId);

  if (loading) return <div>Đang tải phiên sạc...</div>;
  if (error) return <div>Lỗi: {error}</div>;

   return (
    <div className="station-charging-sessions">
      {/* PHẦN HEADER GIỮ NGUYÊN */}
      <div className="section-header">
        <h3>⚡ Quản Lý Phiên Sạc - Trạm {stationId}</h3>
        <div className="header-controls">
          <div className="filter-group">
            <label>Lọc theo trạng thái:</label>
            <select 
              className="filter-select"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Tất cả</option>
              <option value="ACTIVE">Đang sạc</option>
              <option value="PAUSED">Tạm dừng</option>
              <option value="COMPLETED">Đã hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
              <option value="PENDING">Chờ xử lý</option>
            </select>
          </div>
          
          <button className="btn-primary" onClick={() => setShowAddForm(true)}>
            + Tạo Phiên Sạc Mới
          </button>
        </div>
      </div>

      {/* STATS GIỮ NGUYÊN */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-value">{displaySessions.length}</div>
          <div className="stat-label">Tổng số</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{displaySessions.filter(s => s.status === 'ACTIVE').length}</div>
          <div className="stat-label">Đang sạc</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{displaySessions.filter(s => s.status === 'COMPLETED').length}</div>
          <div className="stat-label">Hoàn thành</div>
        </div>
      </div>

      {/* FORM TẠO SESSION GIỮ NGUYÊN */}
      {showAddForm && (
        <div className="add-session-form">
          <h4>Tạo Phiên Sạc Mới</h4>
          <div className="form-grid">
            <input type="text" placeholder="User ID" value={newSession.userId} onChange={(e) => setNewSession({...newSession, userId: e.target.value})} />
            <input type="text" placeholder="Tên xe" value={newSession.vehicleName} onChange={(e) => setNewSession({...newSession, vehicleName: e.target.value})} />
            <input type="number" placeholder="Dung lượng pin (kWh)" value={newSession.batteryCapacity} onChange={(e) => setNewSession({...newSession, batteryCapacity: Number(e.target.value)})} />
            <input type="number" placeholder="Mức pin hiện tại (%)" value={newSession.startBatteryLevel} onChange={(e) => setNewSession({...newSession, startBatteryLevel: Number(e.target.value)})} />
            <input type="number" placeholder="Tốc độ sạc (kW)" value={newSession.maxChargingRate} onChange={(e) => setNewSession({...newSession, maxChargingRate: Number(e.target.value)})} />
          </div>
          <div className="form-actions">
            <button onClick={handleCreateSession}>Bắt Đầu Sạc</button>
            <button onClick={() => setShowAddForm(false)}>Hủy</button>
          </div>
        </div>
      )}

      {/* SESSIONS GRID GIỮ NGUYÊN */}
      <div className="sessions-grid">
        {displaySessions.map(session => (
          <SessionCard 
            key={session.id} 
            session={session} 
            onComplete={handleCompleteSession}
            onPause={handlePauseSession}
            onResume={handleResumeSession}
            onCancel={handleCancelSession}
            onDelete={handleDeleteSession}
          />
        ))}
      </div>

      {displaySessions.length === 0 && (
        <div className="no-sessions">
          <p>Không có phiên sạc nào</p>
          <small>Nhấn "Tạo Phiên Sạc Mới" để bắt đầu</small>
        </div>
      )}
    </div>
  );
};

// component các thẻ hiển thị phiên
const SessionCard = ({ 
  session, 
  onComplete, 
  onPause, 
  onResume, 
  onCancel, 
  onDelete 
}: any) => (
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
        {session.status === 'ACTIVE' && (
          <div className="info-row">
            <span className="label">Thời gian:</span>
            <span className="value">{calculateElapsedTime(session)}</span>
          </div>
        )}
        
        {session.duration && (
          <div className="info-row">
            <span className="label">Tổng thời gian:</span>
            <span className="value">{session.duration} phút</span>
          </div>
        )}
        
        {session.cost && (
          <div className="info-row">
            <span className="label">Chi phí:</span>
            <span className="value">${session.cost.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* thanh % làm cho đẹp */}
      {(session.status === 'ACTIVE' || session.status === 'COMPLETED') && (
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${calculateProgress(session)}%` }}
            />
          </div>
          <span className="progress-text">{Math.round(calculateProgress(session))}%</span>
        </div>
      )}
    </div>

    {/* các tương tác khi sạc */}
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