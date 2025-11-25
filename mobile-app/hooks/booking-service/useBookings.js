import { useState, useEffect } from 'react';
import { useAuth } from '@/constants/authContext';
// import { bookingApi } from '@/lib/apiClients/bookingApi';

const mockBookingApi = {
  async getBookingsByPhone(phone) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        id: '1',
        customerPhone: phone,
        stationId: 'STATION_Q1',
        scheduledTime: new Date().toISOString(),
        status: 'PENDING',
        batteryType: 'STANDARD'
      },
      {
        id: '2',
        customerPhone: phone, 
        stationId: 'STATION_Q3',
        scheduledTime: new Date().toISOString(),
        status: 'COMPLETED',
        batteryType: 'PREMIUM'
      }
    ];
  },
  async cancelBooking(bookingId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

// export function useBookings() {
//   const { user } = useAuth();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch bookings từ API
//   const fetchBookings = async () => {
//     try {
//       setError(null);
//       if (user?.phone) {
//         const userBookings = await bookingApi.getBookingsByPhone(user.phone);
//         setBookings(userBookings);
//       }
//     } catch (err) {
//       setError('Không thể tải danh sách đặt lịch');
//       console.error('Error fetching bookings:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Refresh data
//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchBookings();
//   };

//   // Cancel booking
//   const cancelBooking = async (bookingId) => {
//     try {
//       await bookingApi.cancelBooking(bookingId);
//       // Update local state after successful cancellation
//       setBookings(prev => prev.map(booking => 
//         booking.id === bookingId 
//           ? { ...booking, status: 'CANCELLED' }
//           : booking
//       ));
//       return true;
//     } catch (err) {
//       setError('Không thể hủy đặt lịch');
//       return false;
//     }
//   };

//   // Load data on component mount
//   useEffect(() => {
//     fetchBookings();
//   }, [user]);

//   return {
//     bookings,
//     loading,
//     refreshing,
//     error,
//     onRefresh,
//     cancelBooking,
//     refetch: fetchBookings
//   };
// }

export function useBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setError(null);
      if (user?.phone) {
        const userBookings = await mockBookingApi.getBookingsByPhone(user.phone);
        setBookings(userBookings);
      }
    } catch (err) {
      setError('Không thể tải danh sách đặt lịch');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const cancelBooking = async (bookingId) => {
    try {
      await mockBookingApi.cancelBooking(bookingId);
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'CANCELLED' }
          : booking
      ));
      return true;
    } catch (err) {
      setError('Không thể hủy đặt lịch');
      return false;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return {
    bookings,
    loading,
    refreshing,
    error,
    onRefresh,
    cancelBooking,
    refetch: fetchBookings
  };
}