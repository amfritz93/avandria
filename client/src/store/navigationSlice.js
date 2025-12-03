import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import navigationService from '../services/navigationService';

/**
 * Navigation Slice
 * Manages game board navigation state including:
 * - Current location data
 * - Available connections/destinations
 * - Map data (discovered locations)
 * - Movement and clearing operations
 */

// ============================================================
// Async Thunks
// ============================================================

/**
 * Fetch current location details with connections
 */
export const fetchLocation = createAsyncThunk(
  'navigation/fetchLocation',
  async ({ locationId, heroId }, { rejectWithValue }) => {
    try {
      const response = await navigationService.getLocation(locationId, heroId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch location'
      );
    }
  }
);

/**
 * Move hero to a connected location
 */
export const moveToLocation = createAsyncThunk(
  'navigation/moveToLocation',
  async ({ heroId, destinationId }, { rejectWithValue }) => {
    try {
      const response = await navigationService.moveHero(heroId, destinationId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to move to location'
      );
    }
  }
);

/**
 * Fetch hero's discovered map data
 */
export const fetchMap = createAsyncThunk(
  'navigation/fetchMap',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await navigationService.getHeroMap(heroId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch map'
      );
    }
  }
);

/**
 * Clear current location (after defeating monsters)
 */
export const clearCurrentLocation = createAsyncThunk(
  'navigation/clearLocation',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await navigationService.clearLocation(heroId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to clear location'
      );
    }
  }
);

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // Current location data
  currentLocation: null,
  locationLoading: false,
  locationError: null,

  // Available destinations from current location
  connections: [],
  hiddenConnections: [],

  // Monster info at current location
  monsters: null,

  // Gate info (for Lair/Dungeon/Vault)
  gate: null,

  // Hero context (cleared status, can progress)
  heroContext: null,

  // Map data for Map tab
  mapData: null,
  mapLoading: false,
  mapError: null,

  // Movement state
  moving: false,
  moveError: null,
  lastMoveResult: null,

  // Clearing state
  clearing: false,
  clearError: null,
  lastClearResult: null
};

// ============================================================
// Slice
// ============================================================

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    /**
     * Clear navigation state (when leaving game board)
     */
    clearNavigationState: () => initialState,

    /**
     * Clear error states
     */
    clearNavigationErrors: (state) => {
      state.locationError = null;
      state.mapError = null;
      state.moveError = null;
      state.clearError = null;
    },

    /**
     * Clear move result after displaying
     */
    clearMoveResult: (state) => {
      state.lastMoveResult = null;
    },

    /**
     * Clear clear result after displaying
     */
    clearClearResult: (state) => {
      state.lastClearResult = null;
    },

    /**
     * Update hero context locally (for immediate UI feedback)
     */
    updateHeroContext: (state, action) => {
      if (state.heroContext) {
        state.heroContext = {
          ...state.heroContext,
          ...action.payload
        };
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // ========== Fetch Location ==========
      .addCase(fetchLocation.pending, (state) => {
        state.locationLoading = true;
        state.locationError = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.locationLoading = false;
        state.currentLocation = action.payload.location;
        state.connections = action.payload.connections || [];
        state.hiddenConnections = action.payload.hiddenConnections || [];
        state.monsters = action.payload.monsters;
        state.gate = action.payload.gate;
        state.heroContext = action.payload.heroContext;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.locationLoading = false;
        state.locationError = action.payload;
      })

      // ========== Move to Location ==========
      .addCase(moveToLocation.pending, (state) => {
        state.moving = true;
        state.moveError = null;
      })
      .addCase(moveToLocation.fulfilled, (state, action) => {
        state.moving = false;
        state.lastMoveResult = {
          success: true,
          previousLocation: action.payload.previousLocation,
          currentLocation: action.payload.currentLocation,
          isBacktracking: action.payload.isBacktracking
        };
        // Update current location with new data
        state.currentLocation = action.payload.currentLocation;
        // Clear connections until refetch
        state.connections = [];
        state.hiddenConnections = [];
        state.monsters = null;
        state.gate = null;
      })
      .addCase(moveToLocation.rejected, (state, action) => {
        state.moving = false;
        state.moveError = action.payload;
        state.lastMoveResult = {
          success: false,
          error: action.payload
        };
      })

      // ========== Fetch Map ==========
      .addCase(fetchMap.pending, (state) => {
        state.mapLoading = true;
        state.mapError = null;
      })
      .addCase(fetchMap.fulfilled, (state, action) => {
        state.mapLoading = false;
        state.mapData = action.payload;
      })
      .addCase(fetchMap.rejected, (state, action) => {
        state.mapLoading = false;
        state.mapError = action.payload;
      })

      // ========== Clear Location ==========
      .addCase(clearCurrentLocation.pending, (state) => {
        state.clearing = true;
        state.clearError = null;
      })
      .addCase(clearCurrentLocation.fulfilled, (state, action) => {
        state.clearing = false;
        state.lastClearResult = {
          success: true,
          locationId: action.payload.locationId,
          locationName: action.payload.locationName,
          revealedPaths: action.payload.revealedPaths || [],
          worldProgress: action.payload.worldProgress
        };
        // Update hero context to reflect cleared status
        if (state.heroContext) {
          state.heroContext.isCleared = true;
          state.heroContext.canProgress = true;
        }
        // Clear monsters after location is cleared
        state.monsters = null;
        // Update location state
        if (state.currentLocation) {
          state.currentLocation.state = 'cleansed';
        }
      })
      .addCase(clearCurrentLocation.rejected, (state, action) => {
        state.clearing = false;
        state.clearError = action.payload;
        state.lastClearResult = {
          success: false,
          error: action.payload
        };
      });
  }
});

// ============================================================
// Exports
// ============================================================

export const {
  clearNavigationState,
  clearNavigationErrors,
  clearMoveResult,
  clearClearResult,
  updateHeroContext
} = navigationSlice.actions;

// Selectors
export const selectCurrentLocation = (state) => state.navigation.currentLocation;
export const selectLocationLoading = (state) => state.navigation.locationLoading;
export const selectLocationError = (state) => state.navigation.locationError;
export const selectConnections = (state) => state.navigation.connections;
export const selectHiddenConnections = (state) => state.navigation.hiddenConnections;
export const selectMonsters = (state) => state.navigation.monsters;
export const selectGate = (state) => state.navigation.gate;
export const selectHeroContext = (state) => state.navigation.heroContext;
export const selectMapData = (state) => state.navigation.mapData;
export const selectMapLoading = (state) => state.navigation.mapLoading;
export const selectIsMoving = (state) => state.navigation.moving;
export const selectMoveError = (state) => state.navigation.moveError;
export const selectLastMoveResult = (state) => state.navigation.lastMoveResult;
export const selectIsClearing = (state) => state.navigation.clearing;
export const selectLastClearResult = (state) => state.navigation.lastClearResult;

export default navigationSlice.reducer;
