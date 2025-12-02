import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faGenderless, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { calculateMaxHP, calculateMaxMP } from '../../services/gameDataService';

const GENDER_ICONS = {
  male: { icon: faMars, color: 'text-blue-400' },
  female: { icon: faVenus, color: 'text-pink-400' },
  'non-binary': { icon: faGenderless, color: 'text-purple-400' },
  other: { icon: faQuestion, color: 'text-teal-400' }
};

const STAT_COLORS = {
  power: 'text-red-400',
  toughness: 'text-orange-400',
  brilliance: 'text-blue-400',
  spirit: 'text-purple-400',
  acuity: 'text-yellow-400',
  instinct: 'text-green-400'
};

const BRANCH_NAMES = {
  power: 'Power',
  toughness: 'Toughness',
  brilliance: 'Brilliance',
  spirit: 'Spirit',
  acuity: 'Acuity',
  instinct: 'Instinct'
};

const CreationSummary = ({ heroData, selectedSpecies, selectedCalling }) => {
  if (!selectedSpecies || !selectedCalling) {
    return <div className="text-center text-text-secondary">Missing selection data</div>;
  }

  // Calculate final stats
  const stats = ['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'];
  const finalStats = {};
  stats.forEach(stat => {
    finalStats[stat] =
      (selectedSpecies.stats[stat] || 0) +
      (selectedCalling.statModifiers[stat] || 0);
  });

  // Calculate resources
  const startingGold = selectedSpecies.startingResources.gold + selectedCalling.startingResources.gold;
  const startingRations = selectedSpecies.startingResources.rations + selectedCalling.startingResources.rations;

  // Calculate vitality
  const maxHP = calculateMaxHP(finalStats.toughness);
  const maxMP = calculateMaxMP(finalStats.spirit);

  const genderInfo = GENDER_ICONS[heroData.genderIdentity] || GENDER_ICONS.other;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Portrait Section */}
      <div className="text-center mb-8 p-6 bg-background rounded-lg">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className="text-5xl">{getSpeciesEmoji(selectedSpecies.id)}</span>
          <span className="text-3xl text-text-secondary">+</span>
          <span className="text-5xl">{getCallingEmoji(selectedCalling.id)}</span>
        </div>

        <h2 className="text-3xl font-bold text-text-primary mb-2">{heroData.heroName}</h2>

        <div className="flex items-center justify-center space-x-2 text-text-secondary">
          <FontAwesomeIcon icon={genderInfo.icon} className={genderInfo.color} />
          <span>{selectedSpecies.name}</span>
          <span>•</span>
          <span>{selectedCalling.name}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Final Statistics */}
        <div className="bg-background rounded-lg p-4">
          <h3 className="font-bold text-text-primary mb-4">Final Statistics</h3>
          <div className="space-y-2">
            {stats.map(stat => (
              <div key={stat} className="flex items-center justify-between">
                <span className={`capitalize ${STAT_COLORS[stat]}`}>{stat}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary text-xs">
                    {selectedSpecies.stats[stat]}
                    {selectedCalling.statModifiers[stat] > 0 && (
                      <span className="text-success"> +{selectedCalling.statModifiers[stat]}</span>
                    )}
                  </span>
                  <span className="text-text-primary font-bold w-6 text-right">{finalStats[stat]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vitality & Resources */}
        <div className="bg-background rounded-lg p-4">
          <h3 className="font-bold text-text-primary mb-4">Vitality & Resources</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-red-400">Hit Points (HP)</span>
              <span className="text-text-primary font-bold">{maxHP}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-400">Mana Points (MP)</span>
              <span className="text-text-primary font-bold">{maxMP}</span>
            </div>
            <div className="border-t border-surface pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-yellow-400">Starting Gold</span>
                <span className="text-text-primary font-bold">{startingGold}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-400">Starting Rations</span>
                <span className="text-text-primary font-bold">{startingRations}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="bg-background rounded-lg p-4 mb-6">
        <h3 className="font-bold text-text-primary mb-4">Specializations</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Physical Weapons:</span>
            <p className="text-text-primary capitalize">
              {selectedCalling.specializations.physical1}, {selectedCalling.specializations.physical2}
            </p>
          </div>
          <div>
            <span className="text-text-secondary">Magical Weapon:</span>
            <p className="text-text-primary capitalize">{selectedCalling.specializations.magical}</p>
          </div>
          <div>
            <span className="text-text-secondary">Armor Type:</span>
            <p className="text-text-primary capitalize">{selectedCalling.specializations.armor}</p>
          </div>
          <div>
            <span className="text-text-secondary">Starting Location:</span>
            <p className="text-text-primary">Avandria</p>
          </div>
        </div>
      </div>

      {/* Initial Skill Selection */}
      {heroData.initialSkillBranch && (
        <div className="bg-background rounded-lg p-4 mb-6">
          <h3 className="font-bold text-text-primary mb-2">Initial Skill Path</h3>
          <p className="text-text-secondary text-sm">
            You chose to begin with the{' '}
            <span className={`font-semibold ${STAT_COLORS[heroData.initialSkillBranch]}`}>
              {BRANCH_NAMES[heroData.initialSkillBranch]}
            </span>
            {' '}branch of the skill tree.
          </p>
          <p className="text-xs text-text-secondary mt-1">
            (Note: Your 1 SP will be spent after creation at your first Trainer visit)
          </p>
        </div>
      )}

      {/* Confirmation Message */}
      <div className="text-center p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <p className="text-text-secondary">
          Ready to begin your adventure? Click <span className="text-success font-semibold">Create Hero</span> below!
        </p>
        <p className="text-xs text-text-secondary mt-2">
          Your hero will start at Avandria, the gateway to the world.
        </p>
      </div>
    </div>
  );
};

// Helper functions
const getSpeciesEmoji = (speciesId) => {
  const emojis = {
    human: '👤', elf: '🧝', dwarf: '🪓', gnome: '🔧', orc: '👹', goliath: '🗻',
    tiefling: '😈', goblin: '👺', aarakocra: '🦅', vulpine: '🦊', sylvan: '🌳', sprite: '✨'
  };
  return emojis[speciesId] || '❓';
};

const getCallingEmoji = (callingId) => {
  const emojis = {
    warrior: '⚔️', paladin: '🛡️', hunter: '🏹', rogue: '🗡️',
    mage: '🔮', priest: '✝️', bard: '🎵', druid: '🌿'
  };
  return emojis[callingId] || '❓';
};

export default CreationSummary;
