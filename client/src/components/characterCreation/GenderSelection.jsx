import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faGenderless, faQuestion } from '@fortawesome/free-solid-svg-icons';

const GENDER_OPTIONS = [
  {
    id: 'male',
    label: 'Male',
    icon: faMars,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400',
    hoverBg: 'hover:bg-blue-400/20'
  },
  {
    id: 'female',
    label: 'Female',
    icon: faVenus,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400',
    hoverBg: 'hover:bg-pink-400/20'
  },
  {
    id: 'non-binary',
    label: 'Non-Binary',
    icon: faGenderless,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400',
    hoverBg: 'hover:bg-purple-400/20'
  },
  {
    id: 'other',
    label: 'Other',
    icon: faQuestion,
    color: 'text-teal-400',
    bgColor: 'bg-teal-400/10',
    borderColor: 'border-teal-400',
    hoverBg: 'hover:bg-teal-400/20'
  }
];

const GenderSelection = ({ selectedGender, onSelect }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-center text-text-secondary mb-8">
        Select the gender identity for your hero. This is purely for roleplay and narrative purposes.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {GENDER_OPTIONS.map((option) => {
          const isSelected = selectedGender === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-200
                flex flex-col items-center justify-center space-y-3
                ${isSelected
                  ? `${option.borderColor} ${option.bgColor}`
                  : `border-transparent bg-background ${option.hoverBg}`
                }
              `}
            >
              <div className={`text-5xl ${option.color}`}>
                <FontAwesomeIcon icon={option.icon} />
              </div>
              <span className={`font-semibold ${isSelected ? option.color : 'text-text-primary'}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {selectedGender && (
        <div className="text-center mt-8">
          <p className="text-text-secondary">
            Selected: <span className="text-text-primary font-semibold capitalize">
              {GENDER_OPTIONS.find(g => g.id === selectedGender)?.label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GenderSelection;
