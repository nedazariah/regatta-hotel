import theme from '../../styles/theme';
import useWindowSize from '../../hooks/useWindowSize';

/**
 * ExperiencesSection
 * 100vh height. Left: cream text. Right: Hornbill photo.
 * Padding on both sides so nothing touches the edges.
 *
 * TODO: Replace HORNBILL_IMG with actual hosted Sarawak hornbill photo.
 */
const HORNBILL_IMG =
  'https://images.unsplash.com/photo-1590418606746-018840f9cd0f?auto=format&fit=crop&w=1200&q=85';

export default function ExperiencesSection() {
  const { isMobile } = useWindowSize();

  return (
    <section
      style={{
        background:          '#F5EFE6',
        height:              isMobile ? 'auto' : '100vh',
        minHeight:           isMobile ? 'auto' : '100vh',
        display:             'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        padding:             isMobile ? '52px 28px' : '48px',
        gap:                 isMobile ? 32 : 40,
        boxSizing:           'border-box',
        overflow:            'hidden',
      }}
    >
      {/* ── LEFT: text panel ──────────────────────────── */}
      <div
        style={{
          background:     theme.colors.cream,
          borderRadius:   4,
          padding:        isMobile ? '40px 28px' : '64px 64px',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          position:       'relative',
          overflow:       'hidden',
        }}
      >
        <p
          style={{
            position:      'absolute',
            top:           isMobile ? 28 : 40,
            left:          isMobile ? 28 : 64,
            color:         theme.colors.textMuted,
            fontSize:      11,
            fontWeight:    500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily:    theme.fonts.sans,
          }}
        >
          Experiences
        </p>

        <h2
          style={{
            fontFamily:   theme.fonts.serif,
            fontSize:     isMobile ? 30 : 44,
            fontWeight:   700,
            color:        theme.colors.navy,
            lineHeight:   1.15,
            marginBottom: 0,
          }}
        >
          A Sophisticated hotel within
        </h2>
        <h2
          style={{
            fontFamily:   theme.fonts.serif,
            fontSize:     isMobile ? 30 : 44,
            fontWeight:   700,
            fontStyle:    'italic',
            color:        '#8B7340',
            lineHeight:   1.15,
            marginBottom: 28,
          }}
        >
          Historical Surroundings
        </h2>

        <p
          style={{
            color:      theme.colors.text,
            fontSize:   15,
            lineHeight: 1.8,
            maxWidth:   400,
          }}
        >
          Surrounded by rich heritage and cultural landmarks, the area
          offers guests a glimpse into the city's history while enjoying the
          comfort of modern living.
        </p>
      </div>

      {/* ── RIGHT: Hornbill photo ─────────────────────── */}
      <div
        style={{
          overflow:     'hidden',
          borderRadius: 4,
          minHeight:    isMobile ? 300 : 'auto',
        }}
      >
        <img
          src={HORNBILL_IMG}
          alt="Rhinoceros Hornbill — symbol of Sarawak"
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center',
            display:        'block',
            transition:     'transform 0.6s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.03)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        />
      </div>
    </section>
  );
}
