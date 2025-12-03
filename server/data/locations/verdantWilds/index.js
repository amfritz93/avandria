/**
 * The Verdant Wilds - Complete Region Export
 * Beast Category, Tier 1 (Easiest)
 * 5 Territories, 44 Sites total
 */

const region = require('./region');
const sunlitGlades = require('./sunlitGlades');
const whisperingThicket = require('./whisperingThicket');
const windsweptPlains = require('./windsweptPlains');
// const stonepawHighlands = require('./stonepawHighlands'); // TODO
// const mistfallCoast = require('./mistfallCoast'); // TODO

module.exports = {
  region,
  territories: {
    sunlitGlades,
    whisperingThicket,
    windsweptPlains,
    // stonepawHighlands,
    // mistfallCoast
  },
  // Flatten all locations for seeding
  getAllLocations: () => [
    region,
    ...sunlitGlades,
    ...whisperingThicket,
    ...windsweptPlains,
    // ...stonepawHighlands,
    // ...mistfallCoast
  ]
};
