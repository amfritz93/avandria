/**
 * HeroStatsBar - Displays hero's vital statistics
 *
 * Shows HP, MP, Stamina, XP progress, and gold
 */
const HeroStatsBar = ({ hero }) => {
  if (!hero) return null;

  const { currentHP, currentMP, currentStamina } = hero;
  const maxHP = hero.stats?.toughness * 5 || 50;
  const maxMP = hero.stats?.spirit * 5 || 50;
  const maxStamina = 100;

  // XP calculation
  const xpThresholds = [20, 20, 25, 25, 30];
  const currentLevel = hero.level || 1;
  const xpNeeded = xpThresholds[(currentLevel - 1) % xpThresholds.length] || 30;
  const currentXP = hero.experience?.current || 0;
  const xpPercent = Math.min((currentXP / xpNeeded) * 100, 100);

  return (
    <div
      className="px-4 py-2 flex flex-wrap items-center gap-4 border-b shrink-0"
      style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        borderColor: 'var(--color-border)'
      }}
    >
      {/* HP Bar */}
      <StatBar
        label="HP"
        current={currentHP}
        max={maxHP}
        color="var(--color-hp)"
        bgColor="var(--color-hp-bg)"
      />

      {/* MP Bar */}
      <StatBar
        label="MP"
        current={currentMP}
        max={maxMP}
        color="var(--color-mp)"
        bgColor="var(--color-mp-bg)"
      />

      {/* Stamina Bar */}
      <StatBar
        label="STA"
        current={currentStamina}
        max={maxStamina}
        color="var(--color-stamina)"
        bgColor="var(--color-stamina-bg)"
      />

      {/* XP Progress */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
          XP
        </span>
        <div
          className="w-24 h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg-primary)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${xpPercent}%`,
              backgroundColor: 'var(--color-xp)'
            }}
          />
        </div>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {currentXP}/{xpNeeded}
        </span>
      </div>

      {/* Gold */}
      <div className="flex items-center gap-1 ml-auto">
        <span style={{ color: 'var(--color-gold)' }}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" />
          </svg>
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--color-gold)' }}>
          {hero.inventory?.gold?.toLocaleString() || 0}
        </span>
      </div>
    </div>
  );
};

/**
 * Individual Stat Bar Component
 */
const StatBar = ({ label, current, max, color, bgColor }) => {
  const percent = Math.min((current / max) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs font-medium w-6"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </span>
      <div
        className="w-20 h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: bgColor || 'var(--color-bg-primary)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percent}%`,
            backgroundColor: color
          }}
        />
      </div>
      <span
        className="text-xs tabular-nums"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {current}/{max}
      </span>
    </div>
  );
};

export default HeroStatsBar;
