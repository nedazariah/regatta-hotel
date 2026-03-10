import { createContext, useContext, useState } from 'react';
import { today, addDays } from '../utils/dateUtils';

/**
 * BookingContext
 * Holds the guest's active search / booking state across pages.
 *
 * TODO (API):
 *  - On `checkAvailability`, call GET /api/availability?checkIn=&checkOut=&guests=
 *  - On `confirmReservation`, call POST /api/reservations with room + guest details
 */

const BookingContext = createContext(null);

const DEFAULT_STATE = {
  // Date range selected by the guest
  checkIn:  today(),
  checkOut: addDays(today(), 3),

  // Guest counts
  adults:   2,
  children: 0,

  // The room type chosen from the booking page
  selectedRoom: null,

  // Confirmation data returned from API after payment
  confirmation: null,
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(DEFAULT_STATE);

  /** Update one or more booking fields */
  const updateBooking = (patch) =>
    setBooking((prev) => ({ ...prev, ...patch }));

  /** Reset everything (e.g. after confirmation) */
  const resetBooking = () => setBooking(DEFAULT_STATE);

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

/** Hook for consuming booking context */
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider');
  return ctx;
}
