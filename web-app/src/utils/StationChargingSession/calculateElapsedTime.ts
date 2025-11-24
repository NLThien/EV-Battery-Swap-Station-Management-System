export const calculateElapsedTime = (session: any): string => {
  const startTimeStr = session.start_time || session.startTime;
  const endTimeStr = session.end_time || session.endTime;
  
  if (!startTimeStr) return '0 phút';
  
  const startTime = new Date(startTimeStr).getTime();
  
  const endTime = session.status === 'ACTIVE' 
    ? new Date().getTime() 
    : endTimeStr 
      ? new Date(endTimeStr).getTime() 
      : new Date().getTime();
  
  const elapsedMinutes = Math.floor((endTime - startTime) / (1000 * 60));
  
  if (elapsedMinutes < 1) {
    return 'dưới 1 phút';
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes} phút`;
  } else {
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;
    return minutes > 0 ? `${hours} giờ ${minutes} phút` : `${hours} giờ`;
  }
};