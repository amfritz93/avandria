import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import combatService from '../services/combatService';

/**
 * Combat Slice
 * Manages combat state including:
 * - Active combat with monster
 * - Combat log and history
 * - Attack and flee actions
 */

// ============================================================
// Async Thunks
// ============================================================

/**
 * Start combat at current location
 */
export const startCombat = createAsyncThunk(
  'combat/startCombat',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await combatService.startCombat(heroId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to start combat'
      );
    }
  }
);

/**
 * Execute hero attack
 */
export const executeAttack = createAsyncThunk(
  'combat/executeAttack',
  async ({ heroId, abilityId }, { rejectWithValue }) => {
    try {
      const response = await combatService.heroAttack(heroId, abilityId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Attack failed'
      );
    }
  }
);

/**
 * Attempt to flee from combat
 */
export const attemptFlee = createAsyncThunk(
  'combat/attemptFlee',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await combatService.fleeCombat(heroId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Flee failed'
      );
    }
  }
);

/**
 * Get current combat status
 */
export const fetchCombatStatus = createAsyncThunk(
  'combat/fetchStatus',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await combatService.getCombatStatus(heroId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch combat status'
      );
    }
  }
);

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // Combat state
  inCombat: false,
  combatStatus: null, // 'ongoing', 'victory', 'defeat', 'fled'

  // Monster data
  monster: null,

  // Hero combat stats
  heroHP: 0,
  heroMP: 0,
  heroStamina: 0,
  heroMaxHP: 0,
  heroMaxMP: 0,
  heroMaxStamina: 0,

  // Hero abilities
  abilities: [],

  // Combat progress
  round: 0,
  log: [],

  // Rewards (on victory)
  rewards: null,
  worldProgress: null,

  // Level up info (on victory)
  levelUp: null,
  xpProgress: null,

  // Loading states
  starting: false,
  startError: null,
  attacking: false,
  attackError: null,
  fleeing: false,
  fleeError: null,
  loadingStatus: false
};

// ============================================================
// Slice
// ============================================================

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    /**
     * Clear combat state (after viewing results)
     */
    clearCombatState: () => initialState,

    /**
     * Clear error states
     */
    clearCombatErrors: (state) => {
      state.startError = null;
      state.attackError = null;
      state.fleeError = null;
    },

    /**
     * Clear rewards after displaying
     */
    clearRewards: (state) => {
      state.rewards = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // ========== Start Combat ==========
      .addCase(startCombat.pending, (state) => {
        state.starting = true;
        state.startError = null;
      })
      .addCase(startCombat.fulfilled, (state, action) => {
        state.starting = false;
        state.inCombat = true;
        state.combatStatus = 'ongoing';
        state.monster = action.payload.combat.monster;
        state.heroHP = action.payload.combat.heroHP;
        state.heroMP = action.payload.combat.heroMP;
        state.heroStamina = action.payload.combat.heroStamina;
        state.heroMaxHP = action.payload.combat.heroMaxHP || state.heroMaxHP;
        state.heroMaxMP = action.payload.combat.heroMaxMP || state.heroMaxMP;
        state.heroMaxStamina = action.payload.combat.heroMaxStamina || state.heroMaxStamina;
        state.abilities = action.payload.combat.abilities || [];
        state.round = action.payload.combat.round;
        state.log = action.payload.combat.log;
      })
      .addCase(startCombat.rejected, (state, action) => {
        state.starting = false;
        state.startError = action.payload;
      })

      // ========== Execute Attack ==========
      .addCase(executeAttack.pending, (state) => {
        state.attacking = true;
        state.attackError = null;
      })
      .addCase(executeAttack.fulfilled, (state, action) => {
        state.attacking = false;
        const { combat, rewards, worldProgress, levelUp, xpProgress } = action.payload;

        state.combatStatus = combat.status;
        state.monster = combat.monster;
        state.heroHP = combat.heroHP;
        state.heroMP = combat.heroMP || state.heroMP;
        state.heroStamina = combat.heroStamina || state.heroStamina;
        state.round = combat.round;
        state.log = combat.log;

        if (combat.status === 'victory') {
          state.inCombat = false;
          state.rewards = rewards;
          state.worldProgress = worldProgress;
          state.levelUp = levelUp || null;
          state.xpProgress = xpProgress || null;
        } else if (combat.status === 'defeat') {
          state.inCombat = false;
        }
      })
      .addCase(executeAttack.rejected, (state, action) => {
        state.attacking = false;
        state.attackError = action.payload;
      })

      // ========== Attempt Flee ==========
      .addCase(attemptFlee.pending, (state) => {
        state.fleeing = true;
        state.fleeError = null;
      })
      .addCase(attemptFlee.fulfilled, (state, action) => {
        state.fleeing = false;
        const { combat } = action.payload;

        state.combatStatus = combat.status;
        state.round = combat.round;
        state.log = combat.log;

        if (combat.status === 'fled' || combat.status === 'defeat') {
          state.inCombat = false;
        } else {
          state.monster = combat.monster;
          state.heroHP = combat.heroHP;
        }
      })
      .addCase(attemptFlee.rejected, (state, action) => {
        state.fleeing = false;
        state.fleeError = action.payload;
      })

      // ========== Fetch Combat Status ==========
      .addCase(fetchCombatStatus.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(fetchCombatStatus.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.inCombat = action.payload.inCombat;
        if (action.payload.inCombat && action.payload.combat) {
          state.combatStatus = 'ongoing';
          state.monster = action.payload.combat.monster;
          state.heroHP = action.payload.combat.heroHP;
          state.heroMP = action.payload.combat.heroMP;
          state.heroStamina = action.payload.combat.heroStamina;
          state.round = action.payload.combat.round;
          state.log = action.payload.combat.log;
        }
      })
      .addCase(fetchCombatStatus.rejected, (state) => {
        state.loadingStatus = false;
      });
  }
});

// ============================================================
// Exports
// ============================================================

export const {
  clearCombatState,
  clearCombatErrors,
  clearRewards
} = combatSlice.actions;

// Selectors
export const selectInCombat = (state) => state.combat.inCombat;
export const selectCombatStatus = (state) => state.combat.combatStatus;
export const selectMonster = (state) => state.combat.monster;
export const selectHeroCombatHP = (state) => state.combat.heroHP;
export const selectHeroCombatMP = (state) => state.combat.heroMP;
export const selectHeroCombatStamina = (state) => state.combat.heroStamina;
export const selectHeroMaxHP = (state) => state.combat.heroMaxHP;
export const selectHeroMaxMP = (state) => state.combat.heroMaxMP;
export const selectHeroMaxStamina = (state) => state.combat.heroMaxStamina;
export const selectAbilities = (state) => state.combat.abilities;
export const selectCombatRound = (state) => state.combat.round;
export const selectCombatLog = (state) => state.combat.log;
export const selectRewards = (state) => state.combat.rewards;
export const selectWorldProgress = (state) => state.combat.worldProgress;
export const selectLevelUp = (state) => state.combat.levelUp;
export const selectXPProgress = (state) => state.combat.xpProgress;
export const selectIsAttacking = (state) => state.combat.attacking;
export const selectIsFleeing = (state) => state.combat.fleeing;
export const selectIsStartingCombat = (state) => state.combat.starting;
export const selectStartError = (state) => state.combat.startError;
export const selectAttackError = (state) => state.combat.attackError;

export default combatSlice.reducer;
