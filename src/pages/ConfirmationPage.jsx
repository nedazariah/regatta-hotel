import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import theme from '../styles/theme';
import { formatDateShort } from '../utils/dateUtils';
import useWindowSize from '../hooks/useWindowSize';
import borderImg from '../assets/borders.png';

export default function ConfirmationPage() {
  const { isMobile }              = useWindowSize();
  const navigate                  = useNavigate();
  const { booking, resetBooking } = useBooking();
  const room                      = booking.selectedRoom;

  const headerH = isMobile ? 122 : 160;

  useEffect(() => {
    if (!booking.confirmationRef) navigate('/', { replace: true });
  }, [booking.confirmationRef, navigate]);

  if (!booking.confirmationRef || !room) return null;

  const nights  = booking.totalNights  || 1;
  const rate    = booking.nightlyRate  || room.price;
  const total   = booking.totalAmount  || rate * nights;
  const ref     = booking.confirmationRef;
  const last4   = booking.cardLastFour || '0000';

  const guestStr = (() => {
    const a = booking.adults;
    const c = booking.children;
    return `${a} Adult${a !== 1 ? 's' : ''}${c > 0 ? `, ${c} Child${c !== 1 ? 'ren' : ''}` : ''}`;
  })();

  const handleBackToHome = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <main style={{ background: theme.colors.cream, minHeight: '100vh' }}>

      {/* ── Page title ──────────────────────────────── */}
      <section style={{ padding: isMobile ? '36px 24px 16px' : '52px 80px 16px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily:  theme.fonts.serif,
            fontSize:    isMobile ? 32 : 54,
            fontWeight:  400,
            color:       theme.colors.navy,
            marginBottom: 12,
          }}
        >
          Reservation Confirmed!
        </h1>
        <p style={{ color: theme.colors.textMuted, fontSize: 15, lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
          Your stay at Regatta Suites Kuching is all set. A confirmation email has been sent to your inbox.
        </p>
      </section>

      {/* ── Room hero photo ─────────────────────────── */}
      <section
        style={{
          maxWidth:  1100,
          margin:    '32px auto 0',
          padding:   isMobile ? '0 24px' : '0 80px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ position: 'relative', height: isMobile ? 220 : 360, overflow: 'hidden' }}>
          <img
            src={room.images[0]}
            alt={room.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,24,41,0.78) 0%, rgba(11,24,41,0.18) 55%, transparent 100%)' }} />
          <div
            style={{
              position:  'absolute',
              bottom:    0,
              left:      0,
              right:     0,
              padding:   isMobile ? '24px 24px 28px' : '32px 48px 36px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontFamily:    theme.fonts.sans,
                fontSize:      isMobile ? 18 : 28,
                fontWeight:    700,
                color:         theme.colors.white,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom:  8,
              }}
            >
              {room.name}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13, fontFamily: theme.fonts.sans, width: '55%', margin: 'auto'}}>
              {room.shortDescription.split('.')[0]}.
            </p>
          </div>
        </div>
      </section>

      {/* ── Reservation summary box ──────────────────── */}
      <section
        style={{
          maxWidth:  1100,
          margin:    '0 auto',
          padding:   isMobile ? '0 24px' : '0 80px',
          boxSizing: 'border-box',
        }}
      >
        {/* Navy box — position:relative + isolation so overlay blends correctly */}
        <div
          style={{
            background:          theme.colors.navy,
            position:            'relative',
            display:             'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr',
            borderTop:           `3px solid ${theme.colors.gold}`,
          }}
        >
          {/* ── Decorative corner border overlay ── */}
          <div
            style={{
              position:         'absolute',
              inset:            0,
              backgroundImage:  `url(${borderImg})`,
              backgroundSize:   '100% 100%',
              backgroundRepeat: 'no-repeat',
              opacity:          0.9,
              pointerEvents:    'none',
              zIndex:           0,
            }}
          />

          {/* LEFT — Reservation details */}
          <div style={{ padding: isMobile ? '32px 28px' : '44px 48px', position: 'relative', zIndex: 1 }}>
            <p style={summaryLabel}>Reservation Summary</p>

            <p
              style={{
                fontFamily:  theme.fonts.serif,
                fontSize:    isMobile ? 26 : 34,
                fontWeight:  500,
                color:       theme.colors.white,
                marginBottom: 28,
              }}
            >
              Ref: {ref}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div>
                <p style={detailLabel}>Check In</p>
                <p style={detailValue}>After 2:00pm</p>
              </div>
              <div>
                <p style={detailLabel}>Check Out</p>
                <p style={detailValue}>Before 12:00 Noon</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
              <DetailRow label="Room Type"  value={room.name} />
              <DetailRow label="Max Guest"  value={guestStr} />
              <DetailRow label="Property"   value="Regatta Suites Kuching" />
            </div>
          </div>

          {/* Vertical divider */}
          {!isMobile && (
            <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', position: 'relative', zIndex: 1 }} />
          )}

          {/* RIGHT — Payment details */}
          <div style={{ padding: isMobile ? '0 28px 32px' : '44px 48px', position: 'relative', zIndex: 1 }}>
            <p style={summaryLabel}>Payment Details</p>

            <div style={{ marginBottom: 8 }}>
              <CostRow label={`Nightly Rate × ${nights} Night${nights !== 1 ? 's' : ''}`} value={`RM${rate * nights}`} light />
              <CostRow label="Service Fee"  value="—" light />
              <CostRow label="Taxes & Fees" value="—" light />
            </div>

            <div
              style={{
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'baseline',
                borderTop:      '1px solid rgba(255,255,255,0.15)',
                paddingTop:     20,
                marginTop:      8,
                marginBottom:   32,
              }}
            >
              <span style={{ color: theme.colors.white, fontFamily: theme.fonts.sans, fontSize: 15, fontWeight: 500 }}>
                Total Paid
              </span>
              <span
                style={{
                  fontFamily: theme.fonts.serif,
                  fontSize:   isMobile ? 32 : 40,
                  fontWeight: 600,
                  color:      theme.colors.white,
                }}
              >
                RM{total}
              </span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: theme.fonts.sans, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
              Charged to card ending in ****{last4}
            </p>

            <button
              style={{
                width:         '100%',
                padding:       '16px',
                background:    'none',
                color:         theme.colors.white,
                border:        `1px solid rgba(255,255,255,0.35)`,
                borderRadius:  0,
                fontFamily:    theme.fonts.sans,
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor:        'pointer',
                transition:    'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
            >
              Download Receipt
            </button>
          </div>
        </div>
      </section>

      {/* ── Back to Home button ──────────────────────── */}
      <section
        style={{
          maxWidth:  1100,
          margin:    '32px auto 0',
          padding:   isMobile ? '0 24px' : '0 80px',
          boxSizing: 'border-box',
        }}
      >
        <button
          onClick={handleBackToHome}
          style={{
            display:       'block',
            width:         '100%',
            padding:       '18px',
            background:    theme.colors.navy,
            color:         theme.colors.white,
            border:        'none',
            borderRadius:  0,
            fontFamily:    theme.fonts.sans,
            fontSize:      12,
            fontWeight:    700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor:        'pointer',
            transition:    'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.navyMid)}
          onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.navy)}
        >
          Back to Home
        </button>
      </section>

      {/* ── Hotel address + Assistance card ─────────── */}
      <section
        style={{
          maxWidth:  1100,
          margin:    '32px auto 0',
          padding:   isMobile ? '0 24px' : '0 80px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr',
            border:              `1px solid ${theme.colors.border}`,
          }}
        >
          <div style={{ padding: isMobile ? '28px 24px' : '36px 40px' }}>
            <p style={{ color: theme.colors.navy, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: theme.fonts.sans, marginBottom: 14 }}>
              Hotel Address
            </p>
            <p style={{ color: theme.colors.textMuted, fontSize: 14, lineHeight: 1.85 }}>
              Regatta Suites Kuching<br />
              Unit G-31, Ground Floor, LD Legenda,<br />
              Jalan Tun Abang Haji Openg,<br />
              93000 Kuching, Sarawak, Malaysia.
            </p>
          </div>

          {!isMobile && <div style={{ width: 1, background: theme.colors.border }} />}

          <div style={{ padding: isMobile ? '0 24px 28px' : '36px 40px' }}>
            <p style={{ color: theme.colors.navy, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: theme.fonts.sans, marginBottom: 14 }}>
              Need Assistance?
            </p>
            <p style={{ color: theme.colors.textMuted, fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>
              Our team is available to assist you with your arrival.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href="tel:+60822300099"
                style={{ display: 'flex', alignItems: 'center', gap: 10, color: theme.colors.navy, fontSize: 14, textDecoration: 'none' }}
              >
                <span style={{ fontSize: 18 }}>📞</span>
                +0 82-230099
              </a>
              <a
                href="https://wa.me/60169200847"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 10, color: theme.colors.navy, fontSize: 14, textDecoration: 'none' }}
              >
                <span style={{ fontSize: 18 }}>💬</span>
                Whatsapp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Copyright ────────────────────────────────── */}
      <p
        style={{
          color:         theme.colors.textLight,
          fontSize:      11,
          textAlign:     'center',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily:    theme.fonts.sans,
          padding:       '32px 24px 48px',
        }}
      >
        © 2024 Regatta Suites Kuching. Owned by Kozi Square Sdn Bhd.
      </p>
    </main>
  );
}

// ── Sub-components ────────────────────────────────────

function DetailRow({ label, value }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={detailLabel}>{label}</p>
      <p style={detailValue}>{value}</p>
    </div>
  );
}

function CostRow({ label, value, light }) {
  const textColor = light ? 'rgba(255,255,255,0.55)' : theme.colors.textMuted;
  const valColor  = light ? theme.colors.white : theme.colors.navy;
  return (
    <div
      style={{
        display:        'flex',
        justifyContent: 'space-between',
        padding:        '10px 0',
        borderBottom:   light ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${theme.colors.borderLight}`,
      }}
    >
      <span style={{ color: textColor, fontSize: 12, fontFamily: theme.fonts.sans, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ color: valColor, fontSize: 13, fontFamily: theme.fonts.sans }}>{value}</span>
    </div>
  );
}

const summaryLabel = {
  color:         theme.colors.gold,
  fontSize:      10,
  fontWeight:    700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  fontFamily:    theme.fonts.sans,
  marginBottom:  24,
};

const detailLabel = {
  color:         theme.colors.roseGold,
  fontSize:      10,
  fontWeight:    700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontFamily:    theme.fonts.sans,
  marginBottom:  4,
};

const detailValue = {
  color:      theme.colors.white,
  fontSize:   15,
  fontFamily: theme.fonts.sans,
  fontWeight: 400,
};