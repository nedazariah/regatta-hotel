import { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import theme from '../../styles/theme';
import { today, formatDateShort } from '../../utils/dateUtils';
import useWindowSize from '../../hooks/useWindowSize';
import borderImg from '../../assets/borders.png';

// ── DayPicker colour overrides ───────────────────────────────────
// IMPORTANT: We only override colours/backgrounds here.
// We do NOT touch width, flex, display, or any layout property —
// those belong to react-day-picker and overriding them breaks the grid.
const PICKER_STYLE_ID = 'rdp-navy-overrides';
if (typeof document !== 'undefined' && !document.getElementById(PICKER_STYLE_ID)) {
  const s = document.createElement('style');
  s.id = PICKER_STYLE_ID;
  s.textContent = `
    /* ── Erase every internal background — colour only, no layout ── */
    .rdp-navy .rdp,
    .rdp-navy .rdp-root,
    .rdp-navy .rdp-months,
    .rdp-navy .rdp-month,
    .rdp-navy .rdp-month_grid,
    .rdp-navy .rdp-month_caption,
    .rdp-navy .rdp-nav,
    .rdp-navy .rdp-week,
    .rdp-navy .rdp-weekdays,
    .rdp-navy .rdp-day,
    .rdp-navy table,
    .rdp-navy thead,
    .rdp-navy tbody,
    .rdp-navy tr,
    .rdp-navy td,
    .rdp-navy th {
      background-color: transparent !important;
      box-shadow:       none !important;
      border-radius:    0 !important;
    }

    /* ── Day text ── */
    .rdp-navy .rdp-day_button {
      color:       rgba(255,255,255,0.75) !important;
      font-family: 'DM Sans', sans-serif !important;
    }

    /* ── Weekday headers — gold ── */
    .rdp-navy .rdp-weekday {
      color:          #C9A84C !important;
      font-size:      11px !important;
      font-weight:    700 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
    }

    /* ── Month/year heading — white ── */
    .rdp-navy .rdp-month_caption,
    .rdp-navy .rdp-caption_label {
      color:          #ffffff !important;
      font-family:    'DM Sans', sans-serif !important;
      font-weight:    700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
      font-size:      13px !important;
    }

    /* ── Nav arrows — gold ── */
    .rdp-navy .rdp-button_previous,
    .rdp-navy .rdp-button_next {
      color:            #C9A84C !important;
      border-color:     rgba(201,168,76,0.35) !important;
      background-color: transparent !important;
    }
    .rdp-navy .rdp-button_previous svg,
    .rdp-navy .rdp-button_next svg {
      stroke: #C9A84C !important;
      fill:   #C9A84C !important;
    }
    .rdp-navy .rdp-button_previous:hover,
    .rdp-navy .rdp-button_next:hover {
      background-color: rgba(201,168,76,0.12) !important;
    }

    /* ── Disabled / outside ── */
    .rdp-navy .rdp-day--disabled .rdp-day_button {
      color: rgba(255,255,255,0.18) !important;
    }
    .rdp-navy .rdp-day--outside .rdp-day_button {
      color: rgba(255,255,255,0.2) !important;
    }

    /* ── Hover ── */
    .rdp-navy .rdp-day_button:hover:not(:disabled) {
      background-color: rgba(201,168,76,0.18) !important;
      color:            #ffffff !important;
    }

    /* ── Today ── */
    .rdp-navy .rdp-today .rdp-day_button {
      border:      1px solid #C9A84C !important;
      color:       #C9A84C !important;
      font-weight: 700 !important;
    }

    /* ── Selected start / end — gold circle ── */
    .rdp-navy .rdp-range_start .rdp-day_button,
    .rdp-navy .rdp-range_end .rdp-day_button,
    .rdp-navy .rdp-selected .rdp-day_button {
      background-color: #C9A84C !important;
      color:            #0B1829 !important;
      border-color:     #C9A84C !important;
      font-weight:      700 !important;
    }

    /* ── Range middle — subtle tint ── */
    .rdp-navy .rdp-range_middle .rdp-day_button {
      background-color: rgba(245,239,230,0.10) !important;
      color:            rgba(255,255,255,0.9) !important;
      border-radius:    0 !important;
    }

    /* ── Divider between the two months + breathing room ── */
    .rdp-navy .rdp-month + .rdp-month {
      border-left:  1px solid rgba(201,168,76,0.15) !important;
      padding-left: 32px !important;   /* space between divider and right calendar */
    }
  `;
  document.head.appendChild(s);
}

export default function CalendarPicker({ isOpen, onClose, range, onRangeChange, anchorRef }) {
  const { isMobile } = useWindowSize();
  const pickerRef    = useRef(null);
  const [style, setStyle] = useState({});
  const [draft, setDraft] = useState({ from: undefined, to: undefined });

  useEffect(() => {
    if (isOpen) setDraft(range ?? { from: undefined, to: undefined });
  }, [isOpen]);

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

  // ── Outside-click ────────────────────────────────────────────
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

  // ── Escape ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleConfirm = () => { onRangeChange(draft); onClose(); };
  const canConfirm    = !!draft.from;

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
        background: theme.colors.navy,
        boxShadow:  '0 8px 40px rgba(11,24,41,0.35)',
        border:     '1px solid rgba(201,168,76,0.3)',
        overflow:   'hidden',
        boxSizing:  'border-box',
      }}
    >
      {/* ── Decorative corner border ─────────────────────────── */}
      <div
        style={{
          position:         'absolute',
          inset:            0,
          backgroundImage:  `url(${borderImg})`,
          backgroundSize:   '100% 100%',
          backgroundRepeat: 'no-repeat',
          pointerEvents:    'none',
          zIndex:           0,
        }}
      />

      {/* ── Status strip ─────────────────────────────────────── */}
      <div
        style={{
          position:     'relative',
          zIndex:       1,
          padding:      '14px 20px',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          display:      'flex',
          alignItems:   'center',
          gap:          10,
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
                : 'rgba(255,255,255,0.25)',
          }}
        />
        <span style={{ color: 'rgba(255,255,255,0.85)', fontFamily: theme.fonts.sans, fontSize: 12, letterSpacing: '0.06em', flex: 1 }}>
          {confirmLabel}
        </span>
        {(draft.from || draft.to) && (
          <button
            onClick={() => setDraft({ from: undefined, to: undefined })}
            style={{
              background:    'white',
              border:        '1px solid white',
              color:         'black',
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

      {/* ── DayPicker ────────────────────────────────────────── */}
      {/*
        Wrapper gets the rdp-navy class so all our CSS selectors apply.
        We do NOT set width/flex on anything inside — the library owns its layout.
        Padding here creates breathing room around the calendar.
      */}
      <div
        className="rdp-navy"
        style={{
          position:       'relative',
          zIndex:         1,
          padding:        isMobile ? '12px 8px' : '16px 24px',
          boxSizing:      'border-box',
          display:        'flex',
          justifyContent: 'center',   // centres the calendar horizontally
        }}
      >
        <DayPicker
          mode="range"
          selected={draft}
          onSelect={(r) => setDraft(r ?? { from: undefined, to: undefined })}
          numberOfMonths={isMobile ? 1 : 2}
          disabled={{ before: today() }}
          showOutsideDays
        />
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div
        style={{
          position:  'relative',
          zIndex:    1,
          padding:   '12px 16px',
          borderTop: '1px solid rgba(201,168,76,0.2)',
          display:   'flex',
          gap:       10,
        }}
      >
        <button
          onClick={onClose}
          style={{
            flex:          '0 0 auto',
            padding:       '12px 20px',
            background:    'white',
            border:        '1px solid white',
            color:         'black',
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
            background:    canConfirm ? theme.colors.gold : 'rgba(255,255,255,0.08)',
            color:         canConfirm ? theme.colors.navy : 'rgba(255,255,255,0.3)',
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