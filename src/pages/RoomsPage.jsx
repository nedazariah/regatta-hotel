import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import theme from '../styles/theme';
import SearchBar from '../components/ui/SearchBar';
import FilterTabs from '../components/ui/FilterTabs';
import { ROOMS, ROOM_CATEGORIES } from '../data/rooms';
import { getNights } from '../utils/dateUtils';
import useWindowSize from '../hooks/useWindowSize';

const HEADER_H = 160; // desktop header height

export default function RoomsPage() {
  const { isMobile }             = useWindowSize();
  const navigate                 = useNavigate();
  const location                 = useLocation();
  const { booking, updateBooking } = useBooking();

  const [activeFilter,  setActiveFilter]  = useState('All Rooms');
  const [expandedId,    setExpandedId]    = useState(null); // which card is expanded
  const expandedRef                       = useRef(null);

  // Pre-expand a room if navigated here with state
  useEffect(() => {
    if (location.state?.openRoom) {
      setExpandedId(location.state.openRoom);
    }
  }, [location.state]);

  // Scroll to expanded card
  useEffect(() => {
    if (expandedId && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, [expandedId]);

  const filteredRooms =
    activeFilter === 'All Rooms'
      ? ROOMS
      : ROOMS.filter((r) => r.category === activeFilter);

  const handleViewDetails = (room) => {
    setExpandedId((prev) => (prev === room.id ? null : room.id));
  };

  const handleReserve = (room) => {
    updateBooking({ selectedRoom: room });
    navigate('/booking');
  };

  const headerH = isMobile ? 122 : HEADER_H;

  return (
    <main style={{ background: theme.colors.cream, minHeight: '100vh' }}>

      {/* ── Page heading + SearchBar ─────────────────── */}
      <section style={{ padding: isMobile ? '36px 24px 20px' : '52px 80px 28px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box' }}>
        <h1
          style={{
            fontFamily:  theme.fonts.serif,
            fontSize:    isMobile ? 32 : 52,
            fontWeight:  400,
            color:       theme.colors.navy,
            textAlign:   'center',
            marginBottom: 12,
          }}
        >
          Select Your Room
        </h1>
        <p
          style={{
            color:     theme.colors.textMuted,
            fontSize:  15,
            lineHeight: 1.75,
            textAlign: 'center',
            maxWidth:  580,
            margin:    '0 auto 32px',
          }}
        >
          Immerse yourself in urban comfort. Each of our 144 rooms is designed for your
          relaxation, with Slumberland mattresses and modern amenities throughout.
        </p>

        {/* SearchBar — booking variant with date fields and guest selector */}
        <SearchBar variant="booking" />
      </section>

      {/* ── Filter tabs ──────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 24px' : '0 80px', boxSizing: 'border-box' }}>
        <FilterTabs active={activeFilter} onChange={(cat) => { setActiveFilter(cat); setExpandedId(null); }} />
      </section>

      {/* ── Room list ────────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 24px 60px' : '0 80px 80px', boxSizing: 'border-box' }}>
        {filteredRooms.map((room) => {
          const isExpanded = expandedId === room.id;
          return (
            <div
              id={room.id}
              key={room.id}
              ref={isExpanded ? expandedRef : null}
              style={{ borderBottom: `1px solid ${theme.colors.border}` }}
            >
              {/* ── Collapsed card ─────────────────────── */}
              <div style={{ padding: isMobile ? '28px 0' : '36px 0' }}>
                {/* Full-width photo */}
                <div
                  style={{
                    width:    '100%',
                    height:   isMobile ? 220 : 380,
                    overflow: 'hidden',
                    marginBottom: 20,
                    cursor:   'pointer',
                  }}
                  onClick={() => handleViewDetails(room)}
                >
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    style={{
                      width:      '100%',
                      height:     '100%',
                      objectFit:  'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                </div>

                {/* Name + description + VIEW DETAILS button */}
                <div
                  style={{
                    display:        'flex',
                    alignItems:     isMobile ? 'flex-start' : 'flex-end',
                    justifyContent: 'space-between',
                    gap:            20,
                    flexDirection:  isMobile ? 'column' : 'row',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        fontFamily:  theme.fonts.serif,
                        fontSize:    isMobile ? 26 : 34,
                        fontWeight:  400,
                        color:       theme.colors.navy,
                        marginBottom: 8,
                      }}
                    >
                      {room.name}
                    </h2>
                    <p style={{ color: theme.colors.textMuted, fontSize: 14, lineHeight: 1.75, maxWidth: 520 }}>
                      {room.shortDescription}
                    </p>
                  </div>

                  <button
                    onClick={() => handleViewDetails(room)}
                    style={{
                      background:    isExpanded ? theme.colors.cream : theme.colors.navy,
                      color:         isExpanded ? theme.colors.navy : theme.colors.white,
                      border:        `1px solid ${theme.colors.navy}`,
                      borderRadius:  0,
                      padding:       '13px 32px',
                      fontFamily:    theme.fonts.sans,
                      fontSize:      11,
                      fontWeight:    700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      cursor:        'pointer',
                      whiteSpace:    'nowrap',
                      flexShrink:    0,
                      transition:    'all 0.2s',
                    }}
                  >
                    {isExpanded ? '← Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>

              {/* ── Expanded detail panel ──────────────── */}
              {isExpanded && (
                <ExpandedRoomPanel
                  room={room}
                  isMobile={isMobile}
                  booking={booking}
                  onReserve={handleReserve}
                />
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}

/**
 * Expanded inline panel — matches PDF page 1 expanded state:
 * LEFT: photo carousel with prev/next arrows + "1 OF N" counter
 * RIGHT: dark navy panel — room name, long description, price, RESERVE NOW
 */
function ExpandedRoomPanel({ room, isMobile, booking, onReserve }) {
  const [imgIdx, setImgIdx] = useState(0);
  const total  = room.images.length;
  const nights = getNights(booking.checkIn, booking.checkOut) || 1;

  const prev = () => setImgIdx((i) => (i - 1 + total) % total);
  const next = () => setImgIdx((i) => (i + 1) % total);

  return (
    <div
      style={{
        display:             'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
        marginBottom:        40,
        overflow:            'hidden',
        border:              `1px solid ${theme.colors.border}`,
      }}
    >
      {/* LEFT — photo carousel */}
      <div style={{ position: 'relative', height: isMobile ? 280 : '100%', background: '#111' }}>
        {room.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${room.name} ${i + 1}`}
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              opacity:    i === imgIdx ? 1 : 0,
              transition: 'opacity 0.45s ease',
            }}
          />
        ))}

        {/* Left arrow */}
        <button onClick={prev} style={carouselArrow('left')} aria-label="Previous photo">&#8249;</button>
        {/* Right arrow */}
        <button onClick={next} style={carouselArrow('right')} aria-label="Next photo">&#8250;</button>

        {/* "1 OF N" counter — bottom centre */}
        <div
          style={{
            position:      'absolute',
            bottom:        16,
            left:          '50%',
            transform:     'translateX(-50%)',
            background:    'rgba(0,0,0,0.45)',
            color:         '#fff',
            fontFamily:    theme.fonts.sans,
            fontSize:      11,
            fontWeight:    600,
            letterSpacing: '0.14em',
            padding:       '5px 14px',
          }}
        >
          {imgIdx + 1} OF {total}
        </div>

        {/* Thumbnail strip — bottom right */}
        <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 6 }}>
          {room.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              style={{
                width:        40,
                height:       28,
                padding:      0,
                border:       `2px solid ${i === imgIdx ? theme.colors.gold : 'rgba(255,255,255,0.35)'}`,
                overflow:     'hidden',
                cursor:       'pointer',
                background:   'none',
                transition:   'border-color 0.2s',
                flexShrink:   0,
              }}
            >
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT — dark navy info panel */}
      <div
        style={{
          background:    theme.colors.navy,
          padding:       isMobile ? '32px 24px 36px' : '40px 40px 44px',
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'space-between',
        }}
      >
        {/* Top: name + description */}
        <div>
          <p style={{ color: theme.colors.gold, fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: theme.fonts.sans, marginBottom: 12 }}>
            {room.category}
          </p>
          <h2
            style={{
              fontFamily:  theme.fonts.serif,
              fontSize:    isMobile ? 26 : 34,
              fontWeight:  400,
              color:       theme.colors.white,
              marginBottom: 18,
              lineHeight:  1.15,
            }}
          >
            {room.name}
          </h2>
          <p
            style={{
              color:      'rgba(255,255,255,0.65)',
              fontSize:   14,
              lineHeight: 1.8,
              marginBottom: 28,
            }}
          >
            {room.longDescription}
          </p>

          {/* Amenity highlights */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginBottom: 28 }}>
            {room.amenities.slice(0, 6).map((a) => (
              <span
                key={a}
                style={{
                  color:         'rgba(255,255,255,0.5)',
                  fontSize:      11,
                  fontFamily:    theme.fonts.sans,
                  display:       'flex',
                  alignItems:    'center',
                  gap:           5,
                }}
              >
                <span style={{ color: theme.colors.gold, fontSize: 8 }}>✦</span>
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: price + button */}
        <div>
          <div
            style={{
              borderTop:    '1px solid rgba(255,255,255,0.12)',
              paddingTop:   24,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily:  theme.fonts.serif,
                fontSize:    isMobile ? 36 : 44,
                fontWeight:  600,
                color:       theme.colors.white,
              }}
            >
              {room.currency}{room.price}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontFamily: theme.fonts.sans }}> /night</span>
          </div>

          <button
            onClick={() => onReserve(room)}
            style={{
              width:         '100%',
              padding:       '16px',
              background:    theme.colors.white,
              color:         theme.colors.navy,
              border:        'none',
              borderRadius:  0,
              fontFamily:    theme.fonts.sans,
              fontSize:      12,
              fontWeight:    700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor:        'pointer',
              transition:    'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.cream)}
            onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.white)}
          >
            Reserve Now
          </button>

          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, textAlign: 'center', marginTop: 12, fontFamily: theme.fonts.sans }}>
            Refundable deposit: RM 200 · Free cancellation until check-in
          </p>
        </div>
      </div>
    </div>
  );
}

const carouselArrow = (side) => ({
  position:       'absolute',
  top:            '50%',
  [side]:         16,
  transform:      'translateY(-50%)',
  zIndex:         2,
  width:          40,
  height:         40,
  borderRadius:   '50%',
  background:     'rgba(255,255,255,0.18)',
  backdropFilter: 'blur(4px)',
  border:         '1px solid rgba(255,255,255,0.3)',
  color:          '#fff',
  fontSize:       26,
  cursor:         'pointer',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  lineHeight:     1,
  transition:     'background 0.2s',
});
