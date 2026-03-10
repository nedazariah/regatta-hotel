import { useState, useEffect } from 'react';
import theme from '../styles/theme';

/**
 * Returns the current window dimensions and breakpoint flags.
 * Re-evaluates on resize with a 100ms debounce to avoid excessive re-renders.
 */
export default function useWindowSize() {
  const [size, setSize] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth  : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    let timer;
    const handle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSize({ w: window.innerWidth, h: window.innerHeight });
      }, 100);
    };
    window.addEventListener('resize', handle);
    return () => { clearTimeout(timer); window.removeEventListener('resize', handle); };
  }, []);

  return {
    w:        size.w,
    h:        size.h,
    isMobile: size.w <  theme.breakpoints.mobile,
    isTablet: size.w >= theme.breakpoints.mobile && size.w < theme.breakpoints.tablet,
    isDesktop:size.w >= theme.breakpoints.tablet,
  };
}
