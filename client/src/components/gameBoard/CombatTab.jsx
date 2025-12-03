import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startCombat,
  executeAttack,
  attemptFlee,
  clearCombatState,
  selectInCombat,
  selectCombatStatus,
  selectMonster,
  selectHeroCombatHP,
  selectCombatRound,
  selectCombatLog,
  selectRewards,
  selectIsAttacking,
  selectIsFleeing,
  selectIsStartingCombat,
  selectStartError
} from '../../store/combatSlice';
import { fetchLocation } from '../../store/navigationSlice';
import { fetchHero } from '../../store/heroSlice';

/**
 * CombatTab - Full combat interface
 *
 * Displays:
 * - Pre-combat: Monster info and engage button
 * - In-combat: Monster HP, combat log, action buttons
 * - Post-combat: Victory/defeat screen with rewards
 */
const CombatTab = ({ monsters, hero, location }) => {
  const dispatch = useDispatch();
  const logRef = useRef(null);

  // Combat state from Redux
  const inCombat = useSelector(selectInCombat);
  const combatStatus = useSelector(selectCombatStatus);
  const combatMonster = useSelector(selectMonster);
  const combatHeroHP = useSelector(selectHeroCombatHP);
  const round = useSelector(selectCombatRound);
  const log = useSelector(selectCombatLog);
  const rewards = useSelector(selectRewards);
  const isAttacking = useSelector(selectIsAttacking);
  const isFleeing = useSelector(selectIsFleeing);
  const isStarting = useSelector(selectIsStartingCombat);
  const startError = useSelector(selectStartError);

  // Auto-scroll combat log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  // Handle engage combat
  const handleEngage = () => {
    dispatch(startCombat(hero.id));
  };

  // Handle attack
  const handleAttack = () => {
    dispatch(executeAttack({ heroId: hero.id }));
  };

  // Handle flee
  const handleFlee = () => {
    dispatch(attemptFlee(hero.id));
  };

  // Handle continue after combat ends
  const handleContinue = () => {
    dispatch(clearCombatState());
    // Refresh location and hero data
    dispatch(fetchLocation({
      locationId: hero.navigation.currentSite,
      heroId: hero.id
    }));
    dispatch(fetchHero(hero.id));
  };

  // No monsters at location
  if (!monsters && !inCombat) {
    return (
      <div className="text-center py-8">
        <p style={{ color: 'var(--color-text-muted)' }}>
          No monsters here. This area is safe.
        </p>
      </div>
    );
  }

  // Victory screen
  if (combatStatus === 'victory') {
    return (
      <VictoryScreen
        monster={combatMonster}
        rewards={rewards}
        log={log}
        onContinue={handleContinue}
      />
    );
  }

  // Defeat screen
  if (combatStatus === 'defeat') {
    return (
      <DefeatScreen
        monster={combatMonster}
        log={log}
        onContinue={handleContinue}
      />
    );
  }

  // Fled screen
  if (combatStatus === 'fled') {
    return (
      <FledScreen
        log={log}
        onContinue={handleContinue}
      />
    );
  }

  // Active combat
  if (inCombat && combatMonster) {
    return (
      <div className="space-y-4">
        {/* Monster Status */}
        <MonsterStatus monster={combatMonster} />

        {/* Combat Log */}
        <div
          ref={logRef}
          className="h-48 overflow-y-auto p-3 rounded-lg space-y-2"
          style={{ backgroundColor: 'var(--color-bg-primary)' }}
        >
          {log.map((entry, index) => (
            <LogEntry key={index} entry={entry} />
          ))}
        </div>

        {/* Round Counter */}
        <div className="text-center">
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Round {round}
          </span>
        </div>

        {/* Combat Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleAttack}
            disabled={isAttacking || isFleeing}
            className="flex-1 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-danger)',
              color: 'white'
            }}
          >
            {isAttacking ? 'Attacking...' : 'Attack'}
          </button>
          <button
            onClick={handleFlee}
            disabled={isAttacking || isFleeing || ['mini_boss', 'boss'].includes(combatMonster.tier)}
            className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-secondary)'
            }}
          >
            {isFleeing ? 'Fleeing...' : 'Flee'}
          </button>
        </div>

        {/* Cannot flee warning */}
        {['mini_boss', 'boss'].includes(combatMonster.tier) && (
          <p
            className="text-xs text-center"
            style={{ color: 'var(--color-warning)' }}
          >
            Cannot flee from a {combatMonster.tier.replace('_', ' ')}!
          </p>
        )}
      </div>
    );
  }

  // Pre-combat view
  return (
    <div className="space-y-6">
      {/* Error Message */}
      {startError && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-danger)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
        >
          {startError}
        </div>
      )}

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

        {/* Combat Actions */}
        <button
          onClick={handleEngage}
          disabled={isStarting}
          className="w-full py-3 rounded-lg font-medium transition-all disabled:opacity-50"
          style={{
            backgroundColor: 'var(--color-danger)',
            color: 'white'
          }}
        >
          {isStarting ? 'Engaging...' : 'Engage in Combat'}
        </button>
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
 * Monster Status Component
 */
const MonsterStatus = ({ monster }) => {
  const hpPercent = (monster.currentHP / monster.maxHP) * 100;

  return (
    <div
      className="p-4 rounded-lg"
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3
            className="font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {monster.name}
          </h3>
          <p
            className="text-xs capitalize"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {monster.tier.replace('_', ' ')} {monster.category} - Level {monster.level}
          </p>
        </div>
        <div className="text-right">
          <p
            className="font-bold"
            style={{ color: 'var(--color-hp)' }}
          >
            {monster.currentHP} / {monster.maxHP}
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            HP
          </p>
        </div>
      </div>
      {/* HP Bar */}
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-hp-bg)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${hpPercent}%`,
            backgroundColor: 'var(--color-hp)'
          }}
        />
      </div>
    </div>
  );
};

/**
 * Combat Log Entry Component
 */
const LogEntry = ({ entry }) => {
  const getEntryStyle = () => {
    switch (entry.type) {
      case 'hero_attack':
        return entry.hit
          ? { color: entry.crit ? 'var(--color-gold)' : 'var(--color-success)' }
          : { color: 'var(--color-text-muted)' };
      case 'monster_attack':
        return entry.hit
          ? { color: entry.crit ? 'var(--color-warning)' : 'var(--color-danger)' }
          : { color: 'var(--color-text-muted)' };
      case 'monster_defeated':
        return { color: 'var(--color-success)', fontWeight: 'bold' };
      case 'hero_defeated':
        return { color: 'var(--color-danger)', fontWeight: 'bold' };
      case 'flee_success':
        return { color: 'var(--color-info)' };
      case 'flee_failed':
        return { color: 'var(--color-warning)' };
      case 'combat_start':
        return { color: 'var(--color-accent)', fontWeight: 'bold' };
      default:
        return { color: 'var(--color-text-secondary)' };
    }
  };

  return (
    <p className="text-sm" style={getEntryStyle()}>
      {entry.message}
    </p>
  );
};

/**
 * Victory Screen Component
 */
const VictoryScreen = ({ monster, rewards, log, onContinue }) => (
  <div className="space-y-6">
    <div
      className="p-6 rounded-lg text-center"
      style={{
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)'
      }}
    >
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: 'var(--color-success)' }}
      >
        Victory!
      </h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        You have defeated {monster?.name}!
      </p>
    </div>

    {/* Rewards */}
    {rewards && (
      <div
        className="p-4 rounded-lg"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        <h3
          className="font-medium mb-3"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Rewards
        </h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--color-xp)' }}>XP</span>
            <span
              className="font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              +{rewards.xp}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--color-gold)' }}>Gold</span>
            <span
              className="font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              +{rewards.gold}
            </span>
          </div>
        </div>
      </div>
    )}

    <button
      onClick={onContinue}
      className="w-full py-3 rounded-lg font-medium"
      style={{
        backgroundColor: 'var(--color-accent)',
        color: 'white'
      }}
    >
      Continue
    </button>
  </div>
);

/**
 * Defeat Screen Component
 */
const DefeatScreen = ({ monster, log, onContinue }) => (
  <div className="space-y-6">
    <div
      className="p-6 rounded-lg text-center"
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }}
    >
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: 'var(--color-danger)' }}
      >
        Defeated
      </h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        You were defeated by {monster?.name}...
      </p>
      <p
        className="text-sm mt-2"
        style={{ color: 'var(--color-text-muted)' }}
      >
        You have been revived at half health.
      </p>
    </div>

    <button
      onClick={onContinue}
      className="w-full py-3 rounded-lg font-medium"
      style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        color: 'var(--color-text-primary)'
      }}
    >
      Continue
    </button>
  </div>
);

/**
 * Fled Screen Component
 */
const FledScreen = ({ log, onContinue }) => (
  <div className="space-y-6">
    <div
      className="p-6 rounded-lg text-center"
      style={{
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}
    >
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: 'var(--color-info)' }}
      >
        Escaped!
      </h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        You successfully fled from combat.
      </p>
    </div>

    <button
      onClick={onContinue}
      className="w-full py-3 rounded-lg font-medium"
      style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        color: 'var(--color-text-primary)'
      }}
    >
      Continue
    </button>
  </div>
);

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
