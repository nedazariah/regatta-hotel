import { useState } from 'react';
import theme from '../../styles/theme';
import { ROOMS } from '../../data/rooms';
import useWindowSize from '../../hooks/useWindowSize';

/**
 * RoomsSection — full-screen carousel.
 *
 * Desktop: 3 cards visible at once.
 *   - Active (centre) card: large, full description, Explore button.
 *   - Side cards: smaller, dimmed photo + label only.
 *   - Click a side card to make it active (animates to centre).
 *
 * Mobile: 1 card at a time, same active card treatment.
 */
export default function RoomsSection() {
  const { isMobile } = useWindowSize();
  const total = ROOMS.length;
  const [activeIdx, setActiveIdx] = useState(1); // start on centre (Relax & Unwind)

  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  // Which item indices to show: [left, centre, right]
  const leftIdx   = (activeIdx - 1 + total) % total;
  const rightIdx  = (activeIdx + 1) % total;
  const activeItem = ROOMS[activeIdx];
  const leftItem   = ROOMS[leftIdx];
  const rightItem  = ROOMS[rightIdx];

  return (
    <section
      id="rooms"
      style={{
        background:  theme.colors.navy,
        height:      isMobile ? 'auto' : '100vh',
        minHeight:   isMobile ? 'auto' : '100vh',
        display:     'flex',
        alignItems:  'center',
        justifyContent:'center',
        padding:     isMobile ? '48px 20px' : '48px 40px',
        boxSizing:   'border-box',
        overflow:    'hidden',
        position:    'relative',
        border:      '1px solid',
        borderBottomColor:  theme.colors.roseGold,
      }}
    >
      <div 
        style={{
            display:        'flex',
            width:          '80%',
            height:         '90%',
            padding:        '20px',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}
        >
        {/* ── Cards row ─────────────────────────────────── */}
        <div
          style={{
            display:        'flex',
            alignItems:     'flex-end',    // cards align to bottom so centre peeks up
            gap:            isMobile ? 12 : 24,
            width:          '100%',
            maxWidth:       3200,
            flex:           1,
            minHeight:      0,
          }}
        >
          {/* LEFT side card — click to activate */}
          {!isMobile && (
            <SideCard
              item={leftItem}
              side="left"
              onClick={prev}
            />
          )}

          {/* CENTRE active card */}
          <ActiveCard
            item={activeItem}
            isMobile={isMobile}
          />

          {/* RIGHT side card — click to activate */}
          {!isMobile && (
            <SideCard
              item={rightItem}
              side="right"
              onClick={next}
            />
          )}
        </div>

        {/* ── Navigation arrows + counter ───────────────── */}
        <div
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        24,
            marginTop:  isMobile ? 28 : 32,
            flexShrink: 0,
          }}
        >
          <button onClick={prev} style={arrowBtn} aria-label="Previous">&#8249;</button>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontFamily: theme.fonts.sans, fontSize: 12, letterSpacing: '0.1em' }}>
            {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button onClick={next} style={arrowBtn} aria-label="Next">&#8250;</button>
        </div>
      </div>

      <div
        style={{
          flex:           '0 0 auto',
          height:         '90%',
          width:          isMobile ? '100%' : '20%',
          padding:        isMobile ? '48px 32px 36px' : '10px 10px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          background:     theme.colors.navy,
          minHeight:      isMobile ? 'auto' : undefined,
        }}
      >
        <p
          style={{
            color:         theme.colors.gold,
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontFamily:    theme.fonts.sans,
            marginBottom:  20,
          }}
        >
          ACCOMMODATIONS
        </p>
        <h2
          style={{
            fontFamily:   theme.fonts.serif,
            fontSize:     isMobile ? 36 : 52,
            fontWeight:   400,
            color:        theme.colors.white,
            lineHeight:   1.1,
            marginBottom: 0,
          }}
        >
          Rooms
          <em
            style={{
              display:   'block',
              fontStyle: 'italic',
              color:     '#D4B47A',
              textAlign:  'center',
            }}
          >
            &
          </em>
        </h2>
        <h2
          style={{
            fontFamily:   theme.fonts.serif,
            fontSize:     isMobile ? 36 : 52,
            fontWeight:   400,
            color:        theme.colors.white,
            lineHeight:   1.1,
            marginBottom: 0,
          }}
        >
          Suites
        </h2>
      </div>
    </section>
  );
}

/** Large centred card: photo + label + description + Explore button */
function ActiveCard({ item, isMobile }) {
  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        // Slightly taller than side cards
        alignSelf:     'stretch',
        transition:    'all 0.35s ease',
      }}
    >
      {/* Photo */}
      <div style={{ flex: 1, overflow: 'hidden', borderRadius: 4, minHeight: isMobile ? 260 : 0 }}>
        <img
          src={item.images[0]}
          alt={item.name}
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center top',
            display:        'block',
            transition:     'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.03)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        />
      </div>

      {/* Label + description + CTA */}
      <div
        style={{
          background:  theme.colors.navy,
          paddingTop:  24,
          paddingBottom: 0,
          flexShrink:  0,
        }}
      >
        <p style={{
          color:         theme.colors.gold,
          fontSize:      11,
          fontWeight:    700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily:    theme.fonts.sans,
          marginBottom:  12,
        }}>
          {item.name}
        </p>
        <p style={{
          color:        'rgba(255,255,255,0.62)',
          fontSize:     isMobile ? 13 : 14,
          lineHeight:   1.75,
          marginBottom: 22,
          maxWidth:     400,
        }}>
          {item.shortDescription}
        </p>
        <button
          style={{
            background:    '#FFFFFF',
            color:         theme.colors.navy,
            border:        'none',
            borderRadius:  0,
            padding:       '12px 52px',
            fontFamily:    theme.fonts.sans,
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor:        'pointer',
            transition:    'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#ede5d5')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
        >
          Explore
        </button>
      </div>
    </div>
  );
}

/** Smaller dimmed card on left/right — click to make active */
function SideCard({ item, side, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex:          '0 0 26%',
        display:       'flex',
        flexDirection: 'column',
        cursor:        'pointer',
        opacity:       0.55,
        transition:    'opacity 0.3s ease, transform 0.3s ease',
        // Slightly shorter than centre card
        alignSelf:     'flex-end',
        height:        '76%',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.transform = 'scale(1.02)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {/* Photo — fills all height */}
      <div style={{ flex: 1, overflow: 'hidden', borderRadius: 4, position: 'relative' }}>
        <img
          src={item.images[0]}
          alt={item.name}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            display:    'block',
          }}
        />
        {/* Gradient for label legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,24,41,0.75) 0%, transparent 45%)' }} />
        {/* Label */}
        <p style={{
          position:      'absolute',
          bottom:        20,
          left:          side === 'left' ? 20 : undefined,
          right:         side === 'right' ? 20 : undefined,
          color:         '#fff',
          fontSize:      10,
          fontWeight:    700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily:    theme.fonts.sans,
          margin:        0,
        }}>
          {item.name}
        </p>
      </div>
    </div>
  );
}

const arrowBtn = {
  width:          44,
  height:         44,
  borderRadius:   '50%',
  background:     'rgba(255,255,255,0.08)',
  border:         '1px solid rgba(255,255,255,0.2)',
  color:          '#fff',
  fontSize:       26,
  cursor:         'pointer',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  lineHeight:     1,
  transition:     'background 0.2s',
  fontFamily:     'sans-serif',
};
