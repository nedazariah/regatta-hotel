import { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import theme from '../../styles/theme';
import { today } from '../../utils/dateUtils';
import useWindowSize from '../../hooks/useWindowSize';

/**
 * CalendarPicker
 *
 * Renders via ReactDOM.createPortal directly into document.body so it is
 * never clipped or covered by any sibling section — regardless of z-index or
 * overflow settings on parent containers.
 *
 * Props:
 *  isOpen        boolean
 *  onClose       () => void
 *  range         { from: Date | undefined, to: Date | undefined }
 *  onRangeChange (range) => void
 *  anchorRef     React ref to the element the picker should appear below
 */
export default function CalendarPicker({ isOpen, onClose, range, onRangeChange, anchorRef }) {
  const { isMobile } = useWindowSize();
  const pickerRef  = useRef(null);
  const [style, setStyle] = useState({});

  // Calculate position from the anchor element every time it opens
  const updatePosition = useCallback(() => {
    if (!anchorRef?.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const pickerW   = isMobile ? viewportW : 660;
    // Clamp left so picker never goes off the right edge
    const rawLeft = rect.left;
    const left    = Math.min(rawLeft, viewportW - pickerW - 12);

    setStyle({
      position: 'fixed',
      top:      rect.bottom + 10,
      left:     isMobile ? 0 : Math.max(left, 8),
      width:    isMobile ? '100%' : pickerW,
      zIndex:   9999,
    });
  }, [anchorRef, isMobile]);

  useEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  // Re-position on scroll or resize while open
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('scroll',  updatePosition, true);
    window.addEventListener('resize',  updatePosition);
    return () => {
      window.removeEventListener('scroll',  updatePosition, true);
      window.removeEventListener('resize',  updatePosition);
    };
  }, [isOpen, updatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (
        pickerRef.current && !pickerRef.current.contains(e.target) &&
        (!anchorRef?.current || !anchorRef.current.contains(e.target))
      ) {
        onClose();
      }
    };
    // Use timeout so the click that opened doesn't immediately close it
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handler);
    };
  }, [isOpen, onClose, anchorRef]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={pickerRef}
      className="animate-fade-in"
      style={style}
    >
      <DayPicker
        mode="range"
        selected={range}
        onSelect={onRangeChange}
        numberOfMonths={isMobile ? 1 : 2}
        disabled={{ before: today() }}
        showOutsideDays
      />
      {isMobile && (
        <button
          onClick={onClose}
          style={{
            display:       'block',
            width:         '100%',
            padding:       '13px',
            background:    theme.colors.navy,
            color:         theme.colors.white,
            border:        'none',
            fontFamily:    theme.fonts.sans,
            fontWeight:    600,
            fontSize:      13,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor:        'pointer',
          }}
        >
          Confirm Dates
        </button>
      )}
    </div>,
    document.body
  );
}
