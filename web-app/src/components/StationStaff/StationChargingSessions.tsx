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
import { AddSessionForm } from './AddSessionForm';
import { SessionCard } from './SessionCard';

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
      setDisplaySessions(prev => prev.map(session => {
        if (session.status === 'ACTIVE') {
          return {
            ...session,
            currentBatteryLevel: calculateCurrentBatteryLevel(session),
            _lastUpdate: Date.now()
          };
        }
        return session;
      }));
    }, 10000); // load mới 10s
    
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
  const handleCreateSession = async (sessionData: any) => {
    try {
      await startSession(sessionData);
      setShowAddForm(false);
      loadSessions();
    } catch (error) {
      console.error('Error creating session:', error);
      throw error; //re-throw để form xử lý
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

      {showAddForm && (
        <AddSessionForm
          stationId={stationId}
          onSubmit={handleCreateSession}
          onCancel={() => setShowAddForm(false)}
        />
      )}

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