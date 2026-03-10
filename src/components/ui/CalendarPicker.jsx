import { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import theme from '../../styles/theme';
import { today, formatDateShort } from '../../utils/dateUtils';
import useWindowSize from '../../hooks/useWindowSize';

// ── Gold colour overrides for react-day-picker ───────────────────
// Injected once into <head> so the CSS variables apply to every
// portal-rendered picker regardless of where it mounts in the DOM.
const PICKER_STYLE_ID = 'rdp-gold-overrides';
if (typeof document !== 'undefined' && !document.getElementById(PICKER_STYLE_ID)) {
  const s = document.createElement('style');
  s.id = PICKER_STYLE_ID;
  s.textContent = `
    /* Selected start / end day — filled circle */
    .rdp-day_button[aria-selected="true"],
    .rdp-selected .rdp-day_button {
      background-color: #C9A84C !important;
      color: #0B1829 !important;
      border-color: #C9A84C !important;
    }

    /* Days in the range between start and end */
    .rdp-range_middle .rdp-day_button {
      background-color: rgba(201,168,76,0.18) !important;
      color: #1C1C1C !important;
      border-radius: 0 !important;
    }

    /* Today's date indicator */
    .rdp-today .rdp-day_button {
      border: 1px solid #C9A84C !important;
      color: #C9A84C !important;
      font-weight: 700;
    }

    /* Hover state on unselected days */
    .rdp-day_button:hover:not([aria-selected="true"]) {
      background-color: rgba(201,168,76,0.15) !important;
      color: #0B1829 !important;
    }

    /* Range start/end caps keep full circle */
    .rdp-range_start .rdp-day_button,
    .rdp-range_end .rdp-day_button {
      background-color: #C9A84C !important;
      color: #0B1829 !important;
      border-color: #C9A84C !important;
      font-weight: 700;
    }
  `;
  document.head.appendChild(s);
}

export default function CalendarPicker({ isOpen, onClose, range, onRangeChange, anchorRef }) {
  const { isMobile } = useWindowSize();
  const pickerRef    = useRef(null);
  const [style, setStyle] = useState({});
  const [draft, setDraft] = useState({ from: undefined, to: undefined });

  // Sync draft to committed range each time picker opens
  useEffect(() => {
    if (isOpen) setDraft(range ?? { from: undefined, to: undefined });
  }, [isOpen]); // intentionally not watching `range`

  // ── Positioning: match anchor width exactly ──────────────────
  const updatePosition = useCallback(() => {
    if (!anchorRef?.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setStyle({
      position: 'fixed',
      top:      rect.bottom + 8,
      left:     isMobile ? 0 : rect.left,
      width:    isMobile ? '100vw' : rect.width,
      zIndex:   9999,
    });
  }, [anchorRef, isMobile]);

  useEffect(() => { if (isOpen) updatePosition(); }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  // ── Outside-click → discard draft, close ────────────────────
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
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handler); };
  }, [isOpen, onClose, anchorRef]);

  // ── Escape → discard draft, close ───────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // ── Confirm: commit draft to parent then close ───────────────
  const handleConfirm = () => {
    onRangeChange(draft);
    onClose();
  };

  const canConfirm = !!draft.from;

  const confirmLabel = (() => {
    if (!draft.from) return 'Select a check-in date';
    if (!draft.to)   return `Check-in: ${formatDateShort(draft.from)} — now select check-out`;
    return `${formatDateShort(draft.from)} → ${formatDateShort(draft.to)}`;
  })();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={pickerRef}
      className="animate-fade-in"
      style={{
        ...style,
        background: '#fff',
        boxShadow:  '0 8px 40px rgba(11,24,41,0.18)',
        border:     `1px solid ${theme.colors.border}`,
        overflow:   'hidden',
        boxSizing:  'border-box',
      }}
    >
      {/* ── Status strip ───────────────────────────────────── */}
      <div
        style={{
          padding:    '12px 20px',
          background: theme.colors.navy,
          display:    'flex',
          alignItems: 'center',
          gap:        10,
        }}
      >
        <span
          style={{
            width:        8,
            height:       8,
            borderRadius: '50%',
            flexShrink:   0,
            transition:   'background 0.3s',
            background:   draft.from && draft.to
              ? theme.colors.gold
              : draft.from
                ? theme.colors.roseGold
                : 'rgba(255,255,255,0.3)',
          }}
        />
        <span
          style={{
            color:         'rgba(255,255,255,0.85)',
            fontFamily:    theme.fonts.sans,
            fontSize:      12,
            letterSpacing: '0.06em',
            flex:          1,
          }}
        >
          {confirmLabel}
        </span>
        {(draft.from || draft.to) && (
          <button
            onClick={() => setDraft({ from: undefined, to: undefined })}
            style={{
              background:    'none',
              border:        '1px solid rgba(255,255,255,0.25)',
              color:         'rgba(255,255,255,0.6)',
              fontFamily:    theme.fonts.sans,
              fontSize:      10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding:       '4px 10px',
              cursor:        'pointer',
              flexShrink:    0,
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* ── DayPicker ──────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DayPicker
          mode="range"
          selected={draft}
          onSelect={(r) => setDraft(r ?? { from: undefined, to: undefined })}
          numberOfMonths={isMobile ? 1 : 2}
          disabled={{ before: today() }}
          showOutsideDays
        />
      </div>

      {/* ── Cancel / Confirm footer ─────────────────────────── */}
      <div
        style={{
          padding:   '12px 16px',
          borderTop: `1px solid ${theme.colors.border}`,
          display:   'flex',
          gap:       10,
        }}
      >
        <button
          onClick={onClose}
          style={{
            flex:          '0 0 auto',
            padding:       '12px 20px',
            background:    'none',
            border:        `1px solid ${theme.colors.border}`,
            color:         theme.colors.textMuted,
            fontFamily:    theme.fonts.sans,
            fontSize:      12,
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor:        'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          style={{
            flex:          1,
            padding:       '12px',
            background:    canConfirm ? theme.colors.navy : theme.colors.border,
            color:         canConfirm ? theme.colors.white : theme.colors.textLight,
            border:        'none',
            fontFamily:    theme.fonts.sans,
            fontWeight:    700,
            fontSize:      12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor:        canConfirm ? 'pointer' : 'not-allowed',
            transition:    'background 0.2s',
          }}
        >
          Confirm Dates
        </button>
      </div>
    </div>,
    document.body
  );
}