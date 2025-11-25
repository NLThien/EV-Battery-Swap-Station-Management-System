import { useState, useEffect } from 'react';
import { useAuth } from '@/constants/authContext';

const API_BASE = 'http://booking-service:8087/api';

export const bookingApi = {
  // Tạo booking mới
  async createBooking(bookingData) {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  },

  // Lấy danh sách booking theo số điện thoại
  async getBookingsByPhone(phone) {
    const response = await fetch(`${API_BASE}/bookings/customer/${phone}`);
    return response.json();
  },

  // xác nhận booking
  async confirmBooking(bookingId) {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}/confirm`, {
      method: 'PUT'
    });
    return response.json();
  },
  // hủy Booking
  async cancelBooking(bookingId) {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
      method: 'PUT'
    });
    return response.json();
  }
};