import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import theme from '../styles/theme';
import SearchBar from '../components/ui/SearchBar';
import FilterTabs from '../components/ui/FilterTabs';
import RoomCard from '../components/sections/RoomCard';
import RoomDetail from '../components/sections/RoomDetail';
import NewsletterStrip from '../components/ui/NewsletterStrip';
import { ROOMS } from '../data/rooms';
import useWindowSize from '../hooks/useWindowSize';

export default function BookingPage() {
  const { isMobile }       = useWindowSize();
  const location           = useLocation();
  const { booking, updateBooking } = useBooking();
  const detailRef          = useRef(null);

  const [activeFilter,    setActiveFilter]    = useState('All Rooms');
  const [selectedRoom,    setSelectedRoom]    = useState(null);

  // If navigated from Rooms page with a pre-selected room, open its detail
  useEffect(() => {
    const openId = location.state?.openRoom;
    if (openId) {
      const room = ROOMS.find((r) => r.id === openId);
      if (room) setSelectedRoom(room);
    }
  }, [location.state]);

  // Scroll to detail panel when a room is selected
  useEffect(() => {
    if (selectedRoom && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedRoom]);

  const filteredRooms =
    activeFilter === 'All Rooms'
      ? ROOMS
      : ROOMS.filter((r) => r.category === activeFilter);

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    updateBooking({ selectedRoom: room });
  };

  const handleCloseDetail = () => {
    setSelectedRoom(null);
    updateBooking({ selectedRoom: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReserve = (room) => {
    // TODO (API): Initiate reservation flow or redirect to checkout
    // For now, open the detail view
    handleViewDetails(room);
  };

  return (
    <main style={{ background: theme.colors.cream, paddingTop: isMobile ? 122 : 160, minHeight: '100vh' }}>

      {/* ══ PAGE HEADING + SEARCH BAR ════════════════════════ */}
      {!selectedRoom && (
        <section
          style={{
            padding:    isMobile ? '36px 24px 28px' : '52px 80px 36px',
            maxWidth:   1400,
            margin:     '0 auto',
            boxSizing:  'border-box',
          }}
        >
          <p style={{ color: theme.colors.gold, fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
            Book Your Stay
          </p>
          <h1
            style={{
              fontFamily: theme.fonts.serif,
              fontSize:   isMobile ? 30 : 48,
              fontWeight: 400,
              color:      theme.colors.navy,
              marginBottom: 10,
            }}
          >
            Select Your Room
          </h1>
          <p style={{ color: theme.colors.textMuted, fontSize: 15, lineHeight: 1.75, maxWidth: 580, marginBottom: 28 }}>
            Immerse yourself in urban comfort. Each of our 144 rooms is designed for your
            relaxation, with Slumberland mattresses and modern amenities throughout.
          </p>

          {/* Search bar — clicking dates opens inline calendar */}
          <SearchBar variant="booking" />
        </section>
      )}

      {/* ══ ROOM DETAIL (inline, replaces heading) ════════════ */}
      {selectedRoom && (
        <div ref={detailRef}>
          <RoomDetail
            room={selectedRoom}
            onClose={handleCloseDetail}
            onReserve={handleReserve}
          />
        </div>
      )}

      {/* ══ FILTER TABS + ROOM GRID ═══════════════════════════ */}
      {!selectedRoom && (
        <section
          style={{
            padding:   isMobile ? '0 0 60px' : '0 0 80px',
            maxWidth:  1400,
            margin:    '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {/* Filter tabs */}
          <div style={{ padding: isMobile ? '0 24px' : '0 80px', marginBottom: 32 }}>
            <FilterTabs active={activeFilter} onChange={setActiveFilter} />
          </div>

          {/* Room grid */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : `repeat(auto-fill, minmax(320px, 1fr))`,
              gap:     24,
              padding: isMobile ? '0 24px' : '0 80px',
            }}
          >
            {filteredRooms.length === 0 ? (
              <p style={{ color: theme.colors.textMuted, gridColumn: '1 / -1', padding: '40px 0', textAlign: 'center' }}>
                No rooms match this filter.
              </p>
            ) : (
              filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  variant="grid"
                  isSelected={selectedRoom?.id === room.id}
                  onViewDetails={handleViewDetails}
                  onReserve={handleReserve}
                />
              ))
            )}
          </div>
        </section>
      )}

    </main>
  );
}
