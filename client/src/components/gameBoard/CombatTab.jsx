/**
 * CombatTab - Combat interface placeholder
 *
 * Will display:
 * - Monster information
 * - Combat actions
 * - Battle log
 *
 * Full implementation in Phase F
 */
const CombatTab = ({ monsters, hero, location }) => {
  if (!monsters) {
    return (
      <div className="text-center py-8">
        <p style={{ color: 'var(--color-text-muted)' }}>
          No monsters here. This area is safe.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Monster Info */}
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-3xl"
            style={{ color: 'var(--color-danger)' }}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <h3
              className="text-lg font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {monsters.type === 'fixed' ? monsters.name : 'Hostile Creatures'}
            </h3>
            <p
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {monsters.type === 'fixed'
                ? `${monsters.tier.replace('_', ' ')} - Level ${monsters.level}`
                : `${monsters.count} creature${monsters.count > 1 ? 's' : ''} lurking`}
            </p>
          </div>
        </div>

        {/* Monster Tiers */}
        {monsters.tiers && monsters.tiers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Possible encounters:
            </span>
            {monsters.tiers.map((tier) => (
              <span
                key={tier}
                className="px-2 py-0.5 text-xs rounded capitalize"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                {tier.replace('_', ' ')}
              </span>
            ))}
          </div>
        )}

        {/* Combat Action Placeholder */}
        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-danger)',
              color: 'white'
            }}
            disabled
          >
            Engage in Combat
          </button>
          <button
            className="px-4 py-3 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-secondary)'
            }}
            disabled
          >
            Flee
          </button>
        </div>

        <p
          className="text-xs text-center mt-3"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Combat system coming in Phase F
        </p>
      </div>

      {/* Hero Quick Stats */}
      <div
        className="p-4 rounded-lg"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        <h4
          className="text-sm font-medium mb-3"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Your Stats
        </h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <StatDisplay
            label="Power"
            value={hero?.stats?.power || 0}
            color="var(--color-danger)"
          />
          <StatDisplay
            label="Toughness"
            value={hero?.stats?.toughness || 0}
            color="var(--color-success)"
          />
          <StatDisplay
            label="Acuity"
            value={hero?.stats?.acuity || 0}
            color="var(--color-info)"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Stat Display Component
 */
const StatDisplay = ({ label, value, color }) => (
  <div>
    <p
      className="text-2xl font-bold"
      style={{ color }}
    >
      {value}
    </p>
    <p
      className="text-xs"
      style={{ color: 'var(--color-text-muted)' }}
    >
      {label}
    </p>
  </div>
);

export default CombatTab;
