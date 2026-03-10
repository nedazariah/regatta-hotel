import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import CalendarPicker from './CalendarPicker';
import theme from '../../styles/theme';
import { formatDateNumeric } from '../../utils/dateUtils';
import { GUEST_OPTIONS } from '../../data/rooms';
import useWindowSize from '../../hooks/useWindowSize';

// Rose gold — border, labels, dividers, calendar icon
const ROSE_GOLD        = theme.colors.roseGold;           // '#C9956C'
const ROSE_GOLD_BORDER = `2px solid rgba(201,149,108,0.85)`;
const ROSE_GOLD_DIVIDER= 'rgba(201,149,108,0.5)';

export default function SearchBar({ variant = 'hero', onSearchComplete }) {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const { isMobile } = useWindowSize();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const wrapperRef = useRef(null);   // passed to CalendarPicker as anchorRef

  const isHero = variant === 'hero';

  const range = { from: booking.checkIn, to: booking.checkOut };

  const handleRangeChange = (r) => {
    updateBooking({ checkIn: r?.from ?? undefined, checkOut: r?.to ?? undefined });
    if (r?.from && r?.to) setCalendarOpen(false);
  };

  const handleGuestChange = (e) => {
    // value is "adults,children" e.g. "2,1"
    const parts = e.target.value.split(',');
    updateBooking({
      adults:   Number(parts[0]) || 1,
      children: Number(parts[1]) || 0,
    });
  };

  // Build the controlled value for the <select>
  const guestSelectValue = `${booking.adults},${booking.children}`;

  // Build a human-readable guest display string
  const guestDisplay = (() => {
    const a = booking.adults;
    const c = booking.children;
    const adultStr = `${a} Adult${a !== 1 ? 's' : ''}`;
    const childStr = c > 0 ? `, ${c} Child${c !== 1 ? 'ren' : ''}` : '';
    return adultStr + childStr;
  })();

  const dateLabel =
    booking.checkIn && booking.checkOut
      ? `${formatDateNumeric(booking.checkIn)}  →  ${formatDateNumeric(booking.checkOut)}`
      : 'Select dates';

  const handleSearch = () => {
    if (isHero) navigate('/booking');
    else if (onSearchComplete) onSearchComplete();
  };

  // ─────────────────────────────────────────────────────────────
  // HERO VARIANT
  // ─────────────────────────────────────────────────────────────
  if (isHero) {

    // Floating divider — has margin top/bottom so it never touches the outer border
    const FloatingDivider = () => (
      <div
        style={{
          width:      '1px',
          height:     '40px',         // fixed height — shorter than the container
          background: ROSE_GOLD_DIVIDER,
          alignSelf:  'center',       // centres vertically
          flexShrink: 0,
        }}
      />
    );

    const cellLabel = {
      color:         ROSE_GOLD,
      fontSize:      isMobile ? 10 : 11,
      fontWeight:    700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontFamily:    theme.fonts.sans,
      display:       'flex',
      alignItems:    'center',
      gap:           8,
      marginBottom:  9,
    };

    const cellValue = {
      color:        '#FFFFFF',
      fontSize:     isMobile ? 14 : 17,
      fontWeight:   300,
      fontFamily:   theme.fonts.sans,
      letterSpacing:'0.01em',
    };

    const cell = {
      padding:       isMobile ? '20px 22px' : '28px 40px',
      display:       'flex',
      flexDirection: 'column',
      justifyContent:'center',
      flex:          1,
      minWidth:      0,
    };

    return (
      <div
        ref={wrapperRef}
        style={{
          position:      'relative',
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
          style={{ ...cell, background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
        >
          <div style={cellLabel}>
            {/* Calendar icon in rose gold */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={ROSE_GOLD} strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="1" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Select Your Dates
          </div>
          <div style={cellValue}>{dateLabel}</div>
        </button>

        {!isMobile && <FloatingDivider />}

        {/* ── Rooms ── */}
        <div style={cell}>
          <div style={cellLabel}>Rooms</div>
          <div style={cellValue}>1 Room</div>
        </div>

        {!isMobile && <FloatingDivider />}

        {/* ── Guests ── */}
        <div style={{ ...cell, position: 'relative' }}>
          <div style={cellLabel}>Guests</div>
          {/*
            We layer a visible display div over a hidden native select.
            This lets us style the displayed value (cellValue) while keeping
            the native select interaction (and correct controlled state).
          */}
          <div style={{ position: 'relative' }}>
            <div style={{ ...cellValue, pointerEvents: 'none', position: 'relative', zIndex: 1 }}>
              {guestDisplay}
            </div>
            <select
              value={guestSelectValue}
              onChange={handleGuestChange}
              style={{
                position:         'absolute',
                inset:            0,
                opacity:          0,
                cursor:           'pointer',
                width:            '100%',
                height:           '100%',
                zIndex:           2,
                fontSize:         16, // prevents iOS auto-zoom
              }}
            >
              {GUEST_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!isMobile && <FloatingDivider />}

        {/* ── CTA — full height, no border-radius ── */}
        <div style={{
          padding:    isMobile ? '16px 22px' : '20px',
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
              // Matches the cell padding so button fills the full height
              padding:       isMobile ? '15px' : '28px 48px',
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

  // ─────────────────────────────────────────────────────────────
  // BOOKING VARIANT (light, inline)
  // ─────────────────────────────────────────────────────────────
  return (
    <div
      ref={wrapperRef}
      style={{
        position:      'relative',
        background:    theme.colors.white,
        border:        `1px solid ${theme.colors.border}`,
        display:       'flex',
        flexDirection: isMobile ? 'column' : 'row',
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
          borderRight:  !isMobile ? `1px solid ${theme.colors.border}` : 'none',
          borderBottom: isMobile  ? `1px solid ${theme.colors.border}` : 'none',
          textAlign:    'left',
          cursor:       'pointer',
        }}
      >
        <div style={{ color: theme.colors.gold, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>
          Select Your Dates
        </div>
        <div style={{ color: theme.colors.navy, fontSize: 14 }}>{dateLabel}</div>
      </button>

      <div style={{ flex: '0 0 auto', padding: isMobile ? '14px 18px' : '16px 28px', borderRight: !isMobile ? `1px solid ${theme.colors.border}` : 'none', borderBottom: isMobile ? `1px solid ${theme.colors.border}` : 'none' }}>
        <div style={{ color: theme.colors.gold, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>Rooms</div>
        <div style={{ color: theme.colors.navy, fontSize: 14 }}>1 Room</div>
      </div>

      <div style={{ flex: '0 0 auto', padding: isMobile ? '14px 18px' : '16px 28px', borderRight: !isMobile ? `1px solid ${theme.colors.border}` : 'none', borderBottom: isMobile ? `1px solid ${theme.colors.border}` : 'none' }}>
        <div style={{ color: theme.colors.gold, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>Guests</div>
        <div style={{ position: 'relative' }}>
          <div style={{ color: theme.colors.navy, fontSize: 14, pointerEvents: 'none' }}>{guestDisplay}</div>
          <select
            value={guestSelectValue}
            onChange={handleGuestChange}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', fontSize: 16 }}
          >
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
