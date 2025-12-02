import { useState, useEffect } from 'react';
import { getCallingSkillTree } from '../../services/skillTreeService';
import AbilityTooltip from './AbilityTooltip';

const BRANCH_INFO = {
  power: {
    name: 'Power',
    color: 'text-red-400',
    bgColor: 'bg-red-400',
    borderColor: 'border-red-400',
    hoverBg: 'hover:bg-red-400/20',
    selectedBg: 'bg-red-400/10',
    description: 'Physical offense',
    basicAbility: 'Strike'
  },
  toughness: {
    name: 'Toughness',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400',
    borderColor: 'border-orange-400',
    hoverBg: 'hover:bg-orange-400/20',
    selectedBg: 'bg-orange-400/10',
    description: 'Physical defense',
    basicAbility: 'Guard'
  },
  brilliance: {
    name: 'Brilliance',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400',
    borderColor: 'border-blue-400',
    hoverBg: 'hover:bg-blue-400/20',
    selectedBg: 'bg-blue-400/10',
    description: 'Magical offense',
    basicAbility: 'Spark'
  },
  spirit: {
    name: 'Spirit',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400',
    borderColor: 'border-purple-400',
    hoverBg: 'hover:bg-purple-400/20',
    selectedBg: 'bg-purple-400/10',
    description: 'Magical defense',
    basicAbility: 'Fortify'
  },
  acuity: {
    name: 'Acuity',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400',
    borderColor: 'border-yellow-400',
    hoverBg: 'hover:bg-yellow-400/20',
    selectedBg: 'bg-yellow-400/10',
    description: 'Precision',
    basicAbility: 'Focus'
  },
  instinct: {
    name: 'Instinct',
    color: 'text-green-400',
    bgColor: 'bg-green-400',
    borderColor: 'border-green-400',
    hoverBg: 'hover:bg-green-400/20',
    selectedBg: 'bg-green-400/10',
    description: 'Evasion',
    basicAbility: 'Evade'
  }
};

const SP_COSTS = [0, 0, 1, 2, 3, 4, 5]; // Index = stage

const SkillTreeOverview = ({ calling, callingData, selectedBranch, onSelectBranch }) => {
  const [skillTree, setSkillTree] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Handle branch click - toggles both selection and expansion
  const handleBranchClick = (branch) => {
    if (selectedBranch === branch) {
      // Clicking selected branch deselects it
      onSelectBranch(null);
    } else {
      // Clicking new branch selects it
      onSelectBranch(branch);
    }
  };

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
        <p className="text-text-secondary text-xs mt-1">
          Hover over abilities to see their effects
        </p>
      </div>

      {/* Skill Tree Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {branches.map((branch) => {
          const branchData = skillTree[branch];
          const info = BRANCH_INFO[branch];
          const isSelected = selectedBranch === branch;

          return (
            <div
              key={branch}
              className={`
                rounded-lg border-2 transition-all cursor-pointer overflow-hidden
                ${isSelected
                  ? `${info.borderColor} ${info.selectedBg}`
                  : `border-surface bg-background ${info.hoverBg}`
                }
              `}
              onClick={() => handleBranchClick(branch)}
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

                {/* Visual Skill Tree - WoW Style Nodes */}
                <div className="relative py-2">
                  {/* Connection Line */}
                  <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-surface -translate-y-1/2" />

                  {/* Stage Nodes */}
                  <div className="relative flex items-center justify-between">
                    {[1, 2, 3, 4, 5, 6].map((stage) => {
                      const ability = branchData.stages[stage];
                      const isUnlocked = stage === 1 || (stage === 2 && isSelected);
                      const willUnlock = stage === 2 && isSelected;

                      return (
                        <AbilityTooltip
                          key={stage}
                          ability={ability}
                          stage={stage}
                          isUnlocked={isUnlocked}
                          branchColor={info.color}
                        >
                          <div
                            className={`
                              relative w-8 h-8 rounded-full flex items-center justify-center
                              text-xs font-bold border-2 transition-all
                              ${isUnlocked
                                ? `${info.bgColor} text-white border-white/30 shadow-lg`
                                : willUnlock
                                  ? `${info.bgColor}/50 text-white border-white/20`
                                  : 'bg-gray-700 text-gray-400 border-gray-600'
                              }
                            `}
                          >
                            {stage}
                            {/* Glow effect for unlocked */}
                            {isUnlocked && (
                              <div className={`absolute inset-0 rounded-full ${info.bgColor} opacity-30 animate-pulse`} />
                            )}
                          </div>
                        </AbilityTooltip>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Expanded Ability List - shows when selected */}
              {isSelected && (
                <div className="border-t-2 border-surface bg-background/50 p-4">
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6].map((stage) => {
                      const ability = branchData.stages[stage];
                      const isUnlocked = stage === 1 || (stage === 2 && isSelected);
                      const spCost = SP_COSTS[stage];

                      return (
                        <AbilityTooltip
                          key={stage}
                          ability={ability}
                          stage={stage}
                          isUnlocked={isUnlocked}
                          branchColor={info.color}
                        >
                          <div
                            className={`
                              flex items-center p-2 rounded-lg transition-all
                              ${isUnlocked
                                ? 'bg-surface/80'
                                : 'bg-surface/30 opacity-60 hover:opacity-100'
                              }
                            `}
                          >
                            {/* Stage Number */}
                            <div
                              className={`
                                w-6 h-6 rounded-full flex items-center justify-center
                                text-xs font-bold mr-3 flex-shrink-0
                                ${isUnlocked
                                  ? `${info.bgColor} text-white`
                                  : 'bg-gray-600 text-gray-400'
                                }
                              `}
                            >
                              {stage}
                            </div>

                            {/* Ability Info */}
                            <div className="flex-1 min-w-0 flex items-center gap-2">
                              <span className={`font-medium text-sm ${isUnlocked ? 'text-text-primary' : 'text-text-secondary'}`}>
                                {ability.name}
                              </span>
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                ability.type === 'active'
                                  ? 'bg-yellow-400/20 text-yellow-400'
                                  : 'bg-blue-400/20 text-blue-400'
                              }`}>
                                {ability.type}
                              </span>
                            </div>

                            {/* SP Cost / Status */}
                            <div className="flex-shrink-0 ml-2 text-right">
                              {stage === 1 ? (
                                <span className="text-xs text-green-400">✓</span>
                              ) : isUnlocked ? (
                                <span className="text-xs text-green-400">✓</span>
                              ) : (
                                <span className="text-xs text-text-secondary">{spCost} SP</span>
                              )}
                            </div>
                          </div>
                        </AbilityTooltip>
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
        <div className="bg-surface rounded-lg p-4 border border-primary/30">
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-2">You will unlock:</p>
            <div className={`text-xl font-bold ${BRANCH_INFO[selectedBranch].color}`}>
              {skillTree[selectedBranch].stages[2].name}
            </div>
            <p className="text-sm text-text-secondary mt-2 max-w-md mx-auto">
              {skillTree[selectedBranch].stages[2].description}
            </p>
            <p className="text-xs text-text-secondary mt-2">
              From {skillTree[selectedBranch].pathName}
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <h4 className="text-sm font-semibold text-primary mb-2">About Skill Trees</h4>
        <ul className="text-xs text-text-secondary space-y-1">
          <li>• Each calling has 6 branches, one for each stat</li>
          <li>• Each branch has 6 stages with unique abilities</li>
          <li>• <span className="text-yellow-400">Active</span> abilities are used in combat, <span className="text-blue-400">Passive</span> abilities are always active</li>
          <li>• You earn more Skill Points as you level up</li>
          <li>• By level 20, you can max 2 branches to Stage 6</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillTreeOverview;
