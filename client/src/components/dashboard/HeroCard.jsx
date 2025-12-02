import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faGenderless, faQuestion, faTrash, faPlay, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const GENDER_ICONS = {
  male: { icon: faMars, color: 'text-blue-400' },
  female: { icon: faVenus, color: 'text-pink-400' },
  'non-binary': { icon: faGenderless, color: 'text-purple-400' },
  other: { icon: faQuestion, color: 'text-teal-400' }
};

const SPECIES_EMOJIS = {
  human: '👤', elf: '🧝', dwarf: '🪓', gnome: '🔧', orc: '👹', goliath: '🗻',
  tiefling: '😈', goblin: '👺', aarakocra: '🦅', vulpine: '🦊', sylvan: '🌳', sprite: '✨'
};

const CALLING_EMOJIS = {
  warrior: '⚔️', paladin: '🛡️', hunter: '🏹', rogue: '🗡️',
  mage: '🔮', priest: '✝️', bard: '🎵', druid: '🌿'
};

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
const formatRelativeTime = (date) => {
  if (!date) return 'Never played';

  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 30) {
    return then.toLocaleDateString();
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMins > 0) {
    return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

/**
 * Format site name for display (e.g., "avandria" -> "Avandria")
 */
const formatSiteName = (site) => {
  if (!site) return 'Unknown';
  return site.charAt(0).toUpperCase() + site.slice(1).replace(/-/g, ' ');
};

const HeroCard = ({ hero, onPlay, onDelete, isDeleting }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const genderInfo = GENDER_ICONS[hero.genderIdentity] || GENDER_ICONS.other;
  const speciesEmoji = SPECIES_EMOJIS[hero.species] || '❓';
  const callingEmoji = CALLING_EMOJIS[hero.calling] || '❓';

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(hero.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div
      className="relative rounded-lg border overflow-hidden transition-all hover:border-primary/50"
      style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        borderColor: 'var(--color-border)'
      }}
    >
      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 p-4">
          <p className="text-red-400 font-semibold mb-2">Delete {hero.heroName}?</p>
          <p className="text-text-secondary text-sm mb-4 text-center">This cannot be undone.</p>
          <div className="flex gap-2">
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-surface text-text-primary rounded-lg text-sm hover:bg-surface/80"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Card Header - Level Badge */}
      <div className="flex justify-between items-center px-4 pt-3">
        <span
          className="text-xs font-semibold px-2 py-1 rounded"
          style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
        >
          Lv. {hero.level}
        </span>
        <button
          onClick={handleDeleteClick}
          className="text-text-secondary hover:text-red-400 transition-colors p-1"
          title="Delete hero"
        >
          <FontAwesomeIcon icon={faTrash} size="sm" />
        </button>
      </div>

      {/* Hero Info */}
      <div className="px-4 py-3">
        {/* Species + Calling Icons */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">{speciesEmoji}</span>
          <span className="text-xl text-text-secondary">+</span>
          <span className="text-2xl">{callingEmoji}</span>
        </div>

        {/* Hero Name */}
        <h4
          className="text-lg font-bold text-center mb-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {hero.heroName}
        </h4>

        {/* Gender, Species, Calling */}
        <div className="flex items-center justify-center gap-2 text-sm mb-3">
          <FontAwesomeIcon icon={genderInfo.icon} className={genderInfo.color} />
          <span style={{ color: 'var(--color-text-secondary)' }}>
            {hero.speciesName} {hero.callingName}
          </span>
        </div>

        {/* Location and Last Played */}
        <div className="space-y-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-400" />
            <span>{formatSiteName(hero.currentSite)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-yellow-400" />
            <span>{formatRelativeTime(hero.lastPlayedAt)}</span>
          </div>
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={() => onPlay(hero.id)}
        className="w-full py-3 font-semibold transition-colors flex items-center justify-center gap-2"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'white'
        }}
      >
        <FontAwesomeIcon icon={faPlay} />
        Play
      </button>
    </div>
  );
};

export default HeroCard;
