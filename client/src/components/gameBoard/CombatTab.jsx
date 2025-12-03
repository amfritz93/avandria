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
  selectHeroCombatMP,
  selectHeroCombatStamina,
  selectHeroMaxHP,
  selectHeroMaxMP,
  selectHeroMaxStamina,
  selectAbilities,
  selectCombatRound,
  selectCombatLog,
  selectRewards,
  selectLevelUp,
  selectIsAttacking,
  selectIsFleeing,
  selectIsStartingCombat,
  selectStartError,
  selectAttackError
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
  const combatHeroMP = useSelector(selectHeroCombatMP);
  const combatHeroStamina = useSelector(selectHeroCombatStamina);
  const heroMaxHP = useSelector(selectHeroMaxHP);
  const heroMaxMP = useSelector(selectHeroMaxMP);
  const heroMaxStamina = useSelector(selectHeroMaxStamina);
  const abilities = useSelector(selectAbilities);
  const round = useSelector(selectCombatRound);
  const log = useSelector(selectCombatLog);
  const rewards = useSelector(selectRewards);
  const levelUp = useSelector(selectLevelUp);
  const isAttacking = useSelector(selectIsAttacking);
  const isFleeing = useSelector(selectIsFleeing);
  const isStarting = useSelector(selectIsStartingCombat);
  const startError = useSelector(selectStartError);
  const attackError = useSelector(selectAttackError);

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

  // Handle attack (basic or ability)
  const handleAttack = (abilityId = null) => {
    dispatch(executeAttack({ heroId: hero.id, abilityId }));
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
        levelUp={levelUp}
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

        {/* Hero Resources Bar */}
        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span style={{ color: 'var(--color-hp)' }}>HP</span>
              <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {combatHeroHP}/{heroMaxHP || hero?.maxHP}
              </p>
            </div>
            <div>
              <span style={{ color: 'var(--color-mp)' }}>MP</span>
              <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {combatHeroMP}/{heroMaxMP || hero?.maxMP}
              </p>
            </div>
            <div>
              <span style={{ color: 'var(--color-stamina)' }}>Stamina</span>
              <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {combatHeroStamina}/{heroMaxStamina || hero?.maxStamina}
              </p>
            </div>
          </div>
        </div>

        {/* Combat Log */}
        <div
          ref={logRef}
          className="h-32 overflow-y-auto p-3 rounded-lg space-y-2"
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

        {/* Attack Error */}
        {attackError && (
          <p className="text-xs text-center" style={{ color: 'var(--color-danger)' }}>
            {attackError}
          </p>
        )}

        {/* Ability Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {abilities && abilities.length > 0 ? (
            abilities.map((ability) => {
              const canAfford =
                (ability.mpCost === 0 || combatHeroMP >= ability.mpCost) &&
                (ability.staminaCost === 0 || combatHeroStamina >= ability.staminaCost);

              return (
                <button
                  key={ability.id}
                  onClick={() => handleAttack(ability.id)}
                  disabled={isAttacking || isFleeing || !canAfford}
                  className="py-2 px-1 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                  style={{
                    backgroundColor: canAfford ? 'var(--color-accent)' : 'var(--color-bg-tertiary)',
                    color: canAfford ? 'white' : 'var(--color-text-muted)'
                  }}
                  title={`${ability.description}\n${ability.mpCost > 0 ? `MP: ${ability.mpCost}` : ''}${ability.staminaCost > 0 ? `Stamina: ${ability.staminaCost}` : ''}`}
                >
                  <div>{ability.name}</div>
                  <div className="text-[10px] opacity-75">
                    {ability.mpCost > 0 && <span style={{ color: 'var(--color-mp)' }}>{ability.mpCost} MP</span>}
                    {ability.staminaCost > 0 && <span style={{ color: 'var(--color-stamina)' }}>{ability.staminaCost} ST</span>}
                  </div>
                </button>
              );
            })
          ) : (
            <button
              onClick={() => handleAttack()}
              disabled={isAttacking || isFleeing}
              className="col-span-3 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-danger)',
                color: 'white'
              }}
            >
              {isAttacking ? 'Attacking...' : 'Attack'}
            </button>
          )}
        </div>

        {/* Flee Button */}
        <button
          onClick={handleFlee}
          disabled={isAttacking || isFleeing || ['mini_boss', 'boss'].includes(combatMonster.tier)}
          className="w-full py-2 rounded-lg font-medium transition-all disabled:opacity-50"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-secondary)'
          }}
        >
          {isFleeing ? 'Fleeing...' : 'Flee'}
        </button>

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
    <div className="space-y-4">
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

      {/* Fixed Monster - Show specific monster info */}
      {monsters.type === 'fixed' && (
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
        >
          <div className="text-center mb-4">
            <span
              className="inline-block px-3 py-1 text-xs font-bold uppercase rounded mb-2"
              style={{
                backgroundColor: getTierColor(monsters.tier),
                color: 'white'
              }}
            >
              {monsters.tier.replace('_', ' ')}
            </span>
            <h3
              className="text-xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {monsters.name}
            </h3>
            <p
              className="text-sm capitalize"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Level {monsters.level} {monsters.category}
            </p>
          </div>

          <button
            onClick={handleEngage}
            disabled={isStarting}
            className="w-full py-3 rounded-lg font-medium transition-all disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-danger)',
              color: 'white'
            }}
          >
            {isStarting ? 'Engaging...' : `Fight ${monsters.name}`}
          </button>
        </div>
      )}

      {/* Random Monsters - Show possible encounters */}
      {monsters.type === 'random' && (
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
        >
          <h3
            className="text-lg font-bold mb-3"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Hostile Creatures Nearby
          </h3>

          {/* Show possible monsters by tier */}
          {monsters.possibleMonsters && Object.entries(monsters.possibleMonsters).map(([tier, monsterList]) => (
            <div key={tier} className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-0.5 text-xs font-bold uppercase rounded"
                  style={{
                    backgroundColor: getTierColor(tier),
                    color: 'white'
                  }}
                >
                  {tier.replace('_', ' ')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {monsterList.map((monster) => (
                  <span
                    key={monster.monsterId}
                    className="px-2 py-1 text-xs rounded capitalize"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    {monster.name} (Lv.{monster.level})
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Fallback if no possible monsters data */}
          {(!monsters.possibleMonsters || Object.keys(monsters.possibleMonsters).length === 0) && (
            <p
              className="text-sm mb-3"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Unknown creatures lurk here...
            </p>
          )}

          <button
            onClick={handleEngage}
            disabled={isStarting}
            className="w-full py-3 rounded-lg font-medium transition-all disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-danger)',
              color: 'white'
            }}
          >
            {isStarting ? 'Engaging...' : 'Engage Random Encounter'}
          </button>
        </div>
      )}

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
            value={hero?.effectiveStats?.power || 0}
            color="var(--color-danger)"
          />
          <StatDisplay
            label="Toughness"
            value={hero?.effectiveStats?.toughness || 0}
            color="var(--color-success)"
          />
          <StatDisplay
            label="Acuity"
            value={hero?.effectiveStats?.acuity || 0}
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
const VictoryScreen = ({ monster, rewards, levelUp, log, onContinue }) => (
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

    {/* Level Up Banner */}
    {levelUp && (
      <div
        className="p-4 rounded-lg text-center animate-pulse"
        style={{
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          border: '2px solid rgba(139, 92, 246, 0.5)'
        }}
      >
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--color-xp)' }}
        >
          Level Up!
        </h3>
        <p
          className="text-2xl font-bold mb-3"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Level {levelUp.previousLevel} → {levelUp.newLevel}
        </p>
        {/* Stat Gains */}
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(levelUp.statGains).map(([stat, gain]) =>
            gain > 0 && (
              <span
                key={stat}
                className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-success)'
                }}
              >
                {stat} +{gain}
              </span>
            )
          )}
        </div>
        <p
          className="text-xs mt-2"
          style={{ color: 'var(--color-text-muted)' }}
        >
          HP and MP fully restored!
        </p>
      </div>
    )}

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

/**
 * Get color for monster tier
 */
const getTierColor = (tier) => {
  const colors = {
    trash: '#6b7280',      // gray
    minion: '#22c55e',     // green
    elite: '#3b82f6',      // blue
    champion: '#a855f7',   // purple
    mini_boss: '#f59e0b',  // amber
    boss: '#ef4444'        // red
  };
  return colors[tier] || colors.trash;
};

export default CombatTab;
