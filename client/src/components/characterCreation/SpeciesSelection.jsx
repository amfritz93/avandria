import { useState } from 'react';

const STAT_LABELS = {
  power: { name: 'Power', abbr: 'POW', color: 'text-red-400' },
  toughness: { name: 'Toughness', abbr: 'TOU', color: 'text-orange-400' },
  brilliance: { name: 'Brilliance', abbr: 'BRI', color: 'text-blue-400' },
  spirit: { name: 'Spirit', abbr: 'SPI', color: 'text-purple-400' },
  acuity: { name: 'Acuity', abbr: 'ACU', color: 'text-yellow-400' },
  instinct: { name: 'Instinct', abbr: 'INS', color: 'text-green-400' }
};

const SpeciesSelection = ({ species, selectedSpecies, onSelect }) => {
  const [hoveredSpecies, setHoveredSpecies] = useState(null);

  const displaySpecies = hoveredSpecies || species.find(s => s.id === selectedSpecies) || null;

  const getStatDisplay = (value) => {
    if (value === 13) return { label: 'Primary', class: 'text-success font-bold' };
    if (value === 10) return { label: 'Secondary', class: 'text-primary' };
    if (value === 5) return { label: 'Weakness', class: 'text-error' };
    return { label: 'Neutral', class: 'text-text-secondary' };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Species Grid */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {species.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              onMouseEnter={() => setHoveredSpecies(s)}
              onMouseLeave={() => setHoveredSpecies(null)}
              className={`p-4 rounded-lg border-2 transition-all text-center
                ${selectedSpecies === s.id
                  ? 'border-primary bg-primary/10'
                  : 'border-transparent bg-background hover:border-primary/50'
                }`}
            >
              <div className="text-3xl mb-2">
                {getSpeciesEmoji(s.id)}
              </div>
              <div className="font-semibold text-text-primary text-sm">{s.name}</div>
              <div className="text-xs text-text-secondary mt-1">
                {s.archetype.primary.charAt(0).toUpperCase() + s.archetype.primary.slice(1)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Species Details Panel */}
      <div className="lg:col-span-1">
        {displaySpecies ? (
          <div className="bg-background rounded-lg p-4 sticky top-4">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{getSpeciesEmoji(displaySpecies.id)}</div>
              <h3 className="text-xl font-bold text-text-primary">{displaySpecies.name}</h3>
            </div>

            <p className="text-text-secondary text-sm mb-4">{displaySpecies.description}</p>

            {/* Stats */}
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-text-primary text-sm">Base Statistics</h4>
              {Object.entries(displaySpecies.stats).map(([stat, value]) => {
                const statInfo = STAT_LABELS[stat];
                const display = getStatDisplay(value);
                return (
                  <div key={stat} className="flex items-center justify-between text-sm">
                    <span className={statInfo.color}>{statInfo.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-surface rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${value === 13 ? 'bg-success' : value === 10 ? 'bg-primary' : value === 5 ? 'bg-error' : 'bg-text-secondary'}`}
                          style={{ width: `${(value / 13) * 100}%` }}
                        />
                      </div>
                      <span className={`w-6 text-right ${display.class}`}>{value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Starting Resources */}
            <div className="border-t border-surface pt-4">
              <h4 className="font-semibold text-text-primary text-sm mb-2">Starting Resources</h4>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-400">Gold</span>
                <span className="text-text-primary">{displaySpecies.startingResources.gold}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Rations</span>
                <span className="text-text-primary">{displaySpecies.startingResources.rations}</span>
              </div>
              <p className="text-xs text-text-secondary mt-2 italic">{displaySpecies.rationale}</p>
            </div>
          </div>
        ) : (
          <div className="bg-background rounded-lg p-6 text-center text-text-secondary">
            <p>Hover over or select a species to see details</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function for species emoji icons
const getSpeciesEmoji = (speciesId) => {
  const emojis = {
    human: '👤',
    elf: '🧝',
    dwarf: '🪓',
    gnome: '🔧',
    orc: '👹',
    goliath: '🗻',
    tiefling: '😈',
    goblin: '👺',
    aarakocra: '🦅',
    vulpine: '🦊',
    sylvan: '🌳',
    sprite: '✨'
  };
  return emojis[speciesId] || '❓';
};

export default SpeciesSelection;
