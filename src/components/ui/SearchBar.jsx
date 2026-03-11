import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import CalendarPicker from './CalendarPicker';
import theme from '../../styles/theme';
import { formatDateNumeric } from '../../utils/dateUtils';
import { GUEST_OPTIONS, ROOMS_NO_OPTIONS } from '../../data/rooms';
import useWindowSize from '../../hooks/useWindowSize';

const ROSE_GOLD         = theme.colors.roseGold;
const ROSE_GOLD_BORDER  = `2px solid rgba(201,149,108,0.85)`;
const ROSE_GOLD_DIVIDER = 'rgba(201,149,108,0.5)';

export default function SearchBar({ variant = 'hero', onSearchComplete }) {
  const navigate                   = useNavigate();
  const { booking, updateBooking } = useBooking();
  const { isMobile }               = useWindowSize();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const wrapperRef = useRef(null);

  const isHero = variant === 'hero';

  // ── Rooms state (defaults to 1, synced into BookingContext) ──
  const [roomCount, setRoomCount] = useState(booking.rooms ?? 1);
  const roomDisplay = `${roomCount} Room${roomCount > 1 ? 's' : ''}`;

  const DropdownArrowSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

  const handleRoomChange = (e) => {
    const val = Number(e.target.value);
    setRoomCount(val);
    updateBooking({ rooms: val });
  };

  // ── Dates ────────────────────────────────────────────────────
  const range = { from: booking.checkIn, to: booking.checkOut };

  const handleRangeChange = (r) => {
    updateBooking({ checkIn: r?.from ?? undefined, checkOut: r?.to ?? undefined });
  };

  // ── Guests ───────────────────────────────────────────────────
  const handleGuestChange = (e) => {
    const parts = e.target.value.split(',');
    updateBooking({
      adults:   Number(parts[0]) || 1,
      children: Number(parts[1]) || 0,
    });
  };

  const guestSelectValue = `${booking.adults},${booking.children}`;

  const guestDisplay = (() => {
    const a = booking.adults;
    const c = booking.children;
    return `${a} Adult${a !== 1 ? 's' : ''}${c > 0 ? `, ${c} Child${c !== 1 ? 'ren' : ''}` : ''}`;
  })();

  const dateLabel =
    booking.checkIn && booking.checkOut ? (
    <>
      {formatDateNumeric(booking.checkIn)}
      &emsp;
      &emsp;
      &emsp;
      {formatDateNumeric(booking.checkOut)}
    </>
  ) : (
    'Select dates'
  );

  const handleSearch = () => {
    if (isHero) navigate('/rooms');
    else if (onSearchComplete) onSearchComplete();
  };

  // Shared invisible-overlay select style — sits on top of the styled
  // display div so the native dropdown opens on click but we control
  // exactly what text is shown.
  const overlaySelect = {
    position: 'absolute',
    inset:    0,
    opacity:  0,
    cursor:   'pointer',
    width:    '100%',
    height:   '100%',
    zIndex:   2,
    fontSize: 16, // prevents iOS auto-zoom on focus
  };

  // ────────────────────────────────────────────────────────────
  // HERO VARIANT
  // ────────────────────────────────────────────────────────────
  if (isHero) {
    const FloatingDivider = () => (
      <div
        style={{
          width:      '2px',
          height:     '80px',
          background: ROSE_GOLD_DIVIDER,
          alignSelf:  'center',
          flexShrink: 0,
        }}
      />
    );

    const cellLabel = {
      color:         ROSE_GOLD,
      fontSize:      isMobile ? 10 : 14,
      fontWeight:    700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontFamily:    theme.fonts.sans,
      display:       'flex',
      justifyContent:'center',
      alignItems:    'center',
      gap:           8,
      marginBottom:  9,
    };

    const cellValue = {
      color:         '#FFFFFF',
      fontSize:      isMobile ? 14 : 15,
      fontWeight:    300,
      fontFamily:    theme.fonts.sans,
      letterSpacing: '0.01em',
    };

    const cell = {
      padding:        isMobile ? '20px 22px' : '28px 40px',
      display:        'flex',
      flexDirection:  'column',
      textAlign:      'center',
      flex:           1,
      minWidth:       0,
    };

    return (
      <div
        ref={wrapperRef}
        style={{
          position:      'relative',
          padding:       '10px',
          background:    'rgba(5, 12, 24, 0.15)',
          border:        ROSE_GOLD_BORDER,
          display:       'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems:    isMobile ? 'stretch' : 'center',
          backdropFilter:'blur(3px)',
        }}
      >
        {/* ── Dates ── */}
        <button
          onClick={() => setCalendarOpen((o) => !o)}
          style={{ ...cell, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div style={cellLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={ROSE_GOLD} strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="1" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Select Your Dates
          </div>
          <div style={cellValue}>
            {dateLabel}
            <svg width="24" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> 
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </button>

        {!isMobile && <FloatingDivider />}

        {/* ── Rooms ── */}
        <div style={cell}>
          <div style={cellLabel}>Rooms</div>
          <div style={{ position: 'relative' }}>
            <div style={{ ...cellValue, pointerEvents: 'none', position: 'relative', zIndex: 1 }}>
              {roomDisplay}
              &emsp;
              <svg width="24" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> 
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <select value={String(roomCount)} onChange={handleRoomChange} style={overlaySelect}>
              {ROOMS_NO_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {!isMobile && <FloatingDivider />}

        {/* ── Guests ── */}
        <div style={cell}>
          <div style={cellLabel}>Guests</div>
          <div style={{ position: 'relative' }}>
            <div style={{ ...cellValue, pointerEvents: 'none', position: 'relative', zIndex: 1 }}>
              {guestDisplay}
              &emsp;
              <svg width="24" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> 
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <select value={guestSelectValue} onChange={handleGuestChange} style={overlaySelect}>
              {GUEST_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* {!isMobile && <FloatingDivider />} */}

        {/* ── CTA ── */}
        <div style={{
          padding:    isMobile ? '16px 22px' : '0',
          display:    'flex',
          alignItems: 'stretch',
          flexShrink: 0,
        }}>
          <button
            onClick={handleSearch}
            style={{
              background:    theme.colors.cream,
              color:         theme.colors.navy,
              border:        'none',
              borderRadius:  0,
              padding:       isMobile ? '15px' : '20px 20px',
              fontFamily:    theme.fonts.sans,
              fontSize:      12,
              fontWeight:    700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor:        'pointer',
              whiteSpace:    'nowrap',
              width:         isMobile ? '100%' : 'auto',
              transition:    'background 0.2s',
              alignSelf:     'stretch',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#ede5d5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.cream)}
          >
            Check Availability
          </button>
        </div>

        <CalendarPicker
          isOpen={calendarOpen}
          onClose={() => setCalendarOpen(false)}
          range={range}
          onRangeChange={handleRangeChange}
          anchorRef={wrapperRef}
        />
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────
  // BOOKING VARIANT (light, inline)
  // ────────────────────────────────────────────────────────────
  return (
    <div
      ref={wrapperRef}
      style={{
        position:      'relative',
        background:    theme.colors.cream,
        // background:    theme.colors.white,
        // border:        `1px solid ${theme.colors.border}`,
        display:       'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-around',
        alignItems:    'stretch',
      }}
    >
      <button
        onClick={() => setCalendarOpen((o) => !o)}
        style={{
          flex:         1,
          padding:      isMobile ? '14px 18px' : '16px 28px',
          background:   'none',
          border:       'none',
          borderRight:  !isMobile ? `2px solid ${theme.colors.gold}` : 'none',
          borderBottom: isMobile  ? `1px solid ${theme.colors.border}` : 'none',
          textAlign:    'center',
          cursor:       'pointer',
        }}
      >
        <div style={{ color: 'black', fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>
          Select Your Dates
        </div>
        <div style={{ color: theme.colors.gold, fontSize: 14}}>{dateLabel} 
          <svg width="24" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> 
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </button>

      <div style={{ flex: '1', textAlign: 'center', padding: isMobile ? '14px 18px' : '16px 28px', borderRight: !isMobile ? `2px solid ${theme.colors.gold}` : 'none', borderBottom: isMobile ? `1px solid ${theme.colors.border}` : 'none' }}>
        <div style={{ color: 'black', fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>Rooms</div>
        <div style={{ position: 'relative' }}>
          <div style={{ color: theme.colors.gold, fontSize: 14, pointerEvents: 'none' }}>
            {roomDisplay}
            <svg width="24" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> 
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
          <select value={String(roomCount)} onChange={handleRoomChange}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', fontSize: 16 }}>
            {ROOMS_NO_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ flex: '1', textAlign: 'center', padding: isMobile ? '14px 18px' : '16px 28px', borderRight: !isMobile ? `1px solid ${theme.colors.border}` : 'none', borderBottom: isMobile ? `1px solid ${theme.colors.border}` : 'none' }}>
        <div style={{ color: 'black', fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>Guests</div>
        <div style={{ position: 'relative' }}>
          <div style={{ color: theme.colors.gold, fontSize: 14, pointerEvents: 'none' }}>
            {guestDisplay}
            <svg width="24" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> 
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
          <select value={guestSelectValue} onChange={handleGuestChange}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', fontSize: 16 }}>
            {GUEST_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'stretch', flexShrink: 0 }}>
        <button
          onClick={handleSearch}
          style={{
            padding:       isMobile ? '14px 24px' : '0 36px',
            background:    theme.colors.navy,
            color:         theme.colors.white,
            border:        'none',
            borderRadius:  0,
            fontFamily:    theme.fonts.sans,
            fontSize:      12,
            fontWeight:    600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor:        'pointer',
            width:         isMobile ? '100%' : 'auto',
          }}
        >
          Update Search
        </button>
      </div>

      <CalendarPicker
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        range={range}
        onRangeChange={handleRangeChange}
        anchorRef={wrapperRef}
      />
    </div>
  );
}