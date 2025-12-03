import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMap,
  selectMapData,
  selectMapLoading,
  moveToLocation,
  fetchLocation
} from '../../store/navigationSlice';

/**
 * MapTab - Displays discovered locations organized by region
 *
 * Shows:
 * - All discovered locations
 * - Cleared status
 * - Current location indicator
 * - Quick travel to cleared locations
 */
const MapTab = ({ heroId }) => {
  const dispatch = useDispatch();
  const mapData = useSelector(selectMapData);
  const mapLoading = useSelector(selectMapLoading);

  // Fetch map data on mount
  useEffect(() => {
    if (heroId) {
      dispatch(fetchMap(heroId));
    }
  }, [dispatch, heroId]);

  const handleTravelTo = async (locationId) => {
    const result = await dispatch(moveToLocation({ heroId, destinationId: locationId }));
    if (moveToLocation.fulfilled.match(result)) {
      dispatch(fetchLocation({ locationId, heroId }));
      dispatch(fetchMap(heroId));
    }
  };

  if (mapLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!mapData || !mapData.locations || mapData.locations.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{ color: 'var(--color-text-muted)' }}>
          No locations discovered yet.
        </p>
      </div>
    );
  }

  // Group locations by parent
  const { hierarchy, currentLocation, totalDiscovered, totalCleared } = mapData;

  // Get root level locations
  const rootLocations = hierarchy?.root || [];

  return (
    <div className="space-y-6">
      {/* Map Stats */}
      <div className="flex gap-4 text-center">
        <div
          className="flex-1 p-3 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <p
            className="text-xl font-bold"
            style={{ color: 'var(--color-accent)' }}
          >
            {totalDiscovered}
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Discovered
          </p>
        </div>
        <div
          className="flex-1 p-3 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <p
            className="text-xl font-bold"
            style={{ color: 'var(--color-success)' }}
          >
            {totalCleared}
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Cleared
          </p>
        </div>
      </div>

      {/* Location Tree */}
      <div className="space-y-2">
        {mapData.locations.map((location) => (
          <LocationEntry
            key={location.locationId}
            location={location}
            isCurrent={location.locationId === currentLocation}
            onTravel={handleTravelTo}
            hierarchy={hierarchy}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Location Entry Component
 */
const LocationEntry = ({ location, isCurrent, onTravel, hierarchy }) => {
  // Get location type icon
  const getTypeIcon = () => {
    const icons = {
      settlement: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
        </svg>
      ),
      clearing: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" clipRule="evenodd" />
        </svg>
      ),
      landmark: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      lair: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      dungeon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9zm-4 4h10v1a3 3 0 11-6 0v-1H5z" clipRule="evenodd" />
        </svg>
      ),
      vault: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" />
        </svg>
      )
    };
    return icons[location.siteType] || icons.clearing;
  };

  const canTravel = location.isCleared && !isCurrent;

  return (
    <div
      className={`p-3 rounded-lg flex items-center gap-3 transition-all ${
        canTravel ? 'cursor-pointer hover:scale-[1.01]' : ''
      }`}
      style={{
        backgroundColor: isCurrent
          ? 'rgba(var(--color-accent-rgb), 0.1)'
          : 'var(--color-bg-tertiary)',
        border: isCurrent ? '1px solid var(--color-accent)' : '1px solid transparent'
      }}
      onClick={() => canTravel && onTravel(location.locationId)}
    >
      {/* Icon */}
      <span
        className="p-2 rounded-lg"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          color: location.isCleared
            ? 'var(--color-success)'
            : location.alwaysSafe
              ? 'var(--color-info)'
              : 'var(--color-danger)'
        }}
      >
        {getTypeIcon()}
      </span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="font-medium truncate"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {location.name}
        </p>
        <p
          className="text-xs capitalize truncate"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {location.siteType?.replace('_', ' ') || location.locationType}
        </p>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-2">
        {isCurrent && (
          <span
            className="px-2 py-0.5 text-xs rounded-full"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white'
            }}
          >
            Here
          </span>
        )}
        {location.isCleared && (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{ color: 'var(--color-success)' }}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {!location.isCleared && !location.alwaysSafe && (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{ color: 'var(--color-danger)' }}
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default MapTab;
