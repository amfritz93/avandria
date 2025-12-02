import { useState, useEffect } from 'react';

// Name suggestions based on species for inspiration
const NAME_SUGGESTIONS = {
  human: ['Aldric', 'Elena', 'Marcus', 'Lyra', 'Gareth', 'Vera'],
  elf: ['Aelindor', 'Sylvara', 'Thalion', 'Elara', 'Faenor', 'Nimue'],
  dwarf: ['Thorin', 'Brunhild', 'Durin', 'Helga', 'Balin', 'Sigrid'],
  gnome: ['Fizwick', 'Tinkle', 'Cogsworth', 'Gizmo', 'Sprocket', 'Widget'],
  orc: ['Groknak', 'Urga', 'Thrak', 'Molgash', 'Vorn', 'Shara'],
  goliath: ['Stonefist', 'Mountainborn', 'Ironhide', 'Peakwalker', 'Boulder', 'Summit'],
  tiefling: ['Morthos', 'Lilith', 'Zariel', 'Mephista', 'Bael', 'Nyx'],
  goblin: ['Skrix', 'Nix', 'Zik', 'Grik', 'Plink', 'Snot'],
  aarakocra: ['Zephyr', 'Talon', 'Skye', 'Feather', 'Swift', 'Storm'],
  vulpine: ['Reynard', 'Vixen', 'Russet', 'Fennec', 'Copper', 'Amber'],
  sylvan: ['Oakhart', 'Willowmist', 'Fernroot', 'Mossbeard', 'Birchsong', 'Thornvale'],
  sprite: ['Glimmer', 'Twinkle', 'Dewdrop', 'Shimmer', 'Sparkle', 'Flicker']
};

const NameInput = ({ name, onChange, selectedSpecies, selectedCalling }) => {
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = selectedSpecies ? NAME_SUGGESTIONS[selectedSpecies.id] || [] : [];
  const nameLength = name.trim().length;
  const isValidLength = nameLength >= 2 && nameLength <= 20;
  const isValidChars = /^[a-zA-Z0-9\s'-]*$/.test(name);

  const getValidationMessage = () => {
    if (name.length === 0) return '';
    if (!isValidChars) return 'Only letters, numbers, spaces, hyphens, and apostrophes allowed';
    if (nameLength < 2) return `Name must be at least 2 characters (${nameLength}/2)`;
    if (nameLength > 20) return `Name must be 20 characters or less (${nameLength}/20)`;
    return '';
  };

  const validationMessage = getValidationMessage();
  const isValid = nameLength > 0 && isValidLength && isValidChars;

  return (
    <div className="max-w-xl mx-auto">
      {/* Selected Info */}
      {selectedSpecies && selectedCalling && (
        <div className="text-center mb-6 text-text-secondary">
          <p>
            Creating a <span className="text-text-primary font-semibold">{selectedSpecies.name}</span>
            {' '}<span className="text-text-primary font-semibold">{selectedCalling.name}</span>
          </p>
        </div>
      )}

      {/* Name Input */}
      <div className="mb-6">
        <label htmlFor="heroName" className="block text-sm font-medium text-text-primary mb-2">
          Hero Name
        </label>
        <input
          id="heroName"
          type="text"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your hero's name..."
          maxLength={25}
          className={`
            w-full px-4 py-3 rounded-lg text-lg
            bg-background border-2 transition-all
            text-text-primary placeholder-text-secondary/50
            focus:outline-none
            ${isFocused
              ? 'border-primary'
              : validationMessage
                ? 'border-error'
                : isValid
                  ? 'border-success'
                  : 'border-surface'
            }
          `}
        />

        {/* Character Count & Validation */}
        <div className="flex justify-between mt-2">
          <span className={`text-sm ${validationMessage ? 'text-error' : 'text-text-secondary'}`}>
            {validationMessage || (isValid ? 'Name looks good!' : 'Enter a name for your hero')}
          </span>
          <span className={`text-sm ${nameLength > 20 ? 'text-error' : 'text-text-secondary'}`}>
            {nameLength}/20
          </span>
        </div>
      </div>

      {/* Name Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-text-secondary mb-2">
            Need inspiration? Try one of these {selectedSpecies?.name} names:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onChange(suggestion)}
                className="px-3 py-1 rounded-full bg-background text-text-secondary
                         hover:bg-primary/20 hover:text-primary transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {isValid && (
        <div className="text-center p-6 bg-background rounded-lg">
          <p className="text-text-secondary mb-2">Your hero shall be known as:</p>
          <h3 className="text-3xl font-bold text-text-primary">{name.trim()}</h3>
          <p className="text-text-secondary mt-2">
            {selectedSpecies?.name} {selectedCalling?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default NameInput;
