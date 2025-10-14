export const RecentSwaps = () => {
  const recentSwaps = [
    { id: 1, user: 'User A', station: 'Station 1', time: '10:30 AM' },
    { id: 2, user: 'User B', station: 'Station 2', time: '10:15 AM' },
    { id: 3, user: 'User C', station: 'Station 3', time: '09:45 AM' },
  ];

  return (
    <div className="recent-swaps">
      <h3>Recent Swaps</h3>
      <div className="swaps-list">
        {recentSwaps.map(swap => (
          <div key={swap.id} className="swap-item">
            <span className="user">{swap.user}</span>
            <span className="station "> at {swap.station}</span>
            <span className="time">{swap.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};