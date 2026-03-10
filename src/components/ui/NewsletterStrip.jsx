import { useState } from 'react';
import theme from '../../styles/theme';
import Button from '../ui/Button';
import useWindowSize from '../../hooks/useWindowSize';

/**
 * Newsletter / mailing list strip.
 * TODO (API): POST /api/newsletter with { email } on submit.
 */
export default function NewsletterStrip() {
  const { isMobile } = useWindowSize();
  const [email, setEmail]     = useState('');
  const [submitted, setSubmit] = useState(false);

  const handleSubmit = () => {
    if (!email.includes('@')) return;
    // TODO (API): POST /api/newsletter { email }
    setSubmit(true);
  };

  return (
    <section
      style={{
        background:    theme.colors.cream,
        borderTop:     `1px solid ${theme.colors.border}`,
        borderBottom:  `1px solid ${theme.colors.border}`,
        padding:       isMobile ? '40px 24px' : '52px 80px',
        display:       'flex',
        alignItems:    'center',
        justifyContent:'space-between',
        flexWrap:      'wrap',
        gap:           24,
      }}
    >
      <div>
        <p style={{ fontFamily: theme.fonts.serif, fontSize: isMobile ? 22 : 28, fontWeight: 600, color: theme.colors.navy, lineHeight: 1.2 }}>
          Stay connected to the<br />world of Regatta Hotel
        </p>
      </div>

      {submitted ? (
        <p style={{ color: theme.colors.gold, fontWeight: 600, fontSize: 14 }}>
          ✓ Thank you for subscribing!
        </p>
      ) : (
        <div style={{ display: 'flex', gap: 0, flex: isMobile ? '1 1 100%' : '0 1 auto', minWidth: 0 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            style={{
              flex:       1,
              padding:    '11px 18px',
              border:     `1px solid ${theme.colors.border}`,
              borderRight:'none',
              borderRadius: `${theme.radius.sm} 0 0 ${theme.radius.sm}`,
              fontFamily: theme.fonts.sans,
              fontSize:   13,
              color:      theme.colors.text,
              background: theme.colors.white,
              outline:    'none',
              minWidth:   0,
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            style={{ borderRadius: `0 ${theme.radius.sm} ${theme.radius.sm} 0` }}
          >
            Join Our Mailing List
          </Button>
        </div>
      )}
    </section>
  );
}
