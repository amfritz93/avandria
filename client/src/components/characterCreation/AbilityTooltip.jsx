import { useState, useRef, useEffect } from 'react';

/**
 * AbilityTooltip - WoW-style tooltip that appears on hover
 * Shows ability name, type, description, resource cost, and SP cost
 */
const AbilityTooltip = ({ ability, stage, isUnlocked, branchColor, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Calculate tooltip position to stay within viewport
  useEffect(() => {
    if (showTooltip && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = triggerRect.bottom + 8;
      let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

      // Keep tooltip within horizontal bounds
      if (left < 10) left = 10;
      if (left + tooltipRect.width > viewportWidth - 10) {
        left = viewportWidth - tooltipRect.width - 10;
      }

      // If tooltip would go below viewport, show above instead
      if (top + tooltipRect.height > viewportHeight - 10) {
        top = triggerRect.top - tooltipRect.height - 8;
      }

      setPosition({ top, left });
    }
  }, [showTooltip]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'active': return 'text-yellow-400';
      case 'passive': return 'text-blue-400';
      default: return 'text-text-secondary';
    }
  };

  const getResourceIcon = (resource) => {
    switch (resource) {
      case 'mana': return '💧';
      case 'stamina': return '⚡';
      default: return '';
    }
  };

  const SP_COSTS = [0, 0, 1, 2, 3, 4, 5];
  const spCost = SP_COSTS[stage] || 0;

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-help"
      >
        {children}
      </div>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-72 pointer-events-none"
          style={{ top: position.top, left: position.left }}
        >
          {/* Tooltip Card - Dark themed like WoW */}
          <div className="bg-gray-900 border-2 border-gray-600 rounded-lg shadow-xl overflow-hidden">
            {/* Header with ability name */}
            <div className={`px-3 py-2 border-b border-gray-700 ${isUnlocked ? 'bg-gray-800' : 'bg-gray-900'}`}>
              <h4 className={`font-bold text-sm ${isUnlocked ? branchColor : 'text-gray-500'}`}>
                {ability.name}
              </h4>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-xs ${getTypeColor(ability.type)}`}>
                  {ability.type === 'active' ? '⚔️ Active Ability' : '🛡️ Passive'}
                </span>
                <span className="text-xs text-gray-400">
                  Stage {stage}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="px-3 py-2 bg-gray-900">
              <p className={`text-xs leading-relaxed ${isUnlocked ? 'text-gray-200' : 'text-gray-500'}`}>
                {ability.description || 'No description available.'}
              </p>
            </div>

            {/* Resource & Cost Info */}
            <div className="px-3 py-2 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between">
              {/* Resource Cost */}
              {ability.resource && (
                <div className="text-xs text-gray-400">
                  <span>{getResourceIcon(ability.resource)}</span>
                  <span className="ml-1 capitalize">{ability.resource}</span>
                  {ability.cost !== undefined && ability.cost > 0 && (
                    <span className="ml-1">({ability.cost})</span>
                  )}
                </div>
              )}

              {/* SP Cost */}
              {stage > 1 && (
                <div className={`text-xs ${isUnlocked ? 'text-green-400' : 'text-yellow-400'}`}>
                  {isUnlocked ? '✓ Unlocked' : `🔒 ${spCost} SP to unlock`}
                </div>
              )}
              {stage === 1 && (
                <div className="text-xs text-green-400">
                  ✓ Basic Ability
                </div>
              )}
            </div>

            {/* Locked overlay for high-stage abilities */}
            {!isUnlocked && stage > 2 && (
              <div className="px-3 py-1 bg-red-900/30 border-t border-red-800/50">
                <p className="text-xs text-red-400">
                  Requires Stage {stage - 1} first
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AbilityTooltip;
