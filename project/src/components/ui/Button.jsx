import theme from '../../styles/theme';

/**
 * Reusable Button component.
 *
 * variant: 'primary' | 'outline' | 'ghost' | 'gold'
 * size:    'sm' | 'md' | 'lg'
 */
const VARIANTS = {
  primary: {
    background:   theme.colors.navy,
    color:        theme.colors.white,
    border:       `1px solid ${theme.colors.navy}`,
    hoverBg:      '#132641',
    hoverBorder:  '#132641',
    hoverColor:   theme.colors.white,
  },
  outline: {
    background:   'transparent',
    color:        theme.colors.navy,
    border:       `1px solid ${theme.colors.navy}`,
    hoverBg:      theme.colors.navy,
    hoverBorder:  theme.colors.navy,
    hoverColor:   theme.colors.white,
  },
  'outline-light': {
    background:   'transparent',
    color:        theme.colors.white,
    border:       `1px solid ${theme.colors.white}`,
    hoverBg:      theme.colors.white,
    hoverBorder:  theme.colors.white,
    hoverColor:   theme.colors.navy,
  },
  gold: {
    background:   theme.colors.gold,
    color:        theme.colors.navy,
    border:       `1px solid ${theme.colors.gold}`,
    hoverBg:      theme.colors.goldLight,
    hoverBorder:  theme.colors.goldLight,
    hoverColor:   theme.colors.navy,
  },
  ghost: {
    background:   'transparent',
    color:        theme.colors.gold,
    border:       '1px solid transparent',
    hoverBg:      theme.colors.goldMuted,
    hoverBorder:  'transparent',
    hoverColor:   theme.colors.gold,
  },
};

const SIZES = {
  sm: { padding: '7px 18px',  fontSize: '12px', letterSpacing: '0.08em' },
  md: { padding: '10px 26px', fontSize: '13px', letterSpacing: '0.1em' },
  lg: { padding: '13px 34px', fontSize: '13px', letterSpacing: '0.12em' },
};

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
  style: extraStyle = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '8px',
        fontFamily:     theme.fonts.sans,
        fontWeight:     '600',
        textTransform:  'uppercase',
        borderRadius:   theme.radius.sm,
        cursor:         disabled ? 'not-allowed' : 'pointer',
        opacity:        disabled ? 0.5 : 1,
        transition:     'all 0.22s ease',
        width:          fullWidth ? '100%' : undefined,
        whiteSpace:     'nowrap',
        ...s,
        background:     v.background,
        color:          v.color,
        border:         v.border,
        ...extraStyle,
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background   = v.hoverBg;
        e.currentTarget.style.borderColor  = v.hoverBorder;
        e.currentTarget.style.color        = v.hoverColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background   = v.background;
        e.currentTarget.style.borderColor  = v.border.split(' ')[2]; // last token is colour
        e.currentTarget.style.color        = v.color;
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
