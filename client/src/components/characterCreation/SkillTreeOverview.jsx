import { useState, useEffect } from 'react';
import { getCallingSkillTree } from '../../services/skillTreeService';

const BRANCH_INFO = {
  power: {
    name: 'Power',
    color: 'text-red-400',
    bgColor: 'bg-red-400',
    borderColor: 'border-red-400',
    description: 'Physical offense',
    basicAbility: 'Strike'
  },
  toughness: {
    name: 'Toughness',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400',
    borderColor: 'border-orange-400',
    description: 'Physical defense',
    basicAbility: 'Guard'
  },
  brilliance: {
    name: 'Brilliance',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400',
    borderColor: 'border-blue-400',
    description: 'Magical offense',
    basicAbility: 'Spark'
  },
  spirit: {
    name: 'Spirit',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400',
    borderColor: 'border-purple-400',
    description: 'Magical defense',
    basicAbility: 'Fortify'
  },
  acuity: {
    name: 'Acuity',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400',
    borderColor: 'border-yellow-400',
    description: 'Precision',
    basicAbility: 'Focus'
  },
  instinct: {
    name: 'Instinct',
    color: 'text-green-400',
    bgColor: 'bg-green-400',
    borderColor: 'border-green-400',
    description: 'Evasion',
    basicAbility: 'Evade'
  }
};

const SP_COSTS = [0, 0, 1, 2, 3, 4, 5]; // Index = stage

const SkillTreeOverview = ({ calling, callingData, selectedBranch, onSelectBranch }) => {
  const [skillTree, setSkillTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedBranch, setExpandedBranch] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      if (!calling) return;
      setLoading(true);
      try {
        const response = await getCallingSkillTree(calling);
        setSkillTree(response.data.skillTree);
      } catch (error) {
        console.error('Failed to fetch skill tree:', error);
      }
      setLoading(false);
    };

    fetchTree();
  }, [calling]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!skillTree) {
    return (
      <div className="text-center text-text-secondary">
        Failed to load skill tree data
      </div>
    );
  }

  const branches = ['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {callingData?.name} Skill Tree
        </h3>
        <p className="text-text-secondary text-sm">
          You have <span className="text-primary font-bold">1 Skill Point</span> to spend.
          Select a branch to unlock your first Stage 2 ability.
        </p>
      </div>

      {/* Skill Tree Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {branches.map((branch) => {
          const branchData = skillTree[branch];
          const info = BRANCH_INFO[branch];
          const isSelected = selectedBranch === branch;
          const isExpanded = expandedBranch === branch;
          const stage2Ability = branchData.stages[2];

          return (
            <div
              key={branch}
              className={`
                rounded-lg border-2 transition-all cursor-pointer
                ${isSelected
                  ? `${info.borderColor} bg-${branch === 'power' ? 'red' : branch === 'toughness' ? 'orange' : branch === 'brilliance' ? 'blue' : branch === 'spirit' ? 'purple' : branch === 'acuity' ? 'yellow' : 'green'}-400/10`
                  : 'border-surface bg-background hover:border-primary/50'
                }
              `}
              onClick={() => onSelectBranch(branch)}
            >
              {/* Branch Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-bold ${info.color}`}>{branchData.pathName}</h4>
                  {isSelected && (
                    <span className="text-xs bg-success text-white px-2 py-0.5 rounded">Selected</span>
                  )}
                </div>
                <p className="text-xs text-text-secondary mb-3">{branchData.description}</p>

                {/* Stage Progression Visual */}
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5, 6].map((stage) => (
                    <div
                      key={stage}
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${stage === 1
                          ? `${info.bgColor} text-white`
                          : stage === 2 && isSelected
                            ? `${info.bgColor} text-white`
                            : 'bg-surface text-text-secondary'
                        }
                      `}
                      title={`Stage ${stage}${stage === 1 ? ' (Unlocked)' : stage === 2 && isSelected ? ' (Will Unlock)' : ''}`}
                    >
                      {stage}
                    </div>
                  ))}
                </div>

                {/* Current & Next Ability */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${info.bgColor}`}></span>
                    <span className="text-text-secondary">Stage 1:</span>
                    <span className="text-text-primary">{info.basicAbility}</span>
                    <span className="text-success text-xs">(Unlocked)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? info.bgColor : 'bg-surface'}`}></span>
                    <span className="text-text-secondary">Stage 2:</span>
                    <span className={isSelected ? 'text-text-primary' : 'text-text-secondary'}>
                      {stage2Ability.name}
                    </span>
                    <span className={`text-xs ${isSelected ? 'text-primary' : 'text-text-secondary'}`}>
                      (1 SP)
                    </span>
                  </div>
                </div>

                {/* Expand to see more */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedBranch(isExpanded ? null : branch);
                  }}
                  className="text-xs text-primary hover:text-primary/80 mt-2"
                >
                  {isExpanded ? 'Show less' : 'Show all abilities'}
                </button>
              </div>

              {/* Expanded View */}
              {isExpanded && (
                <div className="border-t border-surface p-4 bg-surface/50">
                  <h5 className="text-xs font-semibold text-text-secondary mb-2">All Stages:</h5>
                  <div className="space-y-1">
                    {[1, 2, 3, 4, 5, 6].map((stage) => {
                      const ability = branchData.stages[stage];
                      const isUnlocked = stage === 1 || (stage === 2 && isSelected);
                      return (
                        <div key={stage} className="flex items-center text-xs">
                          <span className={`w-4 ${isUnlocked ? info.color : 'text-text-secondary'}`}>
                            {stage}.
                          </span>
                          <span className={isUnlocked ? 'text-text-primary' : 'text-text-secondary'}>
                            {ability.name}
                          </span>
                          <span className="text-text-secondary/50 ml-1">
                            ({ability.type})
                          </span>
                          {stage > 1 && (
                            <span className="text-text-secondary/50 ml-auto">
                              {SP_COSTS[stage]} SP
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Confirmation */}
      {selectedBranch && skillTree[selectedBranch] && (
        <div className="bg-background rounded-lg p-4 text-center">
          <p className="text-text-secondary mb-2">You will unlock:</p>
          <div className={`text-xl font-bold ${BRANCH_INFO[selectedBranch].color}`}>
            {skillTree[selectedBranch].stages[2].name}
          </div>
          <p className="text-sm text-text-secondary mt-1">
            {skillTree[selectedBranch].stages[2].description}
          </p>
          <p className="text-xs text-text-secondary mt-2">
            From {skillTree[selectedBranch].pathName}
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <h4 className="text-sm font-semibold text-primary mb-2">About Skill Trees</h4>
        <ul className="text-xs text-text-secondary space-y-1">
          <li>• Each calling has 6 branches, one for each stat</li>
          <li>• Each branch has 6 stages with unique abilities</li>
          <li>• You earn more Skill Points as you level up</li>
          <li>• Visit Trainers in the world to spend additional SP</li>
          <li>• By level 20, you can max 2 branches to Stage 6</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillTreeOverview;
