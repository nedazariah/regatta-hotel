import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';
import { ROOMS } from '../../data/rooms';
import useWindowSize from '../../hooks/useWindowSize';
import borderImg from '../../assets/borders.png';

export default function RoomsSection() {
  const { isMobile } = useWindowSize();
  const navigate     = useNavigate();
  const total        = ROOMS.length;
  const [activeIdx, setActiveIdx] = useState(1);

  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  const leftIdx    = (activeIdx - 1 + total) % total;
  const rightIdx   = (activeIdx + 1) % total;
  const activeItem = ROOMS[activeIdx];
  const leftItem   = ROOMS[leftIdx];
  const rightItem  = ROOMS[rightIdx];

  return (
    <section
      id="rooms"
      style={{
        background:       theme.colors.navy,
        height:           isMobile ? 'auto' : '100vh',
        minHeight:        isMobile ? 'auto' : '100vh',
        display:          'flex',
        flexDirection:    isMobile ? 'column-reverse' : 'row',
        alignItems:       'center',
        justifyContent:   'center',
        padding:          isMobile ? '48px 20px' : '48px 40px',
        boxSizing:        'border-box',
        overflow:         'hidden',
        position:         'relative',
        borderBottom:     '5px solid',
        borderBottomColor:'white',
      }}
    >
      <div
        style={{
          position:          'absolute',
          inset:             0,
          backgroundImage:   `url(${borderImg})`,
          backgroundSize:    '100% 100%',
          backgroundRepeat:  'no-repeat',
          pointerEvents:     'none',
          zIndex:            0,
        }}
      />
      <div
        style={{
          position:       'relative',
          zIndex:         1,  
          display:        'flex',
          width:          '100%',
          height:         '100%',
          padding:        '20px',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Cards row ─────────────────────────────────── */}
        <div
          style={{
            display:    'flex',
            alignItems: 'flex-end',
            gap:        isMobile ? 12 : 24,
            width:      '100%',
            maxWidth:   3200,
            flex:       1,
            minHeight:  0,
          }}
        >
          {!isMobile && <SideCard item={leftItem}  side="left"  onClick={prev} />}

          <ActiveCard
            item={activeItem}
            isMobile={isMobile}
            onExplore={() => navigate('/rooms')}
          />

          {!isMobile && <SideCard item={rightItem} side="right" onClick={next} />}
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
          position:       'relative',
          zIndex:          1,
          flex:           '0 0 auto',
          height:         '50%',
          width:          isMobile ? '100%' : '20%',
          borderRadius:   isMobile ? '50%' : 0,
          padding:        isMobile ? '48px 32px 36px' : '10px 10px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     isMobile ? 'center' : 'end',
          justifyContent: isMobile ? 'center' : 'end',
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
            fontSize:     isMobile ? 36 : 66,
            fontWeight:   400,
            color:        theme.colors.white,
            lineHeight:   1.1,
            marginBottom: 0,
          }}
        >
          Rooms
          <em style={{ display: 'block', fontStyle: 'italic', color: '#D4B47A', textAlign: isMobile ? 'center' : 'right' }}>
            &
          </em>
        </h2>
        <h2
          style={{
            fontFamily:   theme.fonts.serif,
            fontSize:     isMobile ? 36 : 66,
            fontWeight:   400,
            color:        theme.colors.white,
            lineHeight:   1.1,
            marginBottom: 0,
          }}
        >
          Suites
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
      </div>
    </section>
  );
}

function ActiveCard({ item, isMobile, onExplore }) {
  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignSelf:     'stretch',
        transition:    'all 0.35s ease',
      }}
    >
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

      <div style={{ background: theme.colors.navy, paddingTop: 24, paddingBottom: 0, flexShrink: 0 }}>
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
          onClick={onExplore}
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
        alignSelf:     'flex-end',
        height:        '76%',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.transform = 'scale(1.02)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <div style={{ flex: 1, overflow: 'hidden', borderRadius: 4, position: 'relative' }}>
        <img
          src={item.images[0]}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,24,41,0.75) 0%, transparent 45%)' }} />
        <p style={{
          position:      'absolute',
          bottom:        20,
          left:          side === 'left'  ? 20 : undefined,
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