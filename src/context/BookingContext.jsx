import { createContext, useContext, useState } from 'react';
import { today, addDays } from '../utils/dateUtils';

const BookingContext = createContext(null);

const DEFAULT_STATE = {
  checkIn:         today(),
  checkOut:        addDays(today(), 3),
  adults:          2,
  children:        0,
  selectedRoom:    null,
  // Set on successful payment submission
  confirmationRef: null,   // e.g. "Rs-39415"
  cardLastFour:    null,   // e.g. "0000"
  nightlyRate:     null,
  totalNights:     null,
  totalAmount:     null,
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(DEFAULT_STATE);

  const updateBooking = (patch) =>
    setBooking((prev) => ({ ...prev, ...patch }));

  const resetBooking = () => setBooking(DEFAULT_STATE);

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider');
  return ctx;
}
