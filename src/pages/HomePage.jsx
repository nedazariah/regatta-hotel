import { useState } from 'react';
import theme from '../styles/theme';
import SearchBar from '../components/ui/SearchBar';
import FacilitiesSection from '../components/sections/FacilitiesSection';
import DiningSection from '../components/sections/DiningSection';
import ExperiencesSection from '../components/sections/ExperiencesSection';
import RoomsSection from '../components/sections/RoomsSection';
import useWindowSize from '../hooks/useWindowSize';

/**
 * Hero background — hotel reception/lobby photo.
 * TODO: Replace with actual hosted hotel lobby photo.
 */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85';

/**
 * Tabas Lounge carousel images.
 * TODO: Replace with actual Tabas Lounge photos.
 */
const LOUNGE_IMAGES = [
  'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1800&q=85',
];

export default function HomePage() {
  const { isMobile } = useWindowSize();
  const [slide, setSlide] = useState(0);
  const total = LOUNGE_IMAGES.length;
  const prevSlide = () => setSlide((s) => (s - 1 + total) % total);
  const nextSlide = () => setSlide((s) => (s + 1) % total);

  // Header height: logo row + nav row
  const headerH = isMobile ? 122 : 160;

  return (
    <main>

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ── Full viewport height minus the fixed header
          ── Large centred text in the middle of the image
          ── Heavy dark gradient covers the BOTTOM ~35% of
             the image so the search bar floats over it
          ── Search bar has 48px padding from left/right and
             bottom so it never touches edges
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position:   'relative',
          height:     `calc(100vh - ${headerH}px)`,
          minHeight:   560,
          overflow:   'hidden',
        }}
      >
        {/* Background photo */}
        <img
          src={HERO_IMAGE}
          alt="Regatta Suites — Plan Your Stay"
          style={{
            position:       'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center 30%',
          }}
        />

        {/* Gentle overall tint */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'rgba(5, 12, 24, 0.28)',
          }}
        />

        {/* Heavy dark gradient at the BOTTOM — makes search bar area dark */}
        <div
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '50%',
            background: 'linear-gradient(to top, rgba(5,12,24,0.88) 0%, rgba(5,12,24,0.55) 40%, transparent 100%)',
          }}
        />

        {/* ── Hero text — centred, large ── */}
        <div
          style={{
            position:  'absolute',
            top:       '30%',
            left:      '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width:     '100%',
            padding:   isMobile ? '0 28px' : '0 48px',
            zIndex:    1,
          }}
        >
          <h1
            style={{
              fontFamily:    theme.fonts.sans,
              fontSize:      isMobile ? 'clamp(28px, 8vw, 44px)' : 'clamp(40px, 5vw, 68px)',
              fontWeight:    700,
              color:         '#FFFFFF',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              lineHeight:    1.05,
              marginBottom:  isMobile ? 16 : 22,
              textShadow:    '0 2px 20px rgba(0,0,0,0.4)',
            }}
          >
            Plan Your Stay
          </h1>
          <p
            style={{
              color:      'rgba(255,255,255,0.82)',
              fontSize:   isMobile ? 13 : 16,
              lineHeight: 1.7,
              maxWidth:   620,
              margin:     '0 auto',
            }}
          >
            144 modern rooms in the heart of the city, steps from Sarawak General Hospital,
            {isMobile ? ' ' : <br />}
            AEON Mall, and Kuching's best dining and attractions.
          </p>
        </div>

        {/* ── Search bar — floats above bottom gradient ── */}
        {/* Has padding from left, right, and bottom so it never touches edges */}
        <div
          style={{
            position: 'absolute',
            width: !isMobile ? '80%' : 'auto',
            bottom:   isMobile ? 20 : 150,
            left:     isMobile ? 16 : 150,
            right:    isMobile ? 16 : 150,
            zIndex:   2,
          }}
        >
          <SearchBar variant="hero" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ROOMS SECTION
      ══════════════════════════════════════════════════════ */}
      <RoomsSection />

      {/* ══════════════════════════════════════════════════════
          FACILITIES — 100vh (handled inside FacilitiesSection)
      ══════════════════════════════════════════════════════ */}
      <FacilitiesSection />

      {/* ══════════════════════════════════════════════════════
          TABAS LOUNGE CAROUSEL — 100vh
          Full-width photo with left/right arrows
          "TABAS LOUNGE" text + desc + EXPLORE button centred
          "1 / 4" counter bottom-left
          Padded so nothing touches the viewport edges
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position:    'relative',
          height:      '100vh',
          overflow:    'hidden',
          background:  '#0a0a0a',
          userSelect:  'none',
          // Padding handled by inner absolute elements so image stays full-bleed
        }}
      >
        {/* Slide images */}
        {LOUNGE_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Tabas Lounge ${i + 1}`}
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              opacity:    i === slide ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}
          />
        ))}

        {/* Dark gradient bottom half */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to top, rgba(5,12,24,0.85) 0%, rgba(5,12,24,0.25) 45%, transparent 100%)',
          }}
        />

        {/* Left arrow — padded from edge */}
        <button
          onClick={prevSlide}
          style={{ ...arrowStyle, left: isMobile ? 16 : 40 }}
          aria-label="Previous"
        >&#8249;</button>

        {/* Right arrow — padded from edge */}
        <button
          onClick={nextSlide}
          style={{ ...arrowStyle, right: isMobile ? 16 : 40 }}
          aria-label="Next"
        >&#8250;</button>

        {/* Centre text — padded from bottom */}
        <div
          style={{
            position:  'absolute',
            bottom:    isMobile ? 64 : 80,
            left:      '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width:     '100%',
            maxWidth:  700,
            padding:   '0 32px',
            zIndex:    1,
          }}
        >
          <h2
            style={{
              fontFamily:    theme.fonts.sans,
              fontSize:      isMobile ? 26 : 48,
              fontWeight:    700,
              color:         '#FFFFFF',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom:  isMobile ? 12 : 18,
            }}
          >
            Tabas Lounge
          </h2>
          <p
            style={{
              color:        'rgba(255,255,255,0.78)',
              fontSize:     isMobile ? 13 : 15,
              lineHeight:   1.75,
              marginBottom: isMobile ? 20 : 32,
              maxWidth:     540,
              margin:       '0 auto',
              paddingBottom: isMobile ? 20 : 32,
            }}
          >
            Relax at Tabas Lounge by Regatta Suites, where cozy ambiance meets
            refined comfort. A perfect spot to unwind and enjoy a quiet, elegant
            atmosphere.
          </p>
          <button
            style={{
              background:    '#FFFFFF',
              color:         theme.colors.navy,
              border:        'none',
              borderRadius:  0,
              padding:       isMobile ? '12px 40px' : '15px 60px',
              fontFamily:    theme.fonts.sans,
              fontSize:      11,
              fontWeight:    600,
              letterSpacing: '0.16em',
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

        {/* Counter "1 / 4" bottom-left — padded from edge */}
        <div
          style={{
            position:      'absolute',
            bottom:        isMobile ? 24 : 36,
            left:          isMobile ? 16 : 48,
            display:       'flex',
            alignItems:    'center',
            gap:           12,
            zIndex:        1,
          }}
        >
          <button onClick={prevSlide} style={miniArrow}>&#8249;</button>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontFamily: theme.fonts.sans, fontSize: 12, letterSpacing: '0.08em' }}>
            {slide + 1} / {total}
          </span>
          <button onClick={nextSlide} style={miniArrow}>&#8250;</button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DINING — 100vh (handled inside DiningSection)
      ══════════════════════════════════════════════════════ */}
      <DiningSection />

      {/* ══════════════════════════════════════════════════════
          EXPERIENCES — 100vh (handled inside ExperiencesSection)
      ══════════════════════════════════════════════════════ */}
      <ExperiencesSection />

    </main>
  );
}

const arrowStyle = {
  position:       'absolute',
  top:            '50%',
  transform:      'translateY(-50%)',
  zIndex:         2,
  width:          52,
  height:         52,
  borderRadius:   '50%',
  background:     'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(6px)',
  border:         '1px solid rgba(255,255,255,0.3)',
  color:          '#fff',
  fontSize:       32,
  lineHeight:     1,
  cursor:         'pointer',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  transition:     'background 0.2s',
};

const miniArrow = {
  background:  'none',
  border:      'none',
  color:       'rgba(255,255,255,0.6)',
  fontSize:    18,
  cursor:      'pointer',
  padding:     0,
  lineHeight:  1,
};
