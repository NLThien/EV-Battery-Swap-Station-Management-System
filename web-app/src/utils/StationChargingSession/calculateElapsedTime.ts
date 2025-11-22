// tính thời gian sạc

export const calculateElapsedTime = (session: any) => {
  if (!session.startTime) return '0 phút';
  
  const startTime = new Date(session.startTime).getTime();
  const now = new Date().getTime();
  const elapsedMinutes = Math.floor((now - startTime) / (1000 * 60));
  
  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} phút`;
  } else {
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;
    return `${hours} giờ ${minutes} phút`;
  }
};