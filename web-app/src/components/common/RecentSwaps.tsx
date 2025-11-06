import './RecentSwaps.css';

interface SwapItem {
  id: number;
  user: string;
  station: string;
  time: string;
  battery: string;
  status?: 'completed' | 'in-progress' | 'failed';
}

export const RecentSwaps = () => {
  const recentSwaps: SwapItem[] = [
    { 
      id: 1, 
      user: 'Nguyen Van A', 
      station: 'Quận 1 Central Station', 
      time: '10:30 AM', 
      battery: '85%',
      status: 'completed'
    },
    { 
      id: 2, 
      user: 'Tran Thi B', 
      station: 'Quận 2 Tech Hub', 
      time: '10:15 AM', 
      battery: '92%',
      status: 'completed'
    },
    { 
      id: 3, 
      user: 'Le Van C', 
      station: 'Quận 7 Riverside', 
      time: '09:45 AM', 
      battery: '78%',
      status: 'in-progress'
    },
    { 
      id: 4, 
      user: 'Pham Thi D', 
      station: 'Quận 1 Central Station', 
      time: '09:30 AM', 
      battery: '95%',
      status: 'completed'
    },
    { 
      id: 5, 
      user: 'Hoang Van E', 
      station: 'Quận 2 Tech Hub', 
      time: '09:15 AM', 
      battery: '88%',
      status: 'completed'
    },
  ];

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'failed': return '❌';
      default: return '⚡';
    }
  };

  const getBatteryColor = (battery: string) => {
    const level = parseInt(battery);
    if (level >= 80) return 'var(--success)';
    if (level >= 50) return 'var(--warning)';
    return 'var(--error)';
  };

  if (recentSwaps.length === 0) {
    return (
      <div className="recent-swaps-empty">
        <div className="empty-icon">🔄</div>
        <p>No recent swaps</p>
        <small>Swap activities will appear here</small>
      </div>
    );
  }

  return (
    <div className="recent-swaps-enhanced">
      {recentSwaps.map(swap => (
        <div key={swap.id} className="swap-item-enhanced">
          <div className="swap-avatar">
            {swap.user.charAt(0)}
          </div>
          <div className="swap-details">
            <div className="swap-user">
              {getStatusIcon(swap.status)} {swap.user}
            </div>
            <div className="swap-station">at {swap.station}</div>
          </div>
          <div className="swap-meta">
            <div className="swap-time">{swap.time}</div>
            <div 
              className="swap-battery"
              style={{ 
                background: getBatteryColor(swap.battery),
                fontSize: 'var(--font-size-xs)'
              }}
            >
              {swap.battery}
            </div>
          </div>
        </div>
      ))}
      
      {/* View All Link */}
      <div className="view-all-container" style={{ 
        textAlign: 'center', 
        marginTop: 'var(--spacing-md)',
        padding: 'var(--spacing-sm)'
      }}>
        <a 
          href="#" 
          style={{
            color: 'var(--primary-color)',
            textDecoration: 'none',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
        </a>
      </div>
    </div>
  );
};

// Version với loading skeleton (tuỳ chọn)
export const RecentSwapsSkeleton = () => {
  return (
    <div className="recent-swaps-loading">
      {[1, 2, 3, 4, 5].map(item => (
        <div key={item} className="swap-item-skeleton">
          <div className="skeleton-avatar"></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="skeleton-text long"></div>
            <div className="skeleton-text short"></div>
          </div>
        </div>
      ))}
    </div>
  );
};