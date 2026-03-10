import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';
import { HOTEL_INFO, NAV_LINKS, FOOTER_LINKS, LOGO_URL } from '../../data/hotel';
import useWindowSize from '../../hooks/useWindowSize';

export default function Footer() {
  const { isMobile, isTablet } = useWindowSize();
  const navigate = useNavigate();
  const cols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1.4fr 1fr 1fr 1.4fr';

  return (
    <footer style={{ background: theme.colors.cream, borderTop: `1px solid ${theme.colors.border}` }}>

      {/* ── Newsletter strip ──────────────────────────── */}
      <div
        style={{
          padding:        isMobile ? '40px 24px 32px' : '52px 80px 44px',
          display:        'flex',
          alignItems:     isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection:  isMobile ? 'column' : 'row',
          gap:            24,
          borderBottom:   `1px solid ${theme.colors.border}`,
        }}
      >
        <h2
          style={{
            fontFamily:  theme.fonts.serif,
            fontSize:    isMobile ? 28 : 38,
            fontWeight:  400,
            color:       theme.colors.navy,
            lineHeight:  1.2,
            margin:      0,
            maxWidth:    480,
          }}
        >
          Stay connected to the<br />world of Regatta Hotel
        </h2>
        <button
          style={{
            background:    theme.colors.navy,
            color:         theme.colors.white,
            border:        'none',
            padding:       isMobile ? '14px 28px' : '18px 44px',
            fontFamily:    theme.fonts.sans,
            fontSize:      12,
            fontWeight:    600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            cursor:        'pointer',
            whiteSpace:    'nowrap',
            transition:    'background 0.2s',
            flexShrink:    0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.navyMid)}
          onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.navy)}
        >
          Join Our Mailing List
        </button>
      </div>

      {/* ── 4-column links — with watermark behind ───── */}
      <div style={{ position: 'relative', padding: isMobile ? '40px 24px 32px' : '56px 80px 48px' }}>
        {/* Watermark logo — centred, very subtle */}
        <div
          style={{
            position:   'absolute',
            top:        '50%',
            left:       '50%',
            transform:  'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity:    0.05,
            userSelect: 'none',
          }}
        >
          <img
            src={LOGO_URL}
            alt=""
            style={{ width: isMobile ? 240 : 360, height: 'auto', objectFit: 'contain' }}
          />
        </div>

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: cols,
            gap:                 isMobile ? 36 : 48,
            position:            'relative', // above watermark
            zIndex:              1,
          }}
        >
          {/* Brand col */}
          <div>
            <img
              src={LOGO_URL}
              alt="Regatta"
              style={{ height: isMobile ? 60 : 72, width: 'auto', objectFit: 'contain', marginBottom: 16 }}
            />
            <p style={{ color: theme.colors.textMuted, fontSize: 13, lineHeight: 1.85, maxWidth: 220 }}>
              {HOTEL_INFO.tagline}
            </p>
          </div>

          {/* World of Regatta */}
          <div>
            <h4 style={{ fontFamily: theme.fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.colors.navy, marginBottom: 20 }}>
              World of Regatta Hotel
            </h4>
            {FOOTER_LINKS.worldOfRegatta.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{ display: 'block', color: theme.colors.textMuted, fontSize: 14, marginBottom: 12, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = theme.colors.navy)}
                onMouseLeave={(e) => (e.target.style.color = theme.colors.textMuted)}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Hotel Services */}
          <div>
            <h4 style={{ fontFamily: theme.fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.colors.navy, marginBottom: 20 }}>
              Hotel Services
            </h4>
            {FOOTER_LINKS.hotelServices.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{ display: 'block', color: theme.colors.textMuted, fontSize: 14, marginBottom: 12, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = theme.colors.navy)}
                onMouseLeave={(e) => (e.target.style.color = theme.colors.textMuted)}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: theme.fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.colors.navy, marginBottom: 20 }}>
              Contact Us
            </h4>
            <p style={{ color: theme.colors.textMuted, fontSize: 14, lineHeight: 1.9 }}>
              <strong style={{ color: theme.colors.navy, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {HOTEL_INFO.name}
              </strong>
              Owned by {HOTEL_INFO.owner}<br />
              Unit G-31, Ground Floor, LD Legenda,<br />
              Jalan Tun Abang Haji Openg,<br />
              93000 Kuching, Sarawak.
            </p>
          </div>
        </div>
      </div>

      {/* ── Copyright ─────────────────────────────────── */}
      <div
        style={{
          borderTop:      `1px solid ${theme.colors.borderLight}`,
          padding:        '20px 40px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            8,
        }}
      >
        <img src={LOGO_URL} alt="" style={{ height: 36, objectFit: 'contain', opacity: 0.35 }} />
        <p
          style={{
            color:         theme.colors.textLight,
            fontSize:      11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily:    theme.fonts.sans,
          }}
        >
          Regatta Hotel © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
