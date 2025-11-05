// Thao tác nhanh cho quản lý nhân viên
import './QuickActions.css';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export const QuickActions = ({ onAction }: QuickActionsProps) => {
  const actions = [
    {
      id: 'start-charge',
      icon: '⚡',
      label: 'Bắt đầu sạc',
      description: 'Bắt đầu phiên sạc mới',
      color: 'var(--success-color)'
    },
    {
      id: 'swap-battery',
      icon: '🔋',
      label: 'Đổi pin',
      description: 'Đổi pin cho khách',
      color: 'var(--primary-color)'
    },
    {
      id: 'maintenance',
      icon: '🔧',
      label: 'Bảo trì',
      description: 'Kiểm tra & bảo trì',
      color: 'var(--warning-color)'
    },
    {
      id: 'report-issue',
      icon: '🚨',
      label: 'Báo lỗi',
      description: 'Báo cáo sự cố',
      color: 'var(--error-color)'
    },
    {
      id: 'inventory',
      icon: '📦',
      label: 'Kiểm kho',
      description: 'Kiểm tra tồn kho',
      color: 'var(--info-color)'
    },
    {
      id: 'customer-support',
      icon: '💬',
      label: 'Hỗ trợ',
      description: 'Hỗ trợ khách hàng',
      color: 'var(--purple-color)'
    }
  ];

  return (
    <div className="quick-actions">
      <h3>Thao Tác Nhanh</h3>
      <div className="actions-grid">
        {actions.map(action => (
          <button
            key={action.id}
            className="action-card"
            onClick={() => onAction(action.id)}
            style={{ '--action-color': action.color } as React.CSSProperties}
          >
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <div className="action-label">{action.label}</div>
              <div className="action-description">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};