import { useState } from 'react';

const STAT_LABELS = {
  power: { name: 'Power', abbr: 'POW', color: 'text-red-400' },
  toughness: { name: 'Toughness', abbr: 'TOU', color: 'text-orange-400' },
  brilliance: { name: 'Brilliance', abbr: 'BRI', color: 'text-blue-400' },
  spirit: { name: 'Spirit', abbr: 'SPI', color: 'text-purple-400' },
  acuity: { name: 'Acuity', abbr: 'ACU', color: 'text-yellow-400' },
  instinct: { name: 'Instinct', abbr: 'INS', color: 'text-green-400' }
};

const ARMOR_COLORS = {
  heavy: 'text-orange-400',
  medium: 'text-yellow-400',
  light: 'text-blue-400'
};

const CallingSelection = ({ callings, selectedCalling, onSelect, selectedSpecies }) => {
  const [hoveredCalling, setHoveredCalling] = useState(null);

  const displayCalling = hoveredCalling || callings.find(c => c.id === selectedCalling) || null;

  // Calculate combined stats with species
  const getCombinedStats = (calling) => {
    if (!selectedSpecies || !calling) return null;

    const combined = {};
    const stats = ['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'];

    stats.forEach(stat => {
      combined[stat] = (selectedSpecies.stats[stat] || 0) + (calling.statModifiers[stat] || 0);
    });

    return combined;
  };

  const combinedStats = displayCalling ? getCombinedStats(displayCalling) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calling Grid */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {callings.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              onMouseEnter={() => setHoveredCalling(c)}
              onMouseLeave={() => setHoveredCalling(null)}
              className={`p-4 rounded-lg border-2 transition-all text-center
                ${selectedCalling === c.id
                  ? 'border-primary bg-primary/10'
                  : 'border-transparent bg-background hover:border-primary/50'
                }`}
            >
              <div className="text-3xl mb-2">
                {getCallingEmoji(c.id)}
              </div>
              <div className="font-semibold text-text-primary text-sm">{c.name}</div>
              <div className="text-xs text-text-secondary mt-1 capitalize">
                {c.specializations.armor} Armor
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Calling Details Panel */}
      <div className="lg:col-span-1">
        {displayCalling ? (
          <div className="bg-background rounded-lg p-4 sticky top-4">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{getCallingEmoji(displayCalling.id)}</div>
              <h3 className="text-xl font-bold text-text-primary">{displayCalling.name}</h3>
            </div>

            <p className="text-text-secondary text-sm mb-4">{displayCalling.description}</p>

            {/* Stat Modifiers */}
            <div className="mb-4">
              <h4 className="font-semibold text-text-primary text-sm mb-2">Stat Bonuses</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(displayCalling.statModifiers)
                  .filter(([, value]) => value > 0)
                  .sort((a, b) => b[1] - a[1])
                  .map(([stat, value]) => (
                    <span
                      key={stat}
                      className={`px-2 py-1 rounded text-xs ${STAT_LABELS[stat].color} bg-surface`}
                    >
                      +{value} {STAT_LABELS[stat].name}
                    </span>
                  ))}
              </div>
            </div>

            {/* Combined Stats (if species selected) */}
            {combinedStats && selectedSpecies && (
              <div className="mb-4">
                <h4 className="font-semibold text-text-primary text-sm mb-2">
                  Combined Stats ({selectedSpecies.name} + {displayCalling.name})
                </h4>
                <div className="space-y-1">
                  {Object.entries(combinedStats).map(([stat, value]) => (
                    <div key={stat} className="flex items-center justify-between text-sm">
                      <span className={STAT_LABELS[stat].color}>{STAT_LABELS[stat].name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-surface rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${(value / 15) * 100}%` }}
                          />
                        </div>
                        <span className="w-6 text-right text-text-primary">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specializations */}
            <div className="border-t border-surface pt-4 mb-4">
              <h4 className="font-semibold text-text-primary text-sm mb-2">Specializations</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-text-secondary">Physical:</span>
                  <span className="text-text-primary ml-1 capitalize">
                    {displayCalling.specializations.physical1}, {displayCalling.specializations.physical2}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Magical:</span>
                  <span className="text-text-primary ml-1 capitalize">
                    {displayCalling.specializations.magical}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-text-secondary">Armor:</span>
                  <span className={`ml-1 capitalize ${ARMOR_COLORS[displayCalling.specializations.armor]}`}>
                    {displayCalling.specializations.armor}
                  </span>
                </div>
              </div>
            </div>

            {/* Starting Resources */}
            <div className="border-t border-surface pt-4">
              <h4 className="font-semibold text-text-primary text-sm mb-2">Starting Resources</h4>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-400">Gold Bonus</span>
                <span className="text-text-primary">+{displayCalling.startingResources.gold}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Ration Bonus</span>
                <span className="text-text-primary">+{displayCalling.startingResources.rations}</span>
              </div>
              <p className="text-xs text-text-secondary mt-2 italic">{displayCalling.resourceRationale}</p>
            </div>
          </div>
        ) : (
          <div className="bg-background rounded-lg p-6 text-center text-text-secondary">
            <p>Hover over or select a calling to see details</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function for calling emoji icons
const getCallingEmoji = (callingId) => {
  const emojis = {
    warrior: '⚔️',
    paladin: '🛡️',
    hunter: '🏹',
    rogue: '🗡️',
    mage: '🔮',
    priest: '✝️',
    bard: '🎵',
    druid: '🌿'
  };
  return emojis[callingId] || '❓';
};

export default CallingSelection;
