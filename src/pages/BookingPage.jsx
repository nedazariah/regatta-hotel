import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import theme from '../styles/theme';
import { formatDateShort, getNights } from '../utils/dateUtils';
import useWindowSize from '../hooks/useWindowSize';

// Generate a random-ish reservation reference
const genRef = () => `Rs-${Math.floor(10000 + Math.random() * 89999)}`;

export default function BookingPage() {
  const { isMobile }             = useWindowSize();
  const navigate                 = useNavigate();
  const { booking, updateBooking } = useBooking();
  const room                     = booking.selectedRoom;

  const headerH = isMobile ? 122 : 160;
  const nights  = getNights(booking.checkIn, booking.checkOut) || 1;
  const subtotal = room ? room.price * nights : 0;
  const serviceFee = 0;
  const taxRate    = 0;
  const total      = subtotal + serviceFee;

  const guestStr = (() => {
    const a = booking.adults;
    const c = booking.children;
    return `${a} Adult${a !== 1 ? 's' : ''}${c > 0 ? `, ${c} Child${c !== 1 ? 'ren' : ''}` : ''}`;
  })();

  const [form, setForm]       = useState({ name: '', card: '', expiry: '', cvv: '' });
  const [errors, setErrors]   = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const handleCardChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
    setForm((p) => ({ ...p, card: formatted }));
  };

  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    const fmt = raw.length > 2 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw;
    setForm((p) => ({ ...p, expiry: fmt }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                       e.name   = 'Required';
    if (form.card.replace(/\s/g,'').length < 16) e.card   = 'Enter a valid 16-digit card number';
    if (!form.expiry || form.expiry.length < 5)  e.expiry = 'MM/YY required';
    if (!form.cvv || form.cvv.length < 3)        e.cvv    = 'Required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    setTimeout(() => {
      updateBooking({
        confirmationRef: genRef(),
        cardLastFour:    form.card.replace(/\s/g, '').slice(-4),
        totalNights:     nights,
        nightlyRate:     room?.price,
        totalAmount:     total,
      });
      navigate('/confirmation');
    }, 900);
  };

  if (!room) {
    return (
      <main style={{ background: theme.colors.cream, paddingTop: headerH, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <p style={{ fontFamily: theme.fonts.serif, fontSize: 24, color: theme.colors.navy }}>No room selected.</p>
        <button
          onClick={() => navigate('/rooms')}
          style={{ background: theme.colors.navy, color: '#fff', border: 'none', padding: '14px 36px', fontFamily: theme.fonts.sans, fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          Browse Rooms
        </button>
      </main>
    );
  }

  return (
    <main style={{ background: theme.colors.cream, minHeight: '100vh' }}>

      {/* ── Page title ──────────────────────────────── */}
      <section style={{ padding: isMobile ? '36px 24px 8px' : '52px 80px 8px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: theme.fonts.serif,
            fontSize:   isMobile ? 32 : 54,
            fontWeight: 400,
            color:      theme.colors.navy,
          }}
        >
          Confirm your reservation
        </h1>
      </section>

      {/* ── Two-column form + summary ────────────────── */}
      <section
        style={{
          maxWidth:       '90%',
          margin:         '0 auto',
          padding:        isMobile ? '32px 24px 60px' : '40px 80px 80px',
          display:        'flex',
          alignItems:     'start',
          justifyContent: 'center',
          gap:            isMobile ? 40 : 1,
          boxSizing:      'border-box',
          flexDirection:  isMobile ? 'column' : 'row',
        }}
      >
        {/* ══ LEFT — Payment form ═══════════════════════ */}
        <div style={{ width: isMobile ? '100%' : '60%' }}>
          <p style={sectionLabel}>Payment Information</p>

          <Field
            label="Card Holder Name"
            placeholder="Sharifah Maimunah Binti Wan Alwi"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            error={errors.name}
          />

          <Field
            label="Card Number"
            placeholder="0000 0000 0000 0000"
            value={form.card}
            onChange={handleCardChange}
            inputMode="numeric"
            error={errors.card}
          />

          {/* Expiry + CVV side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Field
              label="Expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleExpiryChange}
              inputMode="numeric"
              error={errors.expiry}
            />
            {/* CVV — password field with show/hide toggle */}
            <Field
              label="cvv/cvc"
              placeholder="123"
              value={form.cvv}
              onChange={(e) => setForm((p) => ({ ...p, cvv: e.target.value.replace(/\D/g,'').slice(0,3) }))}
              inputMode="numeric"
              error={errors.cvv}
              type={showCvv ? 'text' : 'password'}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowCvv((v) => !v)}
                  style={{
                    background:  'none',
                    border:      'none',
                    padding:     '0 2px',
                    cursor:      'pointer',
                    color:       theme.colors.textMuted,
                    display:     'flex',
                    alignItems:  'center',
                    flexShrink:  0,
                    lineHeight:  1,
                  }}
                  aria-label={showCvv ? 'Hide CVV' : 'Show CVV'}
                >
                  {showCvv ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              display:       'block',
              width:         '100%',
              padding:       '20px',
              background:    submitting ? theme.colors.navyMid : theme.colors.navy,
              color:         theme.colors.white,
              border:        'none',
              borderRadius:  0,
              fontFamily:    theme.fonts.sans,
              fontSize:      12,
              fontWeight:    700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor:        submitting ? 'wait' : 'pointer',
              marginTop:     32,
              transition:    'background 0.2s',
            }}
          >
            {submitting ? 'Processing…' : 'Complete Payment'}
          </button>
        </div>

        {/* ── Vertical divider (desktop only) ─────── */}
        {!isMobile && (
          <div style={{ width: 1, background: theme.colors.border, alignSelf: 'stretch', margin: '0 56px' }} />
        )}

        {/* ══ RIGHT — Payment summary ════════════════════ */}
        <div style={{ width: isMobile ? '100%' : 'auto' }}>
          <h2
            style={{
              fontFamily:   theme.fonts.serif,
              fontSize:     isMobile ? 28 : 36,
              fontWeight:   400,
              color:        theme.colors.navy,
              marginBottom: 28,
            }}
          >
            Payment Summary
          </h2>

          <p style={{ color: theme.colors.gold, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: theme.fonts.sans, marginBottom: 4 }}>
            Regatta Kuching
          </p>
          <p style={{ color: theme.colors.textMuted, fontSize: 13, marginBottom: 24 }}>
            {formatDateShort(booking.checkIn)} – {formatDateShort(booking.checkOut)}
          </p>

          <div
            style={{
              display:       'flex',
              gap:           16,
              alignItems:    'flex-start',
              paddingBottom: 24,
              borderBottom:  `1px solid ${theme.colors.border}`,
              marginBottom:  24,
            }}
          >
            <div style={{ width: 100, height: 70, flexShrink: 0, overflow: 'hidden' }}>
              <img
                src={room.images[0]}
                alt={room.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <h3 style={{ fontFamily: theme.fonts.serif, fontSize: 18, fontWeight: 500, color: theme.colors.navy, marginBottom: 4 }}>
                {room.name}
              </h3>
              <p style={{ color: theme.colors.textMuted, fontSize: 12, lineHeight: 1.6 }}>
                {formatDateShort(booking.checkIn)} – {formatDateShort(booking.checkOut)}<br />
                {guestStr}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <CostRow
              label={`RM${room.price} × ${nights} night${nights !== 1 ? 's' : ''}`}
              value={`RM${subtotal}`}
            />
            {serviceFee > 0 && <CostRow label="Service Fee" value={`RM${serviceFee}`} />}
            {taxRate    > 0 && <CostRow label="Taxes & Fees" value={`RM${Math.round(subtotal * taxRate)}`} />}
          </div>

          <div
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'baseline',
              borderTop:      `1px solid ${theme.colors.border}`,
              paddingTop:     18,
              marginTop:      8,
            }}
          >
            <span style={{ fontFamily: theme.fonts.sans, fontSize: 15, fontWeight: 600, color: theme.colors.navy }}>Total</span>
            <span style={{ fontFamily: theme.fonts.serif, fontSize: 32, fontWeight: 600, color: theme.colors.navy }}>RM{total}</span>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ─────────────────────────────── */}
      <p
        style={{
          color:      theme.colors.textMuted,
          fontSize:   12,
          lineHeight: 1.75,
          textAlign:  'center',
          maxWidth:   520,
          margin:     '0 auto 64px',
          padding:    '0 24px',
        }}
      >
        By clicking "Complete Payment", you agree to our Terms of Service and Privacy Policy. You will
        be charged RM {total}.00 immediately. Free cancellation until check-in.
      </p>
    </main>
  );
}

// ── Field ─────────────────────────────────────────────────────────
// `type` defaults to 'text'. Pass type="password" + rightElement for CVV.
function Field({ label, placeholder, value, onChange, inputMode, error, type = 'text', rightElement }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 28 }}>
      <label
        style={{
          display:       'block',
          color:         theme.colors.navy,
          fontSize:      11,
          fontWeight:    600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontFamily:    theme.fonts.sans,
          marginBottom:  10,
        }}
      >
        {label}
      </label>
      <div
        style={{
          display:      'flex',
          alignItems:   'center',
          borderBottom: `1px solid ${focused ? theme.colors.navy : theme.colors.border}`,
          transition:   'border-color 0.2s',
        }}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          inputMode={inputMode}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex:       1,
            background: 'none',
            border:     'none',
            outline:    'none',
            padding:    '8px 0 10px',
            fontFamily: theme.fonts.sans,
            fontSize:   15,
            color:      theme.colors.navy,
            boxSizing:  'border-box',
            minWidth:   0,
          }}
        />
        {rightElement && (
          <div style={{ paddingBottom: 6 }}>
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p style={{ color: '#c0392b', fontSize: 11, marginTop: 5, fontFamily: theme.fonts.sans }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ── CostRow ───────────────────────────────────────────────────────
function CostRow({ label, value }) {
  return (
    <div
      style={{
        display:        'flex',
        justifyContent: 'space-between',
        padding:        '11px 0',
        borderBottom:   `1px solid ${theme.colors.borderLight}`,
      }}
    >
      <span style={{ color: theme.colors.textMuted, fontSize: 13, fontFamily: theme.fonts.sans }}>{label}</span>
      <span style={{ color: theme.colors.navy, fontSize: 13, fontWeight: 500, fontFamily: theme.fonts.sans }}>{value}</span>
    </div>
  );
}

// ── Eye icons (inline SVG — no extra dependency) ──────────────────
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// ── Shared styles ─────────────────────────────────────────────────
const sectionLabel = {
  color:         theme.colors.navy,
  fontSize:      11,
  fontWeight:    700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontFamily:    theme.fonts.sans,
  marginBottom:  28,
};