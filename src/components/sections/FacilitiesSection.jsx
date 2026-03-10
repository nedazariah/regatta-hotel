import { useState, useCallback } from 'react';
import theme from '../../styles/theme';
import { FACILITIES } from '../../data/facilities';
import useWindowSize from '../../hooks/useWindowSize';

export default function FacilitiesSection() {
  const { isMobile, isTablet } = useWindowSize();
  const [activeIdx, setActiveIdx] = useState(0);
  const total = FACILITIES.length;

  const prev = useCallback(() => setActiveIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIdx((i) => (i + 1) % total), [total]);

  // On desktop show 2 cards; on mobile 1
  const visibleCount = isMobile ? 1 : isTablet ? 1 : 2;

  // Which facilities to show (looping)
  const visibleItems = Array.from({ length: visibleCount }, (_, k) =>
    FACILITIES[(activeIdx + k) % total]
  );

  return (
    <section
      id="facilities"
      style={{
        background:    theme.colors.navy,
        height:        '100vh',
        display:       'flex',
        flexDirection: isMobile ? 'column' : 'row',
        overflow:      'hidden',
        padding:       isMobile ? '0' : '0',
      }}
    >
      {/* ── LEFT: text panel ────────────────────────────── */}
      <div
        style={{
          flex:           '0 0 auto',
          width:          isMobile ? '100%' : isTablet ? '38%' : '40%',
          padding:        isMobile ? '48px 32px 36px' : '0 56px',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          background:     theme.colors.navy,
          // Padding so content doesn't touch edges
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
          Facilities
        </p>
        <h2
          style={{
            fontFamily:   theme.fonts.serif,
            fontSize:     isMobile ? 36 : isTablet ? 42 : 66,
            fontWeight:   400,
            color:        theme.colors.white,
            lineHeight:   1.1,
            marginBottom: 0,
          }}
        >
          A world of
          <em
            style={{
              display:   'block',
              fontStyle: 'italic',
              color:     '#D4B47A',
            }}
          >
            Relaxation awaits
          </em>
        </h2>
        <p
          style={{
            color:      'rgba(255,255,255,0.55)',
            fontSize:   16,
            lineHeight: 1.8,
            marginTop:  24,
            maxWidth:   300,
          }}
        >
          Experience refined comfort and elegant hospitality. Book your room today and enjoy a memorable stay designed for relaxation and indulgence.
        </p>

        {/* Carousel navigation — arrows + counter */}
        <div
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        16,
            marginTop:  40,
          }}
        >
          <button onClick={prev} style={arrowBtn} aria-label="Previous facility">
            &#8249;
          </button>
          <span
            style={{
              color:         'rgba(255,255,255,0.5)',
              fontSize:      13,
              fontFamily:    theme.fonts.sans,
              letterSpacing: '0.06em',
              minWidth:      40,
            }}
          >
            {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button onClick={next} style={arrowBtn} aria-label="Next facility">
            &#8250;
          </button>
        </div>
      </div>

      {/* ── RIGHT: facility photo cards ─────────────────── */}
      <div
        style={{
          flex:        1,
          display:     'flex',
          gap:         isMobile ? 0 : 16,
          overflow:    'hidden',
          // Padding so cards don't touch the outer edges
          padding:     isMobile ? '0' : '32px 40px 32px 0',
          alignItems:  'stretch',
        }}
      >
        {visibleItems.map((facility, k) => (
          <div
            key={`${facility.id}-${k}`}
            style={{
              flex:          1,
              display:       'flex',
              flexDirection: 'column',
              overflow:      'hidden',
              borderRadius:  isMobile ? 0 : 4,
              transition:    'opacity 0.35s ease',
              opacity:       1,
              minWidth:      0,
            }}
          >
            {/* Photo */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <img
                src={facility.image}
                alt={facility.name}
                style={{
                  width:      '100%',
                  height:     '100%',
                  objectFit:  'cover',
                  display:    'block',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            </div>

            {/* Label + Details button */}
            <div
              style={{
                background:  theme.colors.navy,
                padding:     '18px 24px 22px',
                borderTop:   '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <p
                style={{
                  color:         theme.colors.gold,
                  fontSize:      11,
                  fontWeight:    700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily:    theme.fonts.sans,
                  marginBottom:  14,
                }}
              >
                {facility.label}
              </p>
              <button
                style={{
                  background:    'none',
                  border:        '1px solid rgba(255,255,255,0.45)',
                  borderRadius:  0,
                  color:         theme.colors.white,
                  padding:       '9px 36px',
                  fontFamily:    theme.fonts.sans,
                  fontSize:      11,
                  fontWeight:    500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor:        'pointer',
                  transition:    'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; }}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const arrowBtn = {
  width:          40,
  height:         40,
  borderRadius:   '50%',
  background:     'rgba(255,255,255,0.1)',
  border:         '1px solid rgba(255,255,255,0.25)',
  color:          '#fff',
  fontSize:       22,
  cursor:         'pointer',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  lineHeight:     1,
  transition:     'background 0.2s',
  fontFamily:     'sans-serif',
};
