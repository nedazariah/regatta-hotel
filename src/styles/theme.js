/**
 * Design tokens for Regatta Suites Kuching.
 * Update this file to globally restyle the application.
 */
const theme = {
  colors: {
    // Backgrounds
    cream:      '#F5EFE6',   // primary page background
    creamDark:  '#EDE5D5',   // slightly deeper cream for alternating sections
    white:      '#FFFFFF',

    // Brand
    navy:       '#0B1829',   // primary dark / headings on light bg
    navyMid:    '#132641',   // slightly lighter navy for cards
    gold:       '#C9A84C',   // primary accent
    goldLight:  '#D4B47A',   // hover / lighter accent
    goldMuted:  'rgba(201, 168, 76, 0.15)', // subtle gold tint
    roseGold:   '#C9956C',   // search bar border / label accent

    // Text
    text:       '#1C1C1C',   // primary body text
    textMuted:  '#7A6F64',   // secondary / captions
    textLight:  '#A89F97',   // placeholders, tertiary

    // Borders
    border:     '#DDD5C5',
    borderLight:'rgba(221, 213, 197, 0.5)',

    // Utility
    overlay:    'rgba(11, 24, 41, 0.55)',
    overlayHeavy: 'rgba(11, 24, 41, 0.75)',
  },

  fonts: {
    serif: "'Cormorant Garamond', Georgia, serif",
    sans:  "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  fontSizes: {
    xs:   '11px',
    sm:   '13px',
    base: '15px',
    md:   '17px',
    lg:   '22px',
    xl:   '28px',
    '2xl':'36px',
    '3xl':'48px',
    '4xl':'64px',
    hero: 'clamp(36px, 6vw, 72px)',
  },

  spacing: {
    xs:  '8px',
    sm:  '16px',
    md:  '24px',
    lg:  '48px',
    xl:  '80px',
    xxl: '120px',
    pagePadding: 'clamp(20px, 5vw, 80px)',
  },

  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },

  shadows: {
    card:     '0 4px 24px rgba(11, 24, 41, 0.08)',
    elevated: '0 8px 40px rgba(11, 24, 41, 0.16)',
    gold:     '0 4px 20px rgba(201, 168, 76, 0.25)',
  },

  transitions: {
    fast:   '0.15s ease',
    normal: '0.25s ease',
    slow:   '0.4s ease',
  },

  breakpoints: {
    mobile:  768,
    tablet:  1024,
    desktop: 1280,
  },

  zIndex: {
    base:    1,
    overlay: 10,
    header:  100,
    modal:   200,
  },
};

export default theme;
