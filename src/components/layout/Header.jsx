import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import theme from '../../styles/theme';
import { NAV_LINKS, LOGO_URL } from '../../data/hotel';
import useWindowSize from '../../hooks/useWindowSize';

export default function Header() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isMobile } = useWindowSize();
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Hide on scroll-down, show on scroll-up / at top ──
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y <= 10) {
        setVisible(true);
      } else if (y < lastY.current - 4) {
        setVisible(true);          // scrolling UP
      } else if (y > lastY.current + 8) {
        setVisible(false);         // scrolling DOWN
        setMenuOpen(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleNav = (path) => {
    setMenuOpen(false);
    if (path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = path.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <header
        style={{
          // position:     'fixed',
          top:          0,
          left:         0,
          right:        0,
          zIndex:       theme.zIndex.header,
          background:   theme.colors.cream,
          borderBottom: `1px solid ${theme.colors.border}`,
          transform:    visible ? 'translateY(0)' : 'translateY(-100%)',
          transition:   'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ── Row 1: Logo (centred) ──────────────────────── */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'center',
            alignItems:     'center',
            padding:        isMobile ? '14px 24px 10px' : '20px 48px 14px',
            borderBottom:   `1px solid ${theme.colors.borderLight}`,
          }}
        >
          <div onClick={() => handleNav('/')} style={{ cursor: 'pointer' }}>
            <img
              src={LOGO_URL}
              alt="Regatta"
              style={{ height: isMobile ? 56 : 84, width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

        {/* ── Row 2: Hamburger (mobile only) | Nav | Book ── */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        isMobile ? '10px 24px' : '0 56px',
            height:         isMobile ? 48 : 56,
          }}
        >
          {/* Hamburger — mobile only; desktop left spacer */}
          {isMobile ? (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: 'none',
                border:     'none',
                cursor:     'pointer',
                display:    'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap:        5,
                padding:    0,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display:    'block',
                    width:      22,
                    height:     1.5,
                    background: theme.colors.navy,
                    transition: 'all 0.25s',
                    transform:
                      menuOpen && i === 0 ? 'translateY(6.5px) rotate(45deg)' :
                      menuOpen && i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                    opacity:    menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          ) : (
            /* Desktop: invisible spacer to keep nav centred */
            <div style={{ width: 80 }} />
          )}

          {/* Desktop nav */}
          {!isMobile && (
            <nav style={{ display: 'flex', gap: 56 }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.path)}
                  style={{
                    background:    'none',
                    border:        'none',
                    cursor:        'pointer',
                    fontFamily:    theme.fonts.sans,
                    fontSize:      14,
                    fontWeight:    isActive(link.path) ? 500 : 400,
                    color:         theme.colors.navy,
                    letterSpacing: '0.02em',
                    padding:       0,
                    opacity:       isActive(link.path) ? 1 : 0.65,
                    transition:    'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = isActive(link.path) ? '1' : '0.65';
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* BOOK button — sharp corners, no border radius */}
          <button
            onClick={() => handleNav('/booking')}
            style={{
              background:    theme.colors.navy,
              color:         theme.colors.white,
              border:        'none',
              borderRadius:  0,
              padding:       isMobile ? '9px 22px' : '12px 36px',
              fontFamily:    theme.fonts.sans,
              fontSize:      12,
              fontWeight:    700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor:        'pointer',
              transition:    'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.navyMid)}
            onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.navy)}
          >
            Book
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────── */}
      {isMobile && menuOpen && (
        <div
          className="animate-fade-in"
          style={{
            position:    'fixed',
            top:         122,
            left:        0,
            right:       0,
            zIndex:      theme.zIndex.header - 1,
            background:  theme.colors.cream,
            borderBottom:`1px solid ${theme.colors.border}`,
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.path)}
              style={{
                display:    'block',
                width:      '100%',
                padding:    '16px 24px',
                background: 'none',
                border:     'none',
                textAlign:  'left',
                fontFamily: theme.fonts.sans,
                fontSize:   15,
                fontWeight: isActive(link.path) ? 600 : 400,
                color:      theme.colors.navy,
                cursor:     'pointer',
                borderBottom: `1px solid ${theme.colors.borderLight}`,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
