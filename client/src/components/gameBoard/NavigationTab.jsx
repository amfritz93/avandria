import { useDispatch, useSelector } from 'react-redux';
import {
  moveToLocation,
  fetchLocation,
  selectIsMoving,
  selectMoveError
} from '../../store/navigationSlice';

/**
 * NavigationTab - Shows available destinations and handles movement
 *
 * Displays:
 * - List of connected locations with passage types
 * - Movement controls
 * - Gate requirements if applicable
 */
const NavigationTab = ({ connections, heroId, canProgress, monsters }) => {
  const dispatch = useDispatch();
  const isMoving = useSelector(selectIsMoving);
  const moveError = useSelector(selectMoveError);

  const handleMove = async (destinationId) => {
    const result = await dispatch(moveToLocation({ heroId, destinationId }));
    if (moveToLocation.fulfilled.match(result)) {
      // Refetch the new location after successful move
      dispatch(fetchLocation({
        locationId: destinationId,
        heroId
      }));
    }
  };

  // Group connections by whether they're forward (new) or backtrack
  const forwardConnections = connections.filter(c => !c.isDiscovered);
  const backtrackConnections = connections.filter(c => c.isDiscovered);

  // Passage type icons
  const getPassageIcon = (passageType) => {
    const icons = {
      road: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      river: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      ),
      bridge: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 7h16M4 17h16M6 7v10M18 7v10M10 7v10M14 7v10" />
        </svg>
      ),
      stairs: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 21l-7-3-7 3V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
        </svg>
      ),
      cave_mouth: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      portal: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    return icons[passageType] || icons.road;
  };

  if (connections.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{ color: 'var(--color-text-muted)' }}>
          No paths available from here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {moveError && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-danger)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
        >
          {moveError}
        </div>
      )}

      {/* Cannot Progress Warning */}
      {!canProgress && monsters && (
        <div
          className="p-3 rounded-lg text-sm flex items-center gap-2"
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: 'var(--color-warning)',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Clear this location before advancing forward. You can still backtrack.</span>
        </div>
      )}

      {/* Forward Paths */}
      {forwardConnections.length > 0 && (
        <div>
          <h3
            className="text-sm font-medium mb-3"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Paths Ahead
          </h3>
          <div className="grid gap-2">
            {forwardConnections.map((conn) => (
              <ConnectionButton
                key={conn.locationId}
                connection={conn}
                onMove={handleMove}
                isMoving={isMoving}
                disabled={!canProgress}
                getPassageIcon={getPassageIcon}
              />
            ))}
          </div>
        </div>
      )}

      {/* Backtrack Paths */}
      {backtrackConnections.length > 0 && (
        <div>
          <h3
            className="text-sm font-medium mb-3"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Return Path
          </h3>
          <div className="grid gap-2">
            {backtrackConnections.map((conn) => (
              <ConnectionButton
                key={conn.locationId}
                connection={conn}
                onMove={handleMove}
                isMoving={isMoving}
                disabled={false}
                isBacktrack
                getPassageIcon={getPassageIcon}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Connection Button Component
 */
const ConnectionButton = ({
  connection,
  onMove,
  isMoving,
  disabled,
  isBacktrack = false,
  getPassageIcon
}) => {
  const handleClick = () => {
    if (!disabled && !isMoving) {
      onMove(connection.locationId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isMoving}
      className={`w-full p-3 rounded-lg flex items-center gap-3 text-left transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
      }`}
      style={{
        backgroundColor: isBacktrack
          ? 'var(--color-bg-tertiary)'
          : 'var(--color-bg-primary)',
        border: `1px solid ${
          isBacktrack ? 'var(--color-border)' : 'var(--color-accent)'
        }`
      }}
    >
      {/* Passage Icon */}
      <span
        className="p-2 rounded-lg"
        style={{
          backgroundColor: isBacktrack
            ? 'var(--color-bg-secondary)'
            : 'rgba(var(--color-accent-rgb), 0.1)',
          color: isBacktrack ? 'var(--color-text-muted)' : 'var(--color-accent)'
        }}
      >
        {getPassageIcon(connection.passageType)}
      </span>

      {/* Location Info */}
      <div className="flex-1">
        <p
          className="font-medium"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {connection.name}
        </p>
        <p
          className="text-xs capitalize"
          style={{ color: 'var(--color-text-muted)' }}
        >
          via {connection.passageType?.replace('_', ' ') || 'path'}
          {connection.isOneWay && ' (one way)'}
        </p>
      </div>

      {/* Arrow */}
      <span style={{ color: 'var(--color-text-muted)' }}>
        {isBacktrack ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </span>

      {/* Loading spinner */}
      {isMoving && (
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary" />
      )}
    </button>
  );
};

export default NavigationTab;
