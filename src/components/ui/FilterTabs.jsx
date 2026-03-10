import theme from '../../styles/theme';
import { ROOM_CATEGORIES } from '../../data/rooms';

export default function FilterTabs({ active, onChange }) {
  return (
    <div
      style={{
        display:         'flex',
        gap:             0,
        borderBottom:    `1px solid ${theme.colors.border}`,
        overflowX:       'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth:  'none',
      }}
    >
      {ROOM_CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              flexShrink:     0,
              padding:        '14px 24px',
              background:     'none',
              border:         'none',
              borderBottom:   isActive
                ? `2px solid ${theme.colors.navy}`
                : '2px solid transparent',
              color:          isActive ? theme.colors.navy : theme.colors.textMuted,
              fontFamily:     theme.fonts.sans,
              fontSize:       theme.fontSizes.sm,
              fontWeight:     isActive ? 600 : 400,
              letterSpacing:  '0.04em',
              cursor:         'pointer',
              transition:     'all 0.2s ease',
              whiteSpace:     'nowrap',
              marginBottom:   '-1px', // sit on top of border
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = theme.colors.navy;
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = theme.colors.textMuted;
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
