/**
 * Monster Data Index
 * Exports all monster category data for seeding
 */

const beasts = require('./beasts');
// const humanoids = require('./humanoids'); // TODO: Other regions
// const faerie = require('./faerie');
// const cursed = require('./cursed');
// const constructs = require('./constructs');
// const undead = require('./undead');
// const magicalBeasts = require('./magicalBeasts');
// const celestials = require('./celestials');
// const aberrations = require('./aberrations');
// const dragons = require('./dragons');

module.exports = {
  beasts,
  // humanoids,
  // faerie,
  // cursed,
  // constructs,
  // undead,
  // magicalBeasts,
  // celestials,
  // aberrations,
  // dragons,

  // Get all monsters for seeding
  getAllMonsters: () => [
    ...beasts,
    // ...humanoids,
    // ...faerie,
    // ...cursed,
    // ...constructs,
    // ...undead,
    // ...magicalBeasts,
    // ...celestials,
    // ...aberrations,
    // ...dragons,
  ]
};
