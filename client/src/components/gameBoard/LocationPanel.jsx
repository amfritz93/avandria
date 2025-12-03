/**
 * LocationPanel - Displays current location information
 *
 * Shows:
 * - Location name and type badge
 * - State indicator (corrupted/cleansed/welcome)
 * - Flavor text based on state
 */
const LocationPanel = ({ location, loading, heroContext }) => {
  if (loading) {
    return (
      <div
        className="p-6 text-center"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <div className="animate-pulse">
          <div
            className="h-6 w-48 mx-auto rounded mb-4"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          />
          <div
            className="h-4 w-full max-w-md mx-auto rounded"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          />
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div
        className="p-6 text-center"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <p style={{ color: 'var(--color-text-muted)' }}>Location not found</p>
      </div>
    );
  }

  // Determine state styling
  const stateConfig = {
    corrupted: {
      label: 'Corrupted',
      color: 'var(--color-danger)',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.3)'
    },
    cleansed: {
      label: 'Cleansed',
      color: 'var(--color-success)',
      bgColor: 'rgba(34, 197, 94, 0.1)',
      borderColor: 'rgba(34, 197, 94, 0.3)'
    },
    welcome: {
      label: 'Safe',
      color: 'var(--color-info)',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.3)'
    }
  };

  const state = location.state || 'corrupted';
  const config = stateConfig[state] || stateConfig.corrupted;

  // Location type badge
  const getTypeBadge = () => {
    const typeLabels = {
      settlement: location.settlementSize || 'Settlement',
      clearing: 'Clearing',
      landmark: 'Landmark',
      lair: 'Lair',
      dungeon: 'Dungeon',
      vault: 'Vault'
    };
    return typeLabels[location.siteType] || location.locationType;
  };

  return (
    <div
      className="p-6 border-b"
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.borderColor
      }}
    >
      {/* Location Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2
            className="text-xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {location.name}
          </h2>
          <span
            className="px-2 py-0.5 text-xs font-medium rounded-full capitalize"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-secondary)'
            }}
          >
            {getTypeBadge()}
          </span>
        </div>
        <span
          className="px-3 py-1 text-xs font-medium rounded-full"
          style={{
            backgroundColor: config.bgColor,
            color: config.color,
            border: `1px solid ${config.borderColor}`
          }}
        >
          {config.label}
        </span>
      </div>

      {/* Biome Tags */}
      {location.biomeTags && location.biomeTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {location.biomeTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded capitalize"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-muted)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Flavor Text */}
      {location.flavorText && (
        <p
          className="text-sm italic leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          &ldquo;{location.flavorText}&rdquo;
        </p>
      )}

      {/* Services (if settlement) */}
      {location.services && location.services.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className="text-xs font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Services:
          </span>
          {location.services.map((service) => (
            <span
              key={service}
              className="px-2 py-0.5 text-xs rounded capitalize"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white'
              }}
            >
              {service.replace('_', ' ')}
            </span>
          ))}
        </div>
      )}

      {/* Progress Hint */}
      {!heroContext?.canProgress && !location.alwaysSafe && (
        <div
          className="mt-4 flex items-center gap-2 text-xs"
          style={{ color: 'var(--color-warning)' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Defeat the monsters here before you can advance</span>
        </div>
      )}
    </div>
  );
};

export default LocationPanel;
