import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import heroService from '../services/heroService';
import gameDataService from '../services/gameDataService';

/**
 * Hero Slice
 * Manages hero state including:
 * - List of account's heroes
 * - Currently active hero (selected for play)
 * - Character creation data (species, callings)
 * - Loading and error states
 */

// ============================================================
// Async Thunks
// ============================================================

/**
 * Fetch all heroes for the authenticated account
 */
export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await heroService.getHeroes();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch heroes'
      );
    }
  }
);

/**
 * Fetch a single hero by ID (full details)
 */
export const fetchHero = createAsyncThunk(
  'heroes/fetchHero',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await heroService.getHero(heroId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch hero'
      );
    }
  }
);

/**
 * Create a new hero
 */
export const createHero = createAsyncThunk(
  'heroes/createHero',
  async (heroData, { rejectWithValue }) => {
    try {
      const response = await heroService.createHero(heroData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create hero'
      );
    }
  }
);

/**
 * Delete a hero
 */
export const deleteHero = createAsyncThunk(
  'heroes/deleteHero',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await heroService.deleteHero(heroId);
      return { heroId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete hero'
      );
    }
  }
);

/**
 * Update hero game state
 */
export const saveHero = createAsyncThunk(
  'heroes/saveHero',
  async ({ heroId, updates }, { rejectWithValue }) => {
    try {
      const response = await heroService.updateHero(heroId, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save hero'
      );
    }
  }
);

/**
 * Fetch character creation data (species and callings)
 */
export const fetchCharacterCreationData = createAsyncThunk(
  'heroes/fetchCharacterCreationData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await gameDataService.getCharacterCreationData();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch game data'
      );
    }
  }
);

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // Hero list (for hero selection screen)
  heroes: [],
  heroesLoading: false,
  heroesError: null,

  // Active hero (currently playing)
  activeHero: null,
  activeHeroLoading: false,
  activeHeroError: null,

  // Character creation data
  species: [],
  callings: [],
  creationDataLoading: false,
  creationDataError: null,

  // Operation states
  creating: false,
  createError: null,
  deleting: false,
  deleteError: null,
  saving: false,
  saveError: null
};

// ============================================================
// Slice
// ============================================================

const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    /**
     * Clear active hero (when returning to hero selection)
     */
    clearActiveHero: (state) => {
      state.activeHero = null;
      state.activeHeroError = null;
    },

    /**
     * Clear any error states
     */
    clearErrors: (state) => {
      state.heroesError = null;
      state.activeHeroError = null;
      state.creationDataError = null;
      state.createError = null;
      state.deleteError = null;
      state.saveError = null;
    },

    /**
     * Update active hero's local state (for immediate UI feedback)
     * Used for things like HP/MP changes during combat
     */
    updateActiveHeroLocal: (state, action) => {
      if (state.activeHero) {
        state.activeHero.hero = {
          ...state.activeHero.hero,
          ...action.payload
        };
      }
    },

    /**
     * Reset hero state (on logout)
     */
    resetHeroState: () => initialState
  },

  extraReducers: (builder) => {
    builder
      // ========== Fetch Heroes ==========
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoading = true;
        state.heroesError = null;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoading = false;
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.heroesLoading = false;
        state.heroesError = action.payload;
      })

      // ========== Fetch Single Hero ==========
      .addCase(fetchHero.pending, (state) => {
        state.activeHeroLoading = true;
        state.activeHeroError = null;
      })
      .addCase(fetchHero.fulfilled, (state, action) => {
        state.activeHeroLoading = false;
        state.activeHero = action.payload;
      })
      .addCase(fetchHero.rejected, (state, action) => {
        state.activeHeroLoading = false;
        state.activeHeroError = action.payload;
      })

      // ========== Create Hero ==========
      .addCase(createHero.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.creating = false;
        // Add new hero to the list
        state.heroes.push({
          id: action.payload.hero.id,
          heroName: action.payload.hero.heroName,
          species: action.payload.hero.species,
          speciesName: action.payload.speciesInfo.name,
          calling: action.payload.hero.calling,
          callingName: action.payload.callingInfo.name,
          genderIdentity: action.payload.hero.genderIdentity,
          level: action.payload.hero.level,
          currentSite: action.payload.hero.navigation.currentSite,
          lastPlayedAt: action.payload.hero.lastPlayedAt,
          createdAt: action.payload.hero.createdAt
        });
        // Set as active hero
        state.activeHero = action.payload;
      })
      .addCase(createHero.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // ========== Delete Hero ==========
      .addCase(deleteHero.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.deleting = false;
        // Remove hero from list
        state.heroes = state.heroes.filter(
          hero => hero.id !== action.payload.heroId
        );
        // Clear active hero if deleted
        if (state.activeHero?.hero?.id === action.payload.heroId) {
          state.activeHero = null;
        }
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload;
      })

      // ========== Save Hero ==========
      .addCase(saveHero.pending, (state) => {
        state.saving = true;
        state.saveError = null;
      })
      .addCase(saveHero.fulfilled, (state, action) => {
        state.saving = false;
        // Update active hero with saved data
        if (state.activeHero) {
          state.activeHero.hero = action.payload;
        }
        // Update hero in list
        const heroIndex = state.heroes.findIndex(
          h => h.id === action.payload.id
        );
        if (heroIndex !== -1) {
          state.heroes[heroIndex] = {
            ...state.heroes[heroIndex],
            level: action.payload.level,
            currentSite: action.payload.navigation?.currentSite,
            lastPlayedAt: action.payload.lastPlayedAt
          };
        }
      })
      .addCase(saveHero.rejected, (state, action) => {
        state.saving = false;
        state.saveError = action.payload;
      })

      // ========== Fetch Character Creation Data ==========
      .addCase(fetchCharacterCreationData.pending, (state) => {
        state.creationDataLoading = true;
        state.creationDataError = null;
      })
      .addCase(fetchCharacterCreationData.fulfilled, (state, action) => {
        state.creationDataLoading = false;
        state.species = action.payload.species;
        state.callings = action.payload.callings;
      })
      .addCase(fetchCharacterCreationData.rejected, (state, action) => {
        state.creationDataLoading = false;
        state.creationDataError = action.payload;
      });
  }
});

// ============================================================
// Exports
// ============================================================

export const {
  clearActiveHero,
  clearErrors,
  updateActiveHeroLocal,
  resetHeroState
} = heroSlice.actions;

// Selectors
export const selectHeroes = (state) => state.heroes.heroes;
export const selectHeroesLoading = (state) => state.heroes.heroesLoading;
export const selectActiveHero = (state) => state.heroes.activeHero;
export const selectActiveHeroLoading = (state) => state.heroes.activeHeroLoading;
export const selectSpecies = (state) => state.heroes.species;
export const selectCallings = (state) => state.heroes.callings;
export const selectCreationDataLoading = (state) => state.heroes.creationDataLoading;
export const selectIsCreating = (state) => state.heroes.creating;
export const selectCreateError = (state) => state.heroes.createError;
export const selectIsDeleting = (state) => state.heroes.deleting;
export const selectIsSaving = (state) => state.heroes.saving;

export default heroSlice.reducer;
