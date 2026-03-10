import { useState } from 'react';
import theme from '../../styles/theme';
import Button from '../ui/Button';
import RoomCard from './RoomCard';
import { ROOMS } from '../../data/rooms';
import useWindowSize from '../../hooks/useWindowSize';

/**
 * RoomDetail
 * Shown inline on the Booking page when user clicks "View Details".
 * Displays the full room hero (Image 5 style) + amenities + "Rooms & Suites" carousel.
 *
 * Props:
 *  room         — the selected room object
 *  onClose      — callback to collapse back to the room grid
 *  onReserve    — callback when Reserve Now is clicked
 */
export default function RoomDetail({ room, onClose, onReserve }) {
  const { isMobile } = useWindowSize();
  const [activeImg, setActiveImg] = useState(0);

  // Other rooms for the carousel
  const otherRooms = ROOMS.filter((r) => r.id !== room.id);

  return (
    <div className="animate-scale-in">
      {/* ── Full-width room hero ─────────────────────── */}
      <div
        style={{
          position:  'relative',
          width:     '100%',
          height:    isMobile ? 280 : 480,
          overflow:  'hidden',
          background: theme.colors.navy,
        }}
      >
        <img
          src={room.images[activeImg]}
          alt={room.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.35s' }}
        />
        {/* Dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,24,41,0.7) 0%, rgba(11,24,41,0.1) 50%, transparent 100%)' }} />

        {/* Room name overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '24px 20px' : '40px 80px' }}>
          <p style={{ color: theme.colors.gold, fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            {room.category}
          </p>
          <h1 style={{ fontFamily: theme.fonts.serif, fontSize: isMobile ? 28 : 52, fontWeight: 400, color: theme.colors.white, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {room.name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 8, maxWidth: 500, lineHeight: 1.7 }}>
            {room.shortDescription}
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={onClose}
          style={{
            position:  'absolute',
            top:       isMobile ? 16 : 24,
            left:      isMobile ? 16 : 40,
            background:'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border:    `1px solid rgba(255,255,255,0.3)`,
            borderRadius: theme.radius.sm,
            color:     theme.colors.white,
            fontFamily:theme.fonts.sans,
            fontSize:  12,
            fontWeight:600,
            letterSpacing:'0.1em',
            padding:   '8px 16px',
            cursor:    'pointer',
            textTransform:'uppercase',
          }}
        >
          ← All Rooms
        </button>

        {/* Thumbnail strip */}
        {room.images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom:   isMobile ? 16 : 28,
              right:    isMobile ? 16 : 40,
              display:  'flex',
              gap:      8,
            }}
          >
            {room.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width:        isMobile ? 36 : 48,
                  height:       isMobile ? 26 : 32,
                  padding:      0,
                  border:       `2px solid ${activeImg === i ? theme.colors.gold : 'rgba(255,255,255,0.4)'}`,
                  borderRadius: 4,
                  overflow:     'hidden',
                  cursor:       'pointer',
                  background:   'none',
                  transition:   'border-color 0.2s',
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Details & Booking panel ──────────────────── */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
          gap:                 isMobile ? 0 : 48,
          padding:             isMobile ? '28px 20px 40px' : '48px 80px 64px',
          background:          theme.colors.cream,
          maxWidth:            1400,
          margin:              '0 auto',
          boxSizing:           'border-box',
        }}
      >
        {/* Left — room info */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Room Size',   value: room.size },
              { label: 'Guests',      value: `Max ${room.maxGuests}` },
              { label: 'Bed Type',    value: room.bedType },
              { label: 'Check-in',    value: room.checkIn },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background:   theme.colors.white,
                  border:       `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.md,
                  padding:      '16px 20px',
                }}
              >
                <div style={{ color: theme.colors.textLight, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</div>
                <div style={{ color: theme.colors.navy, fontSize: 15, fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: theme.fonts.serif, fontSize: 22, color: theme.colors.navy, marginBottom: 14 }}>About This Room</h3>
          <p style={{ color: theme.colors.textMuted, fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
            {room.longDescription}
          </p>

          <h3 style={{ fontFamily: theme.fonts.serif, fontSize: 20, color: theme.colors.navy, marginBottom: 14 }}>Room Amenities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px 24px' }}>
            {room.amenities.map((a) => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, color: theme.colors.textMuted, fontSize: 14 }}>
                <span style={{ color: theme.colors.gold, fontSize: 10 }}>✦</span>
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Right — booking summary / CTA */}
        <div style={{ marginTop: isMobile ? 32 : 0 }}>
          <div
            style={{
              background:   theme.colors.white,
              border:       `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.lg,
              padding:      '28px 24px',
              position:     'sticky',
              top:          120,
            }}
          >
            <p style={{ color: theme.colors.textMuted, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Starting from</p>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: theme.fonts.serif, fontSize: 40, fontWeight: 600, color: theme.colors.navy }}>
                {room.currency} {room.price}
              </span>
              <span style={{ color: theme.colors.textMuted, fontSize: 14 }}> /night</span>
            </div>

            {[
              { label: 'Check-in',   value: room.checkIn },
              { label: 'Check-out',  value: room.checkOut },
              { label: 'Max Guests', value: room.maxGuests },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.colors.borderLight}` }}>
                <span style={{ color: theme.colors.textMuted, fontSize: 13 }}>{row.label}</span>
                <span style={{ color: theme.colors.navy, fontSize: 13, fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => onReserve(room)}
              style={{ marginTop: 24 }}
            >
              Reserve Now
            </Button>

            <p style={{ color: theme.colors.textLight, fontSize: 11, textAlign: 'center', marginTop: 12 }}>
              Refundable deposit: RM 200
            </p>
          </div>
        </div>
      </div>

      {/* ── Rooms & Suites carousel ──────────────────── */}
      <div
        style={{
          background: theme.colors.navy,
          padding:    isMobile ? '40px 24px 48px' : '56px 80px 64px',
        }}
      >
        <h2
          style={{
            fontFamily: theme.fonts.serif,
            fontSize:   isMobile ? 28 : 38,
            fontWeight: 400,
            color:      theme.colors.white,
            marginBottom: 32,
          }}
        >
          Rooms <span style={{ color: theme.colors.gold }}>&amp;</span> Suites
        </h2>
        <div
          style={{
            display:    'grid',
            gridTemplateColumns: isMobile ? '1fr' : `repeat(${otherRooms.length}, minmax(260px, 1fr))`,
            gap:        24,
            overflowX:  'auto',
          }}
        >
          {otherRooms.map((r) => (
            <div key={r.id} style={{ background: theme.colors.navyMid, borderRadius: theme.radius.md, overflow: 'hidden', border: `1px solid rgba(201,168,76,0.12)` }}>
              <div style={{ height: 180, overflow: 'hidden' }}>
                <img src={r.images[0]} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '18px 20px' }}>
                <h4 style={{ fontFamily: theme.fonts.serif, fontSize: 20, color: theme.colors.white, marginBottom: 8 }}>{r.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>
                  {r.shortDescription.substring(0, 80)}...
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="outline-light" size="sm" onClick={() => {}} style={{ flex: 1 }}>Reserve</Button>
                  <Button variant="ghost" size="sm" onClick={() => {}} style={{ flex: 1, borderColor: 'rgba(201,168,76,0.3)', color: theme.colors.gold }}>Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
