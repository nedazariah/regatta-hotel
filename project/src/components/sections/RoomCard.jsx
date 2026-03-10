import theme from '../../styles/theme';
import Button from '../ui/Button';
import useWindowSize from '../../hooks/useWindowSize';

/**
 * RoomCard
 *
 * variant: 'list'    — Rooms page (vertical, large photo, full-width)
 *          'grid'    — Booking page (compact card, smaller photo)
 */
export default function RoomCard({ room, onViewDetails, onReserve, variant = 'grid', isSelected = false }) {
  const { isMobile } = useWindowSize();

  if (variant === 'list') {
    return <ListCard room={room} onViewDetails={onViewDetails} isMobile={isMobile} />;
  }

  return <GridCard room={room} onViewDetails={onViewDetails} onReserve={onReserve} isMobile={isMobile} isSelected={isSelected} />;
}

/** Full-width vertical card for the Rooms page */
function ListCard({ room, onViewDetails, isMobile }) {
  return (
    <article
      style={{
        borderBottom: `1px solid ${theme.colors.border}`,
        paddingBottom: 48,
        marginBottom:  48,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          gap:            16,
          marginBottom:   16,
          flexWrap:       'wrap',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: theme.fonts.serif,
              fontSize:   isMobile ? 26 : 34,
              fontWeight: 400,
              color:      theme.colors.navy,
              marginBottom: 8,
            }}
          >
            {room.name}
          </h2>
          <p style={{ color: theme.colors.textMuted, fontSize: 14, lineHeight: 1.7, maxWidth: 520 }}>
            {room.shortDescription}
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => onViewDetails(room)}>
          View Details
        </Button>
      </div>

      {/* Full-width photo */}
      <div
        style={{
          width:        '100%',
          height:       isMobile ? 240 : 400,
          overflow:     'hidden',
          borderRadius: theme.radius.md,
        }}
      >
        <img
          src={room.images[0]}
          alt={room.name}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.03)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        />
      </div>
    </article>
  );
}

/** Compact card for the Booking page room grid */
function GridCard({ room, onViewDetails, onReserve, isMobile, isSelected }) {
  return (
    <article
      style={{
        background:   theme.colors.white,
        border:       `1px solid ${isSelected ? theme.colors.navy : theme.colors.border}`,
        borderRadius: theme.radius.md,
        overflow:     'hidden',
        transition:   'box-shadow 0.25s, border-color 0.25s',
        boxShadow:    isSelected ? theme.shadows.elevated : theme.shadows.card,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow   = theme.shadows.elevated;
        e.currentTarget.style.borderColor = theme.colors.navy;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow   = isSelected ? theme.shadows.elevated : theme.shadows.card;
        e.currentTarget.style.borderColor = isSelected ? theme.colors.navy : theme.colors.border;
      }}
    >
      {/* Photo */}
      <div style={{ height: isMobile ? 200 : 240, overflow: 'hidden', position: 'relative' }}>
        <img
          src={room.images[0]}
          alt={room.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        />
        {/* Badge */}
        <span
          style={{
            position:     'absolute',
            top:          12,
            left:         12,
            background:   room.badgeColor,
            color:        '#fff',
            fontSize:     10,
            fontWeight:   700,
            letterSpacing:'0.08em',
            padding:      '3px 10px',
            borderRadius: theme.radius.sm,
            textTransform:'uppercase',
          }}
        >
          {room.badge}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: isMobile ? '18px 18px 20px' : '22px 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <h3 style={{ fontFamily: theme.fonts.serif, fontSize: isMobile ? 20 : 24, fontWeight: 500, color: theme.colors.navy }}>
            {room.name}
          </h3>
          <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
            <span style={{ fontFamily: theme.fonts.serif, fontSize: 22, fontWeight: 600, color: theme.colors.navy }}>
              {room.currency} {room.price}
            </span>
            <div style={{ color: theme.colors.textMuted, fontSize: 11 }}>/night</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          <span style={{ color: theme.colors.textMuted, fontSize: 12 }}>📐 {room.size}</span>
          <span style={{ color: theme.colors.textMuted, fontSize: 12 }}>👤 Max {room.maxGuests}</span>
        </div>

        <p style={{ color: theme.colors.textMuted, fontSize: 13, lineHeight: 1.65, marginBottom: 18 }}>
          {room.shortDescription}
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="primary" size="sm" onClick={() => onViewDetails(room)} style={{ flex: 1 }}>
            View Details
          </Button>
          <Button variant="outline" size="sm" onClick={() => onReserve && onReserve(room)} style={{ flex: 1 }}>
            Reserve
          </Button>
        </div>
      </div>
    </article>
  );
}
