# AVANDRIA
## A Browser-Based Text RPG

**Game Design Document**  
*Built with the MERN Stack*  
*Document Version 5.9 - Living Document*

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Gameplay Flow](#2-gameplay-flow)
3. [Species System](#3-species-system)
4. [Calling System](#4-calling-system)
5. [Combat System](#5-combat-system)
6. [Experience System](#6-experience-system)
7. [Monster System](#7-monster-system)
8. [Map & Locations](#8-map--locations)
9. [Equipment System](#9-equipment-system)
10. [Services System](#10-services-system)
11. [Stat Modifier Summary](#11-stat-modifier-summary)
12. [Data Schemas](#12-data-schemas)
13. [Areas Requiring Development](#13-areas-requiring-development)

---

# 1. Project Overview

## 1.1 Technical Vision

Create a text RPG in the browser using industry-standard technologies for full-stack web development.

### Tech Stack

- **MongoDB** - Database
- **Express.js** - Backend Framework
- **React.js** - Frontend Framework
- **Node.js** - Runtime Environment
- **TailwindCSS** - Styling
- **FontAwesome** - Icons
- **Vite/Vitest** - Build Tool & Testing

### Technical Goals

- Demonstrate React state management and hooks proficiency
- Implement RESTful API design
- Create well-structured, normalized data models
- Design sleek, accessible UI with thematic animations

## 1.2 Game Vision

Create a text-based game heavily inspired by "Choose Your Own Adventure" stories and fantasy RPGs like Dungeons & Dragons and Pathfinder.

### Content Scope

| Content Type | In-Game Term | Target Count |
|--------------|--------------|--------------|
| Playable Races | Species | 12 (Complete) |
| Playable Classes | Callings | 8 (Complete) |
| Places | Locations | 100+ |
| Creatures | Monsters | 150+ |
| Items | Equipment | 100s |
| Business Offerings | Services | 4 Types |

---

# 2. Gameplay Flow

## 2.1 Landing Page

- Title screen with fade in/out animation
- Introduction to the game world
- Leads to: Main Menu

## 2.2 Main Menu

- **New Game** → Character Creation
- **Continue Game** → Past Adventures (Saved Heroes)
- **How to Play** → Instruction Modal
- **Theme Toggle** (Light/Dark Mode)

## 2.3 Character Creation

Players create their hero by selecting:

- Species (from 12 options)
- Calling (from 8 options)
- Gender Identity
- Name

## 2.4 Past Adventures (Save System)

Displays saved heroes with the following information:

- Hero Name, Species, Calling, Level
- Gender Identity
- Last Visited Location
- Option to delete saved heroes

## 2.5 Game Board

The main gameplay screen consists of:

### Hero State Panel

- Current Location with available destinations, monsters, items, and services

### Hero Controls (Rotating Tabs)

- **Statistics:** Name, Species, Calling, Level, Weapon/Damage, Armor/Rating
- **Inventory:** Hero's Equipment
- **Monster Manual:** Discovered/Slain Monsters
- **Map:** Discovered/Undiscovered Locations
- **Skills:** Hero's Skill Tree

---

# 3. Species System

There are 12 playable species, each with unique stat distributions that define their racial strengths and weaknesses.

## 3.1 Base Statistics

All characters have six core statistics:

| Stat | Abbreviation | Description |
|------|--------------|-------------|
| Power | P | Ability to inflict physical harm |
| Toughness | T | Ability to withstand physical harm |
| Brilliance | B | Ability to inflict magical harm |
| Spirit | S | Ability to withstand magical harm |
| Acuity | A | Ability to land attacks (hit chance) |
| Instinct | I | Ability to avoid harm (dodge chance) |

## 3.2 Stat Distribution

Species use an archetype system:
- **Primary (P):** 13
- **Secondary (S):** 10
- **Weakness (W):** 5
- **Neutral:** 8

| Species | Power | Toughness | Brilliance | Spirit | Acuity | Instinct |
|---------|-------|-----------|------------|--------|--------|----------|
| Human | 10 (S) | 8 | 5 (W) | 8 | 13 (P) | 8 |
| Elf | 8 | 5 (W) | 8 | 10 (S) | 13 (P) | 8 |
| Dwarf | 10 (S) | 13 (P) | 8 | 8 | 8 | 5 (W) |
| Gnome | 5 (W) | 8 | 13 (P) | 8 | 10 (S) | 8 |
| Orc | 13 (P) | 10 (S) | 8 | 5 (W) | 8 | 8 |
| Goliath | 10 (S) | 13 (P) | 8 | 8 | 5 (W) | 8 |
| Tiefling | 5 (W) | 8 | 13 (P) | 10 (S) | 8 | 8 |
| Goblin | 5 (W) | 8 | 8 | 10 (S) | 8 | 13 (P) |
| Aarakocra | 13 (P) | 8 | 5 (W) | 8 | 10 (S) | 8 |
| Vulpine | 5 (W) | 8 | 8 | 10 (S) | 13 (P) | 8 |
| Sylvan | 8 | 10 (S) | 8 | 13 (P) | 8 | 5 (W) |
| Sprite | 5 (W) | 8 | 13 (P) | 8 | 10 (S) | 8 |

## 3.3 Species Descriptions

**Human:** Most widespread and adaptable. Fierce drive to overcome challenges through quick wit and resilience.

**Elf:** Graceful, ancient beings of the deep woods. Keen eyesight grants precision; spirit resists magic, but frail in combat.

**Dwarf:** Stout, incredibly hardy masters of stonework and forging. Withstand enormous punishment but lack grace.

**Gnome:** Tiny masters of magic and invention. Devastating casters but lack physical might.

**Orc:** Massive, physically overwhelming brutes. Shatter bone with a blow but vulnerable to spells.

**Goliath:** Towering nomads from mountain peaks. Hardened skin but struggle with fine motor skills.

**Tiefling:** Marked by fiendish heritage. Intuitive dark magic talent at the cost of physical force.

**Goblin:** Small, manic, and surprisingly quick. Survive through evasion but fragile.

**Aarakocra:** Winged humanoids from high skies. Powerful aerial strikes but no magical affinity.

**Vulpine:** Fox-like race with sharp senses and high precision. Evasive but fragile in prolonged fights.

**Sylvan:** Ancient, tree-like beings. Incredible magical resistance but ponderous.

**Sprite:** Diminutive beings of light. Magical powerhouses lacking physical mass.

## 3.4 Species Archetypes Summary

| Species | Primary (13) | Secondary (10) | Weakness (5) |
|---------|--------------|----------------|--------------|
| Human | Acuity | Power | Brilliance |
| Elf | Acuity | Spirit | Toughness |
| Dwarf | Toughness | Power | Instinct |
| Gnome | Brilliance | Acuity | Power |
| Orc | Power | Toughness | Spirit |
| Goliath | Toughness | Power | Acuity |
| Tiefling | Brilliance | Spirit | Power |
| Goblin | Instinct | Spirit | Power |
| Aarakocra | Power | Acuity | Brilliance |
| Vulpine | Acuity | Spirit | Power |
| Sylvan | Spirit | Toughness | Instinct |
| Sprite | Brilliance | Acuity | Power |

## 3.3 Species Starting Resources

Each Species provides a base amount of Gold and Rations at character creation:

| Species | Gold Bonus | Ration Bonus | Rationale |
|---------|------------|--------------|-----------|
| Human | 15 | 5 | Adaptable, well-prepared |
| Elf | 10 | 8 | Woodland foragers |
| Dwarf | 25 | 3 | Wealthy miners, less travel |
| Gnome | 20 | 4 | Inventors, traders |
| Orc | 5 | 10 | Survivalists, poor wealth |
| Goliath | 5 | 12 | Mountain nomads |
| Tiefling | 15 | 5 | Outcasts but resourceful |
| Goblin | 10 | 8 | Scavengers |
| Aarakocra | 5 | 6 | Sky dwellers, minimal possessions |
| Vulpine | 15 | 6 | Clever traders |
| Sylvan | 5 | 15 | One with nature, no need for gold |
| Sprite | 10 | 4 | Tiny, can't carry much |

---

# 4. Calling System

There are 8 playable callings (classes), each providing stat modifiers, weapon/armor specializations, and a unique skill tree.

## 4.1 Calling Descriptions

**Warrior:** The quintessential master of arms. Warriors rely on raw strength and physical training to dominate the front lines, shrugging off damage while delivering forceful, reliable attacks.

**Paladin:** Holy defenders sworn to protect the innocent. Their faith grants them incredible physical and magical fortitude, allowing them to shield allies while delivering righteous, measured justice.

**Hunter:** Apex trackers and ambush specialists. Hunters combine precise aim with knowledge of the land, focusing on landing accurate, debilitating attacks from a distance or exploiting a foe's weakness.

**Rogue:** Masters of stealth, misdirection, and evasion. Rogues survive by being impossible to hit, positioning themselves for deadly backstabs and relying on quick wits over brute force.

**Mage:** Scholars and practitioners of the arcane arts. Mages channel pure magical energy to devastating effect, requiring intense focus to deliver complex spells that bypass physical defenses.

**Priest:** Devoted healers and protectors of the soul. Priests specialize in magical resistance and support, bolstering their allies and using divine energy to mend wounds or ward off magical threats.

**Bard:** Wandering minstrels and inspiring leaders. Bards weave music, poetry, and charisma into powerful magical effects, relying on their captivating stage presence to bolster allies, confuse foes, and turn the tide of battle with a song.

**Druid:** Keepers of the wild and shapeshifting protectors. Druids draw their power from the primal forces of nature, shifting their form to embody animal strength or calling upon the elements to mend life, unleash storms, and enforce the balance of the natural world.

## 4.2 Calling Stat Modifiers

Applied at character creation: Primary (+2), Secondary (+1), Tertiary (+1)

| Calling | Primary +2 | Secondary +1 | Tertiary +1 |
|---------|------------|--------------|-------------|
| Warrior | Power | Toughness | Acuity |
| Paladin | Toughness | Spirit | Power |
| Hunter | Acuity | Instinct | Power |
| Rogue | Instinct | Acuity | Power |
| Mage | Brilliance | Acuity | Spirit |
| Priest | Spirit | Brilliance | Toughness |
| Bard | Spirit | Power | Acuity |
| Druid | Brilliance | Spirit | Instinct |

## 4.3 Weapon & Armor Specialization

Any weapon/armor can be equipped, but only specialized types gain bonus effects.

| Calling | Physical 1 | Physical 2 | Magical | Armor Type |
|---------|------------|------------|---------|------------|
| Warrior | Swords | Maces | Staves | Heavy Armor |
| Paladin | Maces | Axes | Foci | Heavy Armor |
| Hunter | Bows | Daggers | Wands | Medium Armor |
| Rogue | Daggers | Bows | Wands | Medium Armor |
| Druid | Maces | Swords | Staves | Medium Armor |
| Bard | Swords | Daggers | Wands | Light Armor |
| Mage | Daggers | Axes | Staves | Light Armor |
| Priest | Maces | Bows | Foci | Light Armor |

## 4.4 Armor Type Effects

Armor provides both physical (Toughness) and magical (Spirit) defense, where A = armor slot's defense value:

| Armor Type | Toughness Bonus | Spirit Bonus | Instinct Modifier |
|------------|-----------------|--------------|-------------------|
| Heavy Armor | A × 80% | A × 20% | -3 Instinct |
| Medium Armor | A × 50% | A × 50% | -1 Instinct |
| Light Armor | A × 20% | A × 80% | +1 Instinct |

## 4.5 Weapon Precision Effects

| Precision Level | Weapons | Effect |
|-----------------|---------|--------|
| High Precision | Daggers, Bows | +1 Acuity, +1% Crit |
| Average Precision | Swords, Staves, Foci, Maces | +0 Acuity, +0% Crit |
| Low Precision | Axes, Wands | -1 Acuity, -1% Crit |

## 4.6 Level Progression

Heroes start at Level 1 and can reach a maximum of Level 20. Level-ups follow a 3-level cycle:

| Cycle Position | Applies At Levels | Stat Gains |
|----------------|-------------------|------------|
| 1st Level Up | 2, 5, 8, 11, 14, 17, 20 | Primary Stat +2, Neutral Stat +1 |
| 2nd Level Up | 3, 6, 9, 12, 15, 18 | Weakness Stat +2, Neutral Stat +1 |
| 3rd Level Up | 4, 7, 10, 13, 16, 19 | Secondary Stat +2, Neutral Stat +1 |

**Note:** All stat increases use absolute integers (not percentages) to ensure consistent incremental growth.

## 4.7 Skill Tree Structure

Each Calling has a Skill Tree with 6 branches (one per statistic). Each branch has 6 stages:

| Stage | Type | Description |
|-------|------|-------------|
| Stage 1 | Active | Novice: Basic abilities received at character creation (Strike, Spark, Heal, Evade, etc.) |
| Stage 2 | Active | New ability related to branch statistic |
| Stage 3 | Passive | Buff that improves something related to branch statistic |
| Stage 4 | Active | Improved version of the Stage 1 basic ability |
| Stage 5 | Passive | Mastery: New buff improving branch statistic |
| Stage 6 | Active | Heroic: Ultimate ability for the branch |

### Skill Point Economy

Skill Points (SP) are awarded at each level-up, with increasing amounts at higher levels.

#### Stage Costs

| Stage | Type | SP Cost | Description |
|-------|------|---------|-------------|
| Stage 1 | Active (Novice) | 0 SP | Free at character creation |
| Stage 2 | Active | 1 SP | Entry-level upgrade |
| Stage 3 | Passive | 2 SP | First passive buff |
| Stage 4 | Active | 3 SP | Improved basic ability |
| Stage 5 | Passive (Mastery) | 4 SP | Significant investment |
| Stage 6 | Active (Heroic) | 5 SP | Ultimate ability, premium cost |

**Cost to max one branch (Stages 2→6):** 1 + 2 + 3 + 4 + 5 = **15 SP**

**Cost to reach Stage 4:** 1 + 2 + 3 = **6 SP**

#### Total SP Budget

By Level 20, a hero can achieve:
- 2 branches at Stage 6: 2 × 15 = 30 SP
- 4 branches at Stage 4: 4 × 6 = 24 SP
- **Total: 54 SP**

#### SP Distribution by Level Range

| Level Range | Levels | SP per Level | Total SP | Cumulative |
|-------------|--------|--------------|----------|------------|
| Early (2-7) | 6 levels | 2 SP | 12 SP | 12 |
| Mid (8-14) | 7 levels | 3 SP | 21 SP | 33 |
| Late (15-19) | 5 levels | 4 SP | 20 SP | 53 |
| Capstone (20) | 1 level | 1 SP | 1 SP | **54** |

#### Detailed Level-by-Level SP Awards

| Level | SP Awarded | Total SP | Milestone |
|-------|------------|----------|-----------|
| 1 | — | 0 | Character Creation (Stage 1 abilities free) |
| 2 | 2 | 2 | |
| 3 | 2 | 4 | |
| 4 | 2 | 6 | Can max 1 branch to Stage 4 |
| 5 | 2 | 8 | |
| 6 | 2 | 10 | |
| 7 | 2 | 12 | Can max 2 branches to Stage 4 |
| 8 | 3 | 15 | Can max 1 branch to Stage 6 |
| 9 | 3 | 18 | Can max 3 branches to Stage 4 |
| 10 | 3 | 21 | |
| 11 | 3 | 24 | Can max 4 branches to Stage 4 |
| 12 | 3 | 27 | |
| 13 | 3 | 30 | Can max 2 branches to Stage 6 |
| 14 | 3 | 33 | |
| 15 | 4 | 37 | |
| 16 | 4 | 41 | |
| 17 | 4 | 45 | |
| 18 | 4 | 49 | |
| 19 | 4 | 53 | |
| 20 | 1 | **54** | Final SP (target reached exactly) |

#### Design Notes

- Each branch is named "Path of the [Title]" representing a sub-class archetype
- Stage 1 abilities (Basic Abilities) share names across all Callings
- Skill Trees act as player-driven character growth with mechanical benefits disguised behind narrative specialization
- Calling-specific Trainers are scattered throughout the world; players must travel to them to spend Skill Points
- Level 20 awards only 1 SP intentionally—the math lands exactly at 54, creating a "mastery complete" feeling
- Each Hero starts with 1 SP at Character Creation to begin their specialization (mandatory spend)
- Each Calling must have a healing/bandaging ability somewhere in their skill tree

### Basic Abilities (Stage 1 — Universal)

All Callings have access to these 6 Basic Abilities at character creation. They cost 0 resources and are always available.

| Stat | Basic Ability | Purpose | Resource |
|------|---------------|---------|----------|
| Power | Strike | Basic physical attack | Free |
| Toughness | Guard | Basic defensive action | Free |
| Brilliance | Spark | Basic magical attack | Free |
| Spirit | Fortify | Basic magical defense/utility | Free |
| Acuity | Focus | Basic precision/tactical action | Free |
| Instinct | Evade | Basic evasion/reaction action | Free |

### Combat UI Structure

The Combat UI consists of 6 boxes (with small icons) representing the 6 Basic Abilities. As Skill Points are spent and new Active Abilities (Stages 2, 4, and 6) are unlocked, each box becomes a dropdown menu:

**Example: Power Branch (Warrior at Stage 6)**
- Box shows: Strike (dropdown arrow)
- Dropdown contains: Strike → Rending Blow → Execution → Cataclysm

Passives (Stages 3 & 5) do not appear in the dropdown — they are always-on enhancements.

### Skill Tree Path Names by Calling

#### Warrior Paths

| Stat | Path Name |
|------|-----------|
| Power | Path of the Berserker |
| Toughness | Path of the Bulwark |
| Brilliance | Path of the Spellblade |
| Spirit | Path of the Unyielding |
| Acuity | Path of the Weaponmaster |
| Instinct | Path of the Veteran |

#### Paladin Paths

| Stat | Path Name |
|------|-----------|
| Power | Path of the Crusader |
| Toughness | Path of the Aegis |
| Brilliance | Path of Sacred Flame |
| Spirit | Path of the Faithful |
| Acuity | Path of Judgment |
| Instinct | Path of Vigilance |

#### Hunter Paths

| Stat | Path Name |
|------|-----------|
| Power | Path of the Gorilla |
| Toughness | Path of the Rhino |
| Brilliance | Path of the Whale |
| Spirit | Path of the Wolf |
| Acuity | Path of the Owl |
| Instinct | Path of the Hawk |

#### Rogue Paths

| Stat | Path Name |
|------|-----------|
| Power | Path of the Assassin |
| Toughness | Path of Evasion |
| Brilliance | Path of the Trickster |
| Spirit | Path of the Ghost |
| Acuity | Path of the Viper |
| Instinct | Path of Second Sight |

#### Mage Paths

| Stat | Path Name |
|------|-----------|
| Power | Path of Destruction |
| Toughness | Path of Warding |
| Brilliance | Path of the Arcanist |
| Spirit | Path of the Sage |
| Acuity | Path of the Evoker |
| Instinct | Path of Spellbreaking |

#### Priest Paths

| Stat | Path Name |
|------|-----------|
| Power | Path of the Exorcist |
| Toughness | Path of the Martyr |
| Brilliance | Path of the Healer |
| Spirit | Path of the Blessed |
| Acuity | Path of the Mender |
| Instinct | Path of the Judicator |

#### Bard Paths

| Stat | Path Name |
|------|-----------|
| Power | Path of the Warcry |
| Toughness | Path of the Shield Song |
| Brilliance | Path of the Siren |
| Spirit | Path of the Muse |
| Acuity | Path of Mockery |
| Instinct | Path of the Virtuoso |

#### Druid Paths

| Stat | Path Name |
|------|-----------|
| Power | Path of Wildfire |
| Toughness | Path of Stone |
| Brilliance | Path of the Stars |
| Spirit | Path of Spores |
| Acuity | Path of Thorns |
| Instinct | Path of Wildshape |

### Path Summary Table

| Calling | Power | Toughness | Brilliance | Spirit | Acuity | Instinct |
|---------|-------|-----------|------------|--------|--------|----------|
| Warrior | Berserker | Bulwark | Spellblade | Unyielding | Weaponmaster | Veteran |
| Paladin | Crusader | Aegis | Sacred Flame | Faithful | Judgment | Vigilance |
| Hunter | Gorilla | Rhino | Whale | Wolf | Owl | Hawk |
| Rogue | Assassin | Evasion | Trickster | Ghost | Viper | Second Sight |
| Mage | Destruction | Warding | Arcanist | Sage | Evoker | Spellbreaking |
| Priest | Exorcist | Martyr | Healer | Blessed | Mender | Judicator |
| Bard | Warcry | Shield Song | Siren | Muse | Mockery | Virtuoso |
| Druid | Wildfire | Stone | Stars | Spores | Thorns | Wildshape |

## 4.8 Warrior Skill Tree

**Calling Identity:** The quintessential master of arms — raw strength, physical training, front-line dominance.

**Weapon Specializations:** Swords, Maces, Staves
**Armor Type:** Heavy Armor

### Path of the Berserker (Power)

*The Warrior who channels fury into destruction. Every attack is fueled by primal aggression, trading finesse for overwhelming force.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Strike | Active | Free | Basic physical attack (Power vs Toughness) |
| 2 | Rending Blow | Active | 8 Stamina | Attack that applies **Bleeding** on hit |
| 3 | Brutal Force | Passive | — | +3 Power permanently |
| 4 | Crushing Strike | Active | 18 Stamina | Attack at ×1.5 damage; applies **Weakened** on hit |
| 5 | Blood Rage | Passive | — | +15% damage when below 50% HP |
| 6 | Endless Fury | Passive | — | You have 2 Actions per round permanently |

### Path of the Bulwark (Toughness)

*The Warrior who refuses to fall. They are the shield wall, the last line, the immovable object.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Guard | Active | Free | Reduce incoming damage by 25% this turn |
| 2 | Shield Wall | Active | 8 Stamina | Reduce incoming damage by 50% this turn |
| 3 | Thick Skin | Passive | — | +3 Toughness permanently |
| 4 | Second Wind | Active | 18 Stamina | Heal 25% of max HP |
| 5 | Last Stand | Reactive Passive | — | When HP drops below 25%, gain 30% damage reduction for 3 turns (once per combat) |
| 6 | Fortress | Active | 35 Stamina | Reduce incoming damage by 80% for 2 turns; immune to **Prone** and **Rooted** |

### Path of the Spellblade (Brilliance)

*The Warrior who has learned to channel arcane energy through their blade. Their weapon becomes a conduit, their strikes carry elemental fury.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Spark | Active | Free | Basic magical attack (Brilliance vs Spirit) |
| 2 | Flame Blade | Active | 8 Mana | Attack that deals **Fire** damage and applies **Burning** (5 damage/turn, 3 turns) |
| 3 | Arcane Conduit | Passive | — | +3 Brilliance permanently |
| 4 | Elemental Strike | Active | 18 Mana | Attack that deals **Fire** damage at ×1.5; applies **Burning** (8 damage/turn, 3 turns) and **Weakened** |
| 5 | Mana Surge | Passive | — | +15 to Initiative permanently; Spark now deals **Fire** damage |
| 6 | Storm of Steel | Active | 35 Mana | Attack 3 times at ×0.75 damage each; each hit deals **Air** damage and has 25% chance to apply **Dazed** |

### Path of the Unyielding (Spirit)

*The Warrior whose willpower manifests as magical protection. Their determination creates wards, their defiance dispels curses, their spirit rejects harmful magic.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Fortify | Active | Free | Remove one debuff from yourself — *a ward briefly forms around you* |
| 2 | Arcane Ward | Active | 8 Mana | Gain 40% resistance to magical damage for 2 turns |
| 3 | Stubborn Resolve | Passive | — | +3 Spirit permanently |
| 4 | Dispelling Strike | Active | 18 Mana | Attack that removes all buffs from enemy; if enemy had buffs, deal ×1.5 damage |
| 5 | Indomitable | Reactive Passive | — | When a debuff is applied to you, 30% chance to ignore it and heal 10% of max HP |
| 6 | Unbreakable Spirit | Active | 35 Mana | For 3 turns: immune to all debuffs, immune to magical damage, and reflect 25% of magical damage back to attacker |

### Path of the Weaponmaster (Acuity)

*The Warrior as artist. Every movement is efficient, every strike finds its mark. They don't fight enemies — they dismantle them.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Focus | Active | Free | Your next attack has +15% Critical Hit Chance |
| 2 | Precise Strike | Active | 8 Stamina | Attack with +25% Critical Hit Chance |
| 3 | Keen Edge | Passive | — | +3 Acuity permanently |
| 4 | Armor Piercer | Active | 18 Stamina | Attack that ignores 75% of enemy's Toughness |
| 5 | Killing Precision | Passive | — | Your critical hits deal ×2.5 damage instead of ×2 |
| 6 | Deathblow | Active | 35 Stamina | Attack at ×1.5 damage; if target is below 30% HP, instantly defeat them |

### Path of the Veteran (Instinct)

*The Warrior who has survived everything through instinct honed by a thousand battles. Their body reacts before their mind processes the danger.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Evade | Active | Free | +25% chance to dodge the next attack against you |
| 2 | Sidestep | Active | 8 Stamina | +40% chance to dodge attacks this turn |
| 3 | Battle Reflexes | Passive | — | +3 Instinct permanently |
| 4 | Seize Initiative | Active | 18 Stamina | Next round, you act first regardless of Initiative rolls |
| 5 | Riposte | Reactive Passive | — | When an enemy misses an attack against you, automatically counterattack for 50% weapon damage |
| 6 | Untouchable | Active | 35 Stamina | Your next 3 incoming attacks automatically miss; each missed attack triggers Riposte |

### Warrior Skill Tree Summary

| Path | Theme | Damage Types | Status Effects | Key Features |
|------|-------|--------------|----------------|--------------|
| Berserker | Rage/Fury | Physical | Bleeding, Weakened | +1 Action (Stage 6) |
| Bulwark | Defense/Recovery | Physical | — | Healing (Stage 4), Reactive DR (Stage 5) |
| Spellblade | Elemental Magic | Fire, Air | Burning, Weakened, Dazed | Initiative +15 (Stage 5) |
| Unyielding | Mystical Ward | Physical | — | Dispel buffs (Stage 4), Magic immunity (Stage 6) |
| Weaponmaster | Precision/Crits | Physical | — | Execute (Stage 6), Crit ×2.5 (Stage 5) |
| Veteran | Evasion/Counter | Physical | — | Initiative control (Stage 4), Riposte (Stage 5) |

## 4.9 Paladin Skill Tree

**Calling Identity:** Holy warrior — divine protection, righteous might, sacred duty. The Paladin is blessed by higher powers, channeling divine energy through faith.

**Weapon Specializations:** Maces, Axes, Foci
**Armor Type:** Heavy Armor

### Path of the Crusader (Power)

*The Paladin as holy avenger. Every swing is righteous judgment, every blow carries divine weight.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Strike | Active | Free | Basic physical attack (Power vs Toughness) |
| 2 | Smite | Active | 8 Stamina | Attack that applies **Burning** (3 damage/turn, 3 turns) — holy fire |
| 3 | Righteous Fury | Passive | — | +3 Power permanently |
| 4 | Crusader's Blow | Active | 18 Stamina | Attack at ×1.5 damage; applies **Weakened** on hit |
| 5 | Avenging Wrath | Reactive Passive | — | When you take damage, your next attack deals +20% damage |
| 6 | Divine Reckoning | Active | 35 Stamina | Attack at ×2 damage; deals ×2.5 against Undead and Cursed; applies **Prone** |

### Path of the Aegis (Toughness)

*The Paladin as divine shield. Their faith manifests as supernatural resilience granted by higher powers.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Guard | Active | Free | Reduce incoming damage by 25% this turn |
| 2 | Divine Shield | Active | 8 Stamina | Reduce incoming damage by 50% this turn; gain immunity to **Burning** and **Bleeding** |
| 3 | Blessed Constitution | Passive | — | +3 Toughness permanently |
| 4 | Martyr's Sacrifice | Active | 18 Stamina | Take 15% of your max HP as damage; gain 60% damage reduction for 2 turns |
| 5 | Aura of Protection | Passive | — | Permanently take 10% less damage from all sources |
| 6 | Invincible Faith | Active | 35 Stamina | For 2 turns: reduce all incoming damage by 90%; immune to all status effects |

### Path of Sacred Flame (Brilliance)

*The Paladin as conduit of holy fire. Their faith burns so bright it manifests as purifying light that cleanses corruption and mends wounds.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Spark | Active | Free | Basic magical attack (Brilliance vs Spirit) — *manifests as holy light* |
| 2 | Sacred Flame | Active | 8 Mana | Attack that deals **Fire** damage and applies **Burning** (5 damage/turn, 3 turns) |
| 3 | Divine Brilliance | Passive | — | +3 Brilliance permanently |
| 4 | Purifying Fire | Active | 18 Mana | Attack that deals **Fire** damage at ×1.5; removes one buff from enemy; applies **Burning** (8 damage/turn, 3 turns) |
| 5 | Radiant Aura | Passive | — | Your Spark and Sacred Flame abilities now deal **Fire** damage permanently; +10% Fire damage |
| 6 | Cleansing Light | Active | 35 Mana | Attack that deals **Fire** damage at ×1.5; heal 30% of max HP; remove all debuffs from self |

### Path of the Faithful (Spirit)

*The Paladin as divine healer. Their faith is so absolute that it can mend wounds, cure ailments, and restore the spirit.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Fortify | Active | Free | Remove one debuff from yourself through prayer |
| 2 | Lay on Hands | Active | 8 Mana | Heal 30% of max HP |
| 3 | Faithful Heart | Passive | — | +3 Spirit permanently |
| 4 | Divine Restoration | Active | 18 Mana | Heal 50% of max HP; remove all debuffs |
| 5 | Aura of Healing | Passive | — | Heal 5% of max HP at the end of each round |
| 6 | Divine Intervention | Active | 35 Mana | If you would die this combat, instead survive at 50% HP (once per combat) |

### Path of Judgment (Acuity)

*The Paladin as divine inquisitor. They see sin, they see weakness, they see the truth that others hide.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Focus | Active | Free | Your next attack has +15% Critical Hit Chance |
| 2 | Discerning Strike | Active | 8 Stamina | Attack with +25% Critical Hit Chance; deals +50% damage if enemy has any debuffs |
| 3 | Divine Insight | Passive | — | +3 Acuity permanently |
| 4 | Mark of Judgment | Active | 18 Stamina | Attack that applies **Weakened** and **Crippled**; your next attack against this enemy ignores 50% of their defense |
| 5 | Executioner's Eye | Passive | — | Your critical hits deal ×2.5 damage instead of ×2 |
| 6 | Final Judgment | Active | 35 Stamina | Attack at ×1.5 damage; if target is below 35% HP, instantly defeat them |

### Path of Vigilance (Instinct)

*The Paladin as eternal guardian. Always watching, always ready, always prepared to defend.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Evade | Active | Free | +25% chance to dodge the next attack against you |
| 2 | Watchful Eye | Active | 8 Stamina | +30% dodge chance this turn; if you successfully dodge, heal 10% of max HP |
| 3 | Guardian's Instinct | Passive | — | +3 Instinct permanently |
| 4 | Divine Foresight | Active | 18 Mana | Next round, you act first regardless of Initiative; gain +25% dodge for that round |
| 5 | Shield of Faith | Reactive Passive | — | When hit by a critical, reduce the damage by 50% |
| 6 | Guardian's Oath | Passive | — | You have 2 Actions per round permanently |

### Paladin Skill Tree Summary

| Path | Theme | Damage Types | Status Effects | Key Features |
|------|-------|--------------|----------------|--------------|
| Crusader | Holy Smiting | Physical, Fire | Burning, Weakened, Prone | Anti-Undead/Cursed bonus, Reactive damage |
| Aegis | Divine Protection | Physical | — | Martyrdom mechanic, near-immunity |
| Sacred Flame | Holy Fire | Fire | Burning | Buff removal, healing combo |
| Faithful | Divine Healing | — | — | Primary healing path, death-defiance |
| Judgment | Divine Precision | Physical | Weakened, Crippled | Execute (35%), Crit ×2.5 |
| Vigilance | Guardian Reflexes | Physical | — | Dodge-heal synergy, +1 Action (Stage 6) |

## 4.10 Hunter Skill Tree

**Calling Identity:** Wilderness expert — ranged mastery, beast kinship, survival instincts. The Hunter channels the spirits of animals to enhance their abilities.

**Weapon Specializations:** Bows, Daggers, Wands
**Armor Type:** Medium Armor

### Path of the Gorilla (Power)

*The Hunter channeling the gorilla's primal strength. Massive, crushing blows that leave enemies broken.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Strike | Active | Free | Basic physical attack (Power vs Toughness) |
| 2 | Primal Strike | Active | 8 Stamina | Attack at ×1.25 damage; applies **Weakened** on hit |
| 3 | Gorilla's Might | Passive | — | +3 Power permanently |
| 4 | Thunderous Blow | Active | 18 Stamina | Attack at ×1.5 damage; applies **Prone** and **Dazed** on hit |
| 5 | Savage Instinct | Passive | — | +15% damage when enemy is below 50% HP |
| 6 | Primal Rampage | Active | 35 Stamina | Attack at ×2 damage; applies **Bleeding**, **Weakened**, and **Prone** |

### Path of the Rhino (Toughness)

*The Hunter channeling the rhino's legendary resilience. The survivalist Hunter — field medicine, pushing through pain, refusing to fall.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Guard | Active | Free | Reduce incoming damage by 25% this turn |
| 2 | Thick Hide | Active | 8 Stamina | Reduce incoming damage by 40% this turn; gain immunity to **Bleeding** |
| 3 | Rhino's Endurance | Passive | — | +3 Toughness permanently |
| 4 | Field Medicine | Active | 18 Stamina | Heal 25% of max HP; remove **Bleeding** and **Burning** |
| 5 | Unstoppable Charge | Reactive Passive | — | When HP drops below 30%, gain immunity to **Prone**, **Rooted**, and **Crippled** for 3 turns (once per combat) |
| 6 | Rhino's Fortitude | Active | 35 Stamina | Reduce incoming damage by 70% for 2 turns; immune to all movement-impairing effects |

### Path of the Whale (Brilliance)

*The Hunter channeling the whale's ancient wisdom and deep connection to primal waters. Command water and ice through nature's most fundamental element.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Spark | Active | Free | Basic magical attack (Brilliance vs Spirit) — *manifests as primal water* |
| 2 | Tidal Strike | Active | 8 Mana | Attack that deals **Water** damage; 30% chance to apply **Frozen** |
| 3 | Whale's Wisdom | Passive | — | +3 Brilliance permanently |
| 4 | Crushing Depths | Active | 18 Mana | Attack that deals **Water** damage at ×1.5; applies **Frozen** and **Crippled** |
| 5 | Song of the Deep | Passive | — | Your Spark now deals **Water** damage permanently; +10% Water damage |
| 6 | Frozen Torrent | Active | 35 Mana | Attack 3 times at ×0.6 damage each; each hit deals **Water** damage and has 40% chance to apply **Frozen** |

### Path of the Wolf (Spirit)

*The Hunter channeling the wolf's indomitable spirit. Even alone, the Wolf Hunter carries the strength of the pack within them.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Fortify | Active | Free | Remove one debuff from yourself |
| 2 | Wolf's Howl | Active | 8 Mana | Apply **Weakened** to enemy for 3 turns |
| 3 | Pack Spirit | Passive | — | +3 Spirit permanently |
| 4 | Alpha's Presence | Active | 18 Mana | Gain immunity to **Weakened**, **Dazed**, and **Crippled** for 3 turns; +15% damage for duration |
| 5 | Lone Wolf | Reactive Passive | — | When a debuff is applied to you, 25% chance to ignore it and gain +10% damage for 2 turns |
| 6 | Spirit of the Pack | Active | 35 Mana | For 3 turns: immune to all debuffs; heal 8% of max HP at end of each turn; +20% damage |

### Path of the Owl (Acuity)

*The Hunter channeling the owl's piercing sight and deadly precision. Their arrows find their mark with supernatural accuracy.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Focus | Active | Free | Your next attack has +15% Critical Hit Chance |
| 2 | Precise Shot | Active | 8 Stamina | Ranged attack with +25% Critical Hit Chance |
| 3 | Owl's Sight | Passive | — | +3 Acuity permanently |
| 4 | Headshot | Active | 18 Stamina | Ranged attack that ignores 75% of enemy's Toughness; +30% Critical Hit Chance |
| 5 | Predator's Focus | Passive | — | Your critical hits deal ×2.5 damage instead of ×2 |
| 6 | Killshot | Active | 35 Stamina | Ranged attack at ×1.5 damage; if target is below 30% HP, instantly defeat them |

### Path of the Hawk (Instinct)

*The Hunter channeling the hawk's lightning reflexes. Always faster, always first, striking before the enemy knows they're in danger.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Evade | Active | Free | +25% chance to dodge the next attack against you |
| 2 | Quick Shot | Active | 8 Stamina | Ranged attack; if this attack hits, gain +20% dodge chance until your next turn |
| 3 | Hawk's Reflexes | Passive | — | +3 Instinct permanently |
| 4 | Diving Strike | Active | 18 Stamina | Ranged attack at ×1.5 damage; you act first next round regardless of Initiative |
| 5 | Raptor's Grace | Reactive Passive | — | When you successfully dodge an attack, your next attack deals +30% damage |
| 6 | Wings of the Hawk | Passive | — | You have 2 Actions per round permanently |

### Hunter Skill Tree Summary

| Path | Theme | Damage Types | Status Effects | Key Features |
|------|-------|--------------|----------------|--------------|
| Gorilla | Primal Strength | Physical | Weakened, Prone, Dazed, Bleeding | Finishing bonus vs. wounded |
| Rhino | Survival | Physical | — | Healing (Stage 4), movement immunity |
| Whale | Ocean Magic | Water | Frozen, Crippled | Multi-hit freeze, water control |
| Wolf | Pack Spirit | — | Weakened | Debuff immunity, sustained healing |
| Owl | Precision | Physical | — | Execute (30%), Crit ×2.5 |
| Hawk | Speed/Reflexes | Physical | — | +1 Action (Stage 6), dodge-damage synergy |

## 4.11 Rogue Skill Tree

**Calling Identity:** Shadow operative — stealth, assassination, lethal precision, cunning. The Rogue excels at exploiting weaknesses and surviving through guile.

**Weapon Specializations:** Daggers, Bows, Wands
**Armor Type:** Medium Armor

### Path of the Assassin (Power)

*The Rogue as cold, efficient killer. Every strike is calculated to end the fight as quickly as possible.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Strike | Active | Free | Basic physical attack (Power vs Toughness) |
| 2 | Ambush | Active | 8 Stamina | Attack at ×1.5 damage if enemy has any debuff; otherwise ×1.0 |
| 3 | Killer Instinct | Passive | — | +3 Power permanently |
| 4 | Backstab | Active | 18 Stamina | Attack at ×1.75 damage; applies **Bleeding** (8 damage/turn, 3 turns) |
| 5 | Death Mark | Passive | — | Enemies you apply **Bleeding** to take +20% damage from all your attacks |
| 6 | Assassination | Active | 35 Stamina | Attack at ×2 damage; if target is below 40% HP, instantly defeat them |

### Path of Evasion (Toughness)

*The Rogue who survives by never being where the attack lands. Smoke bombs, quick escapes, and the cunning to disappear.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Guard | Active | Free | Reduce incoming damage by 25% this turn |
| 2 | Smoke Bomb | Active | 8 Stamina | Gain +50% dodge chance this turn; remove yourself from enemy targeting (forced miss) |
| 3 | Slippery | Passive | — | +3 Toughness permanently |
| 4 | Vanishing Act | Active | 18 Stamina | Heal 20% of max HP; gain +40% dodge chance for 2 turns |
| 5 | Uncatchable | Passive | — | Permanently take 15% less damage; immune to **Rooted** and **Crippled** |
| 6 | Shadow Step | Active | 35 Stamina | Your next 3 incoming attacks automatically miss; heal 15% of max HP |

### Path of the Trickster (Brilliance)

*The Rogue as master of poison and deception. Coated blades, debilitating toxins, and the knowledge to exploit every weakness.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Spark | Active | Free | Basic magical attack (Brilliance vs Spirit) — *throwing a vial of acid* |
| 2 | Poisoned Blade | Active | 8 Mana | Attack that deals **Poison** damage; applies **Poisoned** (5 damage/turn, 3 turns) |
| 3 | Venomcraft | Passive | — | +3 Brilliance permanently |
| 4 | Toxic Strike | Active | 18 Mana | Attack that deals **Poison** damage at ×1.5; applies **Poisoned** (8 damage/turn, 3 turns) and **Crippled** (3 turns) |
| 5 | Potent Toxins | Passive | — | Your Spark now deals **Poison** damage permanently; enemies you poison take +15% damage from all sources |
| 6 | Venomous Flurry | Active | 35 Mana | Attack 3 times at ×0.6 damage each; each hit deals **Poison** damage and applies **Poisoned** (3 damage/turn, 3 turns) |

### Path of the Ghost (Spirit)

*The Rogue who becomes one with shadow. They slip through defenses, ignore obstacles, and strike from impossible angles.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Fortify | Active | Free | Remove one debuff from yourself |
| 2 | Shadow Veil | Active | 8 Mana | Gain +35% dodge chance for 2 turns; immune to **Dazed** |
| 3 | Ghostly Presence | Passive | — | +3 Spirit permanently |
| 4 | Phase Strike | Active | 18 Mana | Attack that ignores 75% of enemy's Toughness |
| 5 | One with Shadow | Reactive Passive | — | When a debuff is applied to you, 30% chance to become untargetable until your next turn |
| 6 | Wraith Form | Active | 35 Mana | For 2 turns: immune to physical damage; your attacks ignore 50% of enemy defense; immune to all debuffs |

### Path of the Viper (Acuity)

*The Rogue as precision predator. Every attack is surgical, every cut bleeds, every strike brings the target closer to death.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Focus | Active | Free | Your next attack has +15% Critical Hit Chance |
| 2 | Vital Strike | Active | 8 Stamina | Attack with +25% Critical Hit Chance; applies **Bleeding** (5 damage/turn, 3 turns) |
| 3 | Viper's Precision | Passive | — | +3 Acuity permanently |
| 4 | Arterial Cut | Active | 18 Stamina | Attack that applies **Bleeding** (12 damage/turn, 4 turns); if enemy is already Bleeding, deal ×1.5 damage |
| 5 | Surgical Precision | Passive | — | Your critical hits deal ×2.5 damage instead of ×2 |
| 6 | Eviscerate | Active | 35 Stamina | Attack at ×2 damage; applies **Bleeding** (15 damage/turn, 3 turns); if target is below 25% HP, instantly defeat them |

### Path of Second Sight (Instinct)

*The Rogue who sees everything coming. Instinct honed to supernatural sharpness — reading body language, predicting attacks, reacting before conscious thought.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Evade | Active | Free | +25% chance to dodge the next attack against you |
| 2 | Anticipate | Active | 8 Stamina | +40% dodge chance this turn; if you successfully dodge, your next attack has +30% Critical Hit Chance |
| 3 | Sixth Sense | Passive | — | +3 Instinct permanently |
| 4 | Predictive Strike | Active | 18 Stamina | Attack at ×1.5 damage; you act first next round regardless of Initiative |
| 5 | Danger Sense | Reactive Passive | — | When an enemy attack would hit you, 20% chance to automatically dodge and counterattack for 50% weapon damage |
| 6 | Perfect Foresight | Passive | — | You have 2 Actions per round permanently |

### Rogue Skill Tree Summary

| Path | Theme | Damage Types | Status Effects | Key Features |
|------|-------|--------------|----------------|--------------|
| Assassin | Execution | Physical | Bleeding | Execute (40%), Bleeding synergy |
| Evasion | Survival | Physical | — | Healing (Stage 4, 6), damage reduction |
| Trickster | Poison/Debuff | Poison | Poisoned, Crippled | Multi-hit poison, debuff stacking |
| Ghost | Shadow/Phasing | Physical | — | Defense ignore, physical immunity |
| Viper | Bleeding/Crits | Physical | Bleeding | Execute (25%), Crit ×2.5, DoT focus |
| Second Sight | Anticipation | Physical | — | +1 Action (Stage 6), dodge-crit synergy |

## 4.12 Mage Skill Tree

**Calling Identity:** Arcane master — elemental devastation, magical supremacy, pure spellcasting. The Mage commands the fundamental forces of reality through study and willpower.

**Weapon Specializations:** Daggers, Axes, Staves
**Armor Type:** Light Armor

### Path of Destruction (Power)

*The Battle Mage — a spellcaster who channels fire through their weapon to fight in melee. Magic made physical.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Strike | Active | Free | Basic physical attack (Power vs Toughness) — *staff wreathed in flame* |
| 2 | Blazing Strike | Active | 8 Mana | Melee attack that deals **Fire** damage; applies **Burning** (5 damage/turn, 3 turns) |
| 3 | Destructive Power | Passive | — | +3 Power permanently |
| 4 | Immolating Blow | Active | 18 Mana | Melee attack that deals **Fire** damage at ×1.5; applies **Burning** (10 damage/turn, 3 turns) and **Weakened** |
| 5 | Heart of the Inferno | Passive | — | +20% Fire damage permanently; **Burning** you apply lasts 1 additional turn |
| 6 | Inferno | Active | 35 Mana | Melee attack that deals **Fire** damage at ×2.5; applies **Burning** (12 damage/turn, 3 turns), **Prone**, and ignores 50% of Toughness |

### Path of Warding (Toughness)

*The Shielded Mage — layers of magical protection that let them survive the front lines.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Guard | Active | Free | Reduce incoming damage by 25% this turn — *conjures a magical barrier* |
| 2 | Mage Armor | Active | 8 Mana | Reduce incoming damage by 45% this turn; reflect 10% of blocked damage back to attacker |
| 3 | Barrier Mastery | Passive | — | +3 Toughness permanently |
| 4 | Mana Shield | Active | 18 Mana | Reduce incoming damage by 60% for 2 turns; damage is subtracted from Mana before HP |
| 5 | Reactive Barrier | Reactive Passive | — | When you take damage that would reduce you below 50% HP, automatically gain 40% damage reduction for 2 turns (once per combat) |
| 6 | Prismatic Ward | Active | 35 Mana | For 2 turns: reduce all incoming damage by 75%; immune to all status effects; reflect 25% of all damage taken back to attacker |

### Path of the Arcanist (Brilliance)

*The Pure Mage — commanding arcane energy, the fundamental force from which all magic flows.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Spark | Active | Free | Basic magical attack (Brilliance vs Spirit) |
| 2 | Arcane Blast | Active | 8 Mana | Attack that deals **Arcane** damage at ×1.25; cannot be resisted (ignores Arcane resistance) |
| 3 | Arcane Brilliance | Passive | — | +3 Brilliance permanently |
| 4 | Arcane Barrage | Active | 18 Mana | Attack 2 times at ×0.9 damage each; each hit deals **Arcane** damage |
| 5 | Pure Magic | Passive | — | +15% Arcane damage permanently; your Spark deals **Arcane** damage |
| 6 | Arcane Torrent | Active | 35 Mana | Attack 4 times at ×0.65 damage each; each hit deals **Arcane** damage and has 20% chance to apply **Dazed** |

### Path of the Sage (Spirit)

*The Enlightened Mage — mana efficiency, mental clarity, and the wisdom to endure.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Fortify | Active | Free | Remove one debuff from yourself through mental focus |
| 2 | Clarity | Active | 8 Mana | Remove all debuffs from yourself; gain immunity to **Dazed** and **Silenced** for 2 turns |
| 3 | Sage's Wisdom | Passive | — | +3 Spirit permanently |
| 4 | Meditation | Active | 18 Mana | Heal 25% of max HP; restore 20% of max Mana |
| 5 | Enlightened Mind | Passive | — | All spells cost 15% less Mana; heal 3% of max HP at end of each turn |
| 6 | Transcendence | Active | 35 Mana | For 3 turns: immune to all debuffs; spells cost 50% less Mana; heal 10% of max HP at end of each turn |

### Path of the Evoker (Acuity)

*The Precision Caster — focused spells that pierce defenses with surgical efficiency.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Focus | Active | Free | Your next attack has +15% Critical Hit Chance |
| 2 | Focused Blast | Active | 8 Mana | Attack that deals **Air** damage with +25% Critical Hit Chance; applies **Dazed** on critical hit |
| 3 | Evoker's Precision | Passive | — | +3 Acuity permanently |
| 4 | Lightning Bolt | Active | 18 Mana | Attack that deals **Air** damage at ×1.5; ignores 50% of Spirit; +30% Critical Hit Chance |
| 5 | Spell Mastery | Passive | — | Your critical hits with spells deal ×2.5 damage instead of ×2 |
| 6 | Chain Lightning | Active | 35 Mana | Attack 3 times at ×0.75 damage each; each hit deals **Air** damage, has +20% Critical Hit Chance, and applies **Dazed** on crit |

### Path of Spellbreaking (Instinct)

*The Anti-Mage — sensing, disrupting, and shattering enemy magic.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Evade | Active | Free | +25% chance to dodge the next attack against you |
| 2 | Spell Deflection | Active | 8 Mana | +40% chance to dodge magical attacks this turn; if you dodge a spell, deal 25% of its damage back to caster |
| 3 | Arcane Instinct | Passive | — | +3 Instinct permanently |
| 4 | Counterspell | Active | 18 Mana | Enemy's next magical attack deals 50% reduced damage; you deal that reduced amount as **Arcane** damage to them |
| 5 | Mana Disruption | Reactive Passive | — | When hit by a magical attack, the attacker loses 10% of their max Mana and you gain 5% of your max Mana |
| 6 | Spell Shatter | Active | 35 Mana | Remove all buffs from enemy; for 3 turns, enemy's magical attacks deal 50% reduced damage and you reflect 30% of magical damage taken |

### Mage Skill Tree Summary

| Path | Theme | Damage Types | Status Effects | Key Features |
|------|-------|--------------|----------------|--------------|
| Destruction | Battle Mage | Fire | Burning, Weakened, Prone | Fire melee, DoT extension |
| Warding | Magical Shields | — | — | Damage reflection, Mana Shield |
| Arcanist | Pure Arcane | Arcane | Dazed | Multi-hit arcane, ignores resistance |
| Sage | Enlightenment | — | — | Healing (Stage 4), mana efficiency, sustain |
| Evoker | Lightning Precision | Air | Dazed, Silenced | Crit ×2.5, defense penetration |
| Spellbreaking | Anti-Magic | Arcane | — | Spell reflection, buff removal, mana drain |

## 4.13 Priest Skill Tree

**Calling Identity:** Divine conduit — holy healing, spiritual warfare, sacred protection. The Priest is the quintessential healer, channeling divine power through prayer and devotion.

**Weapon Specializations:** Maces, Bows, Foci
**Armor Type:** Light Armor

### Path of the Exorcist (Power)

*The Priest who wields their blessed mace against the forces of darkness. Each blow disrupts evil essence and banishes corruption through sacred impact.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Strike | Active | Free | Basic physical attack (Power vs Toughness) — *mace blessed with holy light* |
| 2 | Blessed Weapon | Active | 8 Stamina | Physical attack; heal 15% of damage dealt as HP |
| 3 | Righteous Strength | Passive | — | +3 Power permanently |
| 4 | Banishing Blow | Active | 18 Stamina | Physical attack at ×1.5 damage; applies **Weakened** (3 turns); deals ×2 damage against Undead and Cursed |
| 5 | Scourge of Darkness | Passive | — | +25% damage against Undead and Cursed permanently; your attacks against Undead and Cursed cannot miss |
| 6 | Exorcism | Active | 35 Stamina | Physical attack at ×1.5 damage; removes all buffs from enemy; deals ×3 damage against Undead and Cursed |

### Path of the Martyr (Toughness)

*The Priest who endures through sacred suffering. Their faith transforms pain into power — each wound becomes a testament to their devotion.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Guard | Active | Free | Reduce incoming damage by 25% this turn — *brace with blessed shield* |
| 2 | Shield of Devotion | Active | 8 Stamina | Reduce incoming damage by 50% this turn; if you take damage, heal 10% of max HP |
| 3 | Enduring Faith | Passive | — | +3 Toughness permanently |
| 4 | Pain into Power | Active | 18 Stamina | Take 20% of your max HP as damage; your attacks deal +40% damage for 3 turns |
| 5 | Blessed Suffering | Reactive Passive | — | When you take damage, heal 10% of the damage taken; when below 25% HP, heal 20% instead |
| 6 | Resurrection | Active | 35 Stamina | If you would die this combat, instead survive at 75% HP (once per combat) |

### Path of the Healer (Brilliance)

*The Priest in their purest form — THE divine healer. Channeling sacred light, they restore life where there was none.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Spark | Active | Free | Basic magical attack (Brilliance vs Spirit) — *beam of holy light* |
| 2 | Healing Prayer | Active | 8 Mana | Heal 40% of max HP |
| 3 | Divine Gift | Passive | — | +3 Brilliance permanently |
| 4 | Greater Healing | Active | 18 Mana | Heal 65% of max HP; remove all debuffs |
| 5 | Wellspring of Life | Passive | — | All your healing abilities restore an additional 15% HP; heal 5% of max HP at end of each turn |
| 6 | Channel Divinity | Active | 35 Mana | Heal 80% of max HP; remove all debuffs; gain 40% damage reduction for 2 turns |

### Path of the Blessed (Spirit)

*The Priest as conduit of divine blessings. They grant sacred protection from curses, resist dark magic, and channel divine favor.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Fortify | Active | Free | Remove one debuff from yourself through prayer |
| 2 | Sacred Blessing | Active | 8 Mana | Gain immunity to **Weakened**, **Dazed**, and **Crippled** for 3 turns |
| 3 | Divine Favor | Passive | — | +3 Spirit permanently |
| 4 | Greater Blessing | Active | 18 Mana | Gain immunity to all debuffs for 3 turns; +20% damage for duration |
| 5 | Hallowed Presence | Passive | — | Permanently take 15% less magical damage; immune to **Silenced** |
| 6 | Eternal Grace | Passive | — | Permanently immune to **Weakened**, **Dazed**, and **Silenced**; heal 4% of max HP at end of each turn |

### Path of the Mender (Acuity)

*The Priest as surgical healer — precise restoration targeting exactly what needs healing.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Focus | Active | Free | Your next attack has +15% Critical Hit Chance |
| 2 | Triage | Active | 8 Mana | If below 50% HP, heal 45% of max HP. If above 50% HP, heal 25% of max HP and gain +20% damage for 2 turns |
| 3 | Healer's Insight | Passive | — | +3 Acuity permanently |
| 4 | Surgical Restoration | Active | 18 Mana | Heal 45% of max HP; remove all debuffs; if you had any debuffs, heal an additional 20% HP |
| 5 | Critical Care | Passive | — | When you heal yourself, 25% chance to heal an additional 50% of the amount |
| 6 | Master Healer | Passive | — | All your healing abilities heal an additional 30%; immune to **Weakened** and **Crippled** |

### Path of the Judicator (Instinct)

*The Priest as divine judge — watching, waiting, and striking evil when the moment is right.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Evade | Active | Free | +25% chance to dodge the next attack against you |
| 2 | Vigilant Prayer | Active | 8 Mana | +35% dodge chance this turn; if you successfully dodge, heal 15% of max HP |
| 3 | Divine Awareness | Passive | — | +3 Instinct permanently |
| 4 | Righteous Judgment | Active | 18 Mana | Attack that deals **Fire** damage at ×1.5; if enemy attacked you last turn, deal ×2 instead and apply **Dazed** |
| 5 | Shield of Judgment | Reactive Passive | — | When hit by a critical, reduce the damage by 50% and your next attack deals +40% damage |
| 6 | Holy Absolution | Active | 35 Mana | Heal 40% of max HP; deal **Fire** damage equal to HP healed to enemy; remove all debuffs from self |

### Priest Skill Tree Summary

| Path | Theme | Damage Types | Status Effects | Key Features |
|------|-------|--------------|----------------|--------------|
| Exorcist | Holy Warfare | Physical | Weakened | Anti-Undead/Cursed specialist (×3 damage), buff removal |
| Martyr | Self-Sacrifice | Physical | — | HP sacrifice for power, death-defiance (75%) |
| Healer | Divine Healing | — | — | PRIMARY HEALING (40%/65%/80%), HoT passive |
| Blessed | Divine Blessings | — | — | Debuff immunity, permanent immunities + HoT |
| Mender | Precision Healing | — | — | Conditional healing, +30% healing passive |
| Judicator | Divine Judgment | Fire | Dazed, Burning | Dodge-heal synergy, damage-heal combo |

## 4.14 Druid Skill Tree

**Calling Identity:** Nature's avatar — primal magic, elemental harmony, shapeshifting, the cycle of life and death. The Druid channels the raw power of the natural world.

**Weapon Specializations:** Maces, Swords, Staves
**Armor Type:** Medium Armor

### Path of Wildfire (Power)

*The Druid who channels nature's cleansing fire through physical strikes. Each blow ignites, each swing spreads the purifying flame.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Strike | Active | Free | Basic physical attack (Power vs Toughness) — *weapon wreathed in primal flame* |
| 2 | Flame Lash | Active | 8 Mana | Melee attack that deals **Fire** damage; applies **Burning** (5 damage/turn, 3 turns) |
| 3 | Heart of Flame | Passive | — | +3 Power permanently |
| 4 | Wildfire Burst | Active | 18 Mana | Melee attack that deals **Fire** damage at ×1.5; applies **Burning** (8 damage/turn, 3 turns) and **Weakened** |
| 5 | Ashen Renewal | Passive | — | +20% Fire damage permanently; when you apply **Burning**, heal 5% of your max HP |
| 6 | Conflagration | Active | 35 Mana | Melee attack that deals **Fire** damage at ×2; applies **Burning** (12 damage/turn, 4 turns), **Prone**, and **Weakened** |

### Path of Stone (Toughness)

*The Druid who becomes one with the earth itself. Stone doesn't break — it endures.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Guard | Active | Free | Reduce incoming damage by 25% this turn — *skin hardens to stone* |
| 2 | Stone Skin | Active | 8 Mana | Reduce incoming damage by 45% this turn; gain immunity to **Prone** and **Crippled** |
| 3 | Mountain's Endurance | Passive | — | +3 Toughness permanently |
| 4 | Earthen Shield | Active | 18 Mana | Reduce incoming damage by 55% for 2 turns; attackers who hit you take **Earth** damage equal to 15% of your Toughness |
| 5 | Rooted Stance | Passive | — | Permanently take 12% less physical damage; immune to **Prone** |
| 6 | Aspect of Stone | Active | 35 Mana | For 2 turns: reduce all incoming damage by 70%; immune to all movement-impairing effects; attackers take **Earth** damage equal to 25% of your Toughness and are **Rooted** for 1 turn |

### Path of Stars (Brilliance)

*The Druid who communes with the celestial sphere. The stars are ancient, their light carries wisdom from the beginning of time.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Spark | Active | Free | Basic magical attack (Brilliance vs Spirit) — *beam of starlight* |
| 2 | Moonbeam | Active | 8 Mana | Attack that deals **Arcane** damage at ×1.25; applies **Dazed** on critical hit |
| 3 | Celestial Wisdom | Passive | — | +3 Brilliance permanently |
| 4 | Lunar Strike | Active | 18 Mana | Attack that deals **Arcane** damage at ×1.5; applies **Dazed** (2 turns) and **Silenced** (2 turns) |
| 5 | Starlight Blessing | Passive | — | +15% Arcane damage permanently; your Spark now deals **Arcane** damage and heals you for 10% of damage dealt |
| 6 | Wrath of the Cosmos | Active | 35 Mana | Attack 3 times at ×0.7 damage each; each hit deals **Arcane** damage and has 30% chance to apply **Dazed** |

### Path of Spores (Spirit)

*The Druid who embraces the cycle of decay and renewal. Spores are everywhere — in death, they bring new life.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Fortify | Active | Free | Remove one debuff from yourself — *the fungal network cleanses you* |
| 2 | Fungal Growth | Active | 8 Mana | Heal 30% of max HP; apply **Poisoned** (5 damage/turn, 2 turns) to enemy |
| 3 | Spore Cloud | Passive | — | +3 Spirit permanently |
| 4 | Decomposition | Active | 18 Mana | Attack that deals **Poison** damage at ×1.25; applies **Poisoned** (8 damage/turn, 3 turns) and **Crippled** for 3 turns; heal 20% of max HP |
| 5 | Symbiotic Network | Passive | — | When you take damage, heal 8% of the damage taken; when you deal **Poison** damage, heal 10% of damage dealt |
| 6 | Cycle of Decay | Active | 35 Mana | Attack that deals **Poison** damage at ×1.5; applies **Poisoned** (10 damage/turn, 4 turns); heal 50% of max HP; for 3 turns, heal 8% of max HP at end of each turn |

### Path of Thorns (Acuity)

*The Druid who commands the piercing growth of nature. Thorns, vines, and roots — nature's weapons that strike with surgical precision.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Focus | Active | Free | Your next attack has +15% Critical Hit Chance |
| 2 | Thorn Strike | Active | 8 Mana | Attack that deals **Earth** damage with +25% Critical Hit Chance; applies **Rooted** on critical hit |
| 3 | Piercing Growth | Passive | — | +3 Acuity permanently |
| 4 | Entangling Vines | Active | 18 Mana | Attack that deals **Earth** damage at ×1.5; applies **Rooted** (2 turns) and **Crippled** (3 turns) |
| 5 | Nature's Precision | Passive | — | Your critical hits deal ×2.5 damage instead of ×2; enemies you **Root** take +15% damage from all sources |
| 6 | Overgrowth | Active | 35 Mana | Attack that deals **Earth** damage at ×2; applies **Rooted** (3 turns), **Crippled** (3 turns), and **Prone** |

### Path of Wildshape (Instinct)

*The Druid who shifts between animal forms. Bear for resilience, Cat for agility, and the ultimate Dire Form for primal dominance.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Evade | Active | Free | +25% chance to dodge the next attack against you |
| 2 | Bear Form | Active | 8 Stamina | Physical attack at ×1.0 damage; gain 30% damage reduction until your next turn |
| 3 | Primal Instinct | Passive | — | +3 Instinct permanently |
| 4 | Cat Form | Active | 18 Stamina | Physical attack at ×1.5 damage; gain +40% dodge chance for 2 turns |
| 5 | Wild Senses | Reactive Passive | — | When you successfully dodge an attack, your next attack deals +35% damage and has +20% Critical Hit Chance |
| 6 | Dire Form | Active | 35 Stamina | For 3 turns: +40% dodge chance; +30% damage; your attacks apply **Bleeding** (5 damage/turn, 3 turns); each successful dodge lets you counterattack for 40% weapon damage |

### Druid Skill Tree Summary

| Path | Theme | Damage Types | Status Effects | Key Features |
|------|-------|--------------|----------------|--------------|
| Wildfire | Cleansing Fire | Fire | Burning, Weakened, Prone | Fire melee, heal on Burn application |
| Stone | Earth Defense | Earth | Rooted | Damage reflection, physical DR, immunity stack |
| Stars | Celestial Magic | Arcane | Dazed, Silenced | Multi-hit arcane, sustain through Spark |
| Spores | Decay/Renewal | Poison | Poisoned, Crippled | PRIMARY HEALING (30%+20%+50%), life steal |
| Thorns | Plant Precision | Earth | Rooted, Crippled, Prone | Crit ×2.5, damage bonus vs. Rooted |
| Wildshape | Shapeshifting | Physical | Bleeding | Bear/Cat/Dire forms, dodge-counterattack |

## 4.15 Bard Skill Tree

**Calling Identity:** Musical magician — performance magic, inspiring allies, demoralizing foes, sonic attacks, quick wit and charm. The Bard uses music, words, and performance as weapons.

**Weapon Specializations:** Swords, Daggers, Wands
**Armor Type:** Light Armor

### Path of the Warcry (Power)

*The Bard as battlefield commander. War cries that strike fear, battle hymns that empower strikes, and shouts that shatter enemy resolve.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Strike | Active | Free | Basic physical attack (Power vs Toughness) — *blade strike punctuated by a battle cry* |
| 2 | Intimidating Shout | Active | 8 Stamina | Physical attack at ×1.25 damage; applies **Weakened** for 2 turns |
| 3 | Voice of War | Passive | — | +3 Power permanently |
| 4 | Battle Hymn | Active | 18 Stamina | Physical attack at ×1.5 damage; gain +25% damage for 2 turns; applies **Dazed** |
| 5 | Deafening Roar | Passive | — | Your attacks that apply **Weakened** or **Dazed** also reduce enemy damage by 15% for the duration |
| 6 | Warsong | Active | 35 Stamina | Physical attack at ×2 damage; applies **Weakened**, **Dazed**, and **Prone**; gain +30% damage for 3 turns |

### Path of the Shield Song (Toughness)

*The Bard who sings protective melodies. Notes that deflect blows, harmonies that absorb damage, and refrains that keep them standing.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Guard | Active | Free | Reduce incoming damage by 25% this turn — *a protective melody hums around you* |
| 2 | Defensive Melody | Active | 8 Mana | Reduce incoming damage by 45% this turn; if you take damage, the attacker is **Dazed** for 1 turn |
| 3 | Harmonious Defense | Passive | — | +3 Toughness permanently |
| 4 | Song of Restoration | Active | 18 Mana | Heal 25% of max HP; gain 40% damage reduction for 2 turns |
| 5 | Enduring Refrain | Passive | — | Permanently take 12% less damage; heal 3% of max HP at end of each turn |
| 6 | Crescendo of Protection | Active | 35 Mana | For 2 turns: reduce all incoming damage by 65%; immune to **Dazed** and **Silenced**; attackers take **Air** damage equal to 20% of your Spirit and are **Dazed** for 1 turn |

### Path of the Siren (Brilliance)

*The Bard as sonic spellcaster. Their voice IS magic — notes that shatter stone, melodies that pierce the mind, sound as a weapon.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Spark | Active | Free | Basic magical attack (Brilliance vs Spirit) — *a sharp note of sonic energy* |
| 2 | Sonic Blast | Active | 8 Mana | Attack that deals **Air** damage at ×1.25; applies **Dazed** on critical hit |
| 3 | Perfect Pitch | Passive | — | +3 Brilliance permanently |
| 4 | Shatter | Active | 18 Mana | Attack that deals **Air** damage at ×1.5; applies **Dazed** (2 turns) and **Silenced** (2 turns) |
| 5 | Resonance | Passive | — | +15% Air damage permanently; your Spark now deals **Air** damage; enemies you **Silence** take +15% damage from all sources |
| 6 | Cacophony | Active | 35 Mana | Attack 3 times at ×0.7 damage each; each hit deals **Air** damage and applies **Dazed**; final hit also applies **Silenced** (2 turns) |

### Path of the Muse (Spirit)

*The Bard as inspiring healer. Songs that restore hope, mend wounds of the spirit, and lift the fallen back to their feet.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Fortify | Active | Free | Remove one debuff from yourself — *a cleansing note dispels the ailment* |
| 2 | Inspiring Melody | Active | 8 Mana | Heal 30% of max HP; gain +15% damage for 2 turns |
| 3 | Muse's Gift | Passive | — | +3 Spirit permanently |
| 4 | Song of Renewal | Active | 18 Mana | Heal 50% of max HP; remove all debuffs; gain immunity to debuffs for 2 turns |
| 5 | Endless Inspiration | Passive | — | All your healing abilities restore an additional 10% HP; heal 4% of max HP at end of each turn |
| 6 | Magnum Opus | Active | 35 Mana | Heal 70% of max HP; remove all debuffs; for 3 turns: +25% damage, +20% damage reduction, heal 5% of max HP at end of each turn |

### Path of Mockery (Acuity)

*The Bard as vicious wit. Words cut deeper than swords when delivered with precision. The master of cutting words.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Focus | Active | Free | Your next attack has +15% Critical Hit Chance |
| 2 | Vicious Mockery | Active | 8 Mana | Attack that deals **Air** damage with +25% Critical Hit Chance; applies **Weakened** on hit |
| 3 | Razor Wit | Passive | — | +3 Acuity permanently |
| 4 | Cutting Words | Active | 18 Mana | Attack that deals **Air** damage at ×1.5; applies **Weakened** (3 turns) and **Dazed** (2 turns); enemy's next attack deals 30% reduced damage |
| 5 | Devastating Critique | Passive | — | Your critical hits deal ×2.5 damage instead of ×2; enemies affected by your debuffs take +10% damage from all sources |
| 6 | Killing Joke | Active | 35 Mana | Attack that deals **Air** damage at ×2; applies **Weakened**, **Dazed**, and **Silenced** (all 3 turns); if target is below 25% HP, instantly defeat them |

### Path of the Virtuoso (Instinct)

*The Bard as lightning-fast performer. Fingers fly across strings, feet dance between attacks, wit fires faster than thought.*

| Stage | Name | Type | Cost | Effect |
|-------|------|------|------|--------|
| 1 | Evade | Active | Free | +25% chance to dodge the next attack against you |
| 2 | Quick Step | Active | 8 Stamina | Physical attack at ×1.0 damage; gain +35% dodge chance until your next turn; if you dodge before your next turn, your next attack deals +25% damage |
| 3 | Fleet Fingers | Passive | — | +3 Instinct permanently |
| 4 | Tempo Change | Active | 18 Stamina | Physical attack at ×1.5 damage; you act first next round regardless of Initiative; gain +25% dodge chance for that round |
| 5 | Improvisation | Reactive Passive | — | When you successfully dodge an attack, immediately counterattack for 40% weapon damage |
| 6 | Encore | Active | 35 Stamina | For 3 turns: +50% dodge chance; +25% damage; each successful dodge grants an additional attack at 50% weapon damage |

### Bard Skill Tree Summary

| Path | Theme | Damage Types | Status Effects | Key Features |
|------|-------|--------------|----------------|--------------|
| Warcry | Battle Shouts | Physical | Weakened, Dazed, Prone | Debuff + self-buff combo, enhanced debuff passive |
| Shield Song | Protective Melodies | Air | Dazed | Healing (Stage 4), Air damage reflection, HoT passive |
| Siren | Sonic Attacks | Air | Dazed, Silenced | Multi-hit Air, Silence synergy damage |
| Muse | Inspiring Healing | — | — | PRIMARY HEALING (30%/50%/70%), heal + buff combo |
| Mockery | Cutting Words | Air | Weakened, Dazed, Silenced | Execute (25%), Crit ×2.5, debuff synergy |
| Virtuoso | Speed/Performance | Physical | — | Dodge-counterattack, Encore ultimate |

## 4.16 Calling Starting Resources

Each Calling provides a base amount of Gold and Rations at character creation:

| Calling | Gold Bonus | Ration Bonus | Rationale |
|---------|------------|--------------|-----------|
| Warrior | 10 | 8 | Soldier's pay, military rations |
| Paladin | 15 | 6 | Church funding |
| Hunter | 5 | 12 | Lives off the land |
| Rogue | 20 | 5 | Stolen goods |
| Mage | 15 | 4 | Academic stipend |
| Priest | 10 | 6 | Temple support |
| Bard | 15 | 5 | Performance income |
| Druid | 5 | 10 | Nature provides |

**Starting Resources Formula:**
```
Starting Gold = Species Gold Bonus + Calling Gold Bonus
Starting Rations = Species Ration Bonus + Calling Ration Bonus
```

## 4.17 Calling Starting Inventory

Each Calling begins with unique starting items based on RPG archetypes:

| Calling | Flavor Items | Consumables |
|---------|--------------|-------------|
| Warrior | Soldier's Badge, Whetstone | 2× Lesser Health Elixir |
| Paladin | Holy Symbol, Bandages | 2× Lesser Health Elixir |
| Hunter | Worn Map Fragment, Snare Wire | 1× Lesser Health Elixir, 1× Lockpick |
| Rogue | Thieves' Tools, Loaded Dice | 1× Lesser Health Elixir, 3× Lockpick |
| Mage | Spell Component Pouch, Candle | 2× Lesser Mana Elixir |
| Priest | Prayer Beads, Incense | 1× Lesser Health Elixir, 1× Lesser Mana Elixir |
| Bard | Worn Songbook, Flask of Wine | 1× Lesser Health Elixir, 1× Lesser Mana Elixir |
| Druid | Herb Pouch, Seed Bundle | 1× Lesser Health Elixir, 1× Antidote |

**Notes:**
- Flavor Items are narrative junk (sellable for small amounts of gold)
- Rogues receive extra Lockpicks (fits archetype)
- Hunters receive one Lockpick (explorer archetype)
- Mages focus on Mana Elixirs
- Druids receive an Antidote (nature healer archetype)

---

# 5. Combat System

## 5.1 Vitality Statistics

| Stat | Formula | Properties |
|------|---------|------------|
| Hit Points (HP) | maxHP = 10 + (Toughness × 3) | currHP, maxHP |
| Mana Points (MP) | maxMP = 10 + (Spirit × 3) | currMP, maxMP |
| Stamina Points (SP) | maxSP = Toughness × 5 | currSP, maxSP |
| Critical Hit Chance | Effective CRIT = (Effective Acuity × 1.8%) + Weapon CRIT mod | crit % |

### Stamina System

Stamina is the physical resource for non-magical abilities. It limits ability spam and creates tactical resource management.

**Maximum Stamina Examples:**

| Toughness | Max Stamina |
|-----------|-------------|
| 8 | 40 |
| 10 | 50 |
| 12 | 60 |
| 15 | 75 |
| 20 | 100 |

**Stamina Recovery Per Turn:** 5 + (Toughness ÷ 5), rounded down

| Toughness | Recovery/Turn |
|-----------|---------------|
| 8 | 6 |
| 10 | 7 |
| 12 | 7 |
| 15 | 8 |
| 20 | 9 |

**Stamina Costs by Ability Stage:**

| Stage | Ability Type | Stamina Cost |
|-------|--------------|--------------|
| Stage 1 | Basic Ability | 0 (free) |
| Stage 2 | Active Ability | 8 |
| Stage 4 | Active Ability | 18 |
| Stage 6 | Ultimate Ability | 35 |

**Which Branches Use Which Resource:**

| Branch | Resource | Rationale |
|--------|----------|-----------|
| Power | Stamina | Physical offensive actions |
| Toughness | Stamina | Physical defensive actions |
| Brilliance | Mana | Magical abilities |
| Spirit | Mana | Magical/spiritual abilities |
| Acuity | Stamina | Precision physical techniques |
| Instinct | Stamina | Reactive physical abilities |

**Full Recovery:** Rest at Inn restores HP, MP, and Stamina to maximum.

## 5.2 Attack Resolution

| Attack Type | Attacking Stat | Defensive Stat | Hit/Dodge |
|-------------|----------------|----------------|-----------|
| Physical | Power | Toughness | Acuity / Instinct |
| Magical | Brilliance | Spirit | Acuity / Instinct |

## 5.3 Hit Chance Formula

**Hit Chance Percentage (HCP)** = 50 + (3 × Attacker Acuity) - (3 × Target Instinct)

- System generates d100 (random 1-100)
- If d100 ≤ HCP, the attack hits
- HCP is capped between 5% (minimum) and 95% (maximum)
- Critical hits can only occur if the attack first hits the target

## 5.4 Combat System Components

| Component | Description |
|-----------|-------------|
| Turn Order/Loop | Determines who acts next; handles 1 vs. Many scenarios |
| Action Command | Player/AI selects action (Attack Physical, Second Wind, etc.) |
| Attack Object | Contains damage_type, attacker_stat, target_stat properties |
| Hit Check | Uses d100 formula to determine if damage applies |
| CRIT Check | Uses Acuity formula to determine damage multiplier |
| Damage Function | Applies final damage; handles self-heals and multi-target |

## 5.5 Initiative & Action Economy

### Initiative System

Initiative determines turn order in combat. Higher Initiative acts first.

**Initiative Formula:** d100 + (Instinct × 2)

| Instinct | Bonus | Roll Range |
|----------|-------|------------|
| 8 | +16 | 17-116 |
| 12 | +24 | 25-124 |
| 16 | +32 | 33-132 |
| 20 | +40 | 41-140 |

**Initiative Rules:**

| Rule | Description |
|------|-------------|
| When Rolled | Once at combat start (persists entire fight) |
| Tie Breaker | Hero acts first |
| Modifiers | Some abilities grant permanent Initiative bonuses |
| Override | Some abilities allow acting first regardless of roll |

### Action Economy

Each combatant gets **1 Action** per round of combat.

**Action Types:**
- Use any Active Ability (Strike, Guard, Spark, etc.)
- Use a Consumable (Elixir, Draught, Antidote)
- Attempt to Flee

**Extra Actions:** Some Stage 6 abilities grant 2 Actions per round permanently. This is reserved for select Callings (Warrior, Paladin, Hunter, Rogue) on narratively appropriate Paths.

### Ability Categories

| Category | Description | UI Dropdown |
|----------|-------------|-------------|
| Active | Used on your turn, costs your 1 Action | Yes |
| Passive | Always on, no action required | No |
| Reactive Passive | Passive that triggers automatically on specific conditions | No |

**Reactive Passives** are a subset of Passives with conditional triggers. They happen automatically without player input.

*Examples:*
- Riposte: When enemy misses, automatically counterattack
- Last Stand: When HP drops below 25%, gain damage reduction
- Indomitable: When debuff applied, chance to ignore and heal

### Combat Flow

```
COMBAT START
│
├── Both combatants roll Initiative (d100 + Instinct × 2)
│   └── Higher result acts first for entire combat
│
└── ROUND LOOP
    │
    ├── FAST COMBATANT'S TURN
    │   └── Takes 1 Action (or 2 with Extra Action ability)
    │
    ├── SLOW COMBATANT'S TURN
    │   └── Takes 1 Action
    │   └── Reactive Passives may trigger
    │
    └── End of Round
        ├── Status effects tick (Bleeding, Burning, etc.)
        ├── Draughts tick (buffs expire)
        ├── Stamina/Mana recovery
        └── Check for combat end (death, flee)
```

## 5.6 Effective Stats (Equipment Applied)

- **Effective Toughness** = Base Toughness + Armor Toughness
- **Effective Spirit** = Base Spirit + Armor Spirit
- **Effective Power** = Base Power + Weapon Power
- **Effective Brilliance** = Base Brilliance + Weapon Brilliance
- **Effective Instinct** = Base Instinct + Armor Instinct modifier
- **Effective Acuity** = Base Acuity + Weapon Acuity modifier
- **Effective CRIT** = Base CRIT + Weapon CRIT modifier

## 5.7 Damage Formula

### Base Damage Calculation

```
Raw Damage = Offensive Stat × (Offensive Stat ÷ (Offensive Stat + Defensive Stat)) × 4
```

Where:
- **Physical attacks:** Offensive = Effective Power, Defensive = Effective Toughness
- **Magical attacks:** Offensive = Effective Brilliance, Defensive = Effective Spirit

### Damage Threshold Rule

```
If (Defensive Stat - Offensive Stat) ≥ 15 → Final Damage = 0
Otherwise → Final Damage = max(1, floor(Raw Damage))
```

This creates the "too weak to hurt you" effect for vastly outleveled enemies while ensuring reasonably-leveled enemies always deal at least 1 damage.

**Note:** This threshold applies to both Heroes and Monsters, though in practice a low-level Hero would never survive the journey to reach high-level enemies.

### Critical Hit Multiplier

```
On CRIT → Final Damage × 2
```

### Weakness & Resistance Multipliers

| Condition | Damage Multiplier | Effect |
|-----------|-------------------|--------|
| Hitting Weakness | × 1.5 | Rewards strategic targeting |
| Hitting Resistance | × 0.5 | Punishes wrong damage type |
| Neutral | × 1.0 | Standard damage |

### Damage Calculation Order

1. Calculate Raw Damage using base formula
2. Check Damage Threshold (if met, damage = 0, skip remaining steps)
3. Apply Weakness/Resistance multiplier
4. Apply Critical Hit multiplier (if CRIT occurred)
5. Apply floor() and max(1, result) for final damage

### Example Calculations

**Level 20 Hero (Power 35) vs Level 3 Trash (Toughness 10, HP 50):**
- Raw Damage = 35 × (35 ÷ 45) × 4 = 109 damage
- Result: One-shot kill ✓

**Level 20 Hero (Power 35) vs Boss (Toughness 50, HP 1000):**
- Raw Damage = 35 × (35 ÷ 85) × 4 = 57 damage
- Hits to kill: ~17-18
- Result: Extended combat requiring resource management ✓

**Level 3 Trash (Power 10) vs Level 20 Hero (Toughness 30):**
- Threshold check: 30 - 10 = 20 ≥ 15
- Result: 0 damage (too weak to hurt) ✓

## 5.8 Damage Types

### Physical Damage Types

| Damage Type | Associated Weapon | Status Effect (on CRIT) |
|-------------|-------------------|-------------------------|
| Slashing | Sword, Axe | Bleeding |
| Piercing | Dagger, Bow | Crippled |
| Bludgeoning | Mace | Dazed |

### Magical Damage Types

| Damage Type | Availability | Status Effect (on CRIT) |
|-------------|--------------|-------------------------|
| Arcane | Base magical damage (all magical weapons) | Drained |
| Air | Unlocked via Skill Tree | Silenced |
| Earth | Unlocked via Skill Tree | Rooted |
| Fire | Unlocked via Skill Tree | Burning |
| Poison | Unlocked via Skill Tree | Poisoned |
| Water | Unlocked via Skill Tree | Frozen |

### Weapon Damage Type Summary

| Weapon | Damage Type | Category |
|--------|-------------|----------|
| Sword | Slashing | Physical |
| Axe | Slashing | Physical |
| Dagger | Piercing | Physical |
| Bow | Piercing | Physical |
| Mace | Bludgeoning | Physical |
| Staff | Arcane (base) | Magical |
| Wand | Arcane (base) | Magical |
| Foci | Arcane (base) | Magical |

**Magical Damage Progression:** All magical weapons deal Arcane damage at Stage 1. Elemental damage types (Air, Earth, Fire, Poison, Water) are unlocked via Skill Tree ability upgrades.

## 5.9 Status Effects

Status Effects are normally only applied when a Critical Hit occurs with the associated damage type. However, **Skill Tree abilities can apply Status Effects directly** regardless of critical hit, as specified in their descriptions. Both Heroes and Monsters can inflict Status Effects.

### Damage Over Time (DoT) Effects

| Effect | Trigger | Duration | Damage |
|--------|---------|----------|--------|
| Bleeding | Slashing CRIT | 3 turns | 15% of initial CRIT damage per turn |
| Burning | Fire CRIT | 3 turns | 15% of initial CRIT damage per turn |
| Poisoned | Poison CRIT | 3 turns | 15% of initial CRIT damage per turn |
| Drained | Arcane CRIT | 3 turns | 15% of initial CRIT damage as MP loss per turn |

### Debuff Effects

| Effect | Trigger | Duration | Effect |
|--------|---------|----------|--------|
| Crippled | Piercing CRIT | 3 turns | -15% damage dealt |
| Weakened | — | 3 turns | -5 to all core stats |
| Dazed | Bludgeoning CRIT | 2 turns | 15% chance to miss turn |
| Silenced | Air CRIT | 2 turns | Cannot use Magical Abilities |
| Rooted | Earth CRIT | 2 turns | Cannot use Physical Abilities |

**Note:** Weakened has no CRIT trigger and is only applied through specific Skill Tree abilities.

### Incapacitation Effects

| Effect | Trigger | Duration | Effect |
|--------|---------|----------|--------|
| Prone | Bludgeoning CRIT (upgraded) | 1 turn | Skip next turn |
| Frozen | Water CRIT | 1 turn | Skip next turn |

**Note:** Prone is an upgraded version of Dazed, available through Skill Tree progression.

## 5.10 Combat Clarifications

- **1:1 Combat Only:** All combat is one Hero versus one Monster. No group combat, no allies.
- **Narrative Groups:** Monsters like "Pack of Wolves" or "Swarm of Rats" are treated as a single entity mechanically.
- **Turn-Based:** Hero and Monster alternate turns until one is defeated.

---

# 6. Experience System

## 6.1 XP Source

Experience Points (XP) are earned exclusively by defeating monsters. There are no quests or milestone XP rewards.

## 6.2 Monster Base XP Rewards

| Monster Tier | Base XP | Min (−20%) | Max (+20%) |
|--------------|---------|------------|------------|
| Trash | 5 | 4 | 6 |
| Minion | 12 | 10 | 14 |
| Elite | 30 | 24 | 36 |
| Champion | 80 | 64 | 96 |
| Mini-Boss | 250 | 200 | 300 |
| Boss | 600 | 480 | 720 |

### XP Variance

Each individual monster has a **fixed XP value** assigned at creation (not randomized at kill time). Variance is assigned based on:

| Method | Description | Example |
|--------|-------------|---------|
| Thematic | Tougher-looking monsters get higher XP | "Dire Wolf" (6 XP) vs "Young Wolf" (4 XP) |
| Stat correlation | Higher-stat monsters within tier get more XP | Trash with 10 Power = 6 XP; Trash with 8 Power = 4 XP |
| Narrative flavor | Rare or unique variants get bonus XP | "Albino Bear" gets max XP for its tier |

## 6.3 Category Difficulty XP Modifier

Monster XP is multiplied based on their Category's difficulty tier:

| Difficulty Tier | Categories | XP Modifier |
|-----------------|------------|-------------|
| Tier 1 | Beast, Humanoid | ×1.0 |
| Tier 2 | Faerie, Cursed | ×1.1 |
| Tier 3 | Construct, Undead | ×1.2 |
| Tier 4 | Magical Beast, Celestial | ×1.3 |
| Tier 5 | Aberration, Dragon | ×1.4 |

### XP Calculation Formula

```
Final XP = floor((Base XP ± Variance) × Category Modifier)
```

**Example:** "Venomfang Spider" (Elite, Beast, +4 variance)
- Base: 30 + 4 = 34 XP
- Modifier: ×1.0
- **Final: 34 XP**

**Example:** "Clockwork Sentinel" (Elite, Construct, −2 variance)
- Base: 30 − 2 = 28 XP
- Modifier: ×1.2
- **Final: 33 XP** (floor of 33.6)

## 6.4 XP Required Per Level

| Level | XP to Reach | Cumulative XP | Phase |
|-------|-------------|---------------|-------|
| 1 | — | 0 | Start |
| 2 | 30 | 30 | Early |
| 3 | 45 | 75 | Early |
| 4 | 65 | 140 | Early |
| 5 | 90 | 230 | Early |
| 6 | 120 | 350 | Mid |
| 7 | 160 | 510 | Mid |
| 8 | 210 | 720 | Mid |
| 9 | 280 | 1,000 | Mid |
| 10 | 370 | 1,370 | Mid |
| 11 | 480 | 1,850 | Mid-Late |
| 12 | 620 | 2,470 | Mid-Late |
| 13 | 800 | 3,270 | Mid-Late |
| 14 | 1,030 | 4,300 | Mid-Late |
| 15 | 1,330 | 5,630 | Late |
| 16 | 1,720 | 7,350 | Late |
| 17 | 2,230 | 9,580 | Late |
| 18 | 2,900 | 12,480 | Late |
| 19 | 3,770 | 16,250 | Late |
| 20 | 4,900 | 21,150 | Endgame |

## 6.5 XP Distribution by Phase

| Phase | Levels | XP Required | % of Total |
|-------|--------|-------------|------------|
| Early (1→5) | 1-5 | 230 | 1% |
| Mid (6→10) | 6-10 | 1,140 | 5% |
| Mid-Late (11→14) | 11-14 | 2,930 | 14% |
| Late (15→19) | 15-19 | 10,620 | 50% |
| Endgame (20) | 20 | 4,900 | 23% |
| **Total** | — | **21,150** | **100%** |

**Key Design Point:** Levels 15-20 require 73% of total XP, creating significant effort for the final levels.

## 6.6 Progression Milestones

| Level | Milestone | Recommended Content |
|-------|-----------|---------------------|
| 1-3 | Tutorial phase | Trash mobs in Tier 1 Regions |
| 4-5 | Early game | Minions, early Elites |
| 6-8 | Finding footing | Elites comfortably, first Champions |
| 9-11 | Mid game | Champions in Tier 1-2 Regions |
| 12-14 | Growing power | Mini-Bosses in Tier 1-2, Champions in Tier 3-4 |
| 15-17 | Late game | Bosses in Tier 1-3, Champions in Tier 5 |
| 18-19 | Endgame push | Mini-Bosses and Bosses in Tier 4-5 |
| 20 | Mastery | Any enemy, tackle The Maddening Deep |

## 6.7 Estimated Enemy Counts

| Enemy Type | Approximate Count | XP Contribution |
|------------|-------------------|-----------------|
| Trash | ~200 | ~6% |
| Minion | ~250 | ~17% |
| Elite | ~120 | ~20% |
| Champion | 30 (fixed) | ~14% |
| Mini-Boss | 10 (fixed) | ~14% |
| Boss | 10 (fixed) | ~34% |
| **TOTAL** | **~620** | **~22,100** |

## 6.8 Playtime Estimate

| Phase | Estimated Time |
|-------|----------------|
| Early (1-5) | ~35 min |
| Mid (6-10) | ~1.5 hours |
| Mid-Late (11-14) | ~2.5 hours |
| Late (15-19) | ~4 hours |
| Endgame (20) | ~2 hours |
| **TOTAL** | **8-12 hours** |

Playtime varies based on player skill, exploration thoroughness, and deaths/retries.

---

# 7. Monster System

## 7.1 Monster Categories (10 Types)

| Category | Description |
|----------|-------------|
| Aberration | Alien, bizarre, mind-warping creatures (cthonic, cosmic, manticores) |
| Beast | Non-magical, mundane animals, predators, and wildlife |
| Celestial | Holy, divine, heavenly beings of light and order |
| Construct | Golems, automatons, magically animated objects |
| Cursed | Previously living beings transformed by dark magic |
| Dragon | Great wyrms, drakes, scaled creatures of ancient power |
| Faerie | Whimsical, nature-linked, trickster Feywild creatures |
| Humanoid | Goblins, Orcs, Bandits, intelligent mortal races |
| Magical Beast | Magic-enhanced animals (Griffon, Hippogryph, Pegasus) |
| Undead | Reanimated corpses, ghosts, creatures devoid of life |

## 7.2 Monster Tiers (6 Levels)

| Tier | Spawn Type | Notes |
|------|------------|-------|
| Trash | Random (biome-tagged locations) | Weakest enemies |
| Minion | Random (biome-tagged locations) | Common enemies |
| Elite | Random (biome-tagged locations) | Tougher enemies |
| Champion | Fixed location | Named enemies |
| Mini-Boss | Fixed location (Lair) | Major threat |
| Boss | Fixed location (Dungeon) | Ultimate challenge |

## 7.3 Monster Data Structure

| Field | Purpose |
|-------|---------|
| Monster Name | Unique identifier |
| Category | Classification (Aberration, Beast, etc.) |
| Tier | Difficulty level (Trash through Boss) |
| Habitat | Biome/Region tags where monster spawns |
| Base Stats | P, T, B, S, A, I values (range: 8 to 50+) |
| Max HP | Tiered by monster type (see below) |
| Max MP | MP = 5 × Spirit |
| Primary Attack | Default attack name and type |
| Special Abilities | Simple commands/spells (Elite+ only) |
| Weakness | Damage type they're vulnerable to |
| Resistance | Damage type they resist/are immune to |
| Reward | Item and Gold awarded on defeat |

## 7.4 Monster HP Formulas

Monster HP scales based on both Toughness and Tier, creating appropriate combat pacing:

| Monster Tier | HP Formula | Example (Toughness 10) |
|--------------|------------|------------------------|
| Trash | Toughness × 5 | 50 HP |
| Minion | Toughness × 6 | 60 HP |
| Elite | Toughness × 8 | 80 HP |
| Champion | Toughness × 10 | 100 HP |
| Mini-Boss | Toughness × 15 | 150 HP |
| Boss | Toughness × 20 | 200 HP |

**Design Rationale:** This keeps Trash monsters squishy (1-2 hit kills) while making Bosses feel like endurance battles requiring resource management.

## 7.5 Named Bosses by Category

| Category | Mini-Boss | Boss |
|----------|-----------|------|
| Aberration | Z'hul, The Unblinking Eye | Ulgoth, The Elder Brain of Xylos |
| Beast | Yarok, Mountain Shaker | Draug, Maw of the Abyss |
| Celestial | Varian, The Judge of Aethel | Seraphina, The Hand of Radiance |
| Construct | Torque, The Bronze Warden | Zoloss, The Living Citadel |
| Cursed | Rurik, The Scourge of Fenris | Vorlag, the Blood Eternal |
| Dragon | Xarthan, the Ashen Wing | Ignis, the Obsidian King |
| Faerie | Sluagh, The Gloom Fey | Titania, Queen of Thorns |
| Humanoid | Godfrey, The Iron Hand | Vaeryk, The Crimson Vizier |
| Magical Beast | Aetherius, Sky Captain | A'layr, The Emberglow Phoenix |
| Undead | Lenore, The Banshee Queen | Zantus, The First Mortal |

## 7.6 Category Combat Focus

| Category | Primary Combat Focus |
|----------|---------------------|
| Aberration | Magic Defense (Spirit) & Mind Control |
| Beast | Physical Power & Evasion (Instinct) |
| Celestial | Magic Offense/Defense (Brilliance/Spirit) & HP (Toughness) |
| Construct | Extreme HP (Toughness) & Physical Power |
| Cursed | Status Effects & Magic Offense (Brilliance) |
| Dragon | Balanced High Stats (Power, Brilliance, Toughness) |
| Faerie | Evasion (Instinct) & Magic Offense (Brilliance) |
| Humanoid | Balanced Stats & Tactical Skill (Acuity/Instinct) |
| Magical Beast | High Power/Toughness/Brilliance (Elemental Focus) |
| Undead | High Defense (Toughness/Spirit) & Spiritual Attacks |

## 7.7 Monster Category Difficulty Tiers

Monster Categories have inherent difficulty levels, making some Regions naturally harder than others:

| Difficulty Tier | Monster Categories | Stat Modifier | XP Modifier |
|-----------------|-------------------|---------------|-------------|
| Tier 1 (Easiest) | Beast, Humanoid | Base stats | ×1.0 XP |
| Tier 2 | Faerie, Cursed | +5% stats | ×1.1 XP |
| Tier 3 | Construct, Undead | +10% stats | ×1.2 XP |
| Tier 4 | Magical Beast, Celestial | +15% stats | ×1.3 XP |
| Tier 5 (Hardest) | Aberration, Dragon | +20% stats | ×1.4 XP |

**Design Rationale:** A Beast Boss (Tier 1) is roughly equivalent in difficulty to a Dragon Champion (Tier 5). This encourages players to grind easier Regions before tackling harder ones.

## 7.8 Monster Weaknesses, Resistances & Immunities

Each Monster Category has 2 Weaknesses, 1 Resistance, and 1 Immunity:

| Category | Weakness 1 | Weakness 2 | Resistance | Immunity |
|----------|------------|------------|------------|----------|
| Aberration | Bludgeoning | Water | Arcane | Poison |
| Beast | Fire | Piercing | Bludgeoning | Arcane |
| Celestial | Poison | Earth | Fire | Air |
| Construct | Bludgeoning | Water | Piercing | Poison |
| Cursed | Fire | Slashing | Poison | Earth |
| Dragon | Piercing | Poison | Fire | Slashing |
| Faerie | Bludgeoning | Arcane | Air | Water |
| Humanoid | Slashing | Air | Bludgeoning | Earth |
| Magical Beast | Earth | Arcane | Air | Fire |
| Undead | Arcane | Air | Piercing | Bludgeoning |

### Damage Multipliers

| Condition | Multiplier | Effect |
|-----------|------------|--------|
| Weakness | ×1.5 | Rewards strategic targeting |
| Neutral | ×1.0 | Standard damage |
| Resistance | ×0.5 | Punishes wrong damage type |
| Immunity | ×0 | No damage; triggers Counter Attack (see Monster Abilities) |

### Thematic Rationale

| Category | Rationale |
|----------|-----------|
| Aberration | Alien physiology ignores poison; blunt trauma and water disrupt fluid forms |
| Beast | Animals fear fire, vulnerable to arrows; thick hides resist blunt trauma |
| Celestial | Divine beings corrupted by poison/earth; heavenly fire doesn't burn them |
| Construct | Smash or rust them; no organs to pierce or poison |
| Cursed | Purified by fire, cut by silver blades; already corrupted by poison |
| Dragon | Arrows find scale gaps, poison works internally; scales deflect blades |
| Faerie | Iron (blunt metal) and unraveling magic disrupt fey; running water repels them |
| Humanoid | Classic sword/bow combat; trained against brute force |
| Magical Beast | Grounding earth and unraveling arcane; flying creatures resist air |
| Undead | Holy magic and dispersing winds destroy them; can't break what's already broken |

## 7.9 Beast Bestiary

The Beast category represents natural animals, both mundane and monstrous. They spawn primarily in Forest, Mountain, Swamp, Desert, Cave, Plains, River, and Coast biomes.

**Beast Category Traits:**
- **Combat Focus:** Physical Power & Evasion (Instinct)
- **Weaknesses:** Fire, Piercing
- **Resistance:** Bludgeoning
- **Immunity:** Arcane
- **Difficulty Tier:** 1 (×1.0 stat modifier, ×1.0 XP modifier)

### Trash Tier Beasts

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Wolf Pup | 1 | 9 | 8 | 5 | 6 | 9 | 10 | 40 | Piercing | 4 | Forest, Mountain |
| Swarm of Rats | 2 | 10 | 7 | 5 | 5 | 8 | 11 | 35 | Piercing | 5 | Cave, Crossroad, City |
| Feral Cat | 2 | 8 | 7 | 5 | 6 | 10 | 12 | 35 | Slashing | 5 | Crossroad, City, Ruin |
| Giant Marsh Toad | 3 | 9 | 10 | 6 | 7 | 7 | 8 | 50 | Poison | 5 | Swamp, River |
| Swarm of Bats | 3 | 8 | 6 | 5 | 6 | 9 | 12 | 30 | Piercing | 6 | Cave, Mountain, Crypt |
| Swarm of Carrion | 4 | 10 | 8 | 5 | 5 | 10 | 11 | 40 | Piercing | 6 | Crossroad, Swamp, Cursed |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Wolf Pup | Yelp | On defeat | No mechanical effect (flavor) |
| Swarm of Rats | Scatter | Below 25% HP | +3 Instinct for remainder of fight |
| Feral Cat | Quick Slash | On Crit | Double attack (hits twice) |
| Giant Marsh Toad | Toxic Skin | When hit by melee | Attacker takes 2 Poison damage |
| Swarm of Bats | Evasive Cloud | Every 3rd turn | +5 Instinct until next turn |
| Swarm of Carrion | Peck Frenzy | Below 50% HP | +2 Power for remainder of fight |

### Minion Tier Beasts

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Dire Wolf | 5 | 14 | 11 | 6 | 8 | 12 | 13 | 66 | Piercing | 12 | Forest, Mountain |
| Wild Boar | 5 | 15 | 13 | 5 | 7 | 10 | 10 | 78 | Bludgeoning | 12 | Forest, Swamp |
| Venomous Snake | 6 | 12 | 9 | 6 | 8 | 14 | 14 | 54 | Poison | 13 | Swamp, Desert, Cave |
| Giant Rat | 6 | 13 | 12 | 5 | 6 | 11 | 12 | 72 | Piercing | 12 | Cave, Crossroad, Crypt |
| Swamp Gator | 7 | 16 | 14 | 5 | 7 | 9 | 9 | 84 | Slashing | 14 | Swamp, River, Coast |
| Hawk | 7 | 11 | 8 | 6 | 9 | 15 | 16 | 48 | Slashing | 13 | Plains, Mountain, Bluff |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Dire Wolf | Pack Tactics | Always | +2 Power if Hero below 75% HP |
| Wild Boar | Gore Charge | First attack | +5 Power on first attack of combat |
| Venomous Snake | Venom Bite | On Crit | Applies Weakened (-5 all stats, 3 turns) |
| Giant Rat | Disease Carrier | On Crit | Applies Bleeding (15% damage/turn, 3 turns) |
| Swamp Gator | Death Roll | Below 50% HP | Next attack deals ×1.5 damage |
| Hawk | Dive Attack | Every 3rd turn | Unavoidable attack (ignores Instinct) |

### Elite Tier Beasts

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Alpha Wolf | 9 | 18 | 15 | 7 | 10 | 16 | 17 | 120 | Piercing | 30 | Forest, Mountain |
| Giant Spider | 10 | 16 | 14 | 8 | 12 | 18 | 15 | 112 | Poison | 32 | Forest, Cave, Swamp |
| Dune Stalker | 11 | 16 | 13 | 7 | 9 | 17 | 20 | 104 | Slashing | 34 | Desert, Plains |
| Ridge Prowler | 12 | 20 | 14 | 7 | 10 | 18 | 19 | 112 | Slashing | 34 | Mountain, Bluff |
| Shadow Panther | 13 | 21 | 12 | 8 | 11 | 20 | 22 | 96 | Slashing | 36 | Forest, Cave |
| Giant Crocodile | 14 | 22 | 20 | 6 | 9 | 14 | 12 | 160 | Slashing | 36 | Swamp, River, Coast |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Alpha Wolf | Howl | Start of combat | +3 to all stats for 3 turns |
| Giant Spider | Web Trap | Every 4th turn | Applies Rooted (no physical abilities, 2 turns) |
| Dune Stalker | Sand Camouflage | Start of combat | First attack is guaranteed Crit |
| Ridge Prowler | Pounce | When Hero misses | Immediate counter-attack |
| Shadow Panther | Ambush | Start of combat | +10 Acuity for first 2 turns |
| Giant Crocodile | Armored Hide | Always | -25% damage from physical attacks |

### Beast Champions

#### Mossback, the Ancient One

*Location: The Heart of Thorns (The Whispering Thicket)*

| Stat | Value |
|------|-------|
| Level | 12 |
| Power | 24 |
| Toughness | 26 |
| Brilliance | 8 |
| Spirit | 14 |
| Acuity | 16 |
| Instinct | 14 |
| HP | 260 |
| Damage Type | Bludgeoning |
| Base XP | 80 |

**Description:** An ancient beast that has roamed the Whispering Thicket for centuries. Its hide is covered in moss, vines, and thorns — more forest than flesh. Mossback moves slowly but strikes with devastating force.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Thorned Hide | When hit by melee | Attacker takes 10 Piercing damage |
| Ancient Resilience | Below 50% HP | Regenerates 15 HP per turn |
| Earthshaking Stomp | Every 4th turn | Deals damage and applies Dazed (15% miss, 2 turns) |
| Nature's Wrath | Below 25% HP | +5 Power, +5 Toughness for remainder of fight |

#### Sandclaw, the Desert Champion

*Location: The Proving Grounds (Goldgrass City)*

| Stat | Value |
|------|-------|
| Level | 14 |
| Power | 26 |
| Toughness | 20 |
| Brilliance | 7 |
| Spirit | 12 |
| Acuity | 22 |
| Instinct | 21 |
| HP | 200 |
| Damage Type | Slashing |
| Base XP | 88 |

**Description:** Captured from the deep desert and forced to fight in the arena, Sandclaw has never been defeated. This massive lion-like beast with golden fur and obsidian claws fights with feral intelligence born from countless battles.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Arena Veteran | Always | Cannot be afflicted by the same status effect twice |
| Savage Combo | On Crit | Attacks three times in succession |
| Desert Fury | Below 50% HP | +8 Power, -3 Toughness (more aggressive) |
| Crowd Roar | Every 5th turn | Heals 25 HP (crowd throws healing items) |

#### Thunderhoof, Wrath of the Mountain

*Location: The Alpha's Peak (The Stonepaw Highlands)*

| Stat | Value |
|------|-------|
| Level | 15 |
| Power | 28 |
| Toughness | 24 |
| Brilliance | 6 |
| Spirit | 13 |
| Acuity | 18 |
| Instinct | 16 |
| HP | 240 |
| Damage Type | Bludgeoning |
| Base XP | 96 |

**Description:** A colossal elk with stone-grey fur and antlers that crackle with static electricity. Thunderhoof rules the Stonepaw Highlands, and no beast dares challenge its dominion. The ground trembles with every step.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Earthshaker | Every 3rd turn | All attacks this turn apply Prone (skip turn) on hit |
| Lightning Antlers | On Crit | Deals bonus Air damage equal to 50% of attack |
| Mountain's Fury | Below 50% HP | Charge attack deals ×2 damage |
| Unyielding | Below 25% HP | Immune to status effects |

### Beast Mini-Boss: Yarok, Mountain Shaker

*Location: The Shattered Summit (The Stonepaw Highlands)*

| Stat | Value |
|------|-------|
| Level | 16 |
| Power | 32 |
| Toughness | 30 |
| Brilliance | 8 |
| Spirit | 16 |
| Acuity | 20 |
| Instinct | 18 |
| HP | 450 |
| Damage Type | Bludgeoning |
| Base XP | 250 |
| Remnant | Mountain's Broken Crown |

**Description:** A primordial ape-like beast of impossible size, Yarok has carved its domain into the mountain itself. Its fists shatter stone, and its roar causes avalanches. Only the most prepared heroes survive an encounter with the Mountain Shaker.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Boulder Throw | Every 4th turn | Ranged attack, unavoidable, applies Dazed |
| Primal Rage | Below 75% HP | +4 Power permanently |
| Earthsplitter | Below 50% HP | Next 3 attacks apply Prone on hit |
| Mountain's Endurance | Below 25% HP | +10 Toughness, regenerates 20 HP per turn |
| Avalanche | On death (once) | Final attack deals ×3 damage |

### Beast Boss: Draug, Maw of the Abyss

*Location: The Sunken Depths (The Mistfall Coast)*

| Stat | Value |
|------|-------|
| Level | 18 |
| Power | 40 |
| Toughness | 38 |
| Brilliance | 12 |
| Spirit | 20 |
| Acuity | 24 |
| Instinct | 16 |
| HP | 760 |
| Damage Type | Slashing, Water |
| Base XP | 600 |
| Remnant | Fang of the Endless Maw |

**Description:** An ancient leviathan that dwells in the flooded caves beneath the Mistfall Coast. Part eel, part shark, part nightmare — Draug has devoured ships, villages, and countless adventurers. Its hunger is eternal, and the abyss is its domain.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Abyssal Presence | Start of combat | Hero takes 10 Water damage per turn (drowning) |
| Crushing Jaws | On Crit | Applies Crippled (-1 AP, 3 turns) and Bleeding |
| Tidal Surge | Every 5th turn | Unavoidable Water attack, applies Frozen (skip turn) |
| Regeneration | Always | Heals 25 HP per turn while above 50% HP |
| Fury of the Deep | Below 50% HP | +10 Power, attacks twice per turn |
| Death Throes | Below 25% HP | Abyssal Presence increases to 20 damage per turn |

### Beast Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 31 (avg 5.2 each) |
| Minion | 6 | 76 (avg 12.7 each) |
| Elite | 6 | 202 (avg 33.7 each) |
| Champion | 3 | 264 (avg 88 each) |
| Mini-Boss | 1 | 250 |
| Boss | 1 | 600 |
| **Total** | **23** | — |

## 7.10 Humanoid Bestiary

The Humanoid category represents mortal enemies — bandits, cultists, mercenaries, and tribal raiders. They fight with trained skill and cunning rather than bestial instinct.

**Humanoid Category Traits:**
- **Combat Focus:** Balanced stats, tactical abilities
- **Weaknesses:** Slashing, Piercing
- **Resistance:** Bludgeoning
- **Immunity:** Holy
- **Difficulty Tier:** 1 (×1.0 stat modifier)

**Primary Biomes:** Crossroad, Ruin, Cave, City, Crypt, Coast, Plains, Forest

### Trash Tier Humanoids

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Thug | 1 | 10 | 10 | 5 | 6 | 7 | 8 | 50 | Bludgeoning | 4 | City, Crossroad |
| Pickpocket | 2 | 8 | 6 | 6 | 6 | 11 | 12 | 30 | Slashing | 5 | City, Crossroad |
| Grave Robber | 2 | 9 | 8 | 6 | 5 | 10 | 10 | 40 | Piercing | 5 | Crypt, Ruin |
| Deserter | 3 | 10 | 11 | 5 | 7 | 9 | 9 | 55 | Slashing | 5 | Forest, Crossroad, Plains |
| Cult Initiate | 3 | 9 | 8 | 7 | 8 | 9 | 10 | 40 | Fire | 6 | Ruin, Cave, Crypt |
| Vagrant | 4 | 11 | 9 | 5 | 6 | 10 | 11 | 45 | Slashing | 6 | Crossroad, Ruin, City |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Thug | Intimidate | Start of combat | No mechanical effect (flavor) |
| Pickpocket | Sticky Fingers | On hit | Steals 5 gold from Hero |
| Grave Robber | Grave Dust | Every 4th turn | Applies Dazed (2 turns) |
| Deserter | Shield Wall | Below 50% HP | +3 Toughness for remainder of fight |
| Cult Initiate | Fanaticism | Below 50% HP | +2 Power for remainder of fight |
| Vagrant | Desperate Strike | Below 25% HP | Next attack is guaranteed Crit |

### Minion Tier Humanoids

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Bandit | 5 | 13 | 12 | 6 | 7 | 11 | 11 | 72 | Slashing | 12 | Forest, Crossroad, Cave |
| Marauder | 5 | 15 | 10 | 5 | 7 | 12 | 12 | 60 | Slashing | 12 | Plains, Forest, Crossroad |
| Cult Fanatic | 6 | 12 | 11 | 8 | 9 | 10 | 10 | 66 | Fire | 13 | Ruin, Cave, Crypt, Cursed |
| Drunk Guard | 6 | 14 | 14 | 5 | 6 | 8 | 7 | 84 | Bludgeoning | 12 | City, Crossroad |
| Hexer | 6 | 10 | 9 | 10 | 10 | 13 | 11 | 54 | Poison | 14 | Forest, Swamp, Ruin |
| Bounty Hunter | 7 | 13 | 11 | 6 | 8 | 15 | 14 | 66 | Piercing | 14 | Crossroad, City, Forest |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Bandit | Ambush | First attack | +3 Power on first attack of combat |
| Marauder | Reckless Assault | Always | +4 Power, -2 Toughness |
| Cult Fanatic | Martyrdom | Below 25% HP | Cannot flee, +5 Power for remainder of fight |
| Drunk Guard | Liquid Courage | Always | Immune to Weakened, -3 Acuity |
| Hexer | Curse | On Crit | Applies Weakened (-5 all stats, 3 turns) |
| Bounty Hunter | Mark Prey | Start of combat | +2 Power for remainder of fight (locked on target) |

### Elite Tier Humanoids

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Bandit Captain | 9 | 17 | 15 | 7 | 9 | 14 | 13 | 120 | Slashing | 30 | Forest, Cave, Crossroad |
| Assassin | 10 | 15 | 10 | 7 | 8 | 20 | 21 | 80 | Piercing | 32 | City, Ruin, Cave |
| War Priest | 11 | 16 | 16 | 9 | 12 | 14 | 12 | 128 | Fire | 34 | Crypt, Ruin, Cursed |
| Tribal Warlord | 12 | 20 | 17 | 6 | 10 | 15 | 14 | 136 | Slashing | 34 | Plains, Forest, Crossroad |
| Cult Hierophant | 13 | 15 | 13 | 12 | 14 | 17 | 15 | 104 | Fire | 36 | Ruin, Cave, Crypt |
| Hedge Knight | 14 | 19 | 18 | 7 | 11 | 16 | 15 | 144 | Slashing | 36 | Crossroad, Plains, Ruin |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Bandit Captain | Rally | Start of combat | +3 Power, +3 Toughness for 3 turns |
| Assassin | Death Strike | First attack | First attack deals ×2 damage |
| War Priest | Dark Blessing | Every 4th turn | Heals 20 HP |
| Tribal Warlord | Warcry | Every 5th turn | Applies Weakened (2 turns) |
| Cult Hierophant | Unholy Aura | Always | Hero takes 5 Fire damage per turn |
| Hedge Knight | Riposte | When Hero misses | Immediate counter-attack |

### Humanoid Champions

#### The Pale Hand

*Location: The Final Ledger (The Contested Frontier)*

| Stat | Value |
|------|-------|
| Level | 12 |
| Power | 18 |
| Toughness | 16 |
| Brilliance | 8 |
| Spirit | 10 |
| Acuity | 24 |
| Instinct | 26 |
| HP | 200 |
| Damage Type | Piercing |
| Base XP | 80 |

**Description:** No one has seen The Pale Hand's face and lived to describe it. This legendary assassin has ended kings, generals, and merchant princes alike. The only warning is a pale handprint left on the pillow of the next target.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Shadow Step | Start of combat | First 2 attacks are guaranteed Crits |
| Poisoned Blade | Always | All attacks apply Bleeding (15% damage/turn, 3 turns) |
| Vanish | Every 4th turn | Untargetable until next turn (Hero's attack misses) |
| Death's Whisper | Below 25% HP | +10 Power for remainder of fight |

#### Kael Ironfist

*Location: The Hall of the Ironfist (The Iron Badlands) — Gates access to Godfrey, The Iron Hand*

| Stat | Value |
|------|-------|
| Level | 14 |
| Power | 26 |
| Toughness | 24 |
| Brilliance | 7 |
| Spirit | 12 |
| Acuity | 18 |
| Instinct | 16 |
| HP | 240 |
| Damage Type | Bludgeoning |
| Base XP | 88 |

**Description:** Once the greatest pit fighter in the eastern provinces, Kael Ironfist earned his name by crushing opponents with his bare hands. Now he serves as Godfrey's enforcer, commanding a company of sellswords who answer only to coin and the threat of Kael's fists.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Iron Discipline | Always | Immune to Weakened and Dazed |
| Crushing Blow | Every 3rd turn | Attack applies Dazed (15% miss chance, 2 turns) |
| Mercenary's Resolve | Below 50% HP | +5 Toughness for remainder of fight |
| Commander's Presence | Above 50% HP | Regenerates 10 HP per turn |

#### The Voice of Ruin

*Location: The Voice's Pulpit (Blood Reach) — Gates access to Vaeryk, The Crimson Vizier*

| Stat | Value |
|------|-------|
| Level | 15 |
| Power | 24 |
| Toughness | 20 |
| Brilliance | 12 |
| Spirit | 16 |
| Acuity | 20 |
| Instinct | 18 |
| HP | 220 |
| Damage Type | Fire |
| Base XP | 96 |

**Description:** The Voice of Ruin speaks the words of the Crimson Vizier to the faithful. Every sermon promises apocalypse, every prophecy foretells destruction — and the devoted believe every word. To silence The Voice is to strike at the heart of the cult itself.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Prophetic Visions | Start of combat | Hero's first attack misses (foreseen) |
| Burning Words | Always | Hero takes 8 Fire damage per turn |
| Fanatic Shield | Below 50% HP (once) | Heals 50 HP immediately |
| Voice of Doom | Below 25% HP | All attacks apply Weakened (2 turns) |

### Humanoid Mini-Boss: Godfrey, The Iron Hand

*Location: The Iron Bastion (The Iron Badlands)*

| Stat | Value |
|------|-------|
| Level | 16 |
| Power | 30 |
| Toughness | 32 |
| Brilliance | 8 |
| Spirit | 14 |
| Acuity | 18 |
| Instinct | 16 |
| HP | 450 |
| Damage Type | Slashing |
| Base XP | 250 |
| Remnant | Gauntlet of the Iron Hand |

**Description:** Godfrey rules the mercenary companies of The Lawless Marches with absolute authority. His iron gauntlet — fused to his flesh after a battlefield injury — has become his symbol of power. Those who defy him are crushed in its grip. Those who serve him are rewarded with gold and fear.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Iron Grip | Every 4th turn | Unavoidable attack, applies Crippled (-1 AP, 3 turns) |
| Shield of Command | Always | -30% damage from physical attacks |
| Rally the Guard | Every 5th turn | Heals 30 HP |
| Ironclad Resolve | Below 50% HP | +6 Toughness permanently |
| The Iron Hand | Below 25% HP | All attacks apply Prone (skip turn) on hit |
| Final Command | On death (once) | Deals one attack at ×2 damage |

### Humanoid Boss: Vaeryk, The Crimson Vizier

*Location: The Crimson Sanctum (Blood Reach)*

| Stat | Value |
|------|-------|
| Level | 18 |
| Power | 38 |
| Toughness | 34 |
| Brilliance | 16 |
| Spirit | 22 |
| Acuity | 28 |
| Instinct | 20 |
| HP | 760 |
| Damage Type | Fire, Arcane |
| Base XP | 600 |
| Remnant | Sigil of the Crimson Court |

**Description:** The Crimson Vizier was once advisor to a forgotten king. When that kingdom fell, Vaeryk did not fall with it — he simply found new followers. His cult promises power through blood and fire, and Vaeryk has delivered on that promise for centuries. Some whisper he is no longer fully mortal.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Crimson Aura | Start of combat | Hero takes 12 Fire damage per turn |
| Blood Magic | On Crit | Heals HP equal to 50% of damage dealt |
| Vizier's Decree | Every 5th turn | Unavoidable attack, applies Weakened (-5 stats, 3 turns) |
| Arcane Shield | Above 50% HP | -25% damage from magical attacks |
| Crimson Fury | Below 50% HP | +12 Power, attacks twice per turn |
| Final Proclamation | Below 25% HP | Crimson Aura increases to 20 damage per turn |

### Humanoid Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 31 (avg 5.2 each) |
| Minion | 6 | 77 (avg 12.8 each) |
| Elite | 6 | 202 (avg 33.7 each) |
| Champion | 3 | 264 (avg 88 each) |
| Mini-Boss | 1 | 250 |
| Boss | 1 | 600 |
| **Total** | **23** | — |

## 7.11 Cursed Bestiary

The Cursed category represents previously living beings transformed by dark magic — lycanthropes, vampires, cursed knights, hags, and plague-touched horrors. They retain echoes of their former selves, twisted into something monstrous.

**Cursed Category Traits:**
- **Combat Focus:** High survivability, regeneration, transformation abilities
- **Weaknesses:** Fire, Slashing
- **Resistance:** Poison
- **Immunity:** Earth
- **Difficulty Tier:** 2 (×1.1 stat modifier)

**Primary Biomes:** Cursed, Swamp, City, Crypt, Desert

### Trash Tier Cursed

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Blighted Rat | 1 | 9 | 8 | 5 | 5 | 10 | 12 | 40 | Poison | 4 | Swamp, Crypt, City |
| Hellhound | 1 | 11 | 9 | 5 | 6 | 9 | 11 | 45 | Fire | 4 | Cursed, Swamp, Crypt |
| Plagued Villager | 2 | 10 | 10 | 5 | 6 | 7 | 8 | 50 | Bludgeoning | 5 | Cursed, City, Swamp |
| Moonborn Wretch | 3 | 12 | 11 | 5 | 7 | 9 | 10 | 55 | Slashing | 6 | Cursed, Swamp, Forest |
| Zombie | 3 | 11 | 13 | 4 | 5 | 6 | 6 | 65 | Bludgeoning | 5 | Crypt, Cursed, Swamp |
| Withered Husk | 4 | 13 | 10 | 6 | 6 | 11 | 11 | 50 | Necrotic | 7 | Crypt, Desert, Cursed |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Blighted Rat | Diseased Bite | On Crit | Applies Weakened (-5 all stats, 2 turns) |
| Hellhound | Burning Maw | Always | All attacks deal Fire damage |
| Plagued Villager | Desperate Plea | On defeat | No mechanical effect (flavor — begs for mercy) |
| Moonborn Wretch | Partial Shift | Below 50% HP | +3 Power, +2 Instinct for remainder of fight |
| Zombie | Relentless | Below 25% HP | 50% chance to survive with 1 HP (once) |
| Withered Husk | Life Drain | On hit | Heals 3 HP per successful attack |

### Minion Tier Cursed

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Werewolf | 5 | 16 | 13 | 6 | 8 | 13 | 14 | 78 | Slashing | 13 | Cursed, Forest, Swamp |
| Vampire Thrall | 5 | 14 | 12 | 7 | 9 | 14 | 13 | 72 | Necrotic | 13 | Crypt, City, Cursed |
| Cursed Knight | 6 | 15 | 16 | 6 | 10 | 11 | 10 | 96 | Slashing | 14 | Cursed, Crypt, Ruin |
| Swamp Hag | 6 | 12 | 11 | 9 | 12 | 14 | 12 | 66 | Poison | 15 | Swamp, Cursed |
| Plague Doctor | 7 | 13 | 12 | 8 | 10 | 15 | 13 | 72 | Poison | 15 | City, Swamp, Crypt |
| Mire Stalker | 7 | 17 | 14 | 6 | 8 | 12 | 15 | 84 | Slashing | 15 | Swamp, River, Cursed |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Werewolf | Savage Frenzy | Below 50% HP | +4 Power, attacks twice next turn |
| Vampire Thrall | Blood Siphon | On hit | Heals 5 HP per successful attack |
| Cursed Knight | Undying Oath | On death (once) | Returns with 25% HP after 1 turn |
| Swamp Hag | Hex | Every 4th turn | Applies Weakened (-5 all stats, 3 turns) |
| Plague Doctor | Miasma | Start of combat | Hero takes 4 Poison damage per turn |
| Mire Stalker | Drag Under | On Crit | Applies Rooted (no physical abilities, 2 turns) |

### Elite Tier Cursed

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Alpha Werewolf | 9 | 21 | 17 | 7 | 10 | 17 | 19 | 136 | Slashing | 33 | Cursed, Forest, Swamp |
| Vampire | 10 | 20 | 16 | 9 | 14 | 20 | 18 | 128 | Necrotic | 35 | Crypt, City, Cursed |
| Death Knight | 11 | 22 | 20 | 8 | 12 | 16 | 14 | 160 | Slashing | 37 | Cursed, Crypt, Ruin |
| Night Hag | 12 | 18 | 15 | 12 | 16 | 19 | 17 | 120 | Arcane | 40 | Swamp, Cursed, Crypt |
| Hexblade | 13 | 23 | 18 | 9 | 13 | 18 | 16 | 144 | Slashing | 40 | Cursed, Ruin, Crypt |
| Plaguelord | 14 | 21 | 19 | 10 | 15 | 17 | 15 | 152 | Poison | 40 | Swamp, City, Cursed |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Alpha Werewolf | Pack Call | Start of combat | +4 Power, +4 Instinct for 3 turns |
| Vampire | Charm | Every 5th turn | Hero skips next turn (mesmerized) |
| Death Knight | Cursed Blade | On Crit | Applies Bleeding and Weakened |
| Night Hag | Nightmare | Every 4th turn | Applies Weakened (2 turns) + 15 Arcane damage |
| Hexblade | Bound Weapon | Always | Cannot be Disarmed; +3 Power permanently below 50% HP |
| Plaguelord | Epidemic | Always | Hero takes 8 Poison damage per turn; Plaguelord heals 8 HP per turn |

### Cursed Champions

#### The Beast of Barrowmere

*Location: Heart of Barrowmere (Barrowmere) — Gates access to Rurik, The Scourge of Fenris*

| Stat | Value |
|------|-------|
| Level | 13 |
| Power | 26 |
| Toughness | 20 |
| Brilliance | 7 |
| Spirit | 11 |
| Acuity | 19 |
| Instinct | 24 |
| HP | 240 |
| Damage Type | Slashing |
| Base XP | 88 |

**Description:** The first werewolf of the Barrowmere pack, this massive beast stands apart from its kin. Survivors speak of eyes that gleam with terrible intelligence and a howl that drives men to madness. The Beast serves Rurik as herald and hunter — those it tracks never escape.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Apex Predator | Start of combat | +5 Power, +5 Instinct for first 3 turns |
| Rending Claws | On Crit | Applies Bleeding (15% damage/turn) and Crippled (-1 AP) |
| Regeneration | Always | Heals 8 HP per turn |
| Feral Rage | Below 25% HP | +8 Power, attacks twice per turn |

#### Mother Morath

*Location: Morath's Cottage (The Rotwood)*

| Stat | Value |
|------|-------|
| Level | 15 |
| Power | 22 |
| Toughness | 18 |
| Brilliance | 14 |
| Spirit | 18 |
| Acuity | 22 |
| Instinct | 20 |
| HP | 260 |
| Damage Type | Poison, Arcane |
| Base XP | 106 |

**Description:** The eldest hag of the Blighted Moor has brewed curses for centuries. Her cottage moves through the swamp on twisted roots, and her cauldron holds the suffering of generations. Mother Morath knows every dark secret whispered in desperation — and the price for each is always too high.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Curse of Weakness | Start of combat | Hero's Power reduced by 5 for entire fight |
| Bubbling Cauldron | Every 4th turn | Heals 30 HP or deals 30 Poison damage (alternates) |
| Evil Eye | On Crit | Applies Dazed (3 turns) |
| Coven's Spite | Below 25% HP | All attacks apply Weakened (-5 all stats, 3 turns) |

#### Countess Vellana

*Location: Vellana's Manor (The Pale Dominion) — Gates access to Vorlag, the Blood Eternal*

| Stat | Value |
|------|-------|
| Level | 16 |
| Power | 28 |
| Toughness | 22 |
| Brilliance | 12 |
| Spirit | 16 |
| Acuity | 26 |
| Instinct | 22 |
| HP | 280 |
| Damage Type | Necrotic |
| Base XP | 106 |

**Description:** Countess Vellana was turned by Vorlag himself three centuries ago. She rules a domain of blood-bonded thralls from her crumbling manor, hosting masked balls where the guests never leave. Beautiful, cruel, and utterly devoted to her master — she is the last obstacle before Vorlag's throne.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aristocratic Grace | Always | +5 Instinct; immune to Prone |
| Blood Kiss | On Crit | Heals HP equal to 75% of damage dealt |
| Mist Form | Every 5th turn | Untargetable until next turn (Hero's attack misses) |
| Crimson Banquet | Below 50% HP | Attacks twice per turn; each hit heals 10 HP |

### Cursed Mini-Boss: Rurik, The Scourge of Fenris

*Location: The Fanged Throne (Barrowmere)*

| Stat | Value |
|------|-------|
| Level | 17 |
| Power | 36 |
| Toughness | 32 |
| Brilliance | 8 |
| Spirit | 14 |
| Acuity | 22 |
| Instinct | 28 |
| HP | 520 |
| Damage Type | Slashing |
| Base XP | 275 |
| Remnant | Fang of the First Wolf |

**Description:** Rurik was once a proud jarl who sought the power to protect his people. The curse he received instead consumed everything he loved. Now he leads the Fenris pack — an army of lycanthropes that have claimed the Blighted Moor as their hunting ground. The man is gone; only the Scourge remains.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Alpha's Howl | Start of combat | +6 Power, +6 Instinct for 4 turns |
| Savage Maul | Every 3rd turn | Unavoidable attack, applies Bleeding and Prone |
| Lycanthropic Regeneration | Always | Heals 12 HP per turn |
| Apex Form | Below 50% HP | Transforms — +10 Power, +5 Toughness permanently |
| Fenris Unleashed | Below 25% HP | Attacks three times per turn |
| Last Hunt | On death (once) | One final unavoidable attack at ×2 damage |

### Cursed Boss: Vorlag, the Blood Eternal

*Location: The Eternal Throne (The Pale Dominion)*

| Stat | Value |
|------|-------|
| Level | 19 |
| Power | 44 |
| Toughness | 38 |
| Brilliance | 16 |
| Spirit | 24 |
| Acuity | 32 |
| Instinct | 26 |
| HP | 880 |
| Damage Type | Necrotic, Arcane |
| Base XP | 660 |
| Remnant | Vorlag's Vial of First Blood |

**Description:** Vorlag was ancient when the first kingdoms rose, and he will endure long after they fall. The Blood Eternal has sired countless vampires across the ages, building an empire of shadows that spans continents. His throne room is a cathedral of bones, and his hunger has never been sated. To face Vorlag is to face eternity itself.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aura of Dread | Start of combat | Hero's Instinct reduced by 8 for entire fight |
| Eternal Thirst | On hit | Heals HP equal to 50% of damage dealt |
| Dominating Gaze | Every 5th turn | Hero skips next turn (dominated) |
| Blood Shield | Above 50% HP | -30% damage from all sources |
| Crimson Fury | Below 50% HP | +15 Power, attacks twice per turn |
| Mist Escape | Below 25% HP (once) | Becomes untargetable for 2 turns, heals 100 HP |
| Final Embrace | Below 25% HP | All attacks apply Bleeding and heal double |

### Cursed Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 31 (avg 5.2 each) |
| Minion | 6 | 85 (avg 14.2 each) |
| Elite | 6 | 225 (avg 37.5 each) |
| Champion | 3 | 300 (avg 100 each) |
| Mini-Boss | 1 | 275 |
| Boss | 1 | 660 |
| **Total** | **23** | — |

## 7.12 Construct Bestiary

The Construct category represents magically animated objects, clockwork automatons, and ancient guardians. They do not tire, do not fear, and follow their directives with mechanical precision — remnants of forgotten artificers and mad inventors.

**Construct Category Traits:**
- **Combat Focus:** Extreme HP (Toughness) & Physical Power
- **Weaknesses:** Bludgeoning, Water
- **Resistance:** Piercing
- **Immunity:** Poison
- **Difficulty Tier:** 3 (×1.2 stat modifier)

**Primary Biomes:** Ruin, Earth, Fire, City, Stronghold

### Trash Tier Constructs

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Clockwork Beast | 1 | 10 | 11 | 4 | 5 | 8 | 9 | 55 | Slashing | 5 | Ruin, City, Stronghold |
| Broken Automaton | 2 | 11 | 10 | 5 | 4 | 7 | 8 | 50 | Bludgeoning | 6 | Ruin, Fire, City |
| Stone Sentry | 3 | 10 | 14 | 4 | 5 | 6 | 7 | 70 | Bludgeoning | 6 | Ruin, Earth, Stronghold |
| Brass Beetle | 3 | 12 | 11 | 5 | 5 | 9 | 10 | 55 | Piercing | 7 | Ruin, Earth, City |
| Clay Servant | 4 | 13 | 13 | 4 | 5 | 7 | 8 | 65 | Bludgeoning | 7 | Ruin, Earth, City |
| Gear Spider | 4 | 14 | 10 | 5 | 5 | 11 | 12 | 50 | Piercing | 7 | Ruin, City, Stronghold |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Clockwork Beast | Wind-Down | Below 25% HP | -3 Power, -3 Instinct (slowing) |
| Broken Automaton | Malfunction | Every 3rd turn | 50% chance to skip turn, 50% chance for +5 Power attack |
| Stone Sentry | Immovable | Always | Immune to Prone |
| Brass Beetle | Pincer Grip | On Crit | Applies Rooted (no physical abilities, 2 turns) |
| Clay Servant | Reshape | Below 50% HP (once) | Heals 15 HP |
| Gear Spider | Chain Web | Every 4th turn | Applies Rooted (no physical abilities, 2 turns) |

### Minion Tier Constructs

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Clockwork Soldier | 5 | 16 | 15 | 5 | 6 | 12 | 11 | 90 | Slashing | 14 | Stronghold, City, Ruin |
| Bronze Guardian | 6 | 15 | 18 | 5 | 7 | 10 | 9 | 108 | Bludgeoning | 16 | Ruin, Stronghold, Earth |
| Forge Elemental | 6 | 17 | 14 | 6 | 8 | 13 | 12 | 84 | Fire | 16 | Fire, Ruin, Stronghold |
| Animated Statue | 5 | 14 | 16 | 4 | 6 | 9 | 8 | 96 | Bludgeoning | 14 | City, Ruin, Stronghold |
| Steam Drone | 7 | 15 | 12 | 6 | 7 | 14 | 15 | 72 | Fire | 17 | City, Stronghold, Fire |
| Crystal Sentinel | 7 | 16 | 16 | 7 | 9 | 13 | 11 | 96 | Arcane | 18 | Ruin, Earth, Stronghold |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Clockwork Soldier | Precision Strike | Always | +3 Acuity |
| Bronze Guardian | Defensive Protocol | Below 50% HP | +5 Toughness for remainder of fight |
| Forge Elemental | Molten Touch | On hit | Hero takes 3 Fire damage per turn for 2 turns |
| Animated Statue | Stone Form | Every 4th turn | Skips turn but takes -50% damage until next turn |
| Steam Drone | Pressure Vent | Every 3rd turn | Unavoidable Fire attack |
| Crystal Sentinel | Refract | On Crit | Next attack hits twice (light splitting) |

### Elite Tier Constructs

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Clockwork Knight | 9 | 20 | 19 | 6 | 8 | 16 | 14 | 152 | Slashing | 36 | Stronghold, Ruin, City |
| Iron Golem | 10 | 24 | 24 | 5 | 7 | 12 | 10 | 192 | Bludgeoning | 38 | Ruin, Stronghold, Earth |
| Colossal Gargoyle | 11 | 22 | 21 | 7 | 9 | 15 | 16 | 168 | Slashing | 41 | Ruin, Stronghold, City |
| Furnace Guardian | 12 | 25 | 22 | 6 | 10 | 14 | 12 | 176 | Fire | 43 | Fire, Stronghold, Ruin |
| Arcane Engine | 13 | 21 | 18 | 10 | 12 | 18 | 14 | 144 | Arcane | 43 | Ruin, Stronghold, City |
| Living Ballista | 14 | 26 | 20 | 6 | 8 | 20 | 13 | 160 | Piercing | 43 | Stronghold, Ruin, City |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Clockwork Knight | Combat Protocols | Start of combat | +4 Power, +4 Acuity for 3 turns |
| Iron Golem | Unstoppable | Always | Immune to Rooted, Prone, and Crippled |
| Colossal Gargoyle | Stone Dive | Every 4th turn | Unavoidable attack, applies Prone |
| Furnace Guardian | Meltdown | Below 25% HP | Hero takes 12 Fire damage per turn |
| Arcane Engine | Spell Barrage | Every 3rd turn | Attacks twice with Arcane damage |
| Living Ballista | Siege Mode | Below 50% HP | +10 Power, -5 Instinct (immobile but deadly) |

### Construct Champions

#### Damascus, Sentinel Prime

*Location: The First Vigil (The Scrapyards)*

| Stat | Value |
|------|-------|
| Level | 14 |
| Power | 28 |
| Toughness | 30 |
| Brilliance | 8 |
| Spirit | 10 |
| Acuity | 20 |
| Instinct | 16 |
| HP | 300 |
| Damage Type | Slashing |
| Base XP | 106 |

**Description:** The first and greatest of the Sentinel line, Damascus has guarded the outer reaches of the Clockwork Wastes for millennia. Its creators are dust, their civilization forgotten, but Damascus remains — endlessly patrolling, endlessly vigilant. It does not know its purpose is meaningless. It would not care if it did.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Eternal Vigilance | Always | Immune to Weakened and Dazed |
| Guardian Protocol | Start of combat | +6 Toughness for 4 turns |
| Sentinel Strike | Every 3rd turn | Unavoidable attack, applies Crippled (-1 AP, 3 turns) |
| Last Directive | Below 25% HP | +8 Power, attacks twice per turn |

#### Ironclad the Unbreaking

*Location: The Sieged Halls (Automata, The Brass Citadel) — Gates access to Torque, The Bronze Warden*

| Stat | Value |
|------|-------|
| Level | 16 |
| Power | 32 |
| Toughness | 34 |
| Brilliance | 6 |
| Spirit | 8 |
| Acuity | 18 |
| Instinct | 14 |
| HP | 360 |
| Damage Type | Bludgeoning |
| Base XP | 127 |

**Description:** Built to break sieges, Ironclad earned its title across a hundred forgotten wars. Walls crumbled before it. Armies scattered. When the wars ended, Ironclad did not stop — it simply found new walls to break. Now it guards the approach to Torque's domain, an immovable object that has never known defeat.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Unbreaking | Always | -25% damage from all physical attacks |
| Siege Hammer | Every 4th turn | Unavoidable attack, applies Prone and Dazed |
| Repair Protocol | Every 5th turn | Heals 40 HP |
| Fortress Mode | Below 50% HP | +10 Toughness, -5 Instinct permanently |

#### Axiom, the Perfect Machine

*Location: Axiom's Chamber (The Grand Manufactory) — Gates access to Zoloss, The Living Citadel*

| Stat | Value |
|------|-------|
| Level | 17 |
| Power | 30 |
| Toughness | 28 |
| Brilliance | 14 |
| Spirit | 12 |
| Acuity | 26 |
| Instinct | 22 |
| HP | 320 |
| Damage Type | Arcane, Slashing |
| Base XP | 127 |

**Description:** The pinnacle of construct design, Axiom was built to be flawless — and it is. Every movement calculated, every strike precise, every defense optimal. It serves as Zoloss's herald and enforcer, the perfect extension of the Living Citadel's will. To face Axiom is to face mathematical certainty of defeat.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Calculated Precision | Always | +5 Acuity; Crits deal ×2.5 damage instead of ×2 |
| Optimal Targeting | Start of combat | First attack is guaranteed Crit |
| Efficiency Protocol | On Crit | Heals 20 HP (energy reclamation) |
| Perfect Defense | Below 25% HP | -40% damage from all sources |

### Construct Mini-Boss: Torque, The Bronze Warden

*Location: The Bronze Sanctum (Automata, The Brass Citadel)*

| Stat | Value |
|------|-------|
| Level | 18 |
| Power | 38 |
| Toughness | 42 |
| Brilliance | 10 |
| Spirit | 14 |
| Acuity | 24 |
| Instinct | 18 |
| HP | 620 |
| Damage Type | Bludgeoning |
| Base XP | 300 |
| Remnant | The Warden's Cog |

**Description:** Torque was built to protect the great artificers of the old civilization. When they fell, Torque did not. For ten thousand years, the Bronze Warden has maintained its vigil over workshops filled with dust and forges long cold. It does not grieve. It does not question. It simply endures, waiting for masters who will never return.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Bronze Bulwark | Always | -30% damage from all physical attacks |
| Warden's Judgment | Every 4th turn | Unavoidable attack, applies Crippled and Prone |
| Emergency Repair | Every 5th turn | Heals 50 HP |
| Overcharge | Below 50% HP | +8 Power, +8 Toughness permanently |
| Final Protocol | Below 25% HP | Attacks twice per turn, all attacks apply Dazed |
| Warden's Last Stand | On death (once) | One unavoidable attack at ×3 damage |

### Construct Boss: Zoloss, The Living Citadel

*Location: The God Engine (The Grand Manufactory)*

| Stat | Value |
|------|-------|
| Level | 20 |
| Power | 48 |
| Toughness | 52 |
| Brilliance | 18 |
| Spirit | 20 |
| Acuity | 30 |
| Instinct | 22 |
| HP | 1040 |
| Damage Type | Bludgeoning, Arcane |
| Base XP | 720 |
| Remnant | The Geode of Zylos |

**Description:** Zoloss is not merely a construct — it is architecture given will. A walking fortress of bronze and stone, it was the masterwork of an entire civilization, their legacy made manifest. When that civilization fell, Zoloss became its tomb, carrying the bodies of its creators within its hollow halls. It is a monument, a mausoleum, and a god of gears and grinding stone.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Citadel Presence | Start of combat | Hero's Power reduced by 8 for entire fight |
| Living Architecture | Always | -35% damage from all sources |
| Grinding Gears | On hit | 25% chance to apply Crippled (-1 AP, 3 turns) |
| Siege Bombardment | Every 5th turn | Unavoidable attack, applies Prone and Dazed |
| Reconstruction | Above 50% HP | Heals 30 HP per turn |
| Citadel Awakens | Below 50% HP | +12 Power, attacks twice per turn |
| Crumbling Collapse | Below 25% HP | Hero takes 15 Bludgeoning damage per turn (falling debris) |

### Construct Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 38 (avg 6.3 each) |
| Minion | 6 | 95 (avg 15.8 each) |
| Elite | 6 | 244 (avg 40.7 each) |
| Champion | 3 | 360 (avg 120 each) |
| Mini-Boss | 1 | 300 |
| Boss | 1 | 720 |
| **Total** | **23** | — |

## 7.13 Undead Bestiary

The Undead category represents reanimated corpses, restless spirits, and creatures that refuse to stay dead. From mindless skeletons to ancient liches, the Undead are echoes of mortality — hatred, regret, and dark magic given form beyond the grave.

**Undead Category Traits:**
- **Combat Focus:** High Defense (Toughness/Spirit) & Spiritual Attacks
- **Weaknesses:** Arcane, Air
- **Resistance:** Piercing
- **Immunity:** Bludgeoning
- **Difficulty Tier:** 3 (×1.2 stat modifier)

**Primary Biomes:** Temple, Cursed, Underdark, Tower, Crypt

### Trash Tier Undead

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Skeleton | 1 | 10 | 10 | 4 | 6 | 8 | 9 | 50 | Slashing | 5 | Crypt, Cursed, Temple |
| Crawling Claw | 2 | 9 | 8 | 4 | 5 | 12 | 14 | 40 | Slashing | 6 | Crypt, Tower, Cursed |
| Will-o-Wisp | 2 | 8 | 6 | 6 | 8 | 11 | 16 | 30 | Arcane | 6 | Cursed, Temple, Crypt |
| Skeletal Hound | 3 | 12 | 10 | 4 | 6 | 10 | 12 | 50 | Piercing | 7 | Crypt, Cursed, Temple |
| Grave Mist | 3 | 10 | 8 | 5 | 9 | 9 | 13 | 40 | Necrotic | 7 | Crypt, Cursed, Temple |
| Corpse Puppet | 4 | 13 | 12 | 5 | 7 | 10 | 10 | 60 | Bludgeoning | 7 | Cursed, Crypt, Tower |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Skeleton | Reassemble | On death (once) | If killing blow < 2× remaining HP, survives with 1 HP |
| Crawling Claw | Skitter | Always | +4 Instinct |
| Will-o-Wisp | Lure | Start of combat | Hero's first attack misses (misdirection) |
| Skeletal Hound | Reassemble | On death (once) | If killing blow < 2× remaining HP, survives with 1 HP |
| Grave Mist | Chilling Touch | On hit | Hero takes 2 Necrotic damage per turn for 2 turns |
| Corpse Puppet | Strings of Darkness | Below 50% HP | +4 Power (puppet master panics) |

### Minion Tier Undead

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Skeletal Warrior | 5 | 15 | 14 | 5 | 7 | 12 | 11 | 84 | Slashing | 14 | Crypt, Temple, Tower |
| Ghoul | 5 | 16 | 12 | 5 | 6 | 14 | 15 | 72 | Slashing | 14 | Crypt, Cursed, Underdark |
| Specter | 6 | 14 | 10 | 7 | 12 | 15 | 16 | 60 | Necrotic | 16 | Temple, Cursed, Crypt |
| Draugr | 6 | 17 | 16 | 5 | 8 | 11 | 10 | 96 | Slashing | 16 | Crypt, Temple, Underdark |
| Wight | 7 | 16 | 15 | 6 | 10 | 14 | 13 | 90 | Necrotic | 17 | Crypt, Temple, Tower |
| Mummy | 7 | 18 | 18 | 5 | 9 | 10 | 9 | 108 | Bludgeoning | 18 | Temple, Crypt, Tower |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Skeletal Warrior | Reassemble | On death (once) | If killing blow < 2× remaining HP, survives with 1 HP |
| Ghoul | Paralyzing Touch | On Crit | Applies Rooted (no physical abilities, 2 turns) |
| Specter | Life Drain | On hit | Heals 5 HP per successful attack |
| Draugr | Grave Bound | Below 25% HP | +5 Power, +5 Toughness (refuses to fall) |
| Wight | Soul Siphon | On Crit | Applies Weakened (-5 all stats, 3 turns) |
| Mummy | Mummy's Curse | On hit | 25% chance to apply Weakened (-5 all stats, 2 turns) |

### Elite Tier Undead

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Skeletal Knight | 9 | 20 | 18 | 6 | 9 | 15 | 13 | 144 | Slashing | 36 | Crypt, Temple, Tower |
| Wraith | 10 | 22 | 14 | 8 | 14 | 18 | 20 | 112 | Necrotic | 38 | Cursed, Temple, Crypt |
| Mummy Lord | 11 | 24 | 22 | 7 | 14 | 16 | 12 | 176 | Bludgeoning | 41 | Temple, Crypt, Tower |
| Bonetower | 12 | 26 | 24 | 5 | 8 | 12 | 10 | 192 | Bludgeoning | 43 | Crypt, Temple, Underdark |
| Crypt Thing | 13 | 20 | 18 | 10 | 16 | 20 | 18 | 144 | Arcane | 43 | Crypt, Temple, Tower |
| Lich's Apprentice | 14 | 22 | 16 | 12 | 18 | 22 | 17 | 128 | Arcane | 43 | Tower, Temple, Crypt |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Skeletal Knight | Reassemble | On death (once) | If killing blow < 2× remaining HP, survives with 1 HP |
| Wraith | Incorporeal | Always | -25% damage from physical attacks |
| Mummy Lord | Pharaoh's Curse | Start of combat | Hero takes 6 Necrotic damage per turn |
| Bonetower | Bone Storm | Every 4th turn | Unavoidable attack, applies Bleeding |
| Crypt Thing | Scatter | Every 5th turn | Hero skips next turn (teleported away) |
| Lich's Apprentice | Dark Magic | Every 3rd turn | Attacks twice with Arcane damage |

### Undead Champions

#### Castavius, The Ivory King

*Location: The Bone Marshal's Seat (The Fallen Front)*

| Stat | Value |
|------|-------|
| Level | 14 |
| Power | 28 |
| Toughness | 26 |
| Brilliance | 10 |
| Spirit | 14 |
| Acuity | 20 |
| Instinct | 16 |
| HP | 300 |
| Damage Type | Slashing |
| Base XP | 106 |

**Description:** In life, Castavius was a general who won a hundred battles. In death, he commands the Fallen Legion — an army of skeletal warriors that marches eternally through the Hollow Kingdom. The Ivory King sits upon a throne of bones, still issuing orders to soldiers who died centuries ago, still fighting a war that ended long before.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Ivory Reassemble | On death (once) | If killing blow < 2× remaining HP, survives with 25% max HP |
| Legion's Discipline | Always | Immune to Weakened and Dazed |
| Commander's Strike | Every 3rd turn | Unavoidable attack, applies Crippled (-1 AP, 3 turns) |
| Rally the Fallen | Below 50% HP | +6 Power, +6 Toughness for remainder of fight |

#### Lady Morwen, Grief Eternal

*Location: The Lady's Chamber (The Weeping Estate) — Gates access to Lenore, The Banshee Queen*

| Stat | Value |
|------|-------|
| Level | 16 |
| Power | 26 |
| Toughness | 20 |
| Brilliance | 12 |
| Spirit | 20 |
| Acuity | 24 |
| Instinct | 22 |
| HP | 320 |
| Damage Type | Necrotic, Arcane |
| Base XP | 127 |

**Description:** Lady Morwen watched her children die, her husband murdered, her house burned. Her grief was so profound that death could not contain it. Now she wanders the halls of her ruined estate, weeping tears that freeze the living and wailing songs that stop hearts. Her sorrow is contagious — those who hear it feel her loss as their own.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aura of Grief | Start of combat | Hero's Spirit reduced by 6 for entire fight |
| Mournful Wail | Every 4th turn | Applies Weakened (2 turns) + 20 Necrotic damage |
| Incorporeal | Always | -30% damage from physical attacks |
| Eternal Sorrow | Below 25% HP | All attacks apply Weakened (-5 all stats, 3 turns) |

#### Archmagus Vexar, the Undying

*Location: The Apprentice's Throne (The Lichspire) — Gates access to Zantus, The First Mortal*

| Stat | Value |
|------|-------|
| Level | 17 |
| Power | 24 |
| Toughness | 20 |
| Brilliance | 18 |
| Spirit | 22 |
| Acuity | 28 |
| Instinct | 20 |
| HP | 340 |
| Damage Type | Arcane, Necrotic |
| Base XP | 127 |

**Description:** Vexar sought lichdom and found it — but not perfection. His phylactery is flawed, his transformation incomplete. He serves Zantus in hopes of learning the secret to true immortality, guarding his master's sanctum with bitter determination. Vexar is proof that even failed lichdom grants terrible power.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Necrotic Mastery | Always | Hero takes 8 Necrotic damage per turn |
| Soul Rend | On Crit | Applies Weakened and Bleeding |
| Dark Restoration | Every 5th turn | Heals 50 HP |
| Desperate Immortality | Below 25% HP | -40% damage from all sources |

### Undead Mini-Boss: Lenore, The Banshee Queen

*Location: Lenore's Lament (The Weeping Estate)*

| Stat | Value |
|------|-------|
| Level | 18 |
| Power | 34 |
| Toughness | 28 |
| Brilliance | 14 |
| Spirit | 26 |
| Acuity | 30 |
| Instinct | 26 |
| HP | 580 |
| Damage Type | Necrotic, Arcane |
| Base XP | 300 |
| Remnant | The Wailing Crown |

**Description:** Lenore was a queen whose kingdom fell to treachery. Her death scream echoed for three days, and when it finally faded, she rose as something worse than a ghost. The Banshee Queen rules a court of spirits, her wail commanding the restless dead. To hear her voice is to know despair; to meet her gaze is to glimpse your own death.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Queen's Lament | Start of combat | Hero's Power and Spirit reduced by 6 for entire fight |
| Banshee's Wail | Every 4th turn | Unavoidable attack, applies Weakened and Dazed |
| Incorporeal Majesty | Always | -35% damage from physical attacks |
| Spirit Court | Every 5th turn | Heals 40 HP (spirits attend her) |
| Deathly Crescendo | Below 50% HP | +10 Power, attacks twice per turn |
| Final Scream | Below 25% HP | Hero takes 15 Necrotic damage per turn |

### Undead Boss: Zantus, The First Mortal

*Location: The Origin of Death (The Lichspire)*

| Stat | Value |
|------|-------|
| Level | 20 |
| Power | 46 |
| Toughness | 40 |
| Brilliance | 22 |
| Spirit | 30 |
| Acuity | 34 |
| Instinct | 24 |
| HP | 1000 |
| Damage Type | Arcane, Necrotic |
| Base XP | 720 |
| Remnant | The Phylactery of Zantus |

**Description:** Zantus was the first mortal to conquer death. Ten thousand years ago, he completed the ritual of lichdom and has ruled from the shadows ever since. Empires have risen and fallen; Zantus endures. The Hollow Kingdom is merely his latest throne — a nation of the dead, ruled by the first among them. His phylactery holds a soul so ancient it has forgotten what living felt like.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aura of Undeath | Start of combat | Hero's Power, Toughness, and Spirit reduced by 6 for entire fight |
| Phylactery Link | Always | Heals 25 HP per turn while above 50% HP |
| Death's Touch | On hit | 30% chance to apply Weakened (-5 all stats, 3 turns) |
| Necrotic Barrage | Every 4th turn | Attacks three times with Arcane damage |
| First Among Dead | Below 50% HP | +14 Power, attacks twice per turn |
| Immortal Will | Below 25% HP (once) | Fully heals to 50% HP (phylactery pulses) |
| Endless Dominion | Below 25% HP | Hero takes 20 Necrotic damage per turn |

### Undead Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 38 (avg 6.3 each) |
| Minion | 6 | 95 (avg 15.8 each) |
| Elite | 6 | 244 (avg 40.7 each) |
| Champion | 3 | 360 (avg 120 each) |
| Mini-Boss | 1 | 300 |
| Boss | 1 | 720 |
| **Total** | **23** | — |

## 7.14 Magical Beast Bestiary

The Magical Beast category represents magic-enhanced animals and legendary creatures. These are not mere beasts — they are nature perfected by arcane forces. Griffons rule the skies, chimeras stalk the highlands, and phoenixes burn eternal.

**Magical Beast Category Traits:**
- **Combat Focus:** High Power/Toughness/Brilliance (Elemental Focus)
- **Weaknesses:** Earth, Arcane
- **Resistance:** Air
- **Immunity:** Fire
- **Difficulty Tier:** 4 (×1.3 stat modifier)

**Primary Biomes:** Bluff, River, Lake, Air, Coast

### Trash Tier Magical Beasts

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Stormling | 1 | 9 | 8 | 6 | 6 | 10 | 14 | 40 | Lightning | 5 | Air, Bluff, Coast |
| Reef Hatchling | 1 | 11 | 10 | 5 | 5 | 9 | 11 | 50 | Piercing | 5 | Coast, River, Lake |
| Hippogriff Fledgling | 2 | 12 | 11 | 5 | 6 | 10 | 12 | 55 | Slashing | 6 | Air, Bluff, Coast |
| Ember Sprite | 3 | 10 | 8 | 7 | 7 | 12 | 15 | 40 | Fire | 7 | Bluff, Coast, River |
| Blink Hound | 3 | 13 | 10 | 5 | 6 | 11 | 16 | 50 | Piercing | 8 | Bluff, River, Lake |
| Wind Serpent | 4 | 14 | 11 | 6 | 7 | 13 | 17 | 55 | Air | 8 | Air, Bluff, Coast |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Stormling | Static Discharge | On death | Deals 8 Lightning damage to Hero |
| Reef Hatchling | Slippery | Always | +4 Instinct |
| Hippogriff Fledgling | Fledgling Flight | Below 50% HP | +4 Instinct (takes to the air) |
| Ember Sprite | Flickering Form | Every 3rd turn | 50% chance to avoid attack entirely |
| Blink Hound | Phase Step | Every 4th turn | Next attack is unavoidable |
| Wind Serpent | Wind Rider | Always | Immune to Prone |

### Minion Tier Magical Beasts

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Hippogriff | 5 | 18 | 16 | 6 | 8 | 14 | 16 | 96 | Slashing | 17 | Air, Bluff, River |
| Sea Serpent | 5 | 19 | 18 | 5 | 7 | 12 | 13 | 108 | Piercing | 17 | Coast, Lake, River |
| Chimera | 6 | 20 | 17 | 7 | 8 | 15 | 14 | 102 | Fire, Slashing | 19 | Bluff, River, Coast |
| Pegasus | 6 | 16 | 14 | 8 | 10 | 16 | 18 | 84 | Bludgeoning | 19 | Air, Bluff, Lake |
| Thunder Eel | 7 | 18 | 15 | 6 | 8 | 17 | 16 | 90 | Lightning | 20 | River, Lake, Coast |
| Kelpie | 7 | 19 | 16 | 7 | 9 | 15 | 17 | 96 | Necrotic | 21 | Lake, River, Coast |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Hippogriff | Diving Strike | Every 3rd turn | Unavoidable attack, applies Prone |
| Sea Serpent | Constrict | On Crit | Applies Rooted (no physical abilities, 2 turns) |
| Chimera | Triple Threat | Always | Attacks deal randomized damage type (Fire, Slashing, or Poison) |
| Pegasus | Grace of Wind | Always | -20% damage from physical attacks |
| Thunder Eel | Shocking Grasp | On hit | Hero takes 4 Lightning damage per turn for 2 turns |
| Kelpie | Drowning Lure | Every 4th turn | Applies Dazed and Rooted (2 turns) |

### Elite Tier Magical Beasts

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Elder Hippogriff | 9 | 24 | 20 | 8 | 10 | 18 | 20 | 160 | Slashing | 42 | Air, Bluff, Coast |
| Storm Raptor | 10 | 26 | 18 | 9 | 11 | 20 | 22 | 144 | Lightning | 44 | Air, Bluff, Coast |
| Sphinx | 11 | 22 | 20 | 14 | 16 | 22 | 18 | 160 | Arcane | 47 | Bluff, Coast, Air |
| Roc | 12 | 30 | 26 | 6 | 10 | 16 | 14 | 208 | Slashing | 49 | Air, Bluff, Coast |
| Dire Manticore | 13 | 28 | 22 | 8 | 12 | 22 | 20 | 176 | Piercing, Poison | 49 | Bluff, Coast, Air |
| Chimera Leviathan | 14 | 32 | 28 | 10 | 14 | 18 | 16 | 224 | Fire, Piercing | 52 | Coast, Lake, River |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Elder Hippogriff | Veteran's Dive | Every 3rd turn | Unavoidable attack, applies Prone and Bleeding |
| Storm Raptor | Call Lightning | Every 4th turn | Unavoidable Lightning attack + applies Dazed |
| Sphinx | Riddle | Start of combat | Hero's Brilliance reduced by 6 for entire fight |
| Roc | Snatch | Every 5th turn | Unavoidable attack at ×1.5 damage, applies Prone |
| Dire Manticore | Spike Volley | Every 3rd turn | Attacks twice, each hit has 50% chance to apply Poisoned (5 damage/turn) |
| Chimera Leviathan | Three Heads of Ruin | Always | Attacks three times per turn (Fire, Piercing, Piercing) at -30% damage each |

### Magical Beast Champions

#### Scylla, the Reef Terror

*Location: The Coastal Throne (The Windward Coast)*

| Stat | Value |
|------|-------|
| Level | 15 |
| Power | 32 |
| Toughness | 28 |
| Brilliance | 10 |
| Spirit | 12 |
| Acuity | 22 |
| Instinct | 18 |
| HP | 340 |
| Damage Type | Piercing, Poison |
| Base XP | 120 |

**Description:** Scylla has ruled the coastal reefs for centuries, dragging ships to their doom and feasting on sailors foolish enough to swim her waters. Part serpent, part nightmare, she is a tangle of coils and fangs that strikes from beneath the waves. The reef itself is her weapon — she knows every crevice, every current, every shadow where death waits.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Reef Lord | Always | +5 Instinct when fighting in coastal/water areas |
| Coiling Grasp | On Crit | Applies Rooted and Bleeding |
| Tidal Ambush | Every 4th turn | Unavoidable attack at ×1.5 damage |
| Venomous Bite | On hit | 30% chance to apply Poisoned (6 damage/turn, 3 turns) |

#### Zephyros, the Cloud Stalker

*Location: Perch of the Windy King (The Highcliffs) — Gates access to Aetherius, Sky Captain*

| Stat | Value |
|------|-------|
| Level | 17 |
| Power | 34 |
| Toughness | 26 |
| Brilliance | 12 |
| Spirit | 14 |
| Acuity | 26 |
| Instinct | 28 |
| HP | 380 |
| Damage Type | Slashing, Air |
| Base XP | 143 |

**Description:** Zephyros is the greatest hippogriff ever to ride the mountain winds. For decades, he has dominated The Highcliffs, challenging any aerial creature that dares enter his territory. He serves as Aetherius's lieutenant, leading hunting flights against those who threaten the Sky Captain's domain. To face Zephyros is to fight the wind itself.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Wind Mastery | Always | Immune to Air damage; -25% damage from physical attacks |
| Cloud Strike | Every 3rd turn | Unavoidable attack, applies Prone and Dazed |
| Gale Force | Start of combat | Hero's Instinct reduced by 6 for entire fight |
| Desperate Dive | Below 25% HP | +10 Power, attacks twice per turn |

#### Cinderfang, the Magma Wyrm

*Location: The Ember Throne (The Ember Caldera) — Gates access to A'layr, The Emberglow Phoenix*

| Stat | Value |
|------|-------|
| Level | 18 |
| Power | 38 |
| Toughness | 32 |
| Brilliance | 14 |
| Spirit | 16 |
| Acuity | 24 |
| Instinct | 20 |
| HP | 420 |
| Damage Type | Fire, Piercing |
| Base XP | 143 |

**Description:** Born in the volcanic depths of the Ember Caldera, Cinderfang is a serpent of living magma. Where he crawls, stone melts. Where he breathes, air ignites. He serves A'layr as guardian and herald, ensuring only the worthy reach the phoenix's eternal nest. Cinderfang has never known cold, never known defeat, and never shown mercy.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Molten Body | Always | Hero takes 6 Fire damage per turn (proximity heat) |
| Magma Breath | Every 4th turn | Unavoidable Fire attack, applies Burning (8 damage/turn, 3 turns) |
| Volcanic Hide | Always | -30% damage from physical attacks |
| Eruption | Below 25% HP | +12 Power; all attacks deal Fire damage and apply Burning |

### Magical Beast Mini-Boss: Aetherius, Sky Captain

*Location: The Storm Crown (Stormspire)*

| Stat | Value |
|------|-------|
| Level | 19 |
| Power | 42 |
| Toughness | 36 |
| Brilliance | 16 |
| Spirit | 18 |
| Acuity | 32 |
| Instinct | 30 |
| HP | 680 |
| Damage Type | Lightning, Slashing |
| Base XP | 330 |
| Remnant | The Stormfeather Pinion |

**Description:** Aetherius is the undisputed lord of the skies — a griffon of impossible size whose wings generate thunderstorms and whose cry shatters stone. He has ruled the Stormspire since before human memory, commanding all aerial creatures in The Savage Wilds. Those who challenge him do not merely fight a beast; they challenge the storm itself.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Storm Lord | Start of combat | Hero's Acuity and Instinct reduced by 6 for entire fight |
| Thunder Wings | Always | -30% damage from Air and Lightning attacks |
| Lightning Dive | Every 4th turn | Unavoidable attack, applies Prone, Dazed, and Bleeding |
| Call the Storm | Every 5th turn | Hero takes 20 Lightning damage (unavoidable) |
| Sky Fury | Below 50% HP | +10 Power, +10 Instinct; attacks twice per turn |
| Final Thunder | Below 25% HP | All attacks apply Dazed; Lightning Dive deals ×2 damage |

### Magical Beast Boss: A'layr, The Emberglow Phoenix

*Location: The Eternal Nest (The Ember Caldera)*

| Stat | Value |
|------|-------|
| Level | 21 |
| Power | 52 |
| Toughness | 44 |
| Brilliance | 24 |
| Spirit | 28 |
| Acuity | 36 |
| Instinct | 30 |
| HP | 1150 |
| Damage Type | Fire, Arcane |
| Base XP | 780 |
| Remnant | A Single Phoenix Tear |

**Description:** A'layr is eternal. The Emberglow Phoenix has burned since before the first kingdoms rose, and will burn long after the last crumbles to dust. Its flames are not mere fire — they are the essence of renewal, of destruction that brings creation. To slay A'layr is impossible; it can only be reduced to ash, and from that ash, it will rise again. The only victory is survival.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aura of Flame | Start of combat | Hero takes 10 Fire damage per turn for entire fight |
| Eternal Fire | Always | Immune to Fire damage; heals 20 HP from Fire attacks |
| Purifying Blaze | Every 4th turn | Unavoidable Fire attack, removes all buffs from Hero |
| Wings of Dawn | Always | -35% damage from all sources |
| Phoenix Fury | Below 50% HP | +14 Power; attacks twice per turn |
| Rebirth | On death (once) | Returns with 40% HP after 2 turns; Hero takes 30 Fire damage |
| Final Conflagration | Below 25% HP | All attacks apply Burning (12 damage/turn); Purifying Blaze hits every 3rd turn |

### Magical Beast Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 39 (avg 6.5 each) |
| Minion | 6 | 113 (avg 18.8 each) |
| Elite | 6 | 283 (avg 47.2 each) |
| Champion | 3 | 406 (avg 135 each) |
| Mini-Boss | 1 | 330 |
| Boss | 1 | 780 |
| **Total** | **23** | — |

## 7.15 Dragon Bestiary

The Dragon category represents the apex predators of Avandria. Dragons are not merely monsters — they are forces of nature, ancient beyond reckoning, each one a catastrophe waiting to happen. From young drakes to the Obsidian King himself, dragons represent the ultimate challenge.

**Dragon Category Traits:**
- **Combat Focus:** Extreme Stats (All-Round Dominance)
- **Weaknesses:** Ice, Piercing
- **Resistance:** Slashing
- **Immunity:** Arcane
- **Difficulty Tier:** 5 (×1.4 stat modifier)

**Primary Biomes:** Mountain, Volcano, Cave, Hoard, Stronghold

### Trash Tier Dragons

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Kobold Servant | 1 | 8 | 8 | 5 | 5 | 10 | 14 | 40 | Piercing | 6 | Cave, Mountain, Stronghold |
| Drake Hatchling | 2 | 12 | 11 | 5 | 6 | 10 | 12 | 55 | Slashing | 7 | Mountain, Cave, Volcano |
| Ash Crawler | 2 | 10 | 12 | 6 | 7 | 9 | 11 | 60 | Fire | 7 | Volcano, Cave, Mountain |
| Ember Wyrm | 3 | 13 | 10 | 7 | 7 | 12 | 15 | 50 | Fire | 8 | Volcano, Cave, Hoard |
| Kobold Firebrand | 3 | 9 | 9 | 8 | 8 | 13 | 14 | 45 | Fire | 8 | Cave, Mountain, Stronghold |
| Scaled Sentinel | 4 | 14 | 14 | 6 | 8 | 11 | 12 | 70 | Slashing | 9 | Stronghold, Hoard, Cave |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Kobold Servant | Trap Setter | Start of combat | Hero takes 8 damage (trap triggered) |
| Drake Hatchling | Pack Hunter | Always | +3 Power for each other Drake in area (flavor) |
| Ash Crawler | Heat Aura | Always | Hero takes 2 Fire damage per turn |
| Ember Wyrm | Burrow Strike | Every 4th turn | Next attack is unavoidable |
| Kobold Firebrand | Fire Bolt | Every 3rd turn | Ranged Fire attack at +4 Power |
| Scaled Sentinel | Shield Wall | Below 50% HP | +5 Toughness for remainder of fight |

### Minion Tier Dragons

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Fire Drake | 5 | 20 | 18 | 6 | 8 | 14 | 14 | 108 | Fire, Slashing | 20 | Mountain, Volcano, Cave |
| Wyvern | 5 | 19 | 16 | 5 | 7 | 16 | 18 | 96 | Piercing, Poison | 20 | Mountain, Cave, Stronghold |
| Dragon Cultist | 6 | 16 | 14 | 10 | 12 | 18 | 15 | 84 | Fire | 22 | Stronghold, Cave, Hoard |
| Kobold Warrior | 6 | 17 | 16 | 6 | 8 | 14 | 16 | 96 | Slashing | 22 | Cave, Stronghold, Mountain |
| Lesser Dragon | 7 | 22 | 20 | 8 | 10 | 16 | 16 | 120 | Fire, Slashing | 24 | Cave, Mountain, Hoard |
| Dracolisk | 7 | 20 | 18 | 7 | 9 | 17 | 15 | 108 | Piercing | 24 | Cave, Mountain, Volcano |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Fire Drake | Flame Breath | Every 4th turn | Unavoidable Fire attack |
| Wyvern | Venomous Sting | On Crit | Applies Poisoned (8 damage/turn, 3 turns) |
| Dragon Cultist | Fanatical Flame | Below 25% HP | +8 Power, all attacks deal Fire damage |
| Kobold Warrior | Dirty Fighting | On Crit | Applies Dazed (2 turns) |
| Lesser Dragon | Wing Buffet | Every 3rd turn | Applies Prone and Dazed |
| Dracolisk | Petrifying Gaze | Every 5th turn | Applies Rooted (no physical abilities, 3 turns) |

### Elite Tier Dragons

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Dragon Knight | 9 | 26 | 24 | 8 | 10 | 18 | 16 | 192 | Slashing, Fire | 50 | Stronghold, Mountain, Hoard |
| Volcanic Wyrm | 10 | 28 | 22 | 10 | 12 | 20 | 18 | 176 | Fire | 53 | Volcano, Cave, Mountain |
| Dragon | 12 | 34 | 30 | 12 | 14 | 22 | 20 | 240 | Fire, Slashing | 59 | Cave, Mountain, Hoard |
| Dragon Priest | 11 | 24 | 20 | 14 | 18 | 24 | 17 | 160 | Fire, Arcane | 56 | Stronghold, Hoard, Cave |
| Basalisk | 13 | 30 | 28 | 8 | 12 | 20 | 16 | 224 | Piercing | 56 | Cave, Mountain, Volcano |
| Obsidian Colossus | 14 | 36 | 34 | 6 | 10 | 16 | 12 | 272 | Bludgeoning, Fire | 59 | Hoard, Stronghold, Volcano |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Dragon Knight | Dragonsworn | Always | Immune to Fire damage; +4 Power |
| Volcanic Wyrm | Lava Swim | Always | Hero takes 8 Fire damage per turn (ambient heat) |
| Dragon | Terrible Presence | Start of combat | Hero's Power reduced by 6 for entire fight |
| Dragon Priest | Dragonfyre | Every 3rd turn | Unavoidable Fire attack + heals 20 HP |
| Basalisk | Stone Gaze | Every 4th turn | Applies Rooted and Crippled (3 turns) |
| Obsidian Colossus | Volcanic Slam | Every 4th turn | Unavoidable attack, applies Prone and Burning (10 damage/turn) |

### Dragon Champions

#### Fragnar, the Molten One

*Location: Fragnar's Caldera (The Molten Depths)*

| Stat | Value |
|------|-------|
| Level | 16 |
| Power | 36 |
| Toughness | 34 |
| Brilliance | 12 |
| Spirit | 14 |
| Acuity | 22 |
| Instinct | 18 |
| HP | 400 |
| Damage Type | Fire, Bludgeoning |
| Base XP | 140 |

**Description:** Fragnar was once a Fire Drake, but centuries in the volcanic depths transformed him into something more — a creature of living magma, neither flesh nor stone. He serves no master, acknowledges no king, and claims the outer reaches of the Obsidian Dominion as his own. Those who seek Ignis must first survive Fragnar's domain.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Molten Form | Always | Immune to Fire damage; Hero takes 8 Fire damage per turn |
| Magma Burst | Every 4th turn | Unavoidable Fire attack, applies Burning (10 damage/turn, 3 turns) |
| Volcanic Hide | Always | -30% damage from physical attacks |
| Eruption | Below 25% HP | +12 Power; attacks twice per turn |

#### General Pyraxis of the Dragonsworn

*Location: The Helm of Cinderflame (Fortress of the Dragonsworn) — Gates access to Xarthan, the Ashen Wing*

| Stat | Value |
|------|-------|
| Level | 18 |
| Power | 40 |
| Toughness | 36 |
| Brilliance | 14 |
| Spirit | 16 |
| Acuity | 28 |
| Instinct | 22 |
| HP | 460 |
| Damage Type | Slashing, Fire |
| Base XP | 161 |

**Description:** Pyraxis rose from kobold servant to general through sheer devotion to dragonkind. He has bathed in dragon fire, drunk dragon blood, and emerged as something more than mortal. The Dragonsworn — an army of cultists, dragonkin, and lesser drakes — march at his command. He guards the path to Xarthan with the fervor of a true believer.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Dragonsworn Blessing | Always | Immune to Fire damage; +5 all stats |
| Commanding Presence | Start of combat | Hero's Acuity reduced by 8 for entire fight |
| Dragon's Fury | Every 3rd turn | Attacks twice; each hit has 50% chance to apply Burning |
| Zealot's Rage | Below 50% HP | +10 Power, +10 Instinct for remainder of fight |
| Final Command | Below 25% HP | All attacks apply Weakened (2 turns) |

#### Sythara, Daughter of Ash

*Location: Hall of the Ash Princess (The Obsidian Throne) — Gates access to Ignis, the Obsidian King*

| Stat | Value |
|------|-------|
| Level | 19 |
| Power | 44 |
| Toughness | 38 |
| Brilliance | 18 |
| Spirit | 20 |
| Acuity | 30 |
| Instinct | 26 |
| HP | 500 |
| Damage Type | Fire, Arcane |
| Base XP | 161 |

**Description:** Sythara is Ignis's only surviving offspring — the others fell to ambition or were consumed by their father's displeasure. She alone learned patience. She alone proved worthy. Now she guards the path to her father's throne, not out of love, but because she knows that one day, that throne will be hers. Any who wish to face Ignis must first prove themselves against his heir.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Daughter of Fire | Always | Immune to Fire damage; heals 10 HP from Fire attacks |
| Ashfall Breath | Every 4th turn | Unavoidable Fire attack, applies Dazed and Burning |
| Wings of Cinder | Always | -25% damage from all sources |
| Draconic Fury | Below 50% HP | +12 Power, attacks twice per turn |
| Heir's Wrath | Below 25% HP | All attacks deal ×1.5 damage; Ashfall Breath triggers every 3rd turn |

### Dragon Mini-Boss: Xarthan, the Ashen Wing

*Location: Roost of Smoke (Ashreign Spires)*

| Stat | Value |
|------|-------|
| Level | 20 |
| Power | 48 |
| Toughness | 44 |
| Brilliance | 20 |
| Spirit | 22 |
| Acuity | 34 |
| Instinct | 28 |
| HP | 780 |
| Damage Type | Fire, Slashing |
| Base XP | 380 |
| Remnant | The Ashen Scale |

**Description:** Xarthan earned his name in fire — his scales perpetually smolder, his breath leaves nothing but ash, and where he flies, the sky darkens with cinders. He was ancient when human kingdoms were young, and he has burned more cities than history remembers. Ignis tolerates Xarthan because even the Obsidian King values a weapon of such terrible power.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Ashen Aura | Start of combat | Hero takes 12 Fire damage per turn for entire fight |
| Cinder Storm | Always | -35% damage from Air and Fire attacks |
| Ash Breath | Every 4th turn | Unavoidable attack, applies Dazed, Burning, and Weakened |
| Wing Hurricane | Every 5th turn | Unavoidable attack, applies Prone and Dazed |
| Inferno | Below 50% HP | +12 Power, +8 Toughness; attacks twice per turn |
| Rain of Ash | Below 25% HP | All attacks apply Burning (15 damage/turn); Ash Breath triggers every 3rd turn |

### Dragon Boss: Ignis, the Obsidian King

*Location: The Eternal Flame (The Obsidian Throne)*

| Stat | Value |
|------|-------|
| Level | 22 |
| Power | 58 |
| Toughness | 54 |
| Brilliance | 26 |
| Spirit | 28 |
| Acuity | 40 |
| Instinct | 32 |
| HP | 1400 |
| Damage Type | Fire, Arcane, Slashing |
| Base XP | 900 |
| Remnant | Shard of the Obsidian Crown |

**Description:** Ignis is the end of all things. The Obsidian King has ruled the volcanic heart of the world since before the first mortal kingdom rose, and he will rule long after the last crumbles to dust. His scales are volcanic glass, his blood is liquid fire, and his eyes have watched civilizations rise and burn. To challenge Ignis is to challenge inevitability itself. He is not a dragon. He is THE dragon.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aura of the King | Start of combat | Hero's Power, Toughness, and Spirit reduced by 8 for entire fight |
| Obsidian Scales | Always | -40% damage from all sources |
| The King's Flame | Always | Hero takes 15 Fire damage per turn for entire fight |
| Apocalypse Breath | Every 5th turn | Unavoidable attack at ×2 damage, applies Prone and Burning |
| Tail Sweep | Every 3rd turn | Unavoidable attack, applies Bleeding and Crippled |
| Obsidian Fury | Below 50% HP | +16 Power; attacks twice per turn |
| The Crown's Judgment | Below 50% HP | Apocalypse Breath triggers every 4th turn |
| Undying Flame | Below 25% HP (once) | Heals to 35% HP; Hero takes 40 Fire damage |
| Final Reign | Below 25% HP | All attacks apply Burning (20 damage/turn); immune to all status effects |

### Dragon Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 45 (avg 7.5 each) |
| Minion | 6 | 132 (avg 22 each) |
| Elite | 6 | 333 (avg 55.5 each) |
| Champion | 3 | 462 (avg 154 each) |
| Mini-Boss | 1 | 380 |
| Boss | 1 | 900 |
| **Total** | **23** | — |

## 7.16 Faerie Bestiary

The Faerie category represents whimsical, nature-linked trickster creatures of the Feywild. The Fey are not evil — they are *other*. They do not think as mortals do, and their games have rules that only they understand. Beauty and danger walk hand in hand.

**Faerie Category Traits:**
- **Combat Focus:** Evasion (Instinct) & Magic Offense (Brilliance)
- **Weaknesses:** Bludgeoning, Arcane
- **Resistance:** Air
- **Immunity:** Water
- **Difficulty Tier:** 2 (×1.1 stat modifier)

**Primary Biomes:** Arcane, Mountain, Forest, River, Lake

### Trash Tier Faerie

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Pixie | 1 | 6 | 6 | 7 | 8 | 10 | 14 | 30 | Arcane | 5 | Forest, Arcane, Lake |
| Sprite | 1 | 8 | 7 | 6 | 7 | 9 | 13 | 35 | Piercing | 5 | Forest, River, Lake |
| Blink Moth | 2 | 7 | 6 | 8 | 7 | 11 | 16 | 30 | Arcane | 6 | Forest, Arcane, Mountain |
| Twig Blight | 2 | 10 | 9 | 5 | 6 | 8 | 12 | 45 | Piercing | 6 | Forest, River, Mountain |
| Quickling | 4 | 12 | 7 | 6 | 7 | 14 | 18 | 35 | Slashing | 7 | Forest, Arcane, Mountain |
| Bramble Scout | 4 | 11 | 10 | 6 | 8 | 11 | 14 | 50 | Piercing | 7 | Forest, Mountain, Arcane |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Pixie | Invisibility | Every 4th turn | 50% chance to avoid next attack |
| Sprite | Heart Sight | Start of combat | Knows Hero's lowest stat; +2 to attacks targeting it |
| Blink Moth | Disorienting Dust | On hit | 25% chance to apply Dazed (1 turn) |
| Twig Blight | Ambush | First turn | First attack deals ×1.5 damage |
| Quickling | Blinding Speed | Always | +6 Instinct; attacks twice but at -4 Power each |
| Bramble Scout | Thorny Hide | On being hit | Attacker takes 3 Piercing damage |

### Minion Tier Faerie

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Satyr | 5 | 14 | 12 | 10 | 12 | 14 | 16 | 72 | Bludgeoning | 15 | Forest, Mountain, Arcane |
| Dryad | 5 | 12 | 14 | 12 | 14 | 16 | 15 | 84 | Arcane | 15 | Forest, River, Lake |
| Redcap | 6 | 18 | 14 | 6 | 8 | 12 | 14 | 84 | Slashing | 17 | Forest, Mountain, Arcane |
| Spriggan | 6 | 16 | 16 | 8 | 10 | 13 | 13 | 96 | Bludgeoning | 17 | Forest, Mountain, Arcane |
| Thornguard | 7 | 17 | 15 | 8 | 10 | 14 | 15 | 90 | Piercing | 18 | Forest, Arcane, Mountain |
| Gloomstalker | 7 | 15 | 12 | 10 | 12 | 16 | 18 | 72 | Necrotic | 18 | Forest, Arcane, Lake |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Satyr | Panpipes | Every 4th turn | Applies Dazed (2 turns) |
| Dryad | Tree Stride | Every 3rd turn | Heals 15 HP (draws from grove) |
| Redcap | Blood Frenzy | On kill or below 50% HP | +6 Power for remainder of fight |
| Spriggan | Size Shift | Every 4th turn | Alternates: +6 Power/-4 Instinct OR -4 Power/+6 Instinct |
| Thornguard | Briar Lash | On Crit | Applies Rooted and Bleeding |
| Gloomstalker | Shadow Step | Every 3rd turn | Next attack is unavoidable |

### Elite Tier Faerie

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Erlking Hunter | 10 | 22 | 16 | 12 | 14 | 20 | 22 | 128 | Slashing | 39 | Forest, Mountain, Arcane |
| Thorn Knight | 12 | 24 | 22 | 10 | 14 | 18 | 18 | 176 | Piercing | 42 | Forest, Arcane, Mountain |
| Archfey Envoy | 11 | 18 | 14 | 18 | 20 | 22 | 20 | 112 | Arcane | 42 | Arcane, Forest, Lake |
| Gloomweaver | 14 | 22 | 16 | 16 | 18 | 24 | 22 | 128 | Necrotic | 46 | Forest, Arcane, Mountain |
| Fomorian Thrall | 11 | 26 | 24 | 6 | 8 | 12 | 10 | 192 | Bludgeoning | 42 | Mountain, Forest, Arcane |
| Dream Prince | 13 | 20 | 18 | 16 | 18 | 22 | 20 | 144 | Arcane | 46 | Forest, Arcane, River |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Erlking Hunter | Wild Hunt | Always | Immune to Rooted, Prone; +4 Instinct |
| Erlking Hunter | Relentless Pursuit | Every 3rd turn | Unavoidable attack, applies Weakened |
| Thorn Knight | Living Armor | Always | -25% damage from physical attacks |
| Thorn Knight | Thorn Burst | Every 4th turn | Unavoidable attack, applies Bleeding and Rooted |
| Archfey Envoy | Courtly Presence | Start of combat | Hero's Spirit reduced by 6 for entire fight |
| Archfey Envoy | Fey Decree | Every 4th turn | Applies Weakened and Dazed (2 turns) |
| Gloomweaver | Shadow Cloak | Always | 30% chance to avoid any attack |
| Gloomweaver | Weave Despair | Every 3rd turn | Applies Dazed and Weakened |
| Fomorian Thrall | Cursed Strength | Always | +8 Power |
| Fomorian Thrall | Crushing Blow | Every 4th turn | Unavoidable attack at ×1.5 damage, applies Prone |
| Dream Prince | Dream Walk | Every 4th turn | Hero skips turn (lost in dreams) |
| Dream Prince | Royal Command | Below 50% HP | +6 Brilliance, all attacks apply Dazed |

### Faerie Champions

#### Thornwick, Keeper of the Veil

*Location: The Warden's Tree (Threshold of Dreams)*

| Stat | Value |
|------|-------|
| Level | 6 |
| Power | 16 |
| Toughness | 14 |
| Brilliance | 12 |
| Spirit | 14 |
| Acuity | 16 |
| Instinct | 18 |
| HP | 140 |
| Damage Type | Piercing, Arcane |
| Base XP | 55 |

**Description:** Thornwick has guarded the boundary between the mortal world and the Dreaming Woods for centuries. A satyr of unusual discipline, he does not revel — he watches. Every soul who crosses the Veil passes his judgment. Some are welcomed. Some are warned. Some never leave the Threshold at all.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Veil Warden | Always | Immune to Weakened and Dazed |
| Boundary Strike | Every 3rd turn | Unavoidable attack, applies Rooted |
| Guardian's Judgment | Start of combat | Hero's Instinct reduced by 4 for entire fight |
| Last Stand | Below 25% HP | +8 Power, +8 Instinct for remainder of fight |

#### Flicker, Who-Knows-All-Turns

*Location: The Maze Lord's Seat (The Maze of Dreams) — Gates access to Sluagh, The Gloom Fey*

| Stat | Value |
|------|-------|
| Level | 8 |
| Power | 14 |
| Toughness | 12 |
| Brilliance | 16 |
| Spirit | 14 |
| Acuity | 20 |
| Instinct | 24 |
| HP | 160 |
| Damage Type | Arcane |
| Base XP | 66 |

**Description:** Flicker is a will-o-wisp who grew beyond mere luring — he became the Maze itself. Every path in the Wandering Woods answers to him. Every turn leads where he wishes. To challenge Flicker is to fight someone who knows exactly where you'll step before you do. He finds it all terribly amusing.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Maze Master | Always | +8 Instinct; 40% chance to avoid any attack |
| Path Manipulation | Every 3rd turn | Hero's next attack automatically misses |
| Flickering Light | Every 4th turn | Applies Dazed (2 turns) |
| All Turns Known | Below 50% HP | Hero's Acuity and Instinct reduced by 6 for remainder of fight |
| Last Laugh | Below 25% HP | Attacks twice per turn |

#### Sir Bramble, The Briar Knight

*Location: The Briarpatch (The Court of Thorns) — Gates access to Titania, Queen of Thorns*

| Stat | Value |
|------|-------|
| Level | 9 |
| Power | 22 |
| Toughness | 20 |
| Brilliance | 10 |
| Spirit | 14 |
| Acuity | 18 |
| Instinct | 16 |
| HP | 200 |
| Damage Type | Piercing, Slashing |
| Base XP | 77 |

**Description:** Sir Bramble is Titania's champion — a knight whose armor is living thorns, whose sword is a razor-edged branch, and whose loyalty is absolute. He has served the Queen for time beyond counting, and has never been defeated. To reach Titania, one must first prove worthy by facing her finest warrior.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Living Thorns | Always | -30% damage from physical attacks; attackers take 5 Piercing damage |
| Knight's Challenge | Start of combat | Hero cannot flee for entire fight |
| Briar Assault | Every 3rd turn | Unavoidable attack, applies Bleeding and Rooted |
| Queen's Champion | Below 50% HP | +8 Power, +6 Toughness for remainder of fight |
| Final Honor | Below 25% HP | All attacks deal ×1.5 damage |

### Faerie Mini-Boss: Sluagh, The Gloom Fey

*Location: Sluagh's Hollow (The Gloom Boughs)*

| Stat | Value |
|------|-------|
| Level | 10 |
| Power | 26 |
| Toughness | 20 |
| Brilliance | 22 |
| Spirit | 24 |
| Acuity | 24 |
| Instinct | 26 |
| HP | 340 |
| Damage Type | Necrotic, Arcane |
| Base XP | 165 |
| Remnant | The Gloom Fey's Lantern |

**Description:** Sluagh rules the darker reaches of the Dreaming Woods — the places where light fears to go. He is not evil as mortals understand it; he simply serves a different aspect of Faerie. Where Titania is summer and growth, Sluagh is autumn and decay. He collects the souls of the lost, the despairing, and the forgotten. His hollow is filled with their whispers.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Gloom Aura | Start of combat | Hero's Power and Spirit reduced by 6 for entire fight |
| Shadow Form | Always | 35% chance to avoid any attack |
| Soul Harvest | On Crit | Heals 30 HP; applies Weakened |
| Whispers of the Lost | Every 4th turn | Unavoidable attack, applies Weakened and Dazed |
| Deepening Gloom | Below 50% HP | +10 Brilliance; attacks twice per turn |
| Embrace the Dark | Below 25% HP | Hero takes 8 Necrotic damage per turn; all attacks apply Weakened |

### Faerie Boss: Titania, Queen of Thorns

*Location: The Rosey Throne (The Court of Thorns)*

| Stat | Value |
|------|-------|
| Level | 12 |
| Power | 32 |
| Toughness | 28 |
| Brilliance | 30 |
| Spirit | 32 |
| Acuity | 28 |
| Instinct | 26 |
| HP | 560 |
| Damage Type | Arcane, Piercing |
| Base XP | 385 |
| Remnant | The Glass Thorn Crown |

**Description:** Titania has ruled the Dreaming Woods since before mortals had words for beauty. She is summer incarnate — growth, passion, and the terrible fury of nature in full bloom. Her court is a place of wonder and danger in equal measure. She does not hate mortals; she simply does not consider them. To challenge her throne is to challenge the Feywild itself.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Queen's Presence | Start of combat | Hero's Power, Brilliance, and Spirit reduced by 6 for entire fight |
| Crown of Thorns | Always | -30% damage from all sources |
| Royal Decree | Every 5th turn | Applies Weakened and Rooted (2 turns) |
| Thorn Storm | Every 3rd turn | Unavoidable attack, applies Bleeding (8 damage/turn, 3 turns) |
| Summer's Fury | Below 50% HP | +10 Power, +10 Brilliance; attacks twice per turn |
| The Queen's Garden | Below 50% HP | Heals 20 HP per turn |
| Eternal Bloom | Below 25% HP (once) | Fully heals to 40% HP; Hero takes 25 Arcane damage |
| Final Judgment | Below 25% HP | All attacks apply Rooted and Bleeding; Thorn Storm triggers every 2nd turn |

### Faerie Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 36 (avg 6 each) |
| Minion | 6 | 100 (avg 16.7 each) |
| Elite | 6 | 257 (avg 42.8 each) |
| Champion | 3 | 198 (avg 66 each) |
| Mini-Boss | 1 | 165 |
| Boss | 1 | 385 |
| **Total** | **23** | — |

## 7.17 Celestial Bestiary

The Celestial category represents holy, divine, heavenly beings of light and order. Celestials are not merely good — they are *absolute*. They embody virtue so completely that they cannot comprehend doubt, mercy without justice, or forgiveness without penance.

**Celestial Category Traits:**
- **Combat Focus:** Magic Offense/Defense (Brilliance/Spirit) & HP (Toughness)
- **Weaknesses:** Poison, Earth
- **Resistance:** Fire
- **Immunity:** Air
- **Difficulty Tier:** 4 (×1.3 stat modifier)

**Primary Biomes:** Temple, Bluff, Air, Arcane, Mountain

### Trash Tier Celestials

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Lantern Spirit | 1 | 6 | 10 | 10 | 12 | 9 | 8 | 50 | Fire | 6 | Temple, Air, Arcane |
| Radiant Mote | 2 | 8 | 8 | 12 | 10 | 10 | 12 | 40 | Arcane | 7 | Arcane, Air, Temple |
| Celestial Hound | 2 | 12 | 12 | 6 | 8 | 10 | 14 | 60 | Piercing | 7 | Temple, Bluff, Mountain |
| Feathered Serpent | 3 | 10 | 10 | 12 | 12 | 12 | 14 | 50 | Arcane | 8 | Air, Temple, Mountain |
| Blessing Sprite | 3 | 8 | 10 | 14 | 14 | 11 | 12 | 50 | Arcane | 8 | Temple, Arcane, Air |
| Divine Sentinel | 4 | 14 | 14 | 10 | 12 | 12 | 10 | 70 | Slashing | 9 | Temple, Bluff, Mountain |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Lantern Spirit | Guiding Light | Always | +3 Acuity to all celestials in area (flavor) |
| Radiant Mote | Searing Touch | On hit | 25% chance to apply Dazed (1 turn) |
| Celestial Hound | Divine Scent | Always | +4 Acuity; immune to Dazed |
| Feathered Serpent | Messenger's Grace | Always | Immune to Prone and Rooted |
| Blessing Sprite | Minor Blessing | Every 4th turn | Heals self or ally 10 HP |
| Divine Sentinel | Stalwart Guard | Below 50% HP | +4 Toughness for remainder of fight |

### Minion Tier Celestials

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Deva | 5 | 16 | 18 | 14 | 16 | 14 | 12 | 108 | Slashing, Arcane | 20 | Temple, Air, Mountain |
| Astral Hound | 5 | 18 | 16 | 8 | 10 | 14 | 18 | 96 | Piercing | 20 | Temple, Bluff, Air |
| Sword Archon | 6 | 20 | 18 | 10 | 12 | 16 | 14 | 108 | Slashing | 22 | Temple, Bluff, Mountain |
| Couatl | 7 | 16 | 16 | 18 | 20 | 18 | 16 | 96 | Arcane | 24 | Air, Temple, Arcane |
| Throne Guardian | 7 | 18 | 22 | 10 | 14 | 14 | 10 | 132 | Bludgeoning | 24 | Temple, Mountain, Bluff |
| Purifier | 7 | 17 | 16 | 16 | 18 | 18 | 14 | 96 | Fire | 24 | Temple, Arcane, Mountain |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Deva | Divine Strike | On Crit | Deals additional 10 Arcane damage |
| Astral Hound | Relentless Pursuit | Always | Immune to Rooted and Prone; +4 Instinct |
| Sword Archon | Blade of Light | Every 3rd turn | Unavoidable attack, applies Dazed |
| Couatl | Ancient Wisdom | Start of combat | Hero's Brilliance reduced by 4 for entire fight |
| Throne Guardian | Immovable | Always | Immune to Prone, Rooted, Crippled; -20% damage from physical |
| Purifier | Cleansing Flame | Every 4th turn | Unavoidable Fire attack, removes one buff from Hero |

### Elite Tier Celestials

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Planetar | 9 | 24 | 22 | 18 | 20 | 20 | 16 | 176 | Slashing, Arcane | 46 | Temple, Air, Mountain |
| Ki-rin | 10 | 22 | 20 | 22 | 24 | 22 | 20 | 160 | Arcane | 49 | Air, Mountain, Temple |
| Solar Knight | 11 | 28 | 24 | 14 | 18 | 20 | 16 | 192 | Slashing, Fire | 52 | Temple, Bluff, Air |
| Virtue Exemplar | 11 | 22 | 22 | 20 | 24 | 22 | 18 | 176 | Arcane | 52 | Temple, Arcane, Air |
| Astral Stag | 12 | 26 | 24 | 16 | 20 | 20 | 22 | 192 | Piercing, Arcane | 52 | Mountain, Temple, Air |
| Seraph | 14 | 28 | 26 | 24 | 26 | 26 | 20 | 208 | Fire, Arcane | 59 | Air, Temple, Arcane |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Planetar | Commander's Presence | Start of combat | Hero's Power reduced by 6 for entire fight |
| Planetar | Divine Authority | Every 4th turn | Unavoidable attack, applies Dazed and Weakened |
| Ki-rin | Blessing of Heaven | Every 5th turn | Heals 40 HP; removes one debuff from self |
| Ki-rin | Wisdom's Gaze | On Crit | Applies Dazed (2 turns) |
| Solar Knight | Blazing Blade | Always | All attacks deal additional 6 Fire damage |
| Solar Knight | Righteous Charge | Every 3rd turn | Unavoidable attack, applies Prone and Bleeding |
| Virtue Exemplar | Embodied Virtue | Always | Immune to Weakened and Dazed |
| Virtue Exemplar | Virtuous Strike | Every 3rd turn | Unavoidable attack, heals 20 HP on hit |
| Astral Stag | Starlight Antlers | Always | -25% damage from Arcane attacks |
| Astral Stag | Celestial Charge | Every 4th turn | Unavoidable attack at ×1.5 damage, applies Prone |
| Seraph | Six Wings | Always | 30% chance to avoid any attack |
| Seraph | Holy Fire | Every 3rd turn | Unavoidable Fire attack, applies Burning (10 damage/turn, 3 turns) |

### Celestial Champions

#### Lumiel of the First Light

*Location: Crystalwatch (Gates of Ascension)*

| Stat | Value |
|------|-------|
| Level | 15 |
| Power | 30 |
| Toughness | 28 |
| Brilliance | 22 |
| Spirit | 24 |
| Acuity | 24 |
| Instinct | 20 |
| HP | 360 |
| Damage Type | Arcane, Fire |
| Base XP | 130 |

**Description:** Lumiel was the first light to shine when the Empyrean Reaches were formed — or so the celestials believe. Whether truth or myth, Lumiel has stood at the threshold for eons, greeting the worthy and annihilating the unworthy. Her light reveals all truths, all lies, all hidden darkness. Nothing passes her gaze unchanged.

| Ability | Trigger | Effect |
|---------|---------|--------|
| First Light | Start of combat | Hero's Acuity and Instinct reduced by 6 for entire fight |
| Revealing Radiance | Always | Hero cannot benefit from evasion bonuses |
| Radiant Judgment | Every 3rd turn | Unavoidable attack, applies Dazed (2 turns) |
| Light Eternal | Below 50% HP | +10 Brilliance; heals 20 HP per turn |
| Final Revelation | Below 25% HP | All attacks deal ×1.5 damage |

#### Clemency, The Last Word

*Location: Throne of Adjudication (The Sanctuary of Aethel) — Gates access to Varian, The Judge of Aethel*

| Stat | Value |
|------|-------|
| Level | 17 |
| Power | 32 |
| Toughness | 30 |
| Brilliance | 26 |
| Spirit | 28 |
| Acuity | 26 |
| Instinct | 22 |
| HP | 420 |
| Damage Type | Arcane, Slashing |
| Base XP | 150 |

**Description:** Clemency speaks for the accused before Varian's judgment — the last voice of mercy before the verdict falls. But do not mistake her role for weakness. Clemency believes in justice as absolutely as Varian himself. She defends only those who deserve defense, and her blade falls swiftly on those who do not. The Last Word is not always a kind one.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Voice of Mercy | Start of combat | Hero's Spirit reduced by 6 for entire fight |
| Final Plea | Every 4th turn | Applies Dazed and Weakened |
| Advocate's Strike | Every 3rd turn | Unavoidable attack, applies Bleeding |
| Judgment Pending | Below 50% HP | +8 Power, +8 Spirit; attacks twice per turn |
| The Last Word | Below 25% HP | All attacks apply Dazed; unavoidable attacks deal ×1.5 damage |

#### Solarius, Herald of Dawn

*Location: Altar of the Herald (The Radiant Throne) — Gates access to Seraphina, The Hand of Radiance*

| Stat | Value |
|------|-------|
| Level | 18 |
| Power | 36 |
| Toughness | 32 |
| Brilliance | 28 |
| Spirit | 26 |
| Acuity | 28 |
| Instinct | 24 |
| HP | 460 |
| Damage Type | Fire, Arcane |
| Base XP | 156 |

**Description:** Solarius announces the coming of Seraphina — the herald who proclaims the Hand of Radiance before she appears. His voice is the crack of dawn, his presence the first light of morning. To hear Solarius speak is to know that judgment approaches. To face him in battle is to face the sunrise itself.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Dawn's Herald | Start of combat | Hero's Power and Brilliance reduced by 6 for entire fight |
| Breaking Dawn | Every 4th turn | Unavoidable Fire attack, applies Dazed and Burning (8 damage/turn) |
| Herald's Authority | Always | -25% damage from all sources |
| Rising Sun | Below 50% HP | +12 Power; attacks twice per turn |
| The Sun Rises | Below 25% HP | Heals 30 HP per turn; all attacks apply Burning (10 damage/turn) |

### Celestial Mini-Boss: Varian, The Judge of Aethel

*Location: Varian's Tribunal (The Sanctuary of Aethel)*

| Stat | Value |
|------|-------|
| Level | 19 |
| Power | 42 |
| Toughness | 40 |
| Brilliance | 32 |
| Spirit | 34 |
| Acuity | 34 |
| Instinct | 26 |
| HP | 720 |
| Damage Type | Arcane, Slashing |
| Base XP | 360 |
| Remnant | The Scales of Aethel |

**Description:** Varian has judged souls since before mortal memory. The Judge of Aethel does not weigh actions — he weighs souls. Every choice, every thought, every secret darkness is laid bare before him. None have ever been found entirely innocent. None have ever swayed his verdict. Varian does not dispense mercy; that is Clemency's role. He dispenses only truth.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aura of Judgment | Start of combat | Hero's Power, Toughness, and Spirit reduced by 6 for entire fight |
| The Scales | Always | -30% damage from all sources |
| Weigh the Soul | Every 4th turn | Unavoidable attack, applies Weakened and Dazed |
| Verdict: Guilty | Every 5th turn | Hero takes 25 Arcane damage (unavoidable) |
| Judge's Authority | Below 50% HP | +10 Power, +10 Brilliance; attacks twice per turn |
| Final Verdict | Below 25% HP | All attacks apply Bleeding and Weakened; Verdict: Guilty triggers every 3rd turn |

### Celestial Boss: Seraphina, The Hand of Radiance

*Location: The Solar Seat of Seraphina (The Radiant Throne)*

| Stat | Value |
|------|-------|
| Level | 21 |
| Power | 54 |
| Toughness | 50 |
| Brilliance | 40 |
| Spirit | 42 |
| Acuity | 38 |
| Instinct | 30 |
| HP | 1200 |
| Damage Type | Fire, Arcane |
| Base XP | 810 |
| Remnant | Cracked Solar Halo |

**Description:** Seraphina is the Hand of Radiance — the divine will made manifest. She does not rule the Empyrean Reaches; she *is* the Empyrean Reaches. Every ray of light answers to her. Every celestial bows before her. She is not cruel, not wrathful, not even truly angry. She is simply *absolute*. To stand against Seraphina is to stand against the sun itself — and the sun does not negotiate.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aura of Radiance | Start of combat | Hero's Power, Toughness, Brilliance, and Spirit reduced by 8 for entire fight |
| Hand of Light | Always | -35% damage from all sources |
| Solar Radiance | Always | Hero takes 12 Fire damage per turn for entire fight |
| Divine Smite | Every 4th turn | Unavoidable attack at ×2 damage, applies Dazed and Prone |
| Purifying Light | Every 5th turn | Removes all buffs from Hero; heals Seraphina 40 HP |
| Heaven's Wrath | Below 50% HP | +14 Power; attacks twice per turn |
| The Sun's Judgment | Below 50% HP | Divine Smite triggers every 3rd turn |
| Radiant Rebirth | Below 25% HP (once) | Heals to 35% HP; Hero takes 35 Fire damage |
| Blinding Glory | Below 25% HP | All attacks apply Burning (15 damage/turn); Hero takes 18 Fire damage per turn |

### Celestial Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 45 (avg 7.5 each) |
| Minion | 6 | 134 (avg 22.3 each) |
| Elite | 6 | 310 (avg 51.7 each) |
| Champion | 3 | 436 (avg 145 each) |
| Mini-Boss | 1 | 360 |
| Boss | 1 | 810 |
| **Total** | **23** | — |

## 7.18 Aberration Bestiary

The Aberration category represents alien, bizarre, mind-warping creatures from beyond reality. Aberrations do not belong in this world — they are intruders from spaces between dimensions, beings whose very existence violates natural law.

**Aberration Category Traits:**
- **Combat Focus:** Magic Defense (Spirit) & Mind Control
- **Weaknesses:** Bludgeoning, Water
- **Resistance:** Arcane
- **Immunity:** Poison
- **Difficulty Tier:** 5 (×1.4 stat modifier)

**Primary Biomes:** Arcane, Underdark, Ruin, Crypt, Tower

### Trash Tier Aberrations

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Void Larva | 1 | 7 | 10 | 8 | 12 | 8 | 10 | 50 | Arcane | 6 | Underdark, Arcane, Crypt |
| Mind Leech | 2 | 8 | 8 | 12 | 14 | 10 | 12 | 40 | Arcane | 7 | Arcane, Underdark, Tower |
| Gibbering Mass | 3 | 12 | 12 | 6 | 10 | 8 | 8 | 60 | Bludgeoning | 8 | Underdark, Crypt, Ruin |
| Tendril Horror | 2 | 11 | 10 | 6 | 8 | 10 | 14 | 50 | Bludgeoning | 7 | Underdark, Arcane, Ruin |
| Crawler from Beyond | 4 | 14 | 12 | 8 | 10 | 12 | 16 | 60 | Piercing | 9 | Underdark, Arcane, Crypt |
| Thoughtstealer | 4 | 10 | 8 | 14 | 14 | 14 | 14 | 40 | Arcane | 9 | Arcane, Tower, Underdark |

#### Trash Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Void Larva | Psychic Whisper | On hit | 20% chance to apply Dazed (1 turn) |
| Mind Leech | Thought Drain | On Crit | Applies Drained |
| Gibbering Mass | Maddening Babble | Every 4th turn | Applies Dazed (2 turns) |
| Tendril Horror | Grasping Tendrils | On Crit | Applies Rooted |
| Crawler from Beyond | Phase Crawl | Always | 30% chance to avoid any attack |
| Thoughtstealer | Memory Theft | On hit | Hero's Brilliance -2 for remainder of fight (stacks) |

### Minion Tier Aberrations

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Mind Flayer Spawn | 5 | 16 | 14 | 16 | 18 | 16 | 14 | 84 | Arcane | 20 | Underdark, Arcane, Tower |
| Oculon | 5 | 14 | 12 | 14 | 16 | 20 | 18 | 72 | Arcane | 20 | Arcane, Tower, Underdark |
| Dimensional Shambler | 6 | 18 | 14 | 10 | 12 | 14 | 20 | 84 | Slashing | 22 | Arcane, Underdark, Ruin |
| Aboleth Spawn | 6 | 16 | 18 | 14 | 16 | 14 | 12 | 108 | Bludgeoning, Arcane | 22 | Underdark, Arcane, Crypt |
| Thing from Beyond | 5 | 17 | 16 | 8 | 10 | 12 | 14 | 96 | Piercing | 20 | Arcane, Underdark, Ruin |
| Braineater | 7 | 18 | 14 | 18 | 20 | 18 | 16 | 84 | Arcane | 24 | Underdark, Arcane, Crypt |

#### Minion Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Mind Flayer Spawn | Mind Blast | Every 4th turn | Applies Dazed (2 turns) |
| Oculon | All-Seeing | Always | +6 Acuity; Hero cannot benefit from evasion bonuses |
| Dimensional Shambler | Reality Shift | Always | 40% chance to avoid any attack |
| Aboleth Spawn | Ancestral Memory | Start of combat | Hero's Spirit reduced by 4 for entire fight |
| Thing from Beyond | Wrong Geometry | Always | -20% damage from physical attacks |
| Braineater | Extract Brain | On Crit | Deals additional 20 Arcane damage and heals 20 HP |

### Elite Tier Aberrations

| Name | Lvl | P | T | B | S | A | I | HP | Damage | XP | Biomes |
|------|-----|---|---|---|---|---|---|-----|--------|-----|--------|
| Mind Flayer | 9 | 22 | 18 | 24 | 26 | 22 | 18 | 144 | Arcane | 49 | Underdark, Arcane, Tower |
| Beholder | 10 | 24 | 20 | 22 | 24 | 26 | 16 | 160 | Arcane | 52 | Arcane, Tower, Underdark |
| Aboleth | 11 | 26 | 26 | 20 | 22 | 20 | 14 | 208 | Bludgeoning, Arcane | 55 | Underdark, Arcane, Crypt |
| Star Spawn | 12 | 28 | 22 | 22 | 24 | 24 | 20 | 176 | Arcane | 55 | Arcane, Tower, Ruin |
| Deep One | 13 | 30 | 28 | 16 | 20 | 20 | 18 | 224 | Piercing, Bludgeoning | 59 | Underdark, Ruin, Crypt |
| Void Abomination | 14 | 32 | 26 | 24 | 26 | 26 | 22 | 208 | Arcane | 62 | Arcane, Underdark, Tower |

#### Elite Abilities

| Monster | Ability | Trigger | Effect |
|---------|---------|---------|--------|
| Mind Flayer | Psychic Dominion | Start of combat | Hero's Brilliance reduced by 6 for entire fight |
| Mind Flayer | Mind Blast | Every 3rd turn | Unavoidable attack, applies Dazed |
| Beholder | Central Eye | Always | -30% damage from Arcane attacks |
| Beholder | Eye Rays | Every 3rd turn | Unavoidable attack, applies random effect (Dazed, Weakened, or Rooted) |
| Aboleth | Ancestral Knowledge | Start of combat | Hero's Power and Spirit reduced by 6 for entire fight |
| Aboleth | Slime | On hit | 30% chance to apply Crippled |
| Star Spawn | Cosmic Horror | Start of combat | Hero's Spirit reduced by 8 for entire fight |
| Star Spawn | Void Touch | Every 4th turn | Unavoidable attack, applies Weakened and Drained |
| Deep One | Deep Dweller | Always | Immune to Rooted and Prone |
| Deep One | Crushing Embrace | Every 3rd turn | Unavoidable attack, applies Rooted and Bleeding |
| Void Abomination | Reality Tear | Always | 35% chance to avoid any attack |
| Void Abomination | Void Rend | Every 4th turn | Unavoidable attack at ×1.5 damage, applies Drained and Weakened |

### Aberration Champions

#### Vhorr, First of the Twisted

*Location: The Point of No Return (The Wound Between Worlds)*

| Stat | Value |
|------|-------|
| Level | 16 |
| Power | 34 |
| Toughness | 30 |
| Brilliance | 24 |
| Spirit | 26 |
| Acuity | 26 |
| Instinct | 22 |
| HP | 400 |
| Damage Type | Bludgeoning, Arcane |
| Base XP | 145 |

**Description:** Vhorr was the first mortal to find the wound in reality — and the first to step through. What came back wore his face but was no longer human. Now he guards the threshold, welcoming new arrivals with arms that bend in too many places and a smile that has far too many teeth. He remembers being mortal. He finds the memory amusing.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Twisted Form | Always | -25% damage from physical attacks |
| Memory of Mortality | Start of combat | Hero's Power reduced by 6 for entire fight |
| Warping Strike | Every 3rd turn | Unavoidable attack, applies Rooted |
| The First Change | Below 50% HP | +10 Power; attacks twice per turn |
| Final Transformation | Below 25% HP | All attacks apply Drained |

#### Archpriest Morvain

*Location: Voice of the Void (The Breathing Abyss) — Gates access to Z'hul, The Unblinking Eye*

| Stat | Value |
|------|-------|
| Level | 18 |
| Power | 36 |
| Toughness | 32 |
| Brilliance | 30 |
| Spirit | 32 |
| Acuity | 30 |
| Instinct | 24 |
| HP | 480 |
| Damage Type | Arcane |
| Base XP | 165 |

**Description:** Morvain was once a priest of a god of light. Then he heard the whispers. Now he leads the Congregation of the Void, offering prayers to things that should not be and receiving blessings that should not exist. He has not aged in centuries. He has not slept in longer. The void speaks through him, and he has never been happier.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Voice of the Void | Start of combat | Hero's Spirit and Brilliance reduced by 6 for entire fight |
| Blessing of Madness | Every 5th turn | Heals 40 HP |
| Dark Sermon | Every 4th turn | Unavoidable attack, applies Dazed and Weakened |
| Zealot's Fervor | Below 50% HP | +10 Brilliance; attacks twice per turn |
| Final Communion | Below 25% HP | All attacks apply Drained; heals 20 HP per turn |

#### Qeth, The Final Thought

*Location: Impulse of Protection (The Mind of Xylos) — Gates access to Ulgoth, The Elder Brain of Xylos*

| Stat | Value |
|------|-------|
| Level | 19 |
| Power | 40 |
| Toughness | 34 |
| Brilliance | 34 |
| Spirit | 36 |
| Acuity | 34 |
| Instinct | 28 |
| HP | 520 |
| Damage Type | Arcane |
| Base XP | 175 |

**Description:** Qeth is not a creature — Qeth is an idea. A thought that Ulgoth had so many millennia ago that it became real. Qeth exists only to protect the Elder Brain, and in this purpose, Qeth is perfect. Qeth does not doubt. Qeth does not fear. Qeth simply is, and what Qeth is, is the last barrier between the world and oblivion.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Mind Shield | Always | -30% damage from all sources |
| Protective Impulse | Start of combat | Hero's Acuity and Instinct reduced by 8 for entire fight |
| Thought Barrage | Every 3rd turn | Unavoidable attack, applies Dazed |
| Ulgoth's Will | Below 50% HP | +12 Brilliance; attacks twice per turn |
| Final Defense | Below 25% HP | All attacks deal ×1.5 damage; heals 25 HP per turn |

### Aberration Mini-Boss: Z'hul, The Unblinking Eye

*Location: Z'hul's Throne of Unblinking (The Domain of a Thousand Eyes)*

| Stat | Value |
|------|-------|
| Level | 20 |
| Power | 46 |
| Toughness | 40 |
| Brilliance | 36 |
| Spirit | 38 |
| Acuity | 42 |
| Instinct | 32 |
| HP | 800 |
| Damage Type | Arcane |
| Base XP | 400 |
| Remnant | The Unblinking Lens |

**Description:** Z'hul is not one eye — Z'hul is a thousand thousand eyes, all watching, all judging, all finding wanting. Z'hul sees everything. Every secret. Every lie. Every dark thought you hoped no one would ever know. Z'hul has watched civilizations rise and fall. Z'hul has observed the birth and death of gods. And Z'hul has found them all... insufficient.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Thousand Eyes | Always | Hero cannot benefit from evasion bonuses |
| Aura of Scrutiny | Start of combat | Hero's Power, Acuity, and Instinct reduced by 8 for entire fight |
| Eye Rays | Every 3rd turn | Unavoidable attack, applies Dazed and Weakened |
| Judgment Gaze | Every 5th turn | Hero takes 30 Arcane damage (unavoidable) |
| All-Seeing Fury | Below 50% HP | +12 Brilliance; attacks twice per turn |
| Final Judgment | Below 25% HP | Eye Rays triggers every 2nd turn; Judgment Gaze triggers every 4th turn |

### Aberration Boss: Ulgoth, The Elder Brain of Xylos

*Location: Pool of the Elder Brain (The Mind of Xylos)*

| Stat | Value |
|------|-------|
| Level | 22 |
| Power | 56 |
| Toughness | 52 |
| Brilliance | 46 |
| Spirit | 48 |
| Acuity | 44 |
| Instinct | 36 |
| HP | 1400 |
| Damage Type | Arcane |
| Base XP | 950 |
| Remnant | Petrified Eye of the Void |

**Description:** Ulgoth is the reason The Maddening Deep exists. The Elder Brain of Xylos does not inhabit this place — Ulgoth *dreams* it into being. Every aberration, every twisted corridor, every impossible angle is a thought in Ulgoth's vast mind. To defeat Ulgoth is not merely to kill a monster; it is to end a universe. And Ulgoth has dreamed for so very, very long.

| Ability | Trigger | Effect |
|---------|---------|--------|
| Aura of the Elder | Start of combat | Hero's Power, Toughness, Brilliance, Spirit, Acuity, and Instinct reduced by 6 for entire fight |
| The Dreaming Mind | Always | -40% damage from all sources |
| Psychic Pressure | Always | Hero takes 10 Arcane damage per turn for entire fight |
| Mind Crush | Every 4th turn | Unavoidable attack at ×2 damage, applies Dazed and Prone |
| Consume Thought | Every 5th turn | Removes all buffs from Hero; Ulgoth heals 50 HP |
| Elder's Wrath | Below 50% HP | +16 Brilliance; attacks twice per turn |
| The Dream Deepens | Below 50% HP | Mind Crush triggers every 3rd turn |
| Rebirth of Thought | Below 25% HP (once) | Heals to 35% HP; Hero takes 40 Arcane damage |
| Final Dream | Below 25% HP | All attacks apply Drained (15 damage/turn); Hero takes 12 Arcane damage per turn |

### Aberration Roster Summary

| Tier | Count | Total XP Available |
|------|-------|-------------------|
| Trash | 6 | 46 (avg 7.7 each) |
| Minion | 6 | 128 (avg 21.3 each) |
| Elite | 6 | 332 (avg 55.3 each) |
| Champion | 3 | 485 (avg 162 each) |
| Mini-Boss | 1 | 400 |
| Boss | 1 | 950 |
| **Total** | **23** | — |

---

# 8. Map & Locations

## 8.1 World Structure

The world of Avandria uses a four-tier geographic hierarchy:

| Tier | Name | Description | Count |
|------|------|-------------|-------|
| 1 | **Region** | Themed area, 1 per Monster Category | 10 total |
| 2 | **Territory** | Primary branch within a Region | 5-6 per Region |
| 3 | **Sector** | Sub-branch within a Territory, variable depth | 1-4+ per Territory |
| 4 | **Site** | Atomic gameplay location | Varies |

### World Overview

```
AVANDRIA (World)
└── THE CROSSROADS (Starting Hub - narrative introduction)
    ├── 7 Visible Regions (accessible from game start)
    │   ├── The Verdant Wilds (Beast - Tier 1)
    │   ├── The Lawless Marches (Humanoid - Tier 1)
    │   ├── The Blighted Moor (Cursed - Tier 2)
    │   ├── The Clockwork Wastes (Construct - Tier 3)
    │   ├── The Hollow Kingdom (Undead - Tier 3)
    │   ├── The Savage Wilds (Magical Beast - Tier 4)
    │   └── The Obsidian Dominion (Dragon - Tier 5)
    │
    └── 3 Secret Regions (accessed via hidden paths in other Regions)
        ├── The Dreaming Woods (Faerie - Tier 2)
        │   └── Accessed via: Secret path in The Verdant Wilds
        ├── The Empyrean Reaches (Celestial - Tier 4)
        │   └── Accessed via: Secret path in The Hollow Kingdom
        └── The Maddening Deep (Aberration - Tier 5, Hardest)
            └── Accessed via: Portal in The Obsidian Dominion's Vault (after defeating Boss)
```

## 8.2 Site Types

Sites are the atomic locations where gameplay occurs. Each Site has a Type that determines its function:

### Settlement Types (Population Centers)

| Type | Size | Services Available |
|------|------|-------------------|
| **Kingdom** | Largest | All 4 services (Merchant, Inn, Apothecary, Trainer) |
| **City** | Medium | 3 services (Merchant, Inn, Apothecary) |
| **Village** | Small | 1-2 services (Merchant, sometimes Inn) |

### Point of Interest Types

| Type | Function | Monster Tier |
|------|----------|--------------|
| **Clearing** | Rest area, random encounters | Trash, Minion, Elite |
| **Landmark** | Significant POI, Champion location | Champion (gate) |
| **Lair** | Mini-Boss location | Mini-Boss (gate) |
| **Dungeon** | Boss location | Boss (gate) |
| **Vault** | Post-Boss treasure room | None (reward only) |

### Passage Types (Connections)

| Type | Properties |
|------|------------|
| **Road** | Normal travel between Sites |
| **River** | May require ferry service |
| **Bridge** | Potential chokepoint |
| **Stairs** | Elevation change, often to hidden areas |
| **Trapdoor** | Secret entrance, often one-way entry |
| **Cave Mouth** | Transition to underground |
| **Portal** | Magical transport, possibly to secret Regions |

## 8.3 Region Composition

Each Region contains:

| Component | Count | Purpose |
|-----------|-------|---------|
| Territories | 5-6 | Primary branches to explore |
| Champions | 3 | Located at Landmarks, gate deeper content |
| Mini-Boss | 1 | Located at Lair, gates the Dungeon |
| Boss | 1 | Located at Dungeon, gates the Vault |
| Vault | 1 | End of Region, contains treasures |
| Settlements | Varies | Services and rest points |

### Region-to-Monster-Category Alignment

Each Region is themed around one Monster Category:

| Region Name | Monster Category | Difficulty Tier |
|-------------|------------------|-----------------|
| The Verdant Wilds | Beast | Tier 1 (Easiest) |
| The Lawless Marches | Humanoid | Tier 1 |
| The Dreaming Woods | Faerie | Tier 2 |
| The Blighted Moor | Cursed | Tier 2 |
| The Clockwork Wastes | Construct | Tier 3 |
| The Hollow Kingdom | Undead | Tier 3 |
| The Savage Wilds | Magical Beast | Tier 4 |
| The Empyrean Reaches | Celestial | Tier 4 |
| The Maddening Deep | Aberration | Tier 5 (Hardest) |
| The Obsidian Dominion | Dragon | Tier 5 |

## 8.4 Progression System

### Movement Rules

| Rule | Description |
|------|-------------|
| **Site Clearing** | Must defeat ALL monsters in a Site before moving to the next Site in that branch |
| **Champion Gates** | Lair is inaccessible until all 3 Champions in that Region are defeated |
| **Mini-Boss Gates** | Dungeon is inaccessible until Mini-Boss is defeated |
| **Boss Gates** | Vault is inaccessible until Boss is defeated |
| **Parallel Exploration** | All 10 Regions are accessible from the start (7 visible, 3 secret) |

### Natural Progression Flow

1. Player starts at The Crossroads, sees 7 visible Region entrances
2. Player enters a Tier 1 Region (Beast or Humanoid) — manageable
3. Player tries a Tier 5 Region (Dragon) — gets destroyed, retreats
4. Player grinds Tier 1-2 Regions, levels up
5. Player returns to harder Regions with better stats/gear
6. Player pushes deeper into multiple branches simultaneously
7. Eventually defeats all 10 Bosses

### Secret Regions

Three of the ten Regions are not visible from the Crossroads and must be discovered through exploration:

| Secret Region | Accessed From | Access Method | Difficulty |
|---------------|---------------|---------------|------------|
| The Dreaming Woods (Faerie) | The Verdant Wilds (Beast) | Secret branching path | Tier 2 |
| The Empyrean Reaches (Celestial) | The Hollow Kingdom (Undead) | Secret branching path | Tier 4 |
| The Maddening Deep (Aberration) | The Obsidian Dominion (Dragon) | Portal in Vault after Boss defeat | Tier 5 (Hardest) |

**Exit Rule:** You can re-enter a secret Region via its hidden entrance, but you cannot go back the way you exited.

## 8.5 Complete Region Example: The Verdant Wilds

The Verdant Wilds is the tutorial Region (Beast Category, Tier 1 Difficulty). It contains 5 Territories with 20 Sectors total.

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| The Sunlit Glades | 2 | Trash, Minion | City (Hearthstone), Tutorial zone |
| The Whispering Thicket | 4 | Trash, Minion, Elite | Champion #1, Secret path to Dreaming Woods |
| The Windswept Plains | 5 | Trash, Minion | Kingdom (Goldgrass City), Champion #2 in Arena |
| The Stonepaw Highlands | 4 | Trash, Minion, Elite | Champion #3, Mini-Boss (Yarok) |
| The Mistfall Coast | 5 | Trash, Minion, Elite | Village (Tidecaller's Watch), Boss (Draug), Vault |

---

### Territory 1: The Sunlit Glades

*Tutorial zone — gentle introduction to exploration and combat*

```
THE SUNLIT GLADES (Territory)
│
└── Dawnbreak Trail (Passage) ─── Trash
    │
    ├── Mossy Overlook (Clearing) ─── Trash
    │   └── Honeybee Hollow (Clearing) ─── Minion, dead end
    │
    └── Willowbrook Clearing (Sector) ─── Minion
        │
        ├── Hearthstone (Settlement - City)
        │   ├── [Merchant Service]
        │   ├── [Inn Service]
        │   ├── [Apothecary Service]
        │   └── Foggy Graveyard (Clearing) ─── Minion
        │
        └── The Old Orchard (Clearing) ─── Minion, dead end
```

**Sites:** 7 | **Services:** Merchant, Inn, Apothecary

---

### Territory 2: The Whispering Thicket

*Dense forest leading to Champion #1 and the secret path to The Dreaming Woods*

```
THE WHISPERING THICKET (Territory)
│
└── Shaded Path (Passage) ─── Trash
    │
    └── Twisted Roots (Sector) ─── Minion
        │
        └── Mossheart Grove (Clearing) ─── Minion/Elite
            │
            ├── PATH A: The Heart of Thorns (Landmark) ─── CHAMPION #1
            │
            └── PATH B: The Veilwood (Clearing) ─── Elite
                │   [Flavor text hints at something deeper...]
                │
                └── Withering Winterberry (Passage - Portal)
                    │
                    └── THE DREAMING WOODS (Secret Region)
```

**Sites:** 6 | **Champions:** 1 | **Secret Access:** The Dreaming Woods

---

### Territory 3: The Windswept Plains

*Civilization hub — Goldgrass City (Kingdom) with four distinct districts*

```
THE WINDSWEPT PLAINS (Territory)
│
└── Goldgrass City (Settlement - Kingdom) ─── Hub, no monsters
    │
    ├── THE MARITIME DISTRICT (Sector)
    │   ├── The Salted Barrel (Site - Inn)
    │   └── Busy Docks (Passage) ─── Minion
    │       └── The Amber Sea (Clearing) ─── Trash/Minion
    │
    ├── THE ROYAL DISTRICT (Sector)
    │   ├── The Gilded Chapel (Site - Flavor)
    │   ├── The Magistrate's Hall (Site - Flavor)
    │   └── The Royal Gardens (Clearing) ─── Minion
    │
    ├── THE MARKET DISTRICT (Sector)
    │   ├── The Trader's Square (Site - Merchant)
    │   ├── Wildheart Apothecary (Site - Apothecary)
    │   ├── The Wayfarer's Guild (Site - Trainer: Hunter)
    │   ├── The Grove (Site - Trainer: Druid)
    │   └── The Proving Grounds (Landmark) ─── CHAMPION #2
    │
    └── THE BEGGAR'S DISTRICT (Sector)
        ├── The Broken Cup (Site - Gambling)
        ├── Ratcatcher's Alley (Passage) ─── Minion
        └── The Undercroft (Clearing) ─── Elite
```

**Sites:** 16 | **Services:** Inn, Merchant, Apothecary, Gambling, Trainer (Hunter), Trainer (Druid) | **Champions:** 1

---

### Territory 4: The Stonepaw Highlands

*Mountain climb to Champion #3 and Mini-Boss Yarok*

```
THE STONEPAW HIGHLANDS (Territory)
│
└── Tumblestone Pass (Sector) ─── Trash
    │
    ├── Abandoned Mine (Clearing) ─── Minion, dead end, loot
    │
    └── The Winding Ascent (Passage) ─── Minion/Elite
        │
        └── The Alpha's Peak (Landmark) ─── CHAMPION #3
            │
            └── Scattered Scree (Passage) ─── Elite
                │
                └── The Shattered Summit (Lair) ─── MINI-BOSS: Yarok, Mountain Shaker
```

**Sites:** 6 | **Champions:** 1 | **Mini-Boss:** Yarok, Mountain Shaker

---

### Territory 5: The Mistfall Coast

*Coastal zone leading to Boss Draug and the Vault*

```
THE MISTFALL COAST (Territory)
│
└── Driftwood Path (Passage) ─── Trash
    │
    ├── Tidecaller's Watch (Settlement - Village)
    │   ├── [Merchant Service]
    │   └── [Inn Service]
    │
    └── Bleached Sands (Sector) ─── Minion
        │
        ├── The Wreck of the Seaspray (Clearing) ─── Elite, dead end, loot
        │
        └── Abyssal Approach (Passage) ─── Elite
            │
            └── The Drowned Caves (Sector)
                │
                ├── The Flooded Grotto (Clearing) ─── Elite
                │
                └── The Sunken Depths (Dungeon) ─── BOSS: Draug, Maw of the Abyss
                    │
                    └── The Abyssal Vault (Vault) ─── Treasures
```

**Sites:** 9 | **Services:** Merchant, Inn | **Boss:** Draug, Maw of the Abyss | **Vault:** The Abyssal Vault

---

### The Verdant Wilds Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 44 |
| **Settlements** | 3 (1 Kingdom, 1 City, 1 Village) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Yarok, Mountain Shaker) |
| **Boss** | 1 (Draug, Maw of the Abyss) |
| **Vault** | 1 (The Abyssal Vault) |
| **Secret Access** | 1 (Path to The Dreaming Woods) |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Hearthstone | City | Merchant, Inn, Apothecary |
| Goldgrass City | Kingdom | Merchant, Inn, Apothecary, Gambling, Trainer (Hunter), Trainer (Druid) |
| Tidecaller's Watch | Village | Merchant, Inn |

### Branching Depth Guidelines

| Principle | Description |
|-----------|-------------|
| **Variable Depth** | Some branches are 2 Sites deep, others are 5+ |
| **Nested Branching** | Sectors can branch; Sites can branch to other Sites |
| **Dead Ends** | Some branches end at Villages, Clearings, or Landmarks (rewards, not progression) |
| **No Uniform Depth** | Avoid all branches ending at the same depth |

## 8.6 Complete Region Example: The Lawless Marches

The Lawless Marches is the second Tier 1 Region (Humanoid Category). A lawless frontier beyond the reach of any kingdom where bandits, mercenaries, cultists, and criminals carve out their own territories.

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| The Contested Frontier | 2 | Trash, Minion, Elite | City (Dusthaven), Champion #1 (The Pale Hand) |
| The Scorched Expanse | 2 | Trash, Minion, Elite | Village (Haven's Rest), desolation theme |
| The Tribelands | 2 | Minion, Elite | Warring tribes, no settlement |
| The Iron Badlands | 3 | Minion, Elite | Kingdom (Ironholt), Champion #2 (Kael), Mini-Boss (Godfrey) |
| Blood Reach | 2 | Minion, Elite | Champion #3 (Voice of Ruin), Boss (Vaeryk), Vault |

---

### Territory 1: The Contested Frontier

*Entry zone — lawless borderlands where every traveler is a potential victim or threat*

```
THE CONTESTED FRONTIER (Territory)
│
└── The Broken Road (Passage) ─── Trash
    │
    ├── BRANCH A: The Wayside Ruins (Clearing) ─── Trash/Minion
    │   │
    │   └── The Blind Sentinel (Landmark) ─── Minion, dead end, loot
    │
    └── BRANCH B: Dusthaven (Sector) ─── Minion
        │
        ├── BRANCH B1: Dusthaven (Settlement - City)
        │   ├── [Merchant Service]
        │   ├── [Inn Service]
        │   ├── [Apothecary Service]
        │   │
        │   └── The Underbelly (Passage) ─── Minion
        │       │
        │       ├── The Thieves' Gallery (Site - Trainer: Rogue)
        │       │
        │       └── The Final Ledger (Landmark) ─── CHAMPION #1: The Pale Hand
        │
        └── BRANCH B2: The Trader's Graveyard (Clearing) ─── Minion/Elite
            │
            └── The Stash (Clearing) ─── Elite, dead end, loot
```

**Sites:** 10 | **Services:** Merchant, Inn, Apothecary, Trainer (Rogue) | **Champions:** 1

---

### Territory 2: The Scorched Expanse

*Burned farmlands, ruined villages, desperate refugees clinging to survival*

```
THE SCORCHED EXPANSE (Territory)
│
└── The Ash Road (Passage) ─── Trash
    │
    ├── BRANCH A: The Blackened Fields (Clearing) ─── Trash/Minion
    │   │
    │   ├── BRANCH A1: The Burned Homestead (Landmark) ─── Minion, dead end
    │   │
    │   └── BRANCH A2: The Charred Mill (Clearing) ─── Minion
    │       │
    │       └── Dilapidated Stairs (Passage) ─── Elite
    │           │
    │           └── The Miller's Cellar (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: Cinderfall (Sector) ─── Minion
        │
        └── Haven's Rest (Settlement - Village)
            ├── [Merchant Service]
            ├── [Inn Service]
            │
            └── The Refugee Trail (Passage) ─── Minion/Elite
                │
                ├── BRANCH B1: The Burned Chapel (Clearing) ─── Elite, dead end
                │
                └── BRANCH B2: The Weeping Stones (Landmark) ─── Elite, dead end, loot
```

**Sites:** 11 | **Services:** Merchant, Inn | **Champions:** 0

---

### Territory 3: The Tribelands

*Warring clans carve the land into bloody territories — honor through combat, death to outsiders*

```
THE TRIBELANDS (Territory)
│
└── The Hunting Road (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: The Painted Stones (Clearing) ─── Minion
    │   │
    │   └── The Proving Altar (Landmark) ─── Minion/Elite, dead end
    │
    └── BRANCH B: The Horde (Sector) ─── Minion
        │
        ├── BRANCH B1: Honor's Ring (Clearing) ─── Elite
        │   │
        │   └── The Trophy Hall (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Bone Fields (Passage) ─── Elite
            │
            └── The Ancestor's Cave (Clearing) ─── Elite
                │
                ├── BRANCH B2a: The Shaman's Hollow (Clearing) ─── Elite, dead end, loot
                │
                └── BRANCH B2b: The Warlord's Throne (Landmark) ─── Elite, dead end
                    [Flavor: Empty throne — Tribal Warlords roam the fields]
```

**Sites:** 10 | **Services:** None | **Champions:** 0

---

### Territory 4: The Iron Badlands

*Mercenary territory — Godfrey's iron-fisted rule, discipline through fear, gold above all*

```
THE IRON BADLANDS (Territory)
│
└── The Toll Road (Passage) ─── Minion
    │
    └── Ironholt (Settlement - Kingdom) ─── Hub, light security
        │
        ├── THE COIN WARD (Sector)
        │   ├── The Iron Coffer (Site - Merchant)
        │   ├── The Scarred Tankard (Site - Inn)
        │   ├── The Betting Pit (Site - Gambling)
        │   └── The Drill Yard (Site - Trainer: Warrior)
        │
        ├── THE PAUPER'S WARD (Sector)
        │   ├── The Sawbones (Site - Apothecary)
        │   ├── The Gallows Square (Landmark - Flavor)
        │   ├── The Minstrel's Corner (Site - Trainer: Bard)
        │   └── Deserter's Alley (Passage) ─── Minion
        │       │
        │       └── The Condemned Row (Clearing) ─── Elite, dead end
        │
        └── THE COMMAND WARD (Sector) ─── Elite
            │
            └── The Crucible (Passage) ─── Elite
                │
                └── The Hall of the Ironfist (Landmark) ─── CHAMPION #2: Kael Ironfist
                    │
                    └── The Gauntlet (Passage) ─── Elite
                        │
                        └── The Iron Bastion (Lair) ─── MINI-BOSS: Godfrey, The Iron Hand
```

**Sites:** 14 | **Services:** Merchant, Inn, Apothecary, Gambling, Trainer (Warrior), Trainer (Bard) | **Champions:** 1 | **Mini-Boss:** 1

---

### Territory 5: Blood Reach

*Esoteric ruins corrupted by occult worship — the Crimson Vizier's domain*

```
BLOOD REACH (Territory)
│
└── The Crimson Path (Passage) ─── Minion/Elite
    │
    ├── BRANCH A: The Defiled Shrine (Clearing) ─── Elite
    │   │
    │   └── The Giving Pool (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Crimson Stones (Sector) ─── Elite
        │
        ├── BRANCH B1: The Echo Chamber (Clearing) ─── Elite
        │   │
        │   └── The Heretic's Library (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Hall of Prophecy (Passage) ─── Elite
            │
            └── The Voice's Pulpit (Landmark) ─── CHAMPION #3: The Voice of Ruin
                │
                └── The Bleeding Stair (Passage) ─── Elite
                    │
                    └── The Crimson Sanctum (Dungeon) ─── BOSS: Vaeryk, The Crimson Vizier
                        │
                        └── The Vizier's Vault (Vault) ─── Treasures
```

**Sites:** 10 | **Services:** None | **Champions:** 1 | **Boss:** 1 | **Vault:** 1

---

### The Lawless Marches Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 55 |
| **Settlements** | 3 (1 Kingdom, 1 City, 1 Village) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Godfrey, The Iron Hand) |
| **Boss** | 1 (Vaeryk, The Crimson Vizier) |
| **Vault** | 1 (The Vizier's Vault) |
| **Secret Access** | None |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Dusthaven | City | Merchant, Inn, Apothecary, Trainer (Rogue) |
| Haven's Rest | Village | Merchant, Inn |
| Ironholt | Kingdom | Merchant, Inn, Apothecary, Gambling, Trainer (Warrior), Trainer (Bard) |

---

## 8.7 Complete Region Example: The Blighted Moor

The Blighted Moor is a Tier 2 Region (Cursed Category). A vast, corrupted swampland where dark magic has seeped into the very earth. Mists obscure ancient evils, cursed villages cling to existence, and lycanthropes hunt beneath the sickly moon.

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| The Mire's Edge | 2 | Trash, Minion, Elite | City (Moorwatch), entry zone |
| The Withering Fen | 2 | Trash, Minion, Elite | Village (Clinging Hope), plague theme |
| Barrowmere | 2 | Minion, Elite | Champion #1 (Beast of Barrowmere), Mini-Boss (Rurik) |
| The Rotwood | 2 | Minion, Elite | Champion #2 (Mother Morath), Trainer (Druid) |
| The Pale Dominion | 3 | Minion, Elite | Kingdom (Blackmoor), Champion #3 (Vellana), Boss (Vorlag) |

---

### Territory 1: The Mire's Edge

*Where civilization ends and corruption begins — the first taste of the Blighted Moor's horror*

```
THE MIRE'S EDGE (Territory)
│
└── The Last Mile (Passage) ─── Trash
    │
    ├── BRANCH A: Blighted Grove (Clearing) ─── Trash/Minion
    │   │
    │   └── The Warning Cairn (Landmark) ─── Minion, dead end, loot
    │
    └── BRANCH B: Bogside Flats (Sector) ─── Minion
        │
        ├── BRANCH B1: Moorwatch (Settlement - City)
        │   ├── [Merchant Service]
        │   ├── [Inn Service]
        │   ├── [Apothecary Service]
        │   │
        │   └── The Moor Cellars (Passage) ─── Minion
        │       │
        │       └── Smuggler's Cache (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: Mudhollow (Clearing) ─── Minion/Elite
            │
            └── Cursed Homestead (Clearing) ─── Elite, dead end
```

**Sites:** 9 | **Services:** Merchant, Inn, Apothecary | **Champions:** 0

---

### Territory 2: The Withering Fen

*Where plague took root and nothing clean survives — desperate survivors huddle against the sickness*

```
THE WITHERING FEN (Territory)
│
└── Blightwalker's Way (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: The Pox Fields (Clearing) ─── Minion
    │   │
    │   ├── BRANCH A1: The Lazaretto (Landmark) ─── Minion, dead end
    │   │
    │   └── BRANCH A2: Pools of Pestilence (Clearing) ─── Minion/Elite
    │       │
    │       └── The First Corpse (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Last Holdout (Sector) ─── Minion
        │
        └── Clinging Hope (Settlement - Village)
            ├── [Merchant Service]
            ├── [Inn Service]
            │
            └── Death's Processional (Passage) ─── Elite
                │
                ├── BRANCH B1: Pit of Bones (Clearing) ─── Elite, dead end
                │
                └── BRANCH B2: Prayer's End (Landmark) ─── Elite, dead end, loot
```

**Sites:** 11 | **Services:** Merchant, Inn | **Champions:** 0

---

### Territory 3: Barrowmere

*Ancient burial grounds where the first werewolves were cursed — now Rurik's hunting domain*

```
BARROWMERE (Territory)
│
└── Fang Road (Passage) ─── Minion
    │
    ├── BRANCH A: The First Barrows (Clearing) ─── Minion/Elite
    │   │
    │   └── Fenris's Cradle (Landmark) ─── Elite, dead end, loot
    │
    └── BRANCH B: Packlands (Sector) ─── Elite
        │
        ├── BRANCH B1: The Killing Fields (Clearing) ─── Elite
        │   │
        │   └── Alpha's Rest (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Beast Trail (Passage) ─── Elite
            │
            └── Heart of Barrowmere (Landmark) ─── CHAMPION #1: The Beast of Barrowmere
                │
                └── The Final Hunt (Passage) ─── Elite
                    │
                    └── The Fanged Throne (Lair) ─── MINI-BOSS: Rurik, The Scourge of Fenris
```

**Sites:** 9 | **Services:** None | **Champions:** 1 | **Mini-Boss:** 1

---

### Territory 4: The Rotwood

*Corrupted forest where nature has turned malevolent — Mother Morath's domain of twisted bargains*

```
THE ROTWOOD (Territory)
│
└── Crone's Path (Passage) ─── Minion/Elite
    │
    ├── BRANCH A: The Warped Glade (Clearing) ─── Elite
    │   │
    │   └── The Cleansing Circle (Site - Trainer: Druid)
    │       │
    │       └── The Poisoned Heart (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Inner Rot (Sector) ─── Elite
        │
        ├── BRANCH B1: The Cauldron (Clearing) ─── Elite
        │   │
        │   └── Sacrificial Stone (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: Mother's March (Passage) ─── Elite
            │
            └── Morath's Cottage (Landmark) ─── CHAMPION #2: Mother Morath
                │
                └── The Crone's Collection (Clearing) ─── Elite, dead end, loot
```

**Sites:** 10 | **Services:** Trainer (Druid) | **Champions:** 1

---

### Territory 5: The Pale Dominion

*The vampiric court's domain — Countess Vellana's manor and Vorlag's eternal throne*

```
THE PALE DOMINION (Territory)
│
└── The Tithe Road (Passage) ─── Minion/Elite
    │
    └── Blackmoor (Settlement - Kingdom) ─── Hub, controlled danger
        │
        ├── THE PENS (Sector)
        │   ├── The Bleeding Coin (Site - Merchant)
        │   ├── Slumber House (Site - Inn)
        │   ├── Blood & Balm (Site - Apothecary)
        │   └── The Feeding Halls (Passage) ─── Elite
        │       │
        │       └── The Draining Pools (Clearing) ─── Elite, dead end
        │
        ├── THE ETERNAL COURT (Sector)
        │   ├── Fate's Folly (Site - Gambling)
        │   ├── The Danse Macabre (Site - Flavor)
        │   ├── Hall of Portraits (Site - Flavor)
        │   └── The Tunnel of Hope (Passage) ─── Elite
        │       │
        │       └── Faith's Light (Site - Trainer: Priest)
        │
        └── HALL OF BLOOD (Sector) ─── Elite
            │
            └── Vellana's Welcome (Passage) ─── Elite
                │
                └── Vellana's Manor (Landmark) ─── CHAMPION #3: Countess Vellana
                    │
                    └── The First Descent (Passage) ─── Elite
                        │
                        └── The Eternal Throne (Dungeon) ─── BOSS: Vorlag, the Blood Eternal
                            │
                            └── The Crimson Treasury (Vault) ─── Treasures
```

**Sites:** 16 | **Services:** Merchant, Inn, Apothecary, Gambling, Trainer (Priest) | **Champions:** 1 | **Boss:** 1 | **Vault:** 1

---

### The Blighted Moor Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 55 |
| **Settlements** | 3 (1 Kingdom, 1 City, 1 Village) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Rurik, The Scourge of Fenris) |
| **Boss** | 1 (Vorlag, the Blood Eternal) |
| **Vault** | 1 (The Crimson Treasury) |
| **Secret Access** | TBD |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Moorwatch | City | Merchant, Inn, Apothecary |
| Clinging Hope | Village | Merchant, Inn |
| Blackmoor | Kingdom | Merchant, Inn, Apothecary, Gambling, Trainer (Priest) |

### Additional Services

| Location | Territory | Service |
|----------|-----------|---------|
| The Cleansing Circle | The Rotwood | Trainer (Druid) |

---

## 8.8 Complete Region Example: The Clockwork Wastes

The Clockwork Wastes is a Tier 3 Region (Construct Category). The ruins of a once-great artificer civilization where massive gears jut from the sand, steam vents hiss from underground forges, and ancient automatons still patrol streets no living soul has walked in millennia.

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| The Scrapyards | 2 | Trash, Minion, Elite | City (Cogsworth), Champion #1 (Damascus) |
| Cogwork Maze | 2 | Minion, Elite | Environmental hazards, no settlement |
| Automata, The Brass Citadel | 3 | Elite | Kingdom (Mechanus), Champion #2 (Ironclad), Mini-Boss (Torque) |
| The Grand Manufactory | 2 | Elite | Champion #3 (Axiom), Boss (Zoloss), Vault |

---

### Territory 1: The Scrapyards

*The outer edge where the Clockwork Wastes meet the world — broken sentinels and sand-choked gears*

```
THE SCRAPYARDS (Territory)
│
└── Rusted Path (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: Cogsworth (Settlement - City)
    │   ├── [Merchant Service]
    │   ├── [Inn Service]
    │   ├── [Apothecary Service]
    │   │
    │   └── The Picker's Warrens (Passage) ─── Minion
    │       │
    │       └── Preserved Chamber (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: Patrol's End (Sector) ─── Minion/Elite
        │
        └── The First Vigil (Landmark) ─── CHAMPION #1: Damascus, Sentinel Prime
```

**Sites:** 7 | **Services:** Merchant, Inn, Apothecary | **Champions:** 1

---

### Territory 2: Cogwork Maze

*Where ancient machines still move — massive gears turn, pistons fire, and the unwary are crushed*

```
COGWORK MAZE (Territory)
│
└── Gear Alley (Passage) ─── Minion/Elite
    │
    ├── BRANCH A: The Great Piston (Clearing) ─── Elite
    │   │
    │   └── The Pressed Cache (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Venting Halls (Sector) ─── Elite
        │
        └── The Boiler Room (Clearing) ─── Elite, dead end, loot
```

**Sites:** 5 | **Services:** None | **Champions:** 0

---

### Territory 3: Automata, The Brass Citadel

*The artificers' capital — still maintained by automatons who don't know their masters are gone*

```
AUTOMATA, THE BRASS CITADEL (Territory)
│
└── The Bronze Gates (Passage) ─── Elite
    │
    └── Mechanus (Settlement - Kingdom) ─── Hub
        │
        ├── BARTER WORKS (Sector)
        │   ├── Cog & Coin (Site - Merchant)
        │   ├── The Idle Gear (Site - Inn)
        │   ├── Oil & Essence (Site - Apothecary)
        │   └── The Probability Engine (Site - Gambling)
        │
        ├── ARTIFICER'S QUARTER (Sector)
        │   ├── The Arcane Foundry (Site - Trainer: Mage)
        │   ├── The Music Box (Site - Trainer: Bard)
        │   └── The Thieve's Guild (Site - Trainer: Rogue)
        │
        └── THE WARDEN'S DISTRICT (Sector) ─── Elite
            │
            └── The Sieged Stairs (Passage) ─── Elite
                │
                └── The Sieged Halls (Landmark) ─── CHAMPION #2: Ironclad the Unbreaking
                    │
                    └── Bronze Corridor (Passage) ─── Elite
                        │
                        └── The Bronze Sanctum (Lair) ─── MINI-BOSS: Torque, The Bronze Warden
```

**Sites:** 13 | **Services:** Merchant, Inn, Apothecary, Gambling, Trainer (Mage), Trainer (Bard), Trainer (Rogue) | **Champions:** 1 | **Mini-Boss:** 1

---

### Territory 4: The Grand Manufactory

*Where constructs were born — the greatest forge of the old world, and Zoloss's throne*

```
THE GRAND MANUFACTORY (Territory)
│
└── The Assembly Line (Passage) ─── Elite
    │
    ├── BRANCH A: The Building Floor (Clearing) ─── Elite
    │   │
    │   └── Vault of Prototypes (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: Heart of Creation (Sector) ─── Elite
        │
        └── Axiom's Chamber (Landmark) ─── CHAMPION #3: Axiom, the Perfect Machine
            │
            └── The Living Gate (Passage) ─── Elite
                │
                └── The God Engine (Dungeon) ─── BOSS: Zoloss, The Living Citadel
                    │
                    └── The Creator's Toolbox (Vault) ─── Treasures
```

**Sites:** 8 | **Services:** None | **Champions:** 1 | **Boss:** 1 | **Vault:** 1

---

### The Clockwork Wastes Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 33 |
| **Settlements** | 2 (1 Kingdom, 1 City) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Torque, The Bronze Warden) |
| **Boss** | 1 (Zoloss, The Living Citadel) |
| **Vault** | 1 (The Creator's Toolbox) |
| **Secret Access** | TBD |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Cogsworth | City | Merchant, Inn, Apothecary |
| Mechanus | Kingdom | Merchant, Inn, Apothecary, Gambling, Trainer (Mage), Trainer (Bard), Trainer (Rogue) |

---

## 8.9 Complete Region Example: The Hollow Kingdom

The Hollow Kingdom is a Tier 3 Region (Undead Category). A fallen empire now ruled by the dead — once-great cities stand silent, their streets patrolled by skeletal legions. Ghost nobles hold court in crumbling palaces, and in the deepest crypts, the first lich sits upon an eternal throne.

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| The Fallen Front | 2 | Trash, Minion, Elite | City (Survivor's Rest), Champion #1 (Castavius) |
| The Hallowed Refuge | 2 | Minion, Elite | Village (The Haven), Trainers (Paladin, Priest) |
| The Weeping Estate | 2 | Minion, Elite | Champion #2 (Lady Morwen), Mini-Boss (Lenore) |
| The Silent City | 3 | Elite | Kingdom (Deadholme), Secret Access to Empyrean Reaches |
| The Lichspire | 2 | Elite | Champion #3 (Vexar), Boss (Zantus), Vault |

---

### Territory 1: The Fallen Front

*Where the kingdom died — endless graves, restless soldiers, and the first signs of what awaits*

```
THE FALLEN FRONT (Territory)
│
└── March of the Dead (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: Survivor's Rest (Settlement - City)
    │   ├── [Merchant Service]
    │   ├── [Inn Service]
    │   ├── [Apothecary Service]
    │   │
    │   └── Hope's Passage (Passage) ─── Minion
    │       │
    │       └── The Last Reserves (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: No Man's Land (Sector) ─── Minion/Elite
        │
        ├── BRANCH B1: The Unmarked Legion (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: Legion Headquarters (Clearing) ─── Elite
            │
            └── The Bone Marshal's Seat (Landmark) ─── CHAMPION #1: Castavius, The Ivory King
```

**Sites:** 9 | **Services:** Merchant, Inn, Apothecary | **Champions:** 1

---

### Territory 2: The Hallowed Refuge

*A hidden sanctuary where the living resist — protected by faith and desperate courage*

```
THE HALLOWED REFUGE (Territory)
│
└── The Path of Faith (Passage) ─── Minion
    │
    └── Consecrated Earth (Sector) ─── Light danger (holy protection)
        │
        ├── BRANCH A: The Haven (Settlement - Village)
        │   ├── [Merchant Service]
        │   ├── [Inn Service]
        │   │
        │   └── The Holy Gardens (Clearing)
        │       ├── Hall of the Oathkeepers (Site - Trainer: Paladin)
        │       └── Temple of Mercy (Site - Trainer: Priest)
        │
        └── BRANCH B: The Blessed Glade (Clearing) ─── Elite
            │
            └── The Holy Reliquary (Clearing) ─── Elite, dead end, loot
```

**Sites:** 8 | **Services:** Merchant, Inn, Trainer (Paladin), Trainer (Priest) | **Champions:** 0

---

### Territory 3: The Weeping Estate

*Lady Morwen's domain — a ruined manor where grief is eternal and the walls remember*

```
THE WEEPING ESTATE (Territory)
│
└── Mourner's Walk (Passage) ─── Minion/Elite
    │
    ├── BRANCH A: Garden of the Dead (Clearing) ─── Elite
    │   │
    │   └── The Lost Family (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Weeping House (Sector) ─── Elite
        │
        ├── BRANCH B1: The Loyal Dead (Clearing) ─── Elite
        │   │
        │   └── Room of Regrets (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: Ballroom of Tears (Clearing) ─── Elite
            │
            └── The Lady's Chamber (Landmark) ─── CHAMPION #2: Lady Morwen, Grief Eternal
                │
                └── The Screaming Staircase (Passage) ─── Elite
                    │
                    └── Lenore's Lament (Lair) ─── MINI-BOSS: Lenore, The Banshee Queen
```

**Sites:** 10 | **Services:** None | **Champions:** 1 | **Mini-Boss:** 1

---

### Territory 4: The Silent City

*The dead capital — a city that functions, after a fashion, ruled by undead nobility*

```
THE SILENT CITY (Territory)
│
└── The Bone Gates (Passage) ─── Elite
    │
    └── Deadholme (Settlement - Kingdom) ─── Hub, undead patrols
        │
        ├── THE GHOSTLY BAZAAR (Sector)
        │   ├── Grave Goods (Site - Merchant)
        │   ├── The Frozen Hearth (Site - Inn)
        │   ├── Embalming Arts (Site - Apothecary)
        │   └── The Deep Trade (Passage) ─── Elite
        │       │
        │       └── Dealings in the Dark (Clearing) ─── Elite, dead end, loot
        │
        ├── THE GHOST COURT (Sector)
        │   ├── Death's Dice (Site - Gambling)
        │   └── The Abandoned Crown (Site - Flavor)
        │
        └── THE UNDERCITY (Sector) ─── Elite
            │
            └── Path of the Unliving (Passage) ─── Elite
                │
                └── The Celestial Gate (Passage - Portal) ─── Secret Access to The Empyrean Reaches
```

**Sites:** 12 | **Services:** Merchant, Inn, Apothecary, Gambling | **Champions:** 0 | **Secret Access:** The Empyrean Reaches

---

### Territory 5: The Lichspire

*Where death became a science — Vexar's tower and the path to Zantus's eternal throne*

```
THE LICHSPIRE (Territory)
│
└── The Bone Stairs (Passage) ─── Elite
    │
    ├── BRANCH A: The Soulless Study (Clearing) ─── Elite
    │   │
    │   └── Hall of the Discarded (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: Heart of the Lichking (Sector) ─── Elite
        │
        └── The Apprentice's Throne (Landmark) ─── CHAMPION #3: Archmagus Vexar, the Undying
            │
            └── Primeval Path (Passage) ─── Elite
                │
                └── The Origin of Death (Dungeon) ─── BOSS: Zantus, The First Mortal
                    │
                    └── The Phylactery (Vault) ─── Treasures
```

**Sites:** 8 | **Services:** None | **Champions:** 1 | **Boss:** 1 | **Vault:** 1

---

### The Hollow Kingdom Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 47 |
| **Settlements** | 3 (1 Kingdom, 1 City, 1 Village) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Lenore, The Banshee Queen) |
| **Boss** | 1 (Zantus, The First Mortal) |
| **Vault** | 1 (The Phylactery) |
| **Secret Access** | The Empyrean Reaches (via The Celestial Gate) |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Survivor's Rest | City | Merchant, Inn, Apothecary |
| The Haven | Village | Merchant, Inn, Trainer (Paladin), Trainer (Priest) |
| Deadholme | Kingdom | Merchant, Inn, Apothecary, Gambling |

---

## 8.10 Complete Region Example: The Savage Wilds

The Savage Wilds is a Tier 4 Region (Magical Beast Category). Untamed wilderness where legendary creatures rule the skies and stalk the highlands. Griffons nest on impossible cliffs, chimeras hunt the river valleys, and in the volcanic heart of the region, a phoenix burns eternal.

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| The Windward Coast | 2 | Trash, Minion, Elite | City (Talon's Rest), Champion #1 (Scylla) |
| The Thundering River | 2 | Minion, Elite | Wilderness hunting grounds, no settlement |
| The Highcliffs | 2 | Minion, Elite | Village (The Eagle's Nest), Trainers, Champion #2 (Zephyros) |
| Stormspire | 2 | Elite | Mini-Boss (Aetherius), aerial territory |
| The Ember Caldera | 2 | Elite | Champion #3 (Cinderfang), Boss (A'layr), Vault |

---

### Territory 1: The Windward Coast

*Where the civilized world meets the untamed — a frontier port clinging to the edge of monster territory*

```
THE WINDWARD COAST (Territory)
│
└── Seabreeze Trail (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: Talon's Rest (Settlement - City)
    │   ├── [Merchant Service]
    │   ├── [Inn Service]
    │   ├── [Apothecary Service]
    │   │
    │   └── Barnacled Berth (Passage) ─── Minion
    │       │
    │       └── The Broken Hull (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Seafolk Shore (Sector) ─── Minion/Elite
        │
        ├── BRANCH B1: Saltwater Den (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Rookeries (Clearing) ─── Elite
            │
            └── The Coastal Throne (Landmark) ─── CHAMPION #1: Scylla, the Reef Terror
```

**Sites:** 9 | **Services:** Merchant, Inn, Apothecary | **Champions:** 1

---

### Territory 2: The Thundering River

*A vast river valley where magical beasts come to drink, hunt, and kill*

```
THE THUNDERING RIVER (Territory)
│
└── Riverside Road (Passage) ─── Minion/Elite
    │
    ├── BRANCH A: The Crashing Veil (Clearing) ─── Elite
    │   │
    │   └── Secret of the Falls (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: Death's Meadow (Sector) ─── Elite
        │
        ├── BRANCH B1: Beast's Oasis (Clearing) ─── Elite
        │   │
        │   └── The Trophy Pile (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Drowning Point (Clearing) ─── Elite, dead end
```

**Sites:** 7 | **Services:** None | **Champions:** 0

---

### Territory 3: The Highcliffs

*Towering bluffs where only the brave or foolish climb — and where those who study beasts come to learn*

```
THE HIGHCLIFFS (Territory)
│
└── Wandering Rise (Passage) ─── Minion/Elite
    │
    ├── BRANCH A: The Eagle's Nest (Settlement - Village)
    │   ├── [Merchant Service]
    │   ├── [Inn Service]
    │   │
    │   └── The Observatory (Clearing)
    │       ├── The Stalker's Den (Site - Trainer: Hunter)
    │       └── The Elemental Study (Site - Trainer: Mage)
    │
    └── BRANCH B: Raptor's Dominion (Sector) ─── Elite
        │
        ├── BRANCH B1: Abandoned Eyrie (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Last Ledge (Clearing) ─── Elite
            │
            └── Perch of the Windy King (Landmark) ─── CHAMPION #2: Zephyros, the Cloud Stalker
                │
                └── Cloudbridge (Passage) ─── Elite
                    │
                    └── [Connects to Stormspire]
```

**Sites:** 10 | **Services:** Merchant, Inn, Trainer (Hunter), Trainer (Mage) | **Champions:** 1

---

### Territory 4: Stormspire

*A mountain that pierces the clouds — Aetherius's domain, where only flyers rule*

```
STORMSPIRE (Territory)
│
└── Cloud Walk (Passage) ─── Elite
    │
    ├── BRANCH A: Thunderstruck Roost (Clearing) ─── Elite
    │   │
    │   └── Vault of Charging (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Eye of the Storm (Sector) ─── Elite
        │
        └── The Storm Crown (Lair) ─── MINI-BOSS: Aetherius, Sky Captain
```

**Sites:** 5 | **Services:** None | **Champions:** 0 | **Mini-Boss:** 1

---

### Territory 5: The Ember Caldera

*A volcanic crater where fire meets feather — the eternal nest of the phoenix*

```
THE EMBER CALDERA (Territory)
│
└── Cinder Road (Passage) ─── Elite
    │
    ├── BRANCH A: Molten Flats (Clearing) ─── Elite
    │   │
    │   └── The Hall of Glass (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Fireheart (Sector) ─── Elite
        │
        ├── BRANCH B1: The Flame Spouts (Clearing) ─── Elite
        │   │
        │   └── The Magma Vault (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: Trail of Embers (Passage) ─── Elite
            │
            └── The Ember Throne (Landmark) ─── CHAMPION #3: Cinderfang, the Magma Wyrm
                │
                └── The Path of Rebirth (Passage) ─── Elite
                    │
                    └── The Eternal Nest (Dungeon) ─── BOSS: A'layr, The Emberglow Phoenix
                        │
                        └── The Ashen Hoard (Vault) ─── Treasures
```

**Sites:** 11 | **Services:** None | **Champions:** 1 | **Boss:** 1 | **Vault:** 1

---

### The Savage Wilds Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 42 |
| **Settlements** | 2 (1 City, 1 Village) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Aetherius, Sky Captain) |
| **Boss** | 1 (A'layr, The Emberglow Phoenix) |
| **Vault** | 1 (The Ashen Hoard) |
| **Secret Access** | None |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Talon's Rest | City | Merchant, Inn, Apothecary |
| The Eagle's Nest | Village | Merchant, Inn, Trainer (Hunter), Trainer (Mage) |

### Named Monsters

| Monster | Role | Location |
|---------|------|----------|
| Scylla, the Reef Terror | Champion #1 | The Coastal Throne (The Windward Coast) |
| Zephyros, the Cloud Stalker | Champion #2 | Perch of the Windy King (The Highcliffs) |
| Cinderfang, the Magma Wyrm | Champion #3 | The Ember Throne (The Ember Caldera) |
| Aetherius, Sky Captain | Mini-Boss | The Storm Crown (Stormspire) |
| A'layr, The Emberglow Phoenix | Boss | The Eternal Nest (The Ember Caldera) |

---

## 8.11 Complete Region Example: The Obsidian Dominion

The Obsidian Dominion is a Tier 5 Region (Dragon Category). The volcanic heart of the world, where dragons have ruled since time began. Magma flows through ancient tunnels, obsidian spires pierce smoke-choked skies, and the air itself burns. This is not a land mortals were meant to walk.

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| The Ashen Wastes | 2 | Trash, Minion, Elite | City (Last Hearth), entry zone |
| The Molten Depths | 2 | Minion, Elite | Champion #1 (Fragnar), volcanic depths |
| Fortress of the Dragonsworn | 3 | Elite | Kingdom (The Shadows of Ignis), Champion #2 (Pyraxis) |
| Ashreign Spires | 2 | Elite | Mini-Boss (Xarthan), volcanic peak |
| The Obsidian Throne | 2 | Elite | Champion #3 (Sythara), Boss (Ignis), Vault, Secret Access |

---

### Territory 1: The Ashen Wastes

*Where the world begins to burn — volcanic foothills and the last desperate outpost of the brave or foolish*

```
THE ASHEN WASTES (Territory)
│
└── The Blackened Path (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: Last Hearth (Settlement - City)
    │   ├── [Merchant Service]
    │   ├── [Inn Service]
    │   ├── [Apothecary Service]
    │   │
    │   └── The Cooling Tunnels (Passage) ─── Minion
    │       │
    │       └── The Fireproof Vault (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Burning Slopes (Sector) ─── Minion/Elite
        │
        ├── BRANCH B1: The Crimson Vein (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Brood Caves (Clearing) ─── Elite, dead end
```

**Sites:** 8 | **Services:** Merchant, Inn, Apothecary | **Champions:** 0

---

### Territory 2: The Molten Depths

*Where lava rivers flow and Fragnar claims dominion — the volcanic underworld*

```
THE MOLTEN DEPTHS (Territory)
│
└── Throat of Lava (Passage) ─── Minion/Elite
    │
    ├── BRANCH A: Magma Caves (Clearing) ─── Elite
    │   │
    │   └── Seam of Glass (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Forked Fires (Sector) ─── Elite
        │
        ├── BRANCH B1: The Melting Pot (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: Hall of the Lava King (Clearing) ─── Elite
            │
            └── Fragnar's Caldera (Landmark) ─── CHAMPION #1: Fragnar, the Molten One
```

**Sites:** 7 | **Services:** None | **Champions:** 1

---

### Territory 3: Fortress of the Dragonsworn

*Where the faithful gather — a stronghold of cultists, dragonkin, and those who worship fire*

```
FORTRESS OF THE DRAGONSWORN (Territory)
│
└── The Flames of Devotion (Passage) ─── Elite
    │
    └── The Shadows of Ignis (Settlement - Kingdom) ─── Hub, hostile territory
        │
        ├── THE TEMPLE DISTRICT (Sector)
        │   ├── The Flame's Bounty (Site - Merchant)
        │   ├── The Zealot's Rest (Site - Inn)
        │   ├── Fire & Salve (Site - Apothecary)
        │   └── The Sacred Core (Passage) ─── Elite
        │       │
        │       └── The Eternal Ember (Clearing) ─── Elite, dead end, loot
        │
        ├── THE BARRACKS (Sector)
        │   ├── The Burning Wager (Site - Gambling)
        │   └── The Fireswords (Passage) ─── Elite
        │       │
        │       └── The Dragonhoard (Clearing) ─── Elite, dead end, loot
        │
        └── THE GENERAL'S WING (Sector) ─── Elite
            │
            └── The General's Spine (Passage) ─── Elite
                │
                └── The Helm of Cinderflame (Landmark) ─── CHAMPION #2: General Pyraxis of the Dragonsworn
                    │
                    └── The Smoking Stairs (Passage) ─── Elite
                        │
                        └── [Connects to Ashreign Spires]
```

**Sites:** 13 | **Services:** Merchant, Inn, Apothecary, Gambling | **Champions:** 1

---

### Territory 4: Ashreign Spires

*Xarthan's domain — volcanic peaks where the sky itself burns*

```
ASHREIGN SPIRES (Territory)
│
└── The Choking Climb (Passage) ─── Elite
    │
    ├── BRANCH A: The Sea of Ash (Clearing) ─── Elite
    │   │
    │   └── The Gray Spoils (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: Heart of the World (Sector) ─── Elite
        │
        └── Roost of Smoke (Lair) ─── MINI-BOSS: Xarthan, the Ashen Wing
```

**Sites:** 5 | **Services:** None | **Champions:** 0 | **Mini-Boss:** 1

---

### Territory 5: The Obsidian Throne

*The end of all things — Ignis's domain, where the Obsidian King has ruled since before memory*

```
THE OBSIDIAN THRONE (Territory)
│
└── The Last March (Passage) ─── Elite
    │
    ├── BRANCH A: The Plundered Centuries (Clearing) ─── Elite
    │   │
    │   └── The Overflow (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Obsidian Core (Sector) ─── Elite
        │
        ├── BRANCH B1: The Hall of Lost Glory (Clearing) ─── Elite
        │   │
        │   └── The Conquered (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Daughter's Feast (Passage) ─── Elite
            │
            └── Hall of the Ash Princess (Landmark) ─── CHAMPION #3: Sythara, Daughter of Ash
                │
                └── Steps of Glass (Passage) ─── Elite
                    │
                    └── The Eternal Flame (Dungeon) ─── BOSS: Ignis, the Obsidian King
                        │
                        └── The King's Hoard (Vault) ─── Treasures + Portal to The Maddening Deep
```

**Sites:** 10 | **Services:** None | **Champions:** 1 | **Boss:** 1 | **Vault:** 1 | **Secret Access:** The Maddening Deep

---

### The Obsidian Dominion Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 43 |
| **Settlements** | 2 (1 Kingdom, 1 City) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Xarthan, the Ashen Wing) |
| **Boss** | 1 (Ignis, the Obsidian King) |
| **Vault** | 1 (The King's Hoard) |
| **Secret Access** | The Maddening Deep (via portal in Vault) |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Last Hearth | City | Merchant, Inn, Apothecary |
| The Shadows of Ignis | Kingdom | Merchant, Inn, Apothecary, Gambling |

### Named Monsters

| Monster | Role | Location |
|---------|------|----------|
| Fragnar, the Molten One | Champion #1 | Fragnar's Caldera (The Molten Depths) |
| General Pyraxis of the Dragonsworn | Champion #2 | The Helm of Cinderflame (Fortress of the Dragonsworn) |
| Sythara, Daughter of Ash | Champion #3 | Hall of the Ash Princess (The Obsidian Throne) |
| Xarthan, the Ashen Wing | Mini-Boss | Roost of Smoke (Ashreign Spires) |
| Ignis, the Obsidian King | Boss | The Eternal Flame (The Obsidian Throne) |

---

## 8.12 Complete Region Example: The Dreaming Woods (Secret Region)

The Dreaming Woods is a Tier 2 Secret Region (Faerie Category). The Feywild given form — a forest where time flows like water, beauty hides danger, and every bargain has a price. The trees whisper secrets, the flowers sing, and the paths rearrange themselves when you're not looking.

**Access:** Enter via Withering Winterberry (The Verdant Wilds) | Exit via The Waking Gate → The Warped Glade (The Blighted Moor) — one-way only

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| Threshold of Dreams | 2 | Trash, Minion, Elite | Entry zone, Champion #1 (Thornwick) |
| The Maze of Dreams | 2 | Minion, Elite | Village (Midnight Bazaar), Champion #2 (Flicker) |
| The Gloom Boughs | 2 | Elite | Mini-Boss (Sluagh), darker Fey territory |
| The Court of Thorns | 2 | Elite | Champion #3 (Sir Bramble), Boss (Titania), Vault, Exit |

---

### Territory 1: Threshold of Dreams

*Where the mortal world ends and the Dreaming begins — beauty that hides teeth*

```
THRESHOLD OF DREAMS (Territory)
│
└── Moonpetal Path (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: Dewdrop Clearing (Clearing) ─── Minion
    │   │
    │   └── Pixie's Cache (Clearing) ─── Minion, dead end, loot
    │
    └── BRANCH B: Duskwander Grove (Sector) ─── Minion/Elite
        │
        ├── BRANCH B1: The Spore Court (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: Heart of the Veil (Clearing) ─── Elite
            │
            └── The Warden's Tree (Landmark) ─── CHAMPION #1: Thornwick, Keeper of the Veil
```

**Sites:** 7 | **Services:** None | **Champions:** 1

---

### Territory 2: The Maze of Dreams

*Where paths change and travelers are lost forever — the Midnight Bazaar awaits those who know the way*

```
THE MAZE OF DREAMS (Territory)
│
└── The Never-Same Walk (Passage) ─── Minion/Elite
    │
    ├── BRANCH A: Midnight Bazaar (Settlement - Village)
    │   ├── Gilt & Glamour (Site - Merchant)
    │   ├── The Drowsy Toadstool (Site - Inn)
    │   │
    │   └── Twilight Vendors (Passage) ─── Elite
    │       │
    │       └── The Forbidden Aisle (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Wanderer's Trail (Sector) ─── Elite
        │
        ├── BRANCH B1: The Final Dreams (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Eye of Confusion (Clearing) ─── Elite
            │
            └── The Maze Lord's Seat (Landmark) ─── CHAMPION #2: Flicker, Who-Knows-All-Turns
                │
                └── The Fading Way (Passage) ─── Elite
                    │
                    └── [Connects to The Gloom Boughs]
```

**Sites:** 9 | **Services:** Merchant, Inn | **Champions:** 1

---

### Territory 3: The Gloom Boughs

*Where the darker Fey dwell — Sluagh and his court of shadows*

```
THE GLOOM BOUGHS (Territory)
│
└── Gloomwalk (Passage) ─── Elite
    │
    ├── BRANCH A: The Murmuring Shadows (Clearing) ─── Elite
    │   │
    │   └── Gloom's Treasure Field (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Voided Glades (Sector) ─── Elite
        │
        └── Sluagh's Hollow (Lair) ─── MINI-BOSS: Sluagh, The Gloom Fey
```

**Sites:** 5 | **Services:** None | **Champions:** 0 | **Mini-Boss:** 1

---

### Territory 4: The Court of Thorns

*Titania's domain — where the Queen of Thorns holds eternal court among roses that bleed*

```
THE COURT OF THORNS (Territory)
│
└── Thorn-Leaf Path (Passage) ─── Elite
    │
    ├── BRANCH A: The Blossoms of Eternity (Clearing) ─── Elite
    │   │
    │   └── The Roses That Weep (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Heart of Thorns (Sector) ─── Elite
        │
        ├── BRANCH B1: The Loyal Fey (Clearing) ─── Elite
        │   │
        │   └── Titania's Treasure Trove (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: Trail of One-Hundred Cuts (Passage) ─── Elite
            │
            └── The Briarpatch (Landmark) ─── CHAMPION #3: Sir Bramble, The Briar Knight
                │
                └── Hall of Thorns (Passage) ─── Elite
                    │
                    └── The Rosey Throne (Dungeon) ─── BOSS: Titania, Queen of Thorns
                        │
                        └── The Dream Vault (Vault) ─── Treasures
                            │
                            └── The Waking Gate (Portal) ─── One-way exit to The Warped Glade (The Blighted Moor)
```

**Sites:** 10 | **Services:** None | **Champions:** 1 | **Boss:** 1 | **Vault:** 1 | **Exit:** The Warped Glade

---

### The Dreaming Woods Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 31 |
| **Settlements** | 1 (Village) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Sluagh, The Gloom Fey) |
| **Boss** | 1 (Titania, Queen of Thorns) |
| **Vault** | 1 (The Dream Vault) |
| **Entry** | Withering Winterberry (The Verdant Wilds) |
| **Exit** | The Waking Gate → The Warped Glade (The Blighted Moor) |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Midnight Bazaar | Village | Merchant (Gilt & Glamour), Inn (The Drowsy Toadstool) |

### Named Monsters

| Monster | Role | Location |
|---------|------|----------|
| Thornwick, Keeper of the Veil | Champion #1 | The Warden's Tree (Threshold of Dreams) |
| Flicker, Who-Knows-All-Turns | Champion #2 | The Maze Lord's Seat (The Maze of Dreams) |
| Sir Bramble, The Briar Knight | Champion #3 | The Briarpatch (The Court of Thorns) |
| Sluagh, The Gloom Fey | Mini-Boss | Sluagh's Hollow (The Gloom Boughs) |
| Titania, Queen of Thorns | Boss | The Rosey Throne (The Court of Thorns) |

---

## 8.13 Complete Region Example: The Empyrean Reaches (Secret Region)

The Empyrean Reaches is a Tier 4 Secret Region (Celestial Category). Heaven given form — floating islands of pure light, temples of crystal and gold, and beings of radiance so perfect they barely comprehend mortal suffering. The celestials observe, judge, and occasionally intervene — but always from a place of absolute certainty that they are right.

**Access:** Enter via The Celestial Gate (The Hollow Kingdom) | Exit via The Mortal Gate → The Blessed Glade (The Hollow Kingdom) — one-way only

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| Gates of Ascension | 2 | Trash, Minion, Elite | Entry zone, Champion #1 (Lumiel) |
| The Sanctuary of Aethel | 2 | Elite | Village (Aethel's Grace), Champion #2 (Clemency), Mini-Boss (Varian) |
| The Radiant Throne | 2 | Elite | Champion #3 (Solarius), Boss (Seraphina), Vault, Exit |

---

### Territory 1: Gates of Ascension

*Where mortals first glimpse heaven — blinding light, floating stone, and the weight of judgment*

```
GATES OF ASCENSION (Territory)
│
└── The Luminous Path (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: Sunlit Vale (Sector) ─── Minion
    │   │
    │   ├── BRANCH A1: Prismatic Gardens (Clearing) ─── Minion/Elite
    │   │   │
    │   │   └── Heaven's First Gift (Clearing) ─── Elite, dead end, loot
    │   │
    │   └── BRANCH A2: The Climb to Eternity (Passage) ─── Elite
    │       │
    │       └── Crystalwatch (Landmark) ─── CHAMPION #1: Lumiel of the First Light
    │
    └── BRANCH B: The Driftstones (Sector) ─── Minion/Elite
        │
        ├── BRANCH B1: Isle of Landing Light (Clearing) ─── Elite
        │   │
        │   └── The Vault of Skies (Clearing) ─── Elite, dead end, loot
        │
        └── BRANCH B2: The Ethereal Crossing (Clearing) ─── Elite, dead end
```

**Sites:** 9 | **Services:** None | **Champions:** 1

---

### Territory 2: The Sanctuary of Aethel

*Where celestials dwell in perfect order — a city of light, judgment, and absolute conviction*

```
THE SANCTUARY OF AETHEL (Territory)
│
└── The Walk of Light (Passage) ─── Elite
    │
    └── Aethel's Grace (Settlement - Village) ─── Hub, celestial presence
        │
        ├── THE MORTAL QUARTER (Sector)
        │   ├── Divine Provisions (Site - Merchant)
        │   ├── Chamber of Serenity (Site - Inn)
        │   │
        │   └── The Veil Beyond (Passage) ─── Elite
        │       │
        │       ├── BRANCH A1: The Sacred Cache (Clearing) ─── Elite, dead end, loot
        │       │
        │       └── BRANCH A2: The Archive of Ages (Clearing) ─── Elite
        │           │
        │           └── The Sealed Wisdom (Clearing) ─── Elite, dead end, loot
        │
        └── THE COURT OF SCALES (Sector) ─── Elite
            │
            └── The Balance Chamber (Clearing) ─── Elite
                │
                └── Throne of Adjudication (Landmark) ─── CHAMPION #2: Clemency, The Last Word
                    │
                    └── The Path of Sentencing (Passage) ─── Elite
                        │
                        └── Varian's Tribunal (Lair) ─── MINI-BOSS: Varian, The Judge of Aethel
```

**Sites:** 11 | **Services:** Merchant, Inn | **Champions:** 1 | **Mini-Boss:** 1

---

### Territory 3: The Radiant Throne

*Seraphina's domain — where the Hand of Radiance holds court in blinding glory*

```
THE RADIANT THRONE (Territory)
│
└── The Path of Glory (Passage) ─── Elite
    │
    ├── BRANCH A: The Halls of Praise (Sector) ─── Elite
    │   │
    │   ├── BRANCH A1: The Voice of Heaven (Clearing) ─── Elite
    │   │   │
    │   │   └── Heaven's Melody (Clearing) ─── Elite, dead end, loot
    │   │
    │   └── BRANCH A2: The Purifying Flame (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Heart of Divinity (Sector) ─── Elite
        │
        └── The Proclamation (Passage) ─── Elite
            │
            └── Altar of the Herald (Landmark) ─── CHAMPION #3: Solarius, Herald of Dawn
                │
                └── Steps of Honor (Passage) ─── Elite
                    │
                    └── The Solar Seat of Seraphina (Dungeon) ─── BOSS: Seraphina, The Hand of Radiance
                        │
                        └── Light's Bounty (Vault) ─── Treasures
                            │
                            └── The Mortal Gate (Portal) ─── One-way exit to The Blessed Glade (The Hollow Kingdom)
```

**Sites:** 10 | **Services:** None | **Champions:** 1 | **Boss:** 1 | **Vault:** 1 | **Exit:** The Blessed Glade

---

### The Empyrean Reaches Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 30 |
| **Settlements** | 1 (Village) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Varian, The Judge of Aethel) |
| **Boss** | 1 (Seraphina, The Hand of Radiance) |
| **Vault** | 1 (Light's Bounty) |
| **Entry** | The Celestial Gate (The Hollow Kingdom) |
| **Exit** | The Mortal Gate → The Blessed Glade (The Hollow Kingdom) |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Aethel's Grace | Village | Merchant (Divine Provisions), Inn (Chamber of Serenity) |

### Named Monsters

| Monster | Role | Location |
|---------|------|----------|
| Lumiel of the First Light | Champion #1 | Crystalwatch (Gates of Ascension) |
| Clemency, The Last Word | Champion #2 | Throne of Adjudication (The Sanctuary of Aethel) |
| Solarius, Herald of Dawn | Champion #3 | Altar of the Herald (The Radiant Throne) |
| Varian, The Judge of Aethel | Mini-Boss | Varian's Tribunal (The Sanctuary of Aethel) |
| Seraphina, The Hand of Radiance | Boss | The Solar Seat of Seraphina (The Radiant Throne) |

---

## 8.15 Complete Region Example: The Maddening Deep (Secret Region)

The Maddening Deep is a Tier 5 Secret Region (Aberration Category — Hardest Content). The place where reality breaks — a wound in the fabric of existence where alien geometries fold in on themselves and the laws of nature are suggestions at best. Here dwell things that were ancient when the gods were young, beings whose very existence is an affront to sanity.

**Access:** Enter via Portal in The King's Hoard (The Obsidian Dominion) after defeating Ignis | Exit via Reality Returned → The Crossroads — one-way only

### Territory Overview

| Territory | Sectors | Monster Tiers | Key Features |
|-----------|---------|---------------|--------------|
| The Wound Between Worlds | 2 | Trash, Minion, Elite | Entry zone, Champion #1 (Vhorr) |
| The Breathing Abyss | 2 | Elite | Village (Congregation of the Void), Champion #2 (Archpriest Morvain) |
| The Domain of a Thousand Eyes | 2 | Elite | Mini-Boss (Z'hul), the Watchers |
| The Mind of Xylos | 2 | Elite | Champion #3 (Qeth), Boss (Ulgoth), Vault, Exit |

---

### Territory 1: The Wound Between Worlds

*Where reality begins to fray — the descent from the dragon's hoard into something far worse*

```
THE WOUND BETWEEN WORLDS (Territory)
│
└── Fissure of Madness (Passage) ─── Trash/Minion
    │
    ├── BRANCH A: Crooked Corridors (Sector) ─── Minion
    │   │
    │   ├── BRANCH A1: Inversion Chamber (Clearing) ─── Minion/Elite
    │   │   │
    │   │   └── The Writhing Vault (Clearing) ─── Elite, dead end, loot
    │   │
    │   └── BRANCH A2: The Falling Steps (Passage) ─── Elite
    │       │
    │       └── The Point of No Return (Landmark) ─── CHAMPION #1: Vhorr, First of the Twisted
    │
    └── BRANCH B: Non-Euclidean Depths (Sector) ─── Minion/Elite
        │
        └── The Space of Impossibilities (Clearing) ─── Elite, dead end, loot
```

**Sites:** 8 | **Services:** None | **Champions:** 1

---

### Territory 2: The Breathing Abyss

*Where the aberrations dwell in numbers — and where those who worship them have made their twisted home*

```
THE BREATHING ABYSS (Territory)
│
└── Passage of Flesh (Passage) ─── Elite
    │
    └── Congregation of the Void (Settlement - Village) ─── Hub, cult presence
        │
        ├── THE ENLIGHTENED CELLS (Sector)
        │   ├── The Sanity Tax (Site - Merchant)
        │   ├── Slumber of Thoughtlessness (Site - Inn)
        │   │
        │   └── The Opening Mind (Passage) ─── Elite
        │       │
        │       ├── BRANCH A1: Hall of Invocation (Clearing) ─── Elite, dead end, loot
        │       │
        │       └── BRANCH A2: Stone of Communion (Clearing) ─── Elite
        │           │
        │           └── Voice of the Void (Landmark) ─── CHAMPION #2: Archpriest Morvain
        │
        └── PITS OF UNCREATION (Sector) ─── Elite
            │
            └── The Emergence Basin (Clearing) ─── Elite
                │
                └── Things of New Nightmares (Clearing) ─── Elite, dead end, loot
```

**Sites:** 10 | **Services:** Merchant, Inn | **Champions:** 1

---

### Territory 3: The Domain of a Thousand Eyes

*Z'hul's domain — where a thousand thousand eyes observe all, judge all, and find all wanting*

```
THE DOMAIN OF A THOUSAND EYES (Territory)
│
└── Walk of Scrutiny (Passage) ─── Elite
    │
    ├── BRANCH A: The All-Seeing Chamber (Clearing) ─── Elite
    │   │
    │   └── What-Was-Found-Wanting Vault (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: Den of Central Sight (Sector) ─── Elite
        │
        └── Hall-Where-All-Is-Seen (Clearing) ─── Elite
            │
            └── Z'hul's Throne of Unblinking (Lair) ─── MINI-BOSS: Z'hul, The Unblinking Eye
```

**Sites:** 6 | **Services:** None | **Champions:** 0 | **Mini-Boss:** 1

---

### Territory 4: The Mind of Xylos

*Ulgoth's realm — the Elder Brain of Xylos, the vast intelligence that dreams the Deep into existence*

```
THE MIND OF XYLOS (Territory)
│
└── The Last Conscious Thought (Passage) ─── Elite
    │
    ├── BRANCH A: Cognition Ward (Sector) ─── Elite
    │   │
    │   ├── BRANCH A1: Corridor of Stolen Memory (Clearing) ─── Elite
    │   │   │
    │   │   └── Vault of Harvested Knowledge (Clearing) ─── Elite, dead end, loot
    │   │
    │   └── BRANCH A2: Where-Ulgoth-Dreams (Clearing) ─── Elite, dead end, loot
    │
    └── BRANCH B: The Primal Brain (Sector) ─── Elite
        │
        └── The Thought Bridge (Passage) ─── Elite
            │
            └── Impulse of Protection (Landmark) ─── CHAMPION #3: Qeth, The Final Thought
                │
                └── Before Oblivion (Passage) ─── Elite
                    │
                    └── Pool of the Elder Brain (Dungeon) ─── BOSS: Ulgoth, The Elder Brain of Xylos
                        │
                        └── Wisdom Eternal (Vault) ─── Treasures
                            │
                            └── Reality Returned (Portal) ─── One-way exit to The Crossroads
```

**Sites:** 11 | **Services:** None | **Champions:** 1 | **Boss:** 1 | **Vault:** 1 | **Exit:** The Crossroads

---

### The Maddening Deep Summary

| Statistic | Count |
|-----------|-------|
| **Total Sites** | 35 |
| **Settlements** | 1 (Village) |
| **Champions** | 3 |
| **Mini-Boss** | 1 (Z'hul, The Unblinking Eye) |
| **Boss** | 1 (Ulgoth, The Elder Brain of Xylos) |
| **Vault** | 1 (Wisdom Eternal) |
| **Entry** | Portal in The King's Hoard (The Obsidian Dominion) |
| **Exit** | Reality Returned → The Crossroads |

### Service Distribution

| Settlement | Type | Services |
|------------|------|----------|
| Congregation of the Void | Village | Merchant (The Sanity Tax), Inn (Slumber of Thoughtlessness) |

### Named Monsters

| Monster | Role | Location |
|---------|------|----------|
| Vhorr, First of the Twisted | Champion #1 | The Point of No Return (The Wound Between Worlds) |
| Archpriest Morvain | Champion #2 | Voice of the Void (The Breathing Abyss) |
| Qeth, The Final Thought | Champion #3 | Impulse of Protection (The Mind of Xylos) |
| Z'hul, The Unblinking Eye | Mini-Boss | Z'hul's Throne of Unblinking (The Domain of a Thousand Eyes) |
| Ulgoth, The Elder Brain of Xylos | Boss | Pool of the Elder Brain (The Mind of Xylos) |

---

## 8.16 Trainer Distribution

Trainers are scattered throughout the 7 visible Regions. Secret Regions contain no Trainers.

### Distribution Overview

- **16 Trainers** total (8 Callings × 2 each)
- **7 Visible Regions** with major settlements
- **1-3 Trainers** per Region based on thematic fit
- **Discovery Required** — Players must explore to find Trainers for their Calling

### Trainers by Region

| Region | Tier | Trainers | Rationale |
|--------|------|----------|-----------|
| The Verdant Wilds | 1 | Hunter, Druid | Nature/wilderness themes |
| The Lawless Marches | 1 | Warrior, Rogue, Bard | Mercenaries, thieves, tavern performers |
| The Blighted Moor | 2 | Druid, Priest | Corrupted nature, curse cleansing |
| The Clockwork Wastes | 3 | Rogue, Mage, Bard | Infiltrators, artificers, mechanical music |
| The Hollow Kingdom | 3 | Paladin, Priest | Undead hunters, exorcists |
| The Savage Wilds | 4 | Hunter, Mage | Beast tracking, elemental research |
| The Obsidian Dominion | 5 | Warrior, Paladin | Dragon slayers, holy crusaders |

### Trainers by Calling

| Calling | Location 1 | Location 2 |
|---------|------------|------------|
| Warrior | The Lawless Marches (Tier 1) | The Obsidian Dominion (Tier 5) |
| Paladin | The Hollow Kingdom (Tier 3) | The Obsidian Dominion (Tier 5) |
| Hunter | The Verdant Wilds (Tier 1) | The Savage Wilds (Tier 4) |
| Rogue | The Lawless Marches (Tier 1) | The Clockwork Wastes (Tier 3) |
| Mage | The Clockwork Wastes (Tier 3) | The Savage Wilds (Tier 4) |
| Priest | The Blighted Moor (Tier 2) | The Hollow Kingdom (Tier 3) |
| Bard | The Lawless Marches (Tier 1) | The Clockwork Wastes (Tier 3) |
| Druid | The Verdant Wilds (Tier 1) | The Blighted Moor (Tier 2) |

### Design Notes

- **Tier 1 Regions** (Verdant Wilds + Lawless Marches) have 5 Trainers combined — good early access
- **Each Calling** has Trainers in two different Regions — encourages exploration
- **No Secret Region Trainers** — Secret Regions reward exploration with loot, not services |

## 8.7 Vault Contents

After defeating a Region's Boss, the Vault contains:

- Boss Remnant (unique Epic junk item)
- Epic/Named equipment pieces
- Gold
- Rare consumables
- Narrative junk items (income)

## 8.8 Biome Tag System (25 Tags)

Sites are tagged with biomes that affect monster spawns and location flavor:

| Category | Tags |
|----------|------|
| Primary Environment | Forest, Mountain, Desert, Swamp, Coast |
| Secondary Geography | Cave, Plains, Lake, River, Bluff |
| Abstract/Elemental | Arcane, Fire, Water, Earth, Air |
| Structural/Site | Ruin, Temple, Tower, Crypt, Stronghold |
| System/Utility | City, Crossroad, Hidden, Cursed, Underdark |

### Monster Category Biome Assignments

| Category | Spawns In (5 Biome Tags) |
|----------|--------------------------|
| Aberration | Arcane, Underdark, Ruin, Crypt, Tower |
| Beast | Forest, Mountain, Desert, Swamp, Crossroad |
| Celestial | Temple, Bluff, Air, Arcane, Mountain |
| Construct | Ruin, Earth, Fire, City, Stronghold |
| Cursed | Cursed, Swamp, City, Crypt, Desert |
| Dragon | Mountain, Fire, Water, Cave, Volcanic |
| Faerie | Arcane, Mountain, Forest, River, Lake |
| Humanoid | City, Plains, Stronghold, Cave, Coast |
| Magical Beast | Bluff, River, Lake, Air, Coast |
| Undead | Temple, Cursed, Underdark, Tower, Crypt |

## 8.9 Ration System

Rations are a travel resource:

| Rule | Description |
|------|-------------|
| **Ration Cost** | Each Site has a Ration Cost representing distance/difficulty to traverse |
| **Consumption** | When traveling, the Ration Cost is deducted from Hero's current Rations |
| **Starvation** | If Rations reach 0, HP is deducted instead for each new destination |
| **Replenishment** | Rations can be purchased at Merchants |

## 8.10 Lockpicking System

Some Sites are locked and require a lockpick to access.

### Success Rate Formula

**Success Rate** = 50 + Hero Acuity + Hero Instinct - (2 × Lock Quality)

*Example: Acuity 8 + Instinct 8, Lock Quality 10 → 50 + 8 + 8 - 20 = 46%*

### Lockpick Outcomes

| Outcome | Condition | Result |
|---------|-----------|--------|
| Success | d100 ≤ Success Rate | Lockpick consumed, location unlocked |
| Failure | d100 > Success Rate | Lockpick NOT consumed, try again later |
| Critical Failure | d100 ≥ 95 | Lockpick consumed AND broken |

## 8.11 Location Flavor Text System

Every Site in the game has descriptive flavor text that changes based on its current state. This text appears in the Narrative Panel when a Hero arrives at a Site.

### 8.11.1 Location States

| State | Condition | Text Tone |
|-------|-----------|-----------|
| **Corrupted** | Monsters still present at the Site | Tense, ominous, visceral sensory details |
| **Cleansed** | All monsters at the Site have been defeated | Peaceful, hopeful, sensory relief |
| **Welcome** | Safe Settlements that are never corrupted | Warm, inviting, bustling |

**Note:** Safe Settlement hubs (like Goldgrass City proper) only have a single "Welcome" version. Their Districts may have Corrupted/Cleansed versions.

### 8.11.2 Five-Sentence Structure

Each flavor text block consists of exactly **5 sentences** following a specific structure. Each sentence should be **12-20 words**, for a total of **60-100 words** per state.

**Exception:** The special tutorial Sites (Avandria and Crossroads) may exceed 100 words due to their narrative importance as world-introduction moments.

#### Corrupted Structure

| # | Element | Description | Guidance |
|---|---------|-------------|----------|
| 1 | **Arrival** | What the hero first sees/senses upon entering | First impression, immediate visual |
| 2 | **Atmosphere** | The oppressive/dangerous mood | Sensory details — sounds, smells, temperature, light |
| 3 | **Landscape** | Notable environmental features or terrain | Physical space, landmarks, terrain (NO Site names) |
| 4 | **Threat** | Signs of corruption — evidence of danger | Tracks, shadows, sounds, unnatural elements (NO specific monster names) |
| 5 | **Call to Action** | A question or imperative prompting the hero | Rhetorical question or forward momentum |

#### Cleansed Structure

| # | Element | Description | Guidance |
|---|---------|-------------|----------|
| 1 | **Arrival** | The transformed first impression | Same location, now improved |
| 2 | **Atmosphere** | The restored/peaceful mood | Relief, warmth, light, natural sounds |
| 3 | **Landscape** | The same features now seen positively | Nature reclaiming, beauty revealed |
| 4 | **Restoration** | Signs of peace — evidence of recovery | Wildlife, silence, natural order, appropriate calm |
| 5 | **Reflection** | A moment of accomplishment or forward thought | What the hero achieved, what this place remembers |

#### Welcome Structure (Safe Settlements)

| # | Element | Description | Guidance |
|---|---------|-------------|----------|
| 1 | **Arrival** | First impression of the settlement | Scale, activity, character |
| 2 | **Atmosphere** | The mood of civilization | Sounds of life, commerce, community |
| 3 | **Landscape** | Notable features of the settlement | Architecture, streets, landmarks |
| 4 | **Life** | Signs of thriving community | People, trade, daily activity |
| 5 | **Invitation** | Welcome or opportunity | What awaits the hero here |

### 8.11.3 Tone Guidance by Site Category

Different Site types require different atmospheric approaches while maintaining the same 5-sentence structure.

#### Wilderness Sites (Path, Crossroads, Clearing, Grove)

| State | Tone Keywords | Sensory Focus |
|-------|---------------|---------------|
| **Corrupted** | Overgrown, predatory, twisted, unnatural | Rustling, snapping twigs, animal musk, shadows |
| **Cleansed** | Vibrant, peaceful, natural harmony, thriving | Birdsong, sunlight, fresh air, gentle breeze |

#### Settlement Sites (City, Town, Village, District)

| State | Tone Keywords | Sensory Focus |
|-------|---------------|---------------|
| **Corrupted** | Abandoned, fearful, decay, silence | Empty streets, shuttered windows, distant cries |
| **Cleansed** | Bustling, hopeful, rebuilt, alive | Voices, commerce, smoke from chimneys, laughter |
| **Welcome** | Thriving, welcoming, busy, prosperous | Crowds, market calls, music, cooking smells |

#### Dungeon Sites (Cave, Crypt, Ruin, Mine)

| State | Tone Keywords | Sensory Focus |
|-------|---------------|---------------|
| **Corrupted** | Haunted, dangerous, oppressive, dread | Echoes, dripping water, cold air, scratching sounds |
| **Cleansed** | Silent, respectful, sealed, at rest | Stillness, dust motes, quiet, finality |

#### Landmark Sites (Champion/Boss Locations)

| State | Tone Keywords | Sensory Focus |
|-------|---------------|---------------|
| **Corrupted** | Epicenter, dread, power, malevolence | Unnatural cold/heat, oppressive presence, wrongness |
| **Cleansed** | Monument, victory, sacred, transformed | Light, warmth, weight lifted, peace |

### 8.11.4 Writing Guidelines

**Do:**
- Use second-person perspective ("You see..." "Before you...")
- Include visceral sensory details (all five senses)
- Create contrast between Corrupted and Cleansed versions
- Match the Site's biome tags for thematic consistency
- Keep sentences punchy and evocative

**Avoid:**
- Naming specific monsters (the system spawns them dynamically)
- Naming connected Sites (the UI handles navigation)
- Breaking second-person perspective
- Excessive length (stay within 15-30 words per sentence)
- Generic descriptions that could apply anywhere

### 8.11.5 Biome Tag Integration

Flavor text should incorporate the Site's assigned biome tags to maintain thematic consistency:

| Biome Tag | Corrupted Elements | Cleansed Elements |
|-----------|-------------------|-------------------|
| Forest | Twisted branches, unnatural silence, watching eyes | Dappled sunlight, birdsong, rustling leaves |
| Mountain | Howling wind, unstable rocks, thin air | Majestic peaks, crisp air, eagle cries |
| Swamp | Murky water, rot smell, sucking mud | Still pools, frog chorus, water lilies |
| Desert | Scorching heat, bleached bones, mirages | Warm sand, desert blooms, cool oasis |
| Tundra | Biting cold, ice cracks, frozen shapes | Pristine snow, northern lights, peaceful white |
| Ruin | Crumbling stone, whispered echoes, faded carvings | Weathered dignity, overgrown beauty, history |
| Arcane | Unstable magic, wrong colors, humming dread | Gentle glow, balanced energy, wonder |
| Cursed | Withered plants, unnatural silence, cold spots | Life returning, curse lifted, warmth |
| Crypt | Death smell, scraping sounds, cold tombs | Respectful silence, resting dead, sealed |
| City | Empty streets, broken glass, fearful whispers | Busy markets, calling vendors, laughter |

### 8.11.6 Examples

#### Example 1: Wilderness Path (The Whispering Grove)

**Corrupted:**
> *The forest path narrows ahead, ancient oaks pressing close on either side. A heavy silence blankets the grove, broken only by the occasional snap of a twig somewhere in the shadows. Gnarled roots break through the path like grasping fingers, and the canopy above blocks all but the faintest light. Deep gouges scar the bark of nearby trees, fresh sap weeping from wounds made by something with terrible claws. What stalks these woods, and will you face it?*

**Cleansed:**
> *Sunlight filters through the canopy, painting the forest path in warm golden hues. Birdsong fills the air, a gentle chorus welcoming your return to this peaceful place. The ancient oaks stand tall and proud, their branches swaying in a breeze that carries the scent of wildflowers. A deer watches from a nearby thicket, unafraid, before bounding gracefully into the undergrowth. This grove remembers the darkness you drove away.*

#### Example 2: Settlement District (Merchant's Quarter)

**Corrupted:**
> *The cobblestone streets stretch before you, eerily empty and strewn with abandoned carts. Shuttered windows line the buildings, and somewhere distant, a door bangs rhythmically in the wind. Market stalls stand overturned, their wares scattered and rotting where they fell. Shadows move behind broken windows, and a low growl echoes from an alley you cannot see. The merchants fled — will you discover what drove them away?*

**Cleansed:**
> *The cobblestone streets bustle with renewed life as merchants call out their wares. Shutters have been thrown open, and the smell of fresh bread wafts from a nearby bakery. Market stalls overflow with goods, and customers haggle cheerfully over prices. Children chase each other between the carts while guards patrol with easy smiles. You gave this quarter back to its people.*

#### Example 3: Dungeon (The Sunken Crypt)

**Corrupted:**
> *Stone steps descend into darkness, the air growing cold and thick with the smell of ancient decay. Water drips somewhere in the depths, each drop echoing through chambers unseen. Faded carvings line the walls, their warnings worn but still legible to those who know the old tongue. Something scrapes against stone below, a rhythmic sound like footsteps that should not exist. The dead do not rest here — will you grant them peace?*

**Cleansed:**
> *Stone steps descend into stillness, the air cool but no longer oppressive. Silence fills the crypt, broken only by the gentle drip of water into an ancient basin. The faded carvings seem almost peaceful now, their warnings no longer needed. Dust motes drift in the pale light that reaches the upper chambers, undisturbed by movement. The dead rest at last, thanks to you.*

#### Example 4: Safe Settlement Hub (Goldgrass City)

**Welcome:**
> *The capital of the Verdant Wilds sprawls before you, its timber-framed buildings rising proudly behind ancient stone walls. The clang of the blacksmith's hammer mingles with merchant calls and the laughter of children playing in the squares. Cobblestone streets wind between guild halls, taverns, and temples, each corner revealing new sights and sounds. Citizens of every species move through the crowds — humans, elves, dwarves, and more — united in this thriving heart of civilization. Whatever you seek, Goldgrass City can provide.*

### 8.11.7 Data Structure

Each Site stores flavor text according to its type:

**Standard Sites (Corrupted/Cleansed):**
```javascript
Site {
  ...
  flavorText: {
    corrupted: String,  // 5 sentences, 75-150 words
    cleansed: String    // 5 sentences, 75-150 words
  },
  biomeTags: [String]
}
```

**Safe Settlement Hubs (Welcome only):**
```javascript
Site {
  ...
  flavorText: {
    welcome: String     // 5 sentences, 75-150 words
  },
  biomeTags: [String],
  alwaysSafe: true
}
```

### 8.11.8 Special Sites: Avandria & Crossroads

Two unique Sites serve as tutorial and hub locations, teaching players basic navigation while providing world-building flavor. Both are always safe (no monsters) but have Corrupted/Cleansed versions as an easter egg for players who clear the entire game.

**Easter Egg Trigger:** Cleansed versions display only when ALL Sites in ALL Regions have been cleansed.

#### Avandria (Origin Site)

| Aspect | Description |
|--------|-------------|
| **Purpose** | First Site in the game; introduces the world and basic navigation |
| **Monsters** | None (always safe) |
| **Navigation** | One-way forward to Crossroads |
| **Easter Egg** | Cleansed version visible after ALL Sites in ALL Regions cleansed |

**Corrupted (Default — First Experience):**

> *You open your eyes to a world both beautiful and broken — this is Avandria, and it has been waiting for you. A shadow lies across the land, a corruption that seeps into every forest, every city, every forgotten ruin. Once, these rolling hills and ancient woods thrived with life; now they hold their breath, waiting to see what you will become. The creatures of darkness grow bold, and the people of this world have all but lost hope for salvation. But you are here now, and every legend begins with a single step forward — will you take it?*

**Cleansed (Easter Egg):**

> *You open your eyes to a world reborn — Avandria stands healed, and it is because of you. Light fills the land where shadow once crept, and the air itself seems to hum with gratitude. The rolling hills and ancient woods burst with life once more, thriving as they were always meant to. The creatures of darkness have been vanquished, and the people speak your name in prayers of thanks. You came to this place a stranger; you leave it a legend — Avandria will never forget what you have done.*

#### Crossroads (Hub Site)

| Aspect | Description |
|--------|-------------|
| **Purpose** | Central hub connecting to all 7 visible Regions; teaches destination selection |
| **Monsters** | None (always safe) |
| **Navigation** | Forward to 7 Regions; can return here from any Region |
| **Easter Egg** | Cleansed version visible after ALL Sites in ALL Regions cleansed |

**Corrupted (Default):**

> *Seven paths converge beneath an ancient stone marker, worn smooth by the countless travelers who came before you. The wind carries whispers from every direction — cries for help, warnings of danger, echoes of lands in turmoil. Each road stretches toward a distant horizon: verdant wilds, lawless marches, blighted moors, and realms stranger still. Corruption has touched every corner of Avandria, and each path leads to a region that desperately needs a champion. The choice is yours alone — where will you begin the journey that will define your legend?*

**Cleansed (Easter Egg):**

> *Seven paths converge beneath an ancient stone marker, its weathered surface now warm with renewed life. The wind carries laughter from every direction — songs of celebration, sounds of peace, echoes of lands restored. Each road stretches toward a distant horizon: verdant wilds thriving, lawless marches tamed, blighted moors cleansed, and wonders reclaimed. Travelers pass freely now, nodding to you with reverence — they know who walked these roads and saved them all. Every path you chose led to victory; every battle you fought brought healing — the crossroads remember.*

### 8.11.9 Region Flavor Text: The Verdant Wilds

The Verdant Wilds is the tutorial Region (Beast Category, Tier 1). It contains 1 Minion-tier monster at the Region entry and leads to 5 Territories.

**Cleanse Trigger:** Region monster defeated + ALL 5 child Territories fully cleansed.

#### The Verdant Wilds (Region Entry)

**Corrupted:**

> *The Verdant Wilds stretches before you — rolling green hills and ancient forests, beautiful yet wounded. The air carries wildflowers and something feral beneath, a wrongness that has turned nature against itself. Five paths branch ahead: sunlit meadows, whispering woods, open plains, rocky highlands, and a misty shore. Tracks in the soft earth speak of beasts grown bold and hungry. This land was once a paradise — will you restore it?*

**Cleansed:**

> *The Verdant Wilds stretches before you — a paradise reclaimed, thriving as it was meant to be. The air is sweet with wildflowers, and gentle sounds of nature surround you without threat. Five paths branch ahead, each leading to lands you have healed: peaceful meadows, singing woods, bustling plains, proud highlands, and tranquil shores. The beasts have returned to their natural ways, predator and prey in balance. You gave this land back to itself.*

#### Territory 1: The Sunlit Glades (Territory Entry)

*Tutorial zone — gentle introduction to exploration and combat. Leads to Dawnbreak Trail.*

**Corrupted:**

> *Golden sunlight filters through the canopy, but shadows linger where they shouldn't in these gentle glades. The meadows roll softly ahead, dotted with wildflowers that have begun to wilt at their edges. Birdsong falters here, replaced by uneasy silence and the rustle of things moving through tall grass. A settlement's rooftops peek above the distant treeline — perhaps safety, perhaps answers. Even paradise can fall to corruption — will you see what haunts these sunlit fields?*

**Cleansed:**

> *Golden sunlight bathes the glades in warmth, every shadow now soft and welcoming. The meadows roll gently ahead, carpeted in wildflowers swaying in a peaceful breeze. Birdsong fills the air, a chorus celebrating the return of safety to these lands. The settlement's rooftops rise above the treeline, smoke curling from chimneys where families gather without fear. You brought the sun back to the Sunlit Glades.*

##### The Sunlit Glades — Sites

**Dawnbreak Trail** (Passage — Trash)

*Entry point to The Sunlit Glades. A forest path dappled with morning light. Leads to Mossy Overlook or Willowbrook Clearing.*

**Corrupted:**

> *The trail winds beneath a canopy of young oaks, shafts of golden light breaking through to warm the forest floor. It should feel peaceful, but something moves in the underbrush — too large, too bold. The path ahead is well-worn by travelers, though fewer seem to pass this way lately. Broken branches and scattered feathers tell a story of small hunts, small deaths. Dawn breaks beautiful here, but beauty can hide danger — will you walk this trail?*

**Cleansed:**

> *The trail winds beneath a canopy of young oaks, golden light warming the forest floor exactly as it should. Squirrels chatter in the branches, and a rabbit watches from the underbrush before hopping away unafraid. The path is well-worn again, footprints of travelers coming and going in peace. Wildflowers have begun to reclaim the edges of the trail, nodding in a gentle breeze. You made this path safe to walk once more.*

---

**Mossy Overlook** (Clearing — Trash)

*A raised clearing offering views of the surrounding glades. Covered in soft moss. Leads to Honeybee Hollow.*

**Corrupted:**

> *The path rises to a mossy clearing where ancient stones form a natural overlook above the glades. The view should be breathtaking, but a haze hangs over the land, dulling the colors below. The moss here grows thick and undisturbed — few have rested in this place recently. Claw marks score the stones, and tufts of fur cling to the bark of nearby trees. Something claims this overlook now — will you challenge it?*

**Cleansed:**

> *The path rises to a mossy clearing where ancient stones offer a stunning view of the glades below. Sunlight paints the rolling hills in gold and green, a patchwork of meadow and forest stretching to the horizon. The moss is soft beneath your feet, inviting rest and reflection. Birds perch on the stones, unafraid, singing to the wind. This overlook belongs to travelers again, thanks to you.*

---

**Honeybee Hollow** (Clearing — Minion, Dead End)

*A secluded hollow once known for its wild honey. Now something else buzzes here.*

**Corrupted:**

> *The hollow opens into a bowl of wildflowers surrounding the hollow trunks of ancient trees — old hives, abandoned now. A strange buzzing fills the air, deeper and angrier than any bee you've known. The flowers have wilted at their centers, drained of something vital, and the honey that once drew travelers here has turned dark and foul. Whatever corrupted this place guards it jealously. The hollow offers no path forward — only confrontation.*

**Cleansed:**

> *The hollow hums with life, wildflowers swaying as bees drift lazily between blossoms and ancient hive-trees. Golden honey drips from the hollow trunks, sweet and pure, a treasure of the glades restored. The air smells of nectar and warm summer days, peaceful and perfect. This is a place of abundance again, a gift for those who wander here. You returned the hollow to its keepers.*

---

**Willowbrook Clearing** (Sector — Minion)

*A larger clearing where a gentle brook winds through willow trees. A crossroads of sorts. Leads to Hearthstone or The Old Orchard.*

**Corrupted:**

> *Willow branches hang low over a brook that winds through this broad clearing, their trailing leaves brushing the water's surface. The stream runs clear, but the willows themselves seem to shiver despite the still air. Paths branch from here toward distant rooftops and shadowed groves, choices waiting to be made. The grass is trampled in patterns that speak of struggle, of things dragged toward the water. What waits beneath the willows?*

**Cleansed:**

> *Willow branches sway gently over a brook that sings as it winds through the clearing, crystal water catching the light. The trees stand graceful and calm, their trailing leaves dancing rather than shivering. Paths branch from here toward a welcoming settlement and peaceful groves, all roads safe now. Deer drink from the brook's edge, lifting their heads to watch you pass without fear. You brought peace to Willowbrook.*

---

**Hearthstone** (Settlement — City, Safe)

*The first settlement new heroes encounter. A welcoming city with essential services. Services: Merchant, Inn, Apothecary. Leads to Foggy Graveyard.*

**Welcome:**

> *Hearthstone rises from the glades like a promise kept — timber walls and thatched roofs surrounding a central square where merchants call their wares. Smoke curls from chimneys, carrying the scent of fresh bread and roasting meat to greet weary travelers. The streets bustle with farmers, craftsmen, and adventurers alike, all moving with the easy pace of a town at peace. A merchant waves from his stall, an innkeeper sweeps her doorstep, and an apothecary arranges herbs in her window. Whatever you need, Hearthstone provides.*

---

**Foggy Graveyard** (Clearing — Minion)

*A small cemetery on the outskirts of Hearthstone. The mist here never quite lifts.*

**Corrupted:**

> *Weathered headstones rise from the fog that clings to this quiet cemetery on Hearthstone's edge. The mist is unnatural, cold and thick even when the sun shines bright beyond the iron fence. Flowers left by mourners have wilted overnight, and the groundskeeper refuses to tend the graves after dark. Shapes move between the stones — too solid to be fog, too silent to be living. The dead should rest peacefully here — will you ensure they do?*

**Cleansed:**

> *Weathered headstones stand in peaceful rows, the fog lifted to reveal a quiet cemetery dappled in gentle sunlight. Fresh flowers rest on well-tended graves, and the iron fence gleams with new paint. The groundskeeper hums as he works, no longer afraid of what the mist might hide. Mourners visit openly now, remembering their loved ones without fear. You gave the dead their rest, and the living their peace.*

---

**The Old Orchard** (Clearing — Minion, Dead End)

*An abandoned apple orchard, overgrown and forgotten. The fruit has turned strange.*

**Corrupted:**

> *Gnarled apple trees stand in crooked rows, their branches heavy with fruit that has grown dark and wrong. The orchard was abandoned seasons ago, and nature has begun to reclaim it — but something else moved in first. Rotting apples carpet the ground, their smell sickly sweet, and the buzz of flies is constant. Shadows gather thick beneath the branches despite the hour. The orchard offers no path forward — only secrets buried among the roots.*

**Cleansed:**

> *The old apple trees stand tall again, their branches heavy with fruit that blushes red and gold in the sunlight. The orchard has found new life, wildflowers growing between the rows while birds nest in the canopy. Fallen apples feed deer that wander through without fear, the cycle of nature turning as it should. Someone has cleared the brush and marked a path for future visitors. You gave this forgotten place a second chance.*

---

#### Territory 2: The Whispering Thicket (Territory Entry)

*Dense forest leading to Champion #1 and the secret path to The Dreaming Woods. Leads to Shaded Path.*

**Corrupted:**

> *The forest thickens here, ancient trees pressing close until their branches weave a roof that blocks the sky. Whispers drift between the trunks — not wind, but something else, voices half-heard and never understood. Twisted roots break through the path like grasping hands, and the air grows heavy with moss and mystery. Something powerful has claimed these woods, and the trees themselves seem to warn you away. The thicket keeps its secrets — will you uncover them?*

**Cleansed:**

> *The forest stands tall and proud, ancient trees forming a cathedral of green and gold where light dances through the leaves. The whispers remain, but now they speak of welcome, of gratitude, of peace restored. The winding paths feel inviting rather than treacherous, roots settling back into the earth. Whatever darkness claimed these woods has been driven out by your hand. The thicket remembers its champion.*

---

#### Territory 3: The Windswept Plains (Territory Entry)

*Civilization hub — Goldgrass City (Kingdom) with four distinct districts. Leads to Goldgrass City.*

**Corrupted:**

> *The plains open before you, endless waves of golden grass rippling beneath a vast sky. In the distance, the walls of a great city rise — but even here, corruption has crept into the fields. The grass hides predators now, and travelers hurry along the roads with fear in their eyes. Smoke rises from the city, though whether from hearths or something worse, you cannot tell. Civilization endures, but barely — will you help it stand?*

**Cleansed:**

> *The plains stretch golden and free beneath an endless sky, the grass swaying in waves like a peaceful sea. The great city's walls rise proudly in the distance, banners snapping in the wind. Travelers walk the roads openly now, merchants and families moving without fear between farm and market. Smoke rises from a thousand hearths, the breath of a city alive and thriving. You gave these plains back to their people.*

---

#### Territory 4: The Stonepaw Highlands (Territory Entry)

*Mountain climb to Champion #3 and Mini-Boss Yarok. Leads to Tumblestone Pass.*

**Corrupted:**

> *The land rises sharply here, gentle hills giving way to jagged stone and windswept ridges. The highlands loom above, their peaks lost in clouds that seem to watch your approach. Claw marks score the rocks — something large has marked this territory as its own. The wind carries howls from above, echoing off stone walls until they seem to come from everywhere. The climb will be dangerous — are you strong enough to reach the summit?*

**Cleansed:**

> *The highlands rise majestic against a clear sky, their peaks proud sentinels watching over the lands below. The rocky paths feel solid underfoot, no longer treacherous with the threat of ambush. Eagles circle overhead where predators once prowled, the natural order restored to these heights. The wind carries only the whisper of stone and sky, peaceful and eternal. You conquered the highlands — they will not forget.*

---

#### Territory 5: The Mistfall Coast (Territory Entry)

*Coastal zone leading to Boss Draug and the Vault. Leads to Driftwood Path.*

**Corrupted:**

> *The air grows thick with salt and mist as the land slopes toward a distant shore you can barely see. Fog rolls in from the water, swallowing the path ahead in grey uncertainty. The crash of waves mingles with sounds that don't belong — scraping, dragging, the movement of things that should stay in the deep. Fishermen speak of horrors rising from the abyss, of a darkness beneath the tides. The coast calls to you — will you answer?*

**Cleansed:**

> *The mist has lifted from the coast, revealing a shoreline of breathtaking beauty beneath clear skies. Waves lap gently against white sand, and the call of gulls replaces the silence that once hung here. Fishing boats dot the water again, their crews hauling nets without fear of what lurks below. The abyss has been sealed, its horrors driven back to the depths where they belong. You brought peace to the Mistfall Coast.*

---

# 9. Equipment System

## 9.1 Equipment Slots

| Armor Slots (5) | Weapon Slots (2) |
|-----------------|------------------|
| Head, Torso, Arms, Legs, Feet | Primary (Physical), Secondary (Magical) |

## 9.2 Item Rarity Tiers (6 Levels)

| Tier | Source |
|------|--------|
| Worn | Basic gear at Character Creation |
| Common | Early game find |
| Uncommon | Random find up to Elite drop |
| Rare | Low-chance random find or Champion Fight |
| Exquisite | Mini-Boss Fight |
| Epic | Named Item, Boss Fight or Vault after Boss Fight |

## 9.3 Weapon Names by Tier

| Type | Worn | Common | Uncommon | Rare | Exquisite | Epic |
|------|------|--------|----------|------|-----------|------|
| Sword | Rusty Blade | Iron Longsword | Steel Greatsword | Runed Broadsword | Soulforged Edge | The Sunstone Blade |
| Axe | Spiked Wood Club | Iron Handaxe | Steel Greataxe | Warforged Cleaver | Orgebane Maul | The Worldbreaker |
| Dagger | Shard of Metal | Crude Shiv | Balanced Throwing Knife | Sharpened Stiletto | Shadowtipped Blade | The Night Whisperer |
| Bow | Simple Shortbow | Hunting Bow | Reinforced Longbow | Elven Recurve Bow | Dragonbone Bow | The Star Piercer |
| Mace | Wooden Club | Iron Mace | Steel Flanged Mace | Runed Warhammer | Thunderstrike Maul | The Bonecrusher |
| Wand | Untuned Fork | Lesser Oak Wand | Crystal Conduit | Runescribed Baton | Feywood Shard | The Mind's Eye |
| Staff | Cracked Walking Stick | Gnarled Staff | Stonetipped Pole | Warding Scepter | Celestial Rod | The Staff of Worlds |
| Foci | Branch of Holly | Carved Totem | Etched Runestone | Channeling Orb | Astral Prism | Heart of the Grove |

## 9.4 Armor Tier Prefixes

| Type | Worn | Common | Uncommon | Rare | Exquisite | Epic (Suffix) |
|------|------|--------|----------|------|-----------|---------------|
| Heavy | Ragged Leather | Iron | Steel | Dwarven Platemail | Adamantine | of the Aegis Order |
| Medium | Tattered Cloth | Studded Leather | Chainmail | Wyvern Hide | Runeweave | of the Celestial Order |
| Light | Simple | Stitched Cloth | Weaved | Pristine | Mage-Warded | of the Fey Order |

## 9.5 Starting Equipment

All Callings begin with non-specialized "Worn" tier basic gear:
- Generic Worn weapon (no offensive bonuses)
- Generic Worn armor (no defensive bonuses)
- Players must acquire specialized gear through purchase or loot drops

## 9.6 Item Data Structure

| Field | Applies To | Description |
|-------|------------|-------------|
| Item_ID | All | Unique string identifier (e.g., ARM_PLA_001) |
| Name | All | Display name |
| Item_Type | All | Weapon, Armor, Consumable, Junk |
| Description | All | Narrative flavor text |
| Purchase_Price | All | Base buy price from vendor |
| Sale_Value | All | Sell price (usually 50% of purchase) |
| Rarity | All | Worn through Epic |
| Gear_Slot | Weapon/Armor | Where equipped (Head, Torso, One-Hand, etc.) |
| Gear_Archetype | Weapon/Armor | Mechanical class for specialization |
| Stat_Modifiers | Weapon/Armor | Stat bonuses when equipped |
| Defense_Modifier | Armor | Physical/Magical defense bonus |
| Attack_Modifier | Weapon | Physical/Magical attack bonus |
| Consumption_Effect | Consumable | Heal, Restore MP, Remove Status, etc. |
| Effect_Value | Consumable | Numerical effect value |
| Target_Stat | Consumable | HP, MP, Poison, Stun, etc. |

## 9.7 Consumables

There are four categories of consumable items:

### Consumable Categories

| Category | Effect | Stacks in Inventory |
|----------|--------|---------------------|
| **Elixirs** | Immediate HP/MP/Stamina restore | Yes |
| **Draughts** | HP/MP/Stamina/Stat effect over time | Yes |
| **Antidotes** | Removes ALL status effects | Yes |
| **Lockpicks** | Consumed when attempting locked doors | Yes |

### Elixirs (Immediate Effect)

One-time potions that immediately restore HP, MP, or Stamina.

| Name | Effect |
|------|--------|
| Lesser Health Elixir | Restore small amount of HP |
| Health Elixir | Restore moderate amount of HP |
| Greater Health Elixir | Restore large amount of HP |
| Lesser Mana Elixir | Restore small amount of MP |
| Mana Elixir | Restore moderate amount of MP |
| Greater Mana Elixir | Restore large amount of MP |
| Lesser Stamina Elixir | Restore small amount of Stamina |
| Stamina Elixir | Restore moderate amount of Stamina |
| Greater Stamina Elixir | Restore large amount of Stamina |

### Draughts (Over-Time Effect)

Potions that incrementally affect HP, MP, Stamina, or Statistics over combat rounds.

| Name | Effect | Duration |
|------|--------|----------|
| Healing Draught | Restore HP over time | 3 turns |
| Mana Draught | Restore MP over time | 3 turns |
| Stamina Draught | Restore Stamina over time | 3 turns |
| Draught of Might | +5 Power | 3 turns |
| Draught of Endurance | +5 Toughness | 3 turns |
| Draught of Wisdom | +5 Brilliance | 3 turns |
| Draught of Resolve | +5 Spirit | 3 turns |
| Draught of Precision | +5 Acuity | 3 turns |
| Draught of Focus | +5 Instinct | 3 turns |

### Antidotes

| Name | Effect |
|------|--------|
| Antidote | Removes ALL status effects (Bleeding, Burning, Frozen, etc.) |

### Lockpicks

| Name | Effect |
|------|--------|
| Lockpick | Consumed when attempting to open a locked Site (see Lockpicking System) |

## 9.8 Junk Items

Junk items serve as vendor trash and narrative flavor. They have no mechanical use but can be sold.

### Junk Categories

| Category | Lower Tier Examples | Higher Tier Examples |
|----------|---------------------|----------------------|
| Natural/Organic | Beast Pelt, Glow-Wing Moth Dust | Dragon Scale, Phoenix Feather |
| Manufactured | Broken Blade Hilt, Worn Lockpick | Jeweled Goblet, Gold Bullion |
| Arcane/Esoteric | Unstable Rune Fragment, Faded Scroll | Sealed Diary, Crystallized Mana |

### Boss Remnants (Epic Junk)

Unique "broken" items dropped by bosses. Not equippable but valuable as collectibles/income.

| Boss | Remnant Item |
|------|--------------|
| Ulgoth (Aberration) | Petrified Eye of the Void |
| Draug (Beast) | Chitinous Shard of the Leviathan |
| Seraphina (Celestial) | Cracked Solar Halo |
| Zoloss (Construct) | The Geode of Zylos |
| Vorlag (Cursed) | Vorlag's Vial of First Blood |
| Ignis (Dragon) | Shard of the Obsidian Crown |
| Titania (Faerie) | The Glass Thorn Crown |
| Vaeryk (Humanoid) | The Vizier's Broken Seal |
| A'layr (Magical Beast) | A Single Phoenix Tear |
| Zantus (Undead) | The Phylactery of Zantus |

---

# 10. Services & Economy System

Services are offered at population centers (Kingdoms, Cities, Villages) throughout the world. Not all services are available at every location.

## 10.1 Economy Overview

### Design Principles

- **Starting Gold Context:** Players begin with 10-45 gold (Species + Calling bonuses), averaging ~25-30 gold
- **Tight Early Game:** Meaningful resource choices in Tier 1 regions
- **Comfortable Mid-Game:** Players can afford consumables and upgrades
- **Rewarding Late Game:** High-tier content provides substantial wealth
- **Regional Scaling:** Prices and rewards scale with difficulty tier

### Gold Sources

#### Monster Gold Drops

| Monster Tier | Base Gold Drop | Variance |
|--------------|---------------|----------|
| Trash | 2-4 | ±1 |
| Minion | 5-10 | ±2 |
| Elite | 15-25 | ±5 |
| Champion | 50-80 | ±15 |
| Mini-Boss | 150-250 | ±50 |
| Boss | 400-600 | ±100 |

#### Regional Gold Modifiers

| Region Tier | Gold Modifier | Example (Minion base 8) |
|-------------|---------------|------------------------|
| Tier 1 | ×1.0 | 8 gold |
| Tier 2 | ×1.1 | 9 gold |
| Tier 3 | ×1.2 | 10 gold |
| Tier 4 | ×1.3 | 10 gold |
| Tier 5 | ×1.4 | 11 gold |

#### Loot Selling Values

| Item Rarity | Sell Value | Notes |
|-------------|------------|-------|
| Worn | 2 gold | Starter gear |
| Common | 8 gold | Early finds |
| Uncommon | 25 gold | Standard drops |
| Rare | 75 gold | Champion drops |
| Exquisite | 150 gold | Mini-Boss drops |
| Epic | 300 gold | Boss drops (collectible value) |

#### Junk Item Values

| Junk Tier | Sell Value | Source |
|-----------|------------|--------|
| Common Junk | 1-3 gold | Trash/Minion drops |
| Uncommon Junk | 5-10 gold | Elite drops |
| Rare Junk | 15-30 gold | Champion drops |
| Boss Remnants | 100 gold | Boss drops (trophy items) |

## 10.2 Merchant Service

**Purpose:** General commerce for equipment and supplies

**Offerings:**
- Sell equipment and junk items
- Buy Rations (travel resource)
- Buy basic equipment
- Buy Lockpicks

**Availability:** Most populated locations

### Ration Pricing

| Item | Price | Notes |
|------|-------|-------|
| Ration (×1) | 1 gold | Per-unit purchase |
| Ration Bundle (×5) | 4 gold | Slight discount |
| Ration Pack (×10) | 7 gold | Best value |

### Equipment Pricing

| Rarity | Purchase Price | Sell Value (50%) | Availability |
|--------|---------------|------------------|--------------|
| Worn | 5 gold | 2 gold | Starting gear only |
| Common | 15 gold | 8 gold | All Merchants |
| Uncommon | 50 gold | 25 gold | City+ Merchants |
| Rare | 150 gold | 75 gold | Kingdom Merchants only |
| Exquisite | — | 150 gold | Not purchasable (Mini-Boss drop) |
| Epic | — | 300 gold | Not purchasable (Boss drop) |

### Merchant Inventory by Settlement Type

| Settlement | Equipment Available | Max Rarity |
|------------|---------------------|------------|
| Village | Basic weapons, armor, rations | Common |
| City | Full selection, consumables | Uncommon |
| Kingdom | Premium selection, rare items | Rare |

### Lockpick Pricing

| Item | Price | Notes |
|------|-------|-------|
| Lockpick (×1) | 5 gold | Per-unit |
| Lockpick Set (×3) | 12 gold | Slight discount |

## 10.3 Inn Service

**Purpose:** Rest, recovery, and entertainment

**Offerings:**
- Restore HP, MP, and Stamina to full
- Access to Gambling (at select locations)

**Availability:** Cities and larger settlements

### Rest Pricing by Region Tier

| Region Tier | Rest Cost | Example Regions |
|-------------|-----------|-----------------|
| Tier 1 | 5 gold | The Verdant Wilds, The Lawless Marches |
| Tier 2 | 8 gold | The Blighted Moor, The Dreaming Woods |
| Tier 3 | 12 gold | The Clockwork Wastes, The Hollow Kingdom |
| Tier 4 | 18 gold | The Savage Wilds, The Empyrean Reaches |
| Tier 5 | 25 gold | The Obsidian Dominion, The Maddening Deep |

**Design Note:** A Tier 1 player killing 2-3 Minions can afford a rest. This keeps early game challenging but fair.

## 10.4 Apothecary Service

**Purpose:** Consumable item specialist

**Offerings:**
- Buy Elixirs (immediate effect potions)
- Buy Draughts (over-time effect potions)
- Buy Antidotes (status effect removal)

**Availability:** Cities and Kingdoms only

### Elixir Pricing (Immediate HP/MP/Stamina Restoration)

| Elixir | Effect | Price |
|--------|--------|-------|
| Lesser Health Elixir | Restore 30 HP | 8 gold |
| Health Elixir | Restore 75 HP | 20 gold |
| Greater Health Elixir | Restore 150 HP | 50 gold |
| Lesser Mana Elixir | Restore 20 MP | 8 gold |
| Mana Elixir | Restore 50 MP | 20 gold |
| Greater Mana Elixir | Restore 100 MP | 50 gold |
| Lesser Stamina Elixir | Restore 15 Stamina | 8 gold |
| Stamina Elixir | Restore 35 Stamina | 20 gold |
| Greater Stamina Elixir | Restore 70 Stamina | 50 gold |

### Draught Pricing (Combat Buffs — 3 Turns)

| Draught | Effect | Price |
|---------|--------|-------|
| Healing Draught | +15 HP/turn | 15 gold |
| Mana Draught | +10 MP/turn | 15 gold |
| Stamina Draught | +8 Stamina/turn | 15 gold |
| Draught of Might | +5 Power | 18 gold |
| Draught of Endurance | +5 Toughness | 18 gold |
| Draught of Wisdom | +5 Brilliance | 18 gold |
| Draught of Resolve | +5 Spirit | 18 gold |
| Draught of Precision | +5 Acuity | 18 gold |
| Draught of Focus | +5 Instinct | 18 gold |

### Antidote Pricing

| Item | Effect | Price |
|------|--------|-------|
| Antidote | Remove ALL status effects | 12 gold |
| Antidote Bundle (×3) | — | 30 gold |

### Apothecary Inventory by Settlement Type

| Settlement | Stock Available |
|------------|-----------------|
| Village | Not available |
| City | Lesser Elixirs, Antidotes |
| Kingdom | All Elixirs, All Draughts, Antidotes |

## 10.5 Gambling Service

**Purpose:** Entertainment gold sink with risk/reward mechanics

**Availability:** Select locations only (Goldgrass City, Ironholt, Blackmoor, The Shadows of Ignis, Congregation of the Void)

### Betting Options

| Risk Level | Bet Range | Win Chance | Payout | Expected Value |
|------------|-----------|------------|--------|----------------|
| Low Risk | 5-50 gold | 45% | ×2 | -10% (house edge) |
| Medium Risk | 10-100 gold | 30% | ×3 | -10% (house edge) |
| High Risk | 25-200 gold | 18% | ×5 | -10% (house edge) |
| Jackpot | 50-500 gold | 8% | ×10 | -20% (house edge) |

### Gambling Rules

| Rule | Description |
|------|-------------|
| Minimum Bet | 5 gold |
| Maximum Bet | 500 gold |
| Daily Limit | 10 bets per rest (prevents exploitation) |
| Lucky Streak | 3 wins in a row grants bonus ×1.5 on next win |

**Design Note:** Gambling is a gold sink with entertainment value. The house always has an edge, but lucky players can profit short-term.

## 10.6 Calling Trainers

**Purpose:** Skill Tree progression

**Offerings:**
- Spend Skill Points to unlock/upgrade abilities
- Each Trainer specializes in specific Callings

**Availability:** Scattered throughout the world; players must discover and travel to them

### Skill Point Costs

| Service | Cost |
|---------|------|
| Unlock Stage 2 Ability | 1 SP |
| Unlock Stage 3 Ability | 2 SP |
| Unlock Stage 4 Ability | 3 SP |
| Unlock Stage 5 Ability | 4 SP |
| Unlock Stage 6 Ability | 5 SP |

**Design Note:** Trainers are gated by location discovery, not gold. This encourages exploration.

## 10.7 Economy Flow Examples

### Early Game (Level 1-5, Tier 1 Regions)

**Starting Resources:** ~25 gold, ~10 rations

**Typical Session Income:**
- Kill 5 Trash monsters: ~15 gold
- Kill 3 Minions: ~24 gold
- Sell 2 Common junk items: ~4 gold
- **Total Earned:** ~43 gold

**Typical Session Expenses:**
- Rest at Inn: 5 gold
- Buy 5 rations: 4 gold
- Buy 2 Lesser Health Elixirs: 16 gold
- **Total Spent:** ~25 gold

**Net Gain:** ~18 gold (slow accumulation)

### Mid Game (Level 10-15, Tier 3 Regions)

**Typical Session Income:**
- Kill 3 Minions: ~30 gold (with tier modifier)
- Kill 2 Elites: ~50 gold
- Champion kill: ~75 gold
- Sell Uncommon drop: ~25 gold
- **Total Earned:** ~180 gold

**Typical Session Expenses:**
- Rest at Inn: 12 gold
- Buy 10 rations: 7 gold
- Buy Health Elixir + Draught: 38 gold
- Upgrade to Uncommon weapon: 50 gold
- **Total Spent:** ~107 gold

**Net Gain:** ~73 gold (comfortable accumulation)

### Late Game (Level 18-22, Tier 5 Regions)

**Typical Session Income:**
- Kill 2 Elites: ~70 gold (with tier modifier)
- Mini-Boss kill: ~280 gold
- Sell Exquisite drop: ~150 gold
- **Total Earned:** ~500 gold

**Typical Session Expenses:**
- Rest at Inn: 25 gold
- Buy 10 rations: 7 gold
- Buy Greater Elixirs + Draughts: ~120 gold
- Gambling (entertainment): ~50 gold
- **Total Spent:** ~202 gold

**Net Gain:** ~298 gold (wealth accumulation for final challenges)

---

# 11. Stat Modifier Summary

All stat modifications use absolute integers for consistent, predictable growth.

| Source | Values | When Applied | Purpose |
|--------|--------|--------------|---------|
| Species Base Stats | 5, 8, 10, 13 | Character Creation | Racial strengths/weaknesses |
| Calling Modifiers | +2, +1, +1 | Character Creation | Class specialization |
| Level Up Bonuses | +2, +1 (cycle) | Each Level Up | Horizontal/automatic growth |
| Skill Tree Upgrades | Varies | Player Choice | Vertical/player-driven growth |
| Equipment | Varies by tier | When Equipped | Temporary stat boosts |

---

# 12. Data Schemas

## 12.1 Account Schema

Accounts are stored in browser localStorage with a maximum of 5 hero slots.

```javascript
Account = {
  accountId: String,          // Generated UUID stored in localStorage
  createdAt: DateTime,
  heroes: [HeroId, ...],      // Maximum 5 heroes
  settings: {
    theme: "light" | "dark"
  }
}
```

## 12.2 Hero Data Schema

```javascript
Hero = {
  // ========== IDENTITY ==========
  _id: ObjectId,
  heroName: String,
  species: String,              // One of 12 species
  calling: String,              // One of 8 callings
  genderIdentity: String,
  
  // ========== PROGRESSION ==========
  level: Number,                // 1-20
  currentXP: Number,            // XP toward next level
  skillPoints: Number,          // Unspent SP
  gold: Number,
  
  // ========== VITALITY ==========
  currentHP: Number,
  currentMP: Number,
  currentRations: Number,       // No maximum
  
  // ========== STATISTICS (Component-Based) ==========
  stats: {
    base: {                     // From Species
      power: Number,
      toughness: Number,
      brilliance: Number,
      spirit: Number,
      acuity: Number,
      instinct: Number
    },
    callingMods: {              // From Calling at creation
      power: Number,
      toughness: Number,
      brilliance: Number,
      spirit: Number,
      acuity: Number,
      instinct: Number
    },
    levelBonuses: {             // Accumulated from level-ups
      power: Number,
      toughness: Number,
      brilliance: Number,
      spirit: Number,
      acuity: Number,
      instinct: Number
    },
    skillTreeBonuses: {         // From passive abilities (Stages 3 & 5)
      power: Number,
      toughness: Number,
      brilliance: Number,
      spirit: Number,
      acuity: Number,
      instinct: Number
    }
  },
  
  // ========== EQUIPMENT (Worn Gear) ==========
  equipment: {
    head: ItemId | null,
    torso: ItemId | null,
    arms: ItemId | null,
    legs: ItemId | null,
    feet: ItemId | null,
    primaryWeapon: ItemId | null,    // Physical weapon
    secondaryWeapon: ItemId | null   // Magical weapon
  },
  
  // ========== INVENTORY ==========
  // Capacity = 10 + floor(Toughness / 3) + (Level - 1)
  // Equipped items, Rations, and stacked consumables don't count toward limit
  inventory: [
    { itemId: ObjectId, quantity: Number },
    ...
  ],
  
  // ========== SKILL TREE ==========
  skillTree: {
    power: { 
      stage: Number,            // 1-6
      abilities: [String]       // Unlocked ability IDs
    },
    toughness: { stage: Number, abilities: [String] },
    brilliance: { stage: Number, abilities: [String] },
    spirit: { stage: Number, abilities: [String] },
    acuity: { stage: Number, abilities: [String] },
    instinct: { stage: Number, abilities: [String] }
  },
  
  // ========== NAVIGATION ==========
  navigation: {
    currentSite: SiteId,
    pathStack: [SiteId, ...]    // Ordered from Crossroads to current
  },
  
  // ========== WORLD PROGRESS ==========
  worldProgress: {
    discoveredSites: [SiteId, ...],
    clearedSites: [SiteId, ...],
    defeatedChampions: [MonsterId, ...],
    defeatedMiniBosses: [MonsterId, ...],
    defeatedBosses: [MonsterId, ...],
    unlockedSecretRegions: [String, ...]  // "dreamingWoods", etc.
  },
  
  // ========== MONSTER MANUAL ==========
  monsterManual: {
    discovered: [
      { monsterId: ObjectId, firstEncounter: DateTime },
      ...
    ],
    slainCounts: {
      [monsterId]: Number,
      ...
    }
  },
  
  // ========== LIFETIME STATISTICS ==========
  lifetimeStats: {
    totalMonstersSlain: Number,
    totalDamageDealt: Number,
    totalDamageReceived: Number,
    totalGoldEarned: Number,
    totalGoldSpent: Number,
    totalDeaths: Number,
    totalCriticalHits: Number,
    totalStatusEffectsInflicted: Number,
    totalElixirsConsumed: Number,
    totalLockpicksUsed: Number,
    bossesDefeated: Number,
    regionsCompleted: Number
  },
  
  // ========== META ==========
  createdAt: DateTime,
  lastPlayedAt: DateTime,
  totalPlaytime: Number         // Seconds
}
```

## 12.3 Calculated Values (Not Stored)

These values are derived on load, not stored in the database:

| Value | Formula |
|-------|---------|
| Effective Power | base.power + callingMods.power + levelBonuses.power + skillTreeBonuses.power + equipment bonuses |
| Effective Toughness | (same pattern for each stat) |
| Effective Brilliance | (same pattern) |
| Effective Spirit | (same pattern) |
| Effective Acuity | (same pattern) |
| Effective Instinct | (same pattern) |
| Max HP | 10 + (Effective Toughness × 3) |
| Max MP | 10 + (Effective Spirit × 3) |
| Inventory Capacity | 10 + floor(Effective Toughness / 3) + (Level - 1) |
| Hit Chance | 50 + (3 × Attacker Acuity) - (3 × Target Instinct), capped 5-95% |
| Crit Chance | Effective Acuity × 1.8% + weapon modifier |

## 12.4 Save System

| Save Type | Trigger | Location Requirement |
|-----------|---------|---------------------|
| **Auto-Save** | After each successful combat | Any location |
| **Manual Save** | Player-initiated | Safe locations only (cleared Sites, Settlements) |

## 12.5 Site Schema

Sites are the atomic locations where gameplay occurs. Site data is static (not modified during gameplay).

```javascript
Site = {
  // ========== IDENTITY ==========
  _id: ObjectId,
  name: String,                     // "Hearthstone", "The Heart of Thorns"
  slug: String,                     // URL-friendly ID for database/code: "hearthstone", "heart-of-thorns"
  
  // ========== HIERARCHY ==========
  region: String,                   // "verdantWilds"
  territory: String,                // "sunlitGlades"
  sector: String | null,            // "willowbrookClearing" or null if direct child
  parentSite: SiteId | null,        // Parent Site for navigation
  childSites: [SiteId, ...],        // Connected Sites deeper in branch
  
  // ========== CLASSIFICATION ==========
  siteType: String,                 // "settlement", "passage", "clearing", "landmark", 
                                    // "lair", "dungeon", "vault"
  settlementSize: String | null,    // "kingdom", "city", "village" (if siteType = settlement)
  passageType: String | null,       // "road", "river", "bridge", "stairs", "trapdoor", 
                                    // "cave", "portal" (if siteType = passage)
  
  // ========== BIOME & THEME ==========
  biomeTags: [String, ...],         // ["forest", "river", "arcane"]
  
  // ========== MONSTERS ==========
  monsterCount: Number,             // How many random monsters spawn here (0-5, 0 for settlements/vaults)
  monsterTiers: [String, ...],      // Which tiers can spawn: ["trash", "minion", "elite"]
  fixedMonster: MonsterId | null,   // For Landmarks/Lairs/Dungeons with a named Champion/Mini-Boss/Boss
  
  // ========== HAZARDS ==========
  envDamage: {
    enabled: Boolean,               // Does this Site cause environmental damage?
    amount: Number,                 // HP damage when entering
    description: String             // "Sharp rocks tear at your legs", "Poison gas fills the chamber"
  } | null,
  
  // ========== SERVICES ==========
  services: [
    {
      serviceType: String,          // "merchant", "inn", "apothecary", "trainer", "gambling"
      serviceName: String,          // "The Trader's Square", "Wildheart Apothecary"
      trainerCalling: String | null // "hunter", "druid" (if serviceType = trainer)
    },
    ...
  ],
  
  // ========== NAVIGATION ==========
  isLocked: Boolean,                // Requires lockpick to access
  lockQuality: Number | null,       // Lock difficulty (if isLocked = true)
  isSecretPath: Boolean,            // Hidden until discovered
  secretDiscoveryHint: String | null, // Flavor text hint (if isSecretPath = true)
  isPortal: Boolean,                // Teleports to another Region
  portalDestination: SiteId | null, // Destination Site (if isPortal = true)
  
  // ========== PROGRESSION GATES ==========
  requiresChampionsDefeated: Boolean,   // Blocked until all Region Champions defeated
  requiresMiniBossDefeated: Boolean,    // Blocked until Region Mini-Boss defeated
  requiresBossDefeated: Boolean,        // Blocked until Region Boss defeated
  
  // ========== RATIONS ==========
  rationCost: Number,               // Cost to travel TO this Site
  
  // ========== FLAVOR TEXT ==========
  flavorText: {
    corrupted: String,              // 5 sentences when monsters present
    cleared: String                 // 5 sentences when monsters defeated
  },
  
  // ========== LOOT ==========
  lootTable: [                      // Items that can be found here
    { itemId: ObjectId, dropChance: Number },
    ...
  ],
  vaultContents: [ItemId, ...] | null  // Fixed rewards (if siteType = vault)
}
```

### Site Type Details

| Site Type | monsterCount | fixedMonster | Has Services | Notes |
|-----------|--------------|--------------|--------------|-------|
| Settlement | 0 | No | Yes | Safe zone, services hub |
| Passage | 1-3 | No | No | Travel connection, may have envDamage |
| Clearing | 1-4 | No | No | Exploration area |
| Landmark | 0-2 | Champion | No | Progression gate |
| Lair | 0-2 | Mini-Boss | No | Progression gate |
| Dungeon | 1-3 | Boss | No | Progression gate |
| Vault | 0 | No | No | Rewards only |

### Environmental Damage Examples

| Site | envDamage Description |
|------|----------------------|
| Scattered Scree (Passage) | "Sharp rocks tear at your legs as you scramble across the unstable slope." |
| The Flooded Grotto (Clearing) | "The frigid water saps your strength with every step." |
| Poison Gas Chamber (Passage) | "Noxious fumes burn your lungs as you push through." |

## 12.6 Monster Schema

Individual monster data. Monster data is static (stats, drops) but Hero tracks which have been defeated.

```javascript
Monster = {
  // ========== IDENTITY ==========
  _id: ObjectId,
  name: String,                     // "Dire Wolf", "Yarok, Mountain Shaker"
  slug: String,                     // URL-friendly ID: "dire-wolf", "yarok-mountain-shaker"
  description: String,              // Bestiary description
  
  // ========== CLASSIFICATION ==========
  category: String,                 // "beast", "humanoid", "dragon", etc.
  tier: String,                     // "trash", "minion", "elite", "champion", "miniboss", "boss"
  isNamed: Boolean,                 // True for unique monsters (Champions, Mini-Bosses, Bosses)
                                    // Named monsters appear once and don't respawn when defeated
  title: String | null,             // "Mountain Shaker", "Maw of the Abyss" (if isNamed)
  
  // ========== SPAWN LOCATION ==========
  fixedSpawnSite: SiteId | null,    // For named monsters: the specific Site where they spawn
                                    // null for generic monsters (they spawn randomly by biome)
  spawnBiomes: [String, ...],       // For generic monsters: which biome tags they can appear in
  
  // ========== STATISTICS ==========
  level: Number,                    // 1-20, affects XP and general difficulty
  stats: {
    power: Number,
    toughness: Number,
    brilliance: Number,
    spirit: Number,
    acuity: Number,
    instinct: Number
  },
  
  // ========== COMBAT ==========
  damageType: String,               // Primary damage type: "slashing", "piercing", "fire", etc.
  secondaryDamageType: String | null, // Some monsters have two damage types
  abilities: [                      // Special attacks/abilities
    {
      abilityName: String,
      damageType: String,
      effect: String,               // Description of what it does
      triggerCondition: String      // "onCrit", "belowHalfHP", "everyThirdTurn", etc.
    },
    ...
  ],
  counterAttack: {                  // Triggered when Hero attacks with Monster's Immunity
    abilityName: String,
    damageType: String,
    effect: String
  } | null,
  
  // ========== REWARDS ==========
  baseXP: Number,                   // Before category modifier (4-6 for Trash, 480-720 for Boss)
  goldDrop: {
    min: Number,
    max: Number
  },
  lootTable: [
    { itemId: ObjectId, dropChance: Number },
    ...
  ],
  guaranteedDrop: ItemId | null,    // Always drops this item (for Bosses)
  remnantItem: ItemId | null,       // Boss Remnant junk item (for Bosses only)
  
  // ========== FLAVOR ==========
  encounterText: String,            // "A pack of wolves emerges from the shadows..."
  defeatText: String                // "The alpha falls, and the pack scatters."
}
```

### Named vs Generic Monsters

| Property | Named Monsters | Generic Monsters |
|----------|----------------|------------------|
| isNamed | true | false |
| Tiers | Champion, Mini-Boss, Boss | Trash, Minion, Elite |
| fixedSpawnSite | Specific Site ID | null |
| spawnBiomes | Not used (empty) | Biome tags for random spawns |
| Respawns | No (defeated permanently) | Yes (on game creation) |
| Example | "Yarok, Mountain Shaker" | "Dire Wolf" |

### Monster Tier Stat Ranges

| Tier | Level Range | Stat Range | HP Multiplier | Base XP Range |
|------|-------------|------------|---------------|---------------|
| Trash | 1-5 | 8-12 | ×5 | 4-6 |
| Minion | 3-10 | 10-16 | ×6 | 10-14 |
| Elite | 6-15 | 14-22 | ×8 | 24-36 |
| Champion | 8-18 | 18-28 | ×10 | 64-96 |
| Mini-Boss | 12-18 | 25-35 | ×15 | 200-300 |
| Boss | 15-20 | 35-50 | ×20 | 480-720 |

### Category Stat Modifier Application

Base stats are modified by the Monster Category's difficulty tier:

| Tier | Categories | Stat Modifier |
|------|------------|---------------|
| Tier 1 | Beast, Humanoid | ×1.0 (base) |
| Tier 2 | Faerie, Cursed | ×1.05 |
| Tier 3 | Construct, Undead | ×1.10 |
| Tier 4 | Magical Beast, Celestial | ×1.15 |
| Tier 5 | Aberration, Dragon | ×1.20 |

---

# 13. UI/UX System

## 13.1 Design Philosophy

The Avandria interface follows these core principles:

| Principle | Description |
|-----------|-------------|
| **Minimalist Navigation** | Reduce clicks to reach any game function |
| **Information Hierarchy** | Most important info always visible, details on demand |
| **Text RPG Focus** | Narrative text is the star; UI supports, doesn't overshadow |
| **Desktop-First** | Optimized for desktop browsers, mobile functional but secondary |
| **Session Continuity** | Players can stop/resume seamlessly |

## 13.2 Screen Flow Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE                                 │
│                    (Unauthenticated Entry)                          │
└─────────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            ┌─────────────┐         ┌─────────────┐
            │   LOGIN     │         │  REGISTER   │
            │   (Modal)   │         │   (Modal)   │
            └─────────────┘         └─────────────┘
                    │                       │
                    └───────────┬───────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      ACCOUNT DASHBOARD                               │
│              (Character Select / Account Management)                 │
└─────────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
        ┌─────────────────────┐   ┌─────────────────────┐
        │  CHARACTER CREATION │   │   SELECT EXISTING   │
        │       WIZARD        │   │      CHARACTER      │
        └─────────────────────┘   └─────────────────────┘
                    │                       │
                    └───────────┬───────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     MAIN GAME SCREEN                                 │
│                  (Three-Panel Layout)                                │
└─────────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │   COMBAT    │ │   MODALS    │ │  GAME OVER  │
            │ (Takeover)  │ │ (Overlays)  │ │  (On Death) │
            └─────────────┘ └─────────────┘ └─────────────┘
```

## 13.3 Screen Definitions

### 13.3.1 Landing Page (Atmospheric)

The first screen users see. Creates atmosphere and provides authentication entry.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo/Title Art]                                                    │
│                                                                      │
│                         A V A N D R I A                              │
│                    "A World Awaits the Brave"                        │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                                                              │    │
│  │     [Atmospheric background art or subtle animation]         │    │
│  │                                                              │    │
│  │              ┌──────────────┐  ┌──────────────┐             │    │
│  │              │    LOGIN     │  │   REGISTER   │             │    │
│  │              └──────────────┘  └──────────────┘             │    │
│  │                                                              │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  [About] [How to Play] [Credits]                    [Version X.X]   │
└─────────────────────────────────────────────────────────────────────┘
```

**Elements:**
- Game title/logo prominently displayed
- Tagline or brief thematic text
- Two primary CTAs: Login and Register
- Footer links for supplementary info
- Version number

### 13.3.2 Authentication Modals

Login and Register appear as modal overlays over the Landing Page (no full page redirect).

**Login Modal:**
```
┌─────────────────────────────────────────┐
│              LOGIN                [X]   │
├─────────────────────────────────────────┤
│                                         │
│  Email:     [____________________]      │
│                                         │
│  Password:  [____________________]      │
│                                         │
│  [Remember Me]     [Forgot Password?]   │
│                                         │
│         ┌──────────────────┐            │
│         │      LOGIN       │            │
│         └──────────────────┘            │
│                                         │
│  ─────────── or ───────────            │
│                                         │
│  Don't have an account? [Register]      │
│                                         │
└─────────────────────────────────────────┘
```

**Register Modal:**
- Username (display name)
- Email
- Password + Confirm Password
- Link to Login if already registered

### 13.3.3 Account Dashboard

Character management hub with account-level statistics.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  AVANDRIA                                    [Settings] [Logout]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Welcome back, [Username]                                           │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     YOUR HEROES                              │    │
│  ├─────────────────────────────────────────────────────────────┤    │
│  │                                                              │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │    │
│  │  │ [Portrait]  │  │ [Portrait]  │  │             │         │    │
│  │  │             │  │             │  │     ┌─┐     │         │    │
│  │  │ ALDRIC      │  │ SERAPHINA   │  │     │+│     │         │    │
│  │  │ Lvl 12      │  │ Lvl 5       │  │     └─┘     │         │    │
│  │  │ Human       │  │ Elf         │  │             │         │    │
│  │  │ Warrior     │  │ Mage        │  │   CREATE    │         │    │
│  │  │             │  │             │  │    NEW      │         │    │
│  │  │ [PLAY]      │  │ [PLAY]      │  │             │         │    │
│  │  │ [Delete]    │  │ [Delete]    │  │             │         │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘         │    │
│  │                                                              │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  ACCOUNT STATS                                               │    │
│  │  Total Playtime: 47h 23m | Characters Created: 5             │    │
│  │  Monsters Slain: 1,247   | Gold Earned (Lifetime): 89,450    │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Character Card Elements:**
- Portrait/Avatar
- Character Name
- Level
- Species
- Calling
- Play Button (primary action)
- Delete Button (with confirmation modal)

**Account Settings (via gear icon):**
- Change Password
- Email Preferences
- Delete Account
- Accessibility Options (font size, contrast)

### 13.3.4 Character Creation Wizard

Multi-step wizard guiding players through hero creation.

**Step Progression:**
```
[1. Species] → [2. Calling] → [3. Appearance] → [4. Name] → [5. Confirm]
```

**Step Layout (Example: Species Selection):**
```
┌─────────────────────────────────────────────────────────────────────┐
│                     CREATE YOUR HERO                                 │
│                                                                      │
│  ══════════════════════════════════════════════════════════════════ │
│  STEP 1: CHOOSE YOUR SPECIES                                        │
│  ══════════════════════════════════════════════════════════════════ │
│                                                                      │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐           │
│  │  [Icon]   │ │  [Icon]   │ │  [Icon]   │ │  [Icon]   │           │
│  │           │ │           │ │           │ │           │           │
│  │  HUMAN    │ │   ELF     │ │  DWARF    │ │   ORC     │           │
│  │           │ │           │ │           │ │           │           │
│  │ Balanced  │ │  Magical  │ │  Sturdy   │ │  Fierce   │           │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘           │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  HUMAN                                                       │    │
│  │                                                              │    │
│  │  "Adaptable and determined, humans thrive in any land."     │    │
│  │                                                              │    │
│  │  Stat Bonuses: +1 to all stats                              │    │
│  │  Starting Gold: +15  |  Starting Rations: +8                │    │
│  │                                                              │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│                              [Back]  [Next →]                        │
└─────────────────────────────────────────────────────────────────────┘
```

**Step Details:**

| Step | Content |
|------|---------|
| 1. Species | 8 Species options with stat bonuses and descriptions |
| 2. Calling | 8 Calling options with stat modifiers and descriptions |
| 3. Appearance | Portrait selection (6-12 pre-made options per Species/Calling) |
| 4. Name | Text input with validation (unique, no profanity) |
| 5. Confirm | Full summary with [Create Hero] button |

## 13.4 Main Game Screen (Three-Panel Layout)

The primary gameplay interface. All exploration, services, and navigation occur within this persistent framework.

### 13.4.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│  AVANDRIA    [Map] [Character] [Inventory] [Skills]    [⚙] [Exit]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌───────────────────────────────────────┐ ┌───────────────────────┐│
│  │           NARRATIVE PANEL             │ │     STATUS PANEL      ││
│  │        (60-70% width)                 │ │     (30-40% width)    ││
│  │                                       │ │                       ││
│  │  Location name, descriptions,         │ │  Character name/level ││
│  │  event text, dialogue, results        │ │  HP/MP/SP bars        ││
│  │                                       │ │  Gold/Rations         ││
│  │                                       │ │  Current location     ││
│  │                                       │ │  Quick consumables    ││
│  │                                       │ │                       ││
│  ├───────────────────────────────────────┤ │                       ││
│  │           ACTION PANEL                │ │                       ││
│  │                                       │ │                       ││
│  │  Context-sensitive buttons:           │ │                       ││
│  │  - Exploration actions                │ │                       ││
│  │  - Travel destinations                │ │                       ││
│  │  - Service options                    │ │                       ││
│  │                                       │ │                       ││
│  └───────────────────────────────────────┘ └───────────────────────┘│
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Top Navigation Bar:**
- Game logo (links to Account Dashboard)
- Quick access icons: Map, Character Sheet, Inventory, Skills
- Settings gear
- Exit/Logout
- **Note:** Navigation bar is HIDDEN during Combat

### 13.4.2 Panel Content by Game State

| Game State | Narrative Panel | Action Panel |
|------------|-----------------|--------------|
| **At Site (Safe)** | Location name + flavor text | [Explore], [Travel], [Rest], Services |
| **At Site (Corrupted)** | Location name + corrupted flavor | [Explore], [Travel], [Rest] |
| **Monster Encounter** | Monster appearance text | [Fight], [Flee] |
| **Service Interaction** | Service description/dialogue | Service-specific options |
| **After Combat (Victory)** | Victory text + loot summary | [Continue] |
| **After Combat (Fled)** | Escape text | [Continue] |
| **Rest Result** | Recovery text (or ambush!) | [Continue] or [Fight] |

### 13.4.3 Site Navigation Example

**At a Settlement Hub (Goldgrass City):**
```
┌─────────────────────────────────────────────────────────────────────┐
│  NARRATIVE PANEL                                                    │
│  ═══════════════════════════════════════════════════════════════    │
│  GOLDGRASS CITY                                                     │
│  ═══════════════════════════════════════════════════════════════    │
│                                                                      │
│  The capital of the Verdant Wilds sprawls before you. Cobblestone   │
│  streets wind between timber-framed buildings, and the scent of     │
│  fresh bread mingles with the clang of the blacksmith's hammer.     │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│  ACTION PANEL                                                       │
│                                                                      │
│  SERVICES:                                                          │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐          │
│  │ 🏪 Merchant    │ │ 🏨 Inn         │ │ ⚗️ Apothecary  │          │
│  └────────────────┘ └────────────────┘ └────────────────┘          │
│  ┌────────────────┐ ┌────────────────┐                              │
│  │ 🎲 Gambling    │ │ 📚 Trainer     │                              │
│  └────────────────┘ └────────────────┘                              │
│                                                                      │
│  TRAVEL TO:                                                         │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ → The Sunlit Glades (Path) — 🟢 Cleared                    │    │
│  └────────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ → Merchant's Quarter (District) — 🔴 Corrupted             │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 13.4.4 Service Interaction Flow

Services operate within the Three-Panel Layout. Clicking a service updates the panels:

**Merchant Flow:**
```
[Click Merchant] → Narrative: Merchant greeting
                   Action: [Buy] [Sell] [← Back]
                   
[Click Buy]     → Narrative: Item listings with prices
                   Action: [← Back to Merchant]
                   
[Click Item]    → Purchase confirmation
                   Action: [Confirm] [Cancel]
```

**Service Types:**

| Service | Narrative Shows | Actions Available |
|---------|-----------------|-------------------|
| **Merchant** | Shopkeeper dialogue, item listings | Buy, Sell, Back |
| **Inn** | Innkeeper dialogue, room description | Rest (costs Gold), Back |
| **Apothecary** | Healer dialogue, potion listings | Buy potions, Back |
| **Gambling** | Game description, risk tiers | Bet amounts, Back |
| **Trainer** | Trainer dialogue, available paths | Learn Path, Back |

## 13.5 Combat Screen (Full Takeover)

Combat uses a specialized interface that completely replaces the Three-Panel Layout.

### 13.5.1 Transition

**Fade Transition:** When combat begins, the Three-Panel Layout fades out and the Combat UI fades in. This creates a clear "entering battle" feel.

### 13.5.2 Combat Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  ══════════════════════ COMBAT ══════════════════════               │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  SHADOW WOLF                              Round 3            │    │
│  │  HP: ██████░░░░░░░░░░ 45/120                                 │    │
│  │  Status: [Bleeding] [Weakened]                               │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                      COMBAT LOG                              │    │
│  │  ─────────────────────────────────────────────────────────   │    │
│  │  You strike with Rending Blow! (24 damage)                   │    │
│  │  The Shadow Wolf is now Bleeding!                            │    │
│  │  The Shadow Wolf lunges at you! (18 damage)                  │    │
│  │  You defend with Guard, reducing damage to 14!               │    │
│  │  Bleeding deals 4 damage to the Shadow Wolf.                 │    │
│  │  ─────────────────────────────────────────────────────────   │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  YOUR TURN — Choose an Action:                               │    │
│  │                                                              │    │
│  │  ABILITIES:                                                  │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │    │
│  │  │ Strike      │ │ Rending Blow│ │ Guard       │            │    │
│  │  │ Free        │ │ 8 Stamina   │ │ Free        │            │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘            │    │
│  │  ┌─────────────┐ ┌─────────────┐                            │    │
│  │  │ Crushing    │ │ Second Wind │                            │    │
│  │  │ 18 Stamina  │ │ 18 Stamina  │                            │    │
│  │  └─────────────┘ └─────────────┘                            │    │
│  │                                                              │    │
│  │  OTHER:                                                      │    │
│  │  [Use Consumable ▼]  [Attempt to Flee]                       │    │
│  │                                                              │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│  ALDRIC                                                             │
│  HP: ██████████████░░ 86/100 | SP: ████████░░ 42/58 | MP: ████ 45  │
│  Status: None                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 13.5.3 Combat UI Elements

| Element | Description |
|---------|-------------|
| **Enemy Status Bar** | Monster name, HP bar (visual + numeric), active status effects |
| **Round Counter** | Current combat round number |
| **Combat Log** | Scrollable history of combat actions (most recent at bottom) |
| **Ability Grid** | All unlocked abilities displayed as buttons with costs |
| **Other Actions** | Consumable dropdown, Flee button |
| **Player Status Bar** | HP/SP/MP bars (visual + numeric), active status effects |

### 13.5.4 Ability Tooltips

Hovering/tapping an ability shows detailed information:

```
┌─────────────────────────────────┐
│  RENDING BLOW                   │
│  Cost: 8 Stamina                │
│  Type: Active                   │
│  ───────────────────────────────│
│  Attack that applies Bleeding   │
│  on hit.                        │
│                                 │
│  Bleeding: 15% damage/turn      │
│  for 3 turns                    │
└─────────────────────────────────┘
```

### 13.5.5 Navigation During Combat

**Navigation bar is HIDDEN during combat.** Players must:
- Win the battle
- Flee successfully
- Die

This keeps combat focused and prevents menu distractions.

## 13.6 Game Over Screen

When the Hero dies in combat, a dedicated Game Over screen appears.

### 13.6.1 Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                         ══════════════════                          │
│                            YOU HAVE FALLEN                          │
│                         ══════════════════                          │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                                                              │    │
│  │  ALDRIC THE BOLD                                            │    │
│  │  Level 12 Human Warrior                                      │    │
│  │                                                              │    │
│  │  Slain by: Shadow Wolf                                       │    │
│  │  Location: The Whispering Grove                              │    │
│  │                                                              │    │
│  │  ───────────────────────────────────────────────────────     │    │
│  │  THIS ADVENTURE:                                             │    │
│  │  Monsters Defeated: 47                                       │    │
│  │  Gold Earned: 892                                            │    │
│  │  Sites Cleared: 3                                            │    │
│  │  ───────────────────────────────────────────────────────     │    │
│  │                                                              │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│         ┌────────────────────────┐  ┌────────────────────────┐      │
│         │  RETURN TO SETTLEMENT  │  │    LOAD CHECKPOINT     │      │
│         │  (Lose 25% Gold)       │  │    (Last Rest Point)   │      │
│         └────────────────────────┘  └────────────────────────┘      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 13.6.2 Death Penalties

| Option | Effect |
|--------|--------|
| **Return to Settlement** | Respawn at nearest cleared Settlement; lose 25% of current Gold; all buffs removed |
| **Load Checkpoint** | Respawn at last Rest point (Inn or successful wilderness Rest); lose 10% of current Gold; restore state from that point |

## 13.7 Modal Overlays

These screens appear as overlays over the Three-Panel Layout and can be dismissed to return to gameplay.

### 13.7.1 Character Sheet (Tabbed)

```
┌─────────────────────────────────────────────────────────────────────┐
│  CHARACTER SHEET                                           [X]      │
├─────────────────────────────────────────────────────────────────────┤
│  [STATS] [EQUIPMENT] [SKILLS] [HISTORY]                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  (Content varies by selected tab)                                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Tab Contents:**

| Tab | Content |
|-----|---------|
| **Stats** | Portrait, name/level/class, XP bar, core stats with breakdowns, derived stats |
| **Equipment** | Equipped items by slot (Weapon, Helm, Chest, Gloves, Boots, Accessory) |
| **Skills** | 6 Skill Paths with progress bars, available SP, [View] buttons |
| **History** | Lifetime stats, achievements, play time |

### 13.7.2 Skill Tree (Visual)

```
┌─────────────────────────────────────────────────────────────────────┐
│  PATH OF THE BERSERKER                               [X]            │
│  "Unleash your fury. Become the storm."                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Available Skill Points: 3                                          │
│                                                                      │
│  STAGE 1        STAGE 2        STAGE 3        STAGE 4               │
│  ┌───────┐      ┌───────┐      ┌───────┐      ┌───────┐            │
│  │   ★   │ ──── │   ★   │ ──── │   ★   │ ──── │   ★   │            │
│  │Strike │      │Rending│      │Brutal │      │Crushing│            │
│  │       │      │ Blow  │      │ Force │      │Strike  │            │
│  │ FREE  │      │ 1 SP  │      │ 2 SP  │      │ 3 SP   │            │
│  └───────┘      └───────┘      └───────┘      └───────┘            │
│       │              │              │              │                 │
│  STAGE 5        STAGE 6                                             │
│  ┌───────┐      ┌───────┐                                           │
│  │   ○   │ ──── │   ○   │      ○ = Locked (need previous stage)    │
│  │Blood  │      │Endless│      ★ = Purchased                        │
│  │ Rage  │      │ Fury  │                                           │
│  │ 4 SP  │      │ 5 SP  │                                           │
│  └───────┘      └───────┘                                           │
│                                                                      │
│  ═══════════════════════════════════════════════════════════════    │
│  SELECTED: Blood Rage (Stage 5)                                     │
│  Cost: 4 Skill Points | Prerequisite: Stage 4 ✓                     │
│  ───────────────────────────────────────────────────────────────    │
│  Type: Passive                                                      │
│  Effect: +15% damage when your HP is below 50%                      │
│  ───────────────────────────────────────────────────────────────    │
│                                                                      │
│                    [PURCHASE] (4 SP)                                 │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 13.7.3 Inventory (Grid)

```
┌─────────────────────────────────────────────────────────────────────┐
│  INVENTORY                                             [X]          │
│  Gold: 1,247  |  Capacity: 24/30 slots                              │
├─────────────────────────────────────────────────────────────────────┤
│  [ALL] [EQUIPMENT] [CONSUMABLES] [MATERIALS] [JUNK]                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                   │
│  │ ⚔️  │ │ 🛡️  │ │ 💊 │ │ 💊 │ │ 🍖 │ │ 💎 │                   │
│  │ x1  │ │ x1  │ │ x3  │ │ x5  │ │ x8  │ │ x2  │                   │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                   │
│                                                                      │
│  ═══════════════════════════════════════════════════════════════    │
│  SELECTED: Health Elixir (x3)                                       │
│  ───────────────────────────────────────────────────────────────    │
│  Restores 50 HP instantly. Can be used in combat.                   │
│  Value: 25 Gold each                                                │
│  ───────────────────────────────────────────────────────────────    │
│                                                                      │
│  [USE]  [DROP]  [SELL ALL JUNK]                                     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Inventory Features:**
- Category tabs for filtering
- Grid display with icons and stack counts
- Item details panel on selection
- Quick actions: Use, Drop, Equip

### 13.7.4 Map (Hierarchical)

```
┌─────────────────────────────────────────────────────────────────────┐
│  WORLD MAP                                             [X]          │
│  Current Location: The Whispering Grove (The Verdant Wilds)         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  REGIONS OF AVANDRIA                                                │
│                                                                      │
│  ┌───────────────────┐  ┌───────────────────┐                       │
│  │ THE VERDANT WILDS │  │ THE LAWLESS       │                       │
│  │ ████████████░░░░  │  │ MARCHES           │                       │
│  │ 75% Explored      │  │ ████░░░░░░░░░░░░  │                       │
│  │ [ENTER]           │  │ 25% Explored      │                       │
│  └───────────────────┘  │ [ENTER]           │                       │
│                         └───────────────────┘                       │
│                                                                      │
│  ┌───────────────────┐  ┌───────────────────┐                       │
│  │ THE BLIGHTED MOOR │  │ THE CLOCKWORK     │                       │
│  │ 🔒 LOCKED         │  │ WASTES            │                       │
│  │ Requires: Defeat  │  │ 🔒 LOCKED         │                       │
│  │ Regional Boss     │  │ Requires: Defeat  │                       │
│  └───────────────────┘  │ Regional Boss     │                       │
│                         └───────────────────┘                       │
│                                                                      │
│  Legend: 🟢 Cleared | 🔴 Corrupted | 🏠 Settlement | 🔒 Locked      │
│                                                                      │
│  [Fast Travel] — Instant travel to any Cleared Settlement (2 Rations)│
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Region Detail View (when ENTER clicked):**
- Shows Territory breakdown
- Shows Site list with status indicators
- Current location highlighted

## 13.8 Game State Machine

Complete state flow for the game:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GAME STATE MACHINE                          │
└─────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────┐
                    │   AT A SITE         │
                    │  (Three-Panel)      │
                    └─────────────────────┘
                              │
        ┌─────────┬───────────┼───────────┬─────────┐
        ▼         ▼           ▼           ▼         ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
   │[Explore]│ │[Travel] │ │[Service]│ │ [Rest]  │ │[Modal]  │
   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
        │           │           │           │           │
        ▼           │           │           ▼           │
   ┌─────────┐      │           │      ┌─────────┐      │
   │ Monster │      │           │      │Recovery │      │
   │ Found!  │      │           │      │   or    │      │
   │         │      │           │      │ Ambush! │      │
   └─────────┘      │           │      └─────────┘      │
        │           │           │           │           │
        ▼           │           │           ▼           │
   ┌─────────┐      │           │      ┌─────────┐      │
   │ COMBAT  │◄─────┼───────────┼──────│If Ambush│      │
   │(Takeover│      │           │      └─────────┘      │
   └─────────┘      │           │                       │
        │           │           │                       │
   ┌────┴────┐      │           │                       │
   ▼         ▼      │           │                       │
┌─────┐  ┌─────┐    │           │                       │
│ WIN │  │DEATH│    │           │                       │
└─────┘  └─────┘    │           │                       │
   │         │      │           │                       │
   │         ▼      │           │                       │
   │    ┌─────────┐ │           │                       │
   │    │GAME OVER│ │           │                       │
   │    │ SCREEN  │ │           │                       │
   │    └─────────┘ │           │                       │
   │         │      │           │                       │
   │         ▼      │           │                       │
   │    ┌─────────┐ │           │                       │
   │    │ Respawn │ │           │                       │
   │    │   at    │ │           │                       │
   │    │Settlement│ │          │                       │
   │    └─────────┘ │           │                       │
   │         │      │           │                       │
   └─────────┴──────┴───────────┴───────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Return to Site │
                    │  (Three-Panel)  │
                    └─────────────────┘
```

## 13.9 UI Element Reference

### 13.9.1 Status Indicators

| Indicator | Meaning |
|-----------|---------|
| 🟢 | Cleared (safe, no monsters) |
| 🔴 | Corrupted (monsters present) |
| 🏠 | Settlement (services available) |
| 🔒 | Locked (progression gate) |
| ⭐ | Champion location |
| 💀 | Boss location |

### 13.9.2 Resource Bars

| Bar | Color | Shows |
|-----|-------|-------|
| HP | Red/Green gradient | Current / Max Hit Points |
| MP | Blue gradient | Current / Max Mana Points |
| SP | Yellow/Orange gradient | Current / Max Stamina Points |
| XP | Purple gradient | Current / Next Level threshold |

### 13.9.3 Button States

| State | Appearance |
|-------|------------|
| **Available** | Full color, clickable |
| **Disabled** | Grayed out, not clickable (insufficient resources) |
| **Locked** | Grayed with lock icon (progression requirement) |
| **Selected** | Highlighted border |
| **Hover** | Slight glow or color shift |

## 13.10 Responsiveness Notes

**Desktop-First Design:** The interface is optimized for desktop browsers (1280px+ width). Mobile devices will receive a functional but condensed experience.

**Mobile Adaptations:**
- Three-Panel collapses to stacked single-column
- Navigation moves to hamburger menu
- Modals become full-screen
- Touch-friendly button sizes (minimum 44px tap targets)

---

# 14. Monster Ability System

## 14.1 Ability Distribution by Tier

| Tier | Passive | Triggered | Active | Unique | Total |
|------|---------|-----------|--------|--------|-------|
| Trash | — | — | — | — | 0 |
| Minion | — | — | — | — | 0 |
| Elite | 1 | — | — | — | 1 |
| Champion | 1 | 1 | — | — | 2 |
| Mini-Boss | 1 | 1 | 1 | — | 3 |
| Boss | 1 | 1 | 1 | 1 | 4 |

## 14.2 Ability Type Definitions

### Passive Abilities

**Definition:** Always in effect. No activation, no cost, no trigger — simply modifies the monster's baseline capabilities.

**Design Purpose:** Makes Elites feel meaningfully different from Minions without adding combat complexity.

**Examples:** Stat bonuses, resistances, regeneration, status immunity.

### Triggered Abilities

**Definition:** Activates automatically when a specific condition is met. The monster doesn't "choose" to use it — it happens.

**Design Purpose:** Creates memorable combat moments and forces players to adapt tactics.

**One-Time vs Repeating:**

| Trigger Type | Behavior |
|--------------|----------|
| `belowHalfHP`, `belowQuarterHP`, `firstTurn` | **One-time** — only activates once per combat |
| `onCrit`, `onHitX%`, `everyXTurns`, `onTakeCrit`, `onStatusReceived`, `onDamageType` | **Repeating** — can activate multiple times |

### Active Abilities

**Definition:** The monster chooses to use this instead of a basic attack on their turn. Requires simple AI logic to determine when to use.

**Design Purpose:** Makes Mini-Bosses tactically interesting — they have options, not just bigger numbers.

**Cooldown Types:**

| Cooldown Type | Description |
|---------------|-------------|
| None | Can use every turn if conditions met |
| X Turns | Cannot use again for X turns after use |
| Once Per Combat | Single use |

### Unique Abilities (Boss Only)

**Definition:** A special mechanic that defines the boss fight. Goes beyond simple damage/effects — changes how the encounter plays.

**Design Purpose:** Makes each Boss memorable and requires specific strategies.

**Unique Mechanic Types:**

| Type | Description |
|------|-------------|
| **Phase Shift** | Boss changes form/behavior at HP thresholds |
| **Environmental** | Boss affects the battlefield |
| **Immunity Window** | Boss becomes immune under conditions |
| **Stacking Mechanic** | Something builds over time |

## 14.3 Trigger Conditions

| Trigger | Description |
|---------|-------------|
| `passive` | Always active |
| `onCrit` | When monster lands a critical hit |
| `onHitX%` | X% chance on any successful attack |
| `belowHalfHP` | Activates once when HP first drops below 50% |
| `belowQuarterHP` | Activates once when HP first drops below 25% |
| `everyXTurns` | Every 2nd, 3rd, or 4th turn |
| `firstTurn` | Combat opener |
| `onTakeCrit` | When Hero crits the monster |
| `onStatusReceived` | When afflicted with any status effect |
| `onDamageType:X` | When hit by specific damage type |
| `startOfCombat` | Applied at combat initiation |

## 14.4 Category Ability Pools

### Beast (Natural predators, pack hunters, primal fury)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Thick Hide | Reduce Physical damage taken by 15% |
| **Passive** | Predator's Senses | +10% Critical Chance |
| **Passive** | Cornered Animal | +25% damage when below 25% HP |
| **Triggered** | Feral Frenzy | `belowHalfHP` — Gain +1 Action for 3 turns |
| **Triggered** | Rending Claws | `onCrit` — Apply Bleeding |
| **Triggered** | Territorial Roar | `firstTurn` — Hero loses 10% damage for 2 turns |
| **Triggered** | Lick Wounds | `belowQuarterHP` — Heal 15% Max HP once |
| **Active** | Pounce | Leap attack: +50% damage, cannot be used consecutively |
| **Active** | Intimidating Howl | Hero Crippled for 2 turns (cooldown: 3 turns) |

### Humanoid (Tactics, discipline, weapon mastery)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Combat Training | +10% damage with Physical attacks |
| **Passive** | Shield Wall | +20% Physical defense |
| **Passive** | Tactical Mind | +15% Initiative |
| **Passive** | Dirty Fighter | +10% chance to apply Blinded on hit |
| **Triggered** | Rally Cry | `belowHalfHP` — Heal 10% HP and cleanse one debuff |
| **Triggered** | Riposte | `onTakeCrit` — Immediate counterattack for 50% damage |
| **Triggered** | Exploit Weakness | `onCrit` — Apply Weakened for 2 turns |
| **Triggered** | Battle Cry | `firstTurn` — +20% damage for 3 turns |
| **Active** | Power Strike | 150% damage attack (cooldown: 2 turns) |
| **Active** | Defensive Stance | Reduce damage taken by 50% this turn, heal 5% HP |

### Cursed (Corruption, decay, suffering)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Cursed Aura | Hero takes 5% Max HP damage at start of each turn |
| **Passive** | Unnatural Resilience | Immune to Poisoned and Bleeding |
| **Passive** | Feed on Pain | Heal 10% of damage dealt |
| **Passive** | Spreading Corruption | Status effects applied by this monster last 1 turn longer |
| **Triggered** | Curse of Agony | `onHit30%` — Apply Weakened |
| **Triggered** | Death's Embrace | `belowHalfHP` — Apply Chilled to Hero |
| **Triggered** | Spite | `belowQuarterHP` — Deal 25% of monster's missing HP as damage |
| **Triggered** | Absorb Life | `onCrit` — Heal equal to damage dealt |
| **Active** | Wither | Apply Poisoned + Weakened (cooldown: 3 turns) |
| **Active** | Dark Pact | Sacrifice 10% HP to deal 200% damage (no cooldown) |

### Construct (Mechanical precision, durability, overload)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Armored Plating | Reduce all damage taken by 10% |
| **Passive** | Mechanical Precision | Attacks cannot miss |
| **Passive** | Reinforced Frame | Immune to Stunned and Crippled |
| **Triggered** | Emergency Repair | `belowHalfHP` — Heal 20% Max HP once |
| **Triggered** | Overclock Protocol | `belowQuarterHP` — +50% damage for remainder of fight |
| **Triggered** | Static Discharge | `onTakeCrit` — Apply Shocked to Hero |
| **Triggered** | Defensive Subroutine | `firstTurn` — Gain 25% damage reduction for 2 turns |
| **Active** | Charged Blast | 200% damage, cannot act next turn (cooldown: 3 turns) |
| **Active** | Deploy Shield | Immune to damage for 1 turn (once per combat) |

### Undead (Relentless, draining, refusing to die)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Undying Will | First time HP reaches 0, revive with 15% HP (once per combat) |
| **Passive** | Life Drain | Heal 15% of damage dealt |
| **Passive** | Unholy Fortitude | Immune to Poisoned and Bleeding |
| **Passive** | Chilling Presence | Hero's healing reduced by 25% |
| **Triggered** | Grasp of the Grave | `onHit25%` — Apply Crippled |
| **Triggered** | Soul Siphon | `onCrit` — Drain 10% of Hero's Max MP |
| **Triggered** | Horrifying Visage | `firstTurn` — 30% chance to Stun Hero for 1 turn |
| **Active** | Drain Life | Deal 75% damage, heal for 100% of damage dealt |
| **Active** | Deathly Wail | Apply Weakened + Chilled to Hero (cooldown: 3 turns) |

### Magical Beast (Elemental power, arcane nature)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Elemental Affinity | +25% damage with primary element, Immune to that element |
| **Passive** | Arcane Hide | Reduce Magical damage taken by 20% |
| **Passive** | Mana Burn Aura | Hero loses 5 MP at start of each turn |
| **Passive** | Primal Magic | Status effects have +15% chance to apply |
| **Triggered** | Elemental Burst | `onCrit` — Apply status effect matching damage type |
| **Triggered** | Arcane Surge | `belowHalfHP` — Next attack deals double damage |
| **Triggered** | Mana Shock | `onDamageType:Lightning` — Reflect 25% damage to Hero |
| **Triggered** | Primal Roar | `firstTurn` — Hero's Magic defense reduced 15% for 3 turns |
| **Active** | Elemental Breath | 125% damage, apply matching status effect (cooldown: 2 turns) |
| **Active** | Wild Magic | Random effect: heal self, damage Hero, buff, or debuff (no cooldown) |

### Dragon (Ancient power, overwhelming force, legendary)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Dragonscale | Reduce all damage taken by 15% |
| **Passive** | Ancient Cunning | Cannot be Blinded or Confused |
| **Passive** | Draconic Presence | Hero deals 10% less damage (fear aura) |
| **Triggered** | Breath Weapon | `everyThirdTurn` — 150% elemental damage + status effect |
| **Triggered** | Tail Sweep | `onTakeCrit` — Immediate counterattack, apply Stunned |
| **Triggered** | Draconic Fury | `belowHalfHP` — +30% damage for rest of fight |
| **Triggered** | Wing Buffet | `firstTurn` — Hero loses first action |
| **Active** | Focused Breath | 200% elemental damage (cooldown: 3 turns) |
| **Active** | Take Flight | Become untargetable for 1 turn, heal 10% HP |
| **Active** | Terrifying Roar | Apply Weakened + Crippled (cooldown: 4 turns) |

### Faerie (Illusion, enchantment, trickery)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Glamour | 20% chance for attacks against this monster to miss |
| **Passive** | Fey Grace | +25% Initiative, immune to Crippled |
| **Passive** | Enchanted Form | Reduce Physical damage taken by 25% |
| **Passive** | Mercurial Nature | Immune to Stunned |
| **Triggered** | Mirror Image | `onTakeCrit` — Negate the critical hit (once per combat) |
| **Triggered** | Faerie Dust | `onHit20%` — Apply Confused for 2 turns |
| **Triggered** | Vanish | `belowQuarterHP` — Become untargetable for 1 turn |
| **Triggered** | Mischief | `firstTurn` — Swap Hero's highest and lowest stat for 3 turns |
| **Active** | Bewildering Dance | Hero skips next turn (cooldown: 4 turns) |
| **Active** | Dream Eater | Deal 100% damage, restore MP equal to damage |

### Celestial (Divine wrath, purification, judgment)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Divine Shield | Reduce Holy and Fire damage by 50% |
| **Passive** | Radiant Presence | Hero's Shadow damage reduced by 25% |
| **Passive** | Blessed Form | Regenerate 5% Max HP per turn |
| **Passive** | Righteous Aura | Immune to all status effects |
| **Triggered** | Smite | `onCrit` — Deal bonus Holy damage equal to 50% of attack |
| **Triggered** | Divine Judgment | `belowHalfHP` — Cleanse all debuffs, gain +20% damage |
| **Triggered** | Blinding Light | `firstTurn` — Apply Blinded to Hero for 2 turns |
| **Triggered** | Martyr's Gift | `belowQuarterHP` — Heal 25% HP, cannot trigger again |
| **Active** | Pillar of Light | 175% Holy damage (cooldown: 2 turns) |
| **Active** | Sanctuary | Reduce damage taken by 75% for 2 turns (once per combat) |

### Aberration (Madness, reality-warping, alien)

| Type | Ability | Effect |
|------|---------|--------|
| **Passive** | Alien Anatomy | Physical damage reduced by 20%, weak to Holy (+25%) |
| **Passive** | Maddening Presence | Hero's Critical Chance reduced by 15% |
| **Passive** | Reality Anchor | Immune to Confused and Blinded |
| **Passive** | Regenerating Mass | Heal 3% Max HP per turn |
| **Triggered** | Psychic Scream | `onTakeCrit` — Apply Confused to Hero for 2 turns |
| **Triggered** | Unwholesome Gaze | `onHit15%` — Apply Weakened + random second debuff |
| **Triggered** | Reality Fracture | `belowHalfHP` — Hero takes 10% Max HP Shadow damage |
| **Triggered** | Tentacle Lash | `firstTurn` — Apply Crippled + deal 50% damage |
| **Active** | Mind Shatter | Deal 100% Shadow damage + drain 25% Stamina (cooldown: 3 turns) |
| **Active** | Phase Shift | Become untargetable for 1 turn, next attack +75% damage |

## 14.5 Boss Unique Abilities

| Region | Boss | Unique Ability | Description |
|--------|------|----------------|-------------|
| The Verdant Wilds | Draug, Maw of the Abyss | **Rising Tide** | At 75%, 50%, 25% HP: arena floods, Hero takes 10% damage and is Chilled. Draug heals 5% when submerged. |
| The Lawless Marches | Vaeryk the Tyrant | **Warlord's Command** | At 75%, 50%, 25% HP: shifts stance. Aggressive (+30% damage, -15% defense) → Defensive (-15% damage, +30% defense) → Berserker (+50% damage, takes 10% recoil). |
| The Blighted Moor | The Hollow Queen | **Miasma Shroud** | Poison stacks accumulate each turn. At 5 stacks, Hero takes 25% Max HP damage and stacks reset. |
| The Clockwork Wastes | The Prime Directive | **System Overload** | Charges for 3 turns (reduced damage taken), then unleashes 300% damage attack. |
| The Hollow Kingdom | Zantus, The First Mortal | **Crown of Dominion** | Hero Weakened while Zantus above 50% HP. At 50%, reverses — Zantus becomes Weakened instead. |
| The Savage Wilds | Gorath, the World-Ender | **Unstoppable Force** | Immune to Stunned, Crippled, Weakened. At 25% HP, gains second action per turn. |
| The Obsidian Dominion | Malachar, the Ember Throne | **Molten Core** | Lava zones shift every 2 turns. Standing in lava: 15% Max HP Fire damage. Malachar heals in lava. |
| The Dreaming Woods | The Dreamer Unseen | **Waking Nightmare** | Every 3 turns, Hero must "resist" (Spirit check) or suffer random severe debuff. |
| The Empyrean Reaches | Serath, the Fallen Star | **Divine Rotation** | Cycles through Fire/Ice/Lightning aspects every 2 turns. Aspect determines attacks and weaknesses. |
| The Maddening Deep | The Thing Below | **Incomprehensible** | Hero cannot see Boss HP. Random abilities each turn. At "death," reveals true form with 25% HP. |

## 14.6 Updated Schema Integration

```javascript
abilities: [
  {
    abilityName: String,              // "Feral Frenzy"
    abilityType: String,              // "passive", "triggered", "active", "unique"
    damageType: String | null,        // If deals damage
    effect: String,                   // Human-readable description
    
    // For Triggered abilities
    triggerCondition: String | null,  // "belowHalfHP", "onCrit", "everyThirdTurn"
    triggerOnce: Boolean,             // true = one-time, false = repeating
    
    // For Active abilities
    cooldown: Number | null,          // Turns before can use again
    useCondition: String | null,      // AI condition: "belowHalfHP", "heroStunned"
    
    // For Unique abilities (Boss)
    phaseThresholds: [Number] | null, // [75, 50, 25] for phase triggers
    specialMechanic: String | null    // Extended description
  }
]
```

---

# 15. Loot & Drop System

## 15.1 Valuable Drops (Weapons, Armor, Consumables)

| Monster Tier | Drop Chance | Rarity Pool | Max Items |
|--------------|-------------|-------------|-----------|
| Trash | 5% | Worn (70%), Common (30%) | 0-1 |
| Minion | 15% | Common (80%), Uncommon (20%) | 0-1 |
| Elite | 40% | Common (40%), Uncommon (50%), Rare (10%) | 0-1 |
| Champion | 100% | Uncommon (50%), Rare (50%) | 1 |
| Mini-Boss | 100% | Rare (40%), Exquisite (60%) | 1 |
| Boss | 100% | Epic | 1 |

## 15.2 Junk Drops (Vendor Trash, Remnants)

| Monster Tier | Drop Chance | Junk Value Range | Max Items |
|--------------|-------------|------------------|-----------|
| Trash | 20% | 1-3 gold | 0-1 |
| Minion | 35% | 2-5 gold | 0-1 |
| Elite | 50% | 5-10 gold | 1 |
| Champion | 75% | 15-25 gold | 1-2 |
| Mini-Boss | 100% | 40-60 gold | 1-2 |
| Boss | 100% | 100-150 gold + Remnant | 1 + Remnant |

**Note:** Boss Remnants are unique Epic-tier junk items with high sell value and collectible appeal.

## 15.3 Combined Drop Summary

| Monster Tier | Valuable | Junk | Total Possible |
|--------------|----------|------|----------------|
| Trash | 0-1 | 0-1 | 0-2 |
| Minion | 0-1 | 0-1 | 0-2 |
| Elite | 0-1 | 1 | 1-2 |
| Champion | 1 | 1-2 | 2-3 |
| Mini-Boss | 1 | 1-2 | 2-3 |
| Boss | 1 (Epic) | 1 + Remnant | 3 |

---

# 16. Combat System (Technical Reference)

This section provides implementation-level pseudocode for the combat system.

## 16.1 Combat Initiation

```
FUNCTION initiateCombat(hero, site):
    monster = selectMonster(site)
    
    combatState = {
        hero: hero,
        monster: monster,
        round: 0,
        turnOrder: [],
        combatLog: [],
        isComplete: false,
        result: null  // "victory", "defeat", "fled"
    }
    
    applyStartOfCombatEffects(combatState)
    combatState.turnOrder = rollInitiative(hero, monster)
    fadeToCombitUI(combatState)
    startRound(combatState)
    
    RETURN combatState
```

## 16.2 Initiative System

```
FUNCTION rollInitiative(hero, monster):
    // Formula: d100 + (Instinct × 2)
    heroRoll = randomInt(1, 100) + (hero.stats.instinct * 2)
    monsterRoll = randomInt(1, 100) + (monster.stats.instinct * 2)
    
    // Hero wins ties
    IF heroRoll >= monsterRoll:
        RETURN ["hero", "monster"]
    ELSE:
        RETURN ["monster", "hero"]
```

## 16.3 Round Structure

```
FUNCTION startRound(combatState):
    combatState.round += 1
    logMessage(combatState, "--- Round " + combatState.round + " ---")
    
    FOR EACH combatant IN combatState.turnOrder:
        IF combatState.isComplete:
            BREAK
        
        IF combatant == "hero":
            processHeroTurn(combatState)
        ELSE:
            processMonsterTurn(combatState)
    
    IF NOT combatState.isComplete:
        startRound(combatState)
```

## 16.4 Hero Turn Processing

```
FUNCTION processHeroTurn(combatState):
    hero = combatState.hero
    
    // Step 1: Start of turn status effect processing
    processStartOfTurnEffects(hero, combatState)
    
    IF hero.currentHP <= 0:
        endCombat(combatState, "defeat")
        RETURN
    
    // Step 2: Check if Stunned
    IF hasStatusEffect(hero, "Stunned"):
        logMessage(combatState, hero.name + " is Stunned and cannot act!")
        removeStatusEffectStack(hero, "Stunned")
        RETURN
    
    // Step 3: Determine available actions
    availableActions = hero.baseActions  // Usually 1
    IF hasPassiveAbility(hero, "extraAction"):
        availableActions += 1
    
    // Step 4: Process each action
    WHILE availableActions > 0 AND NOT combatState.isComplete:
        playerChoice = AWAIT getPlayerInput(combatState)
        
        SWITCH playerChoice.type:
            CASE "ability":
                success = executeAbility(hero, combatState.monster, 
                          playerChoice.ability, combatState)
                IF success: availableActions -= 1
            
            CASE "consumable":
                success = useConsumable(hero, playerChoice.item, combatState)
                IF success: availableActions -= 1
            
            CASE "flee":
                success = attemptFlee(combatState)
                IF success:
                    endCombat(combatState, "fled")
                    RETURN
                ELSE:
                    availableActions -= 1
        
        IF combatState.monster.currentHP <= 0:
            endCombat(combatState, "victory")
            RETURN
    
    // Step 5: End of turn effects
    processEndOfTurnEffects(hero, combatState)
```

## 16.5 Monster Turn Processing

```
FUNCTION processMonsterTurn(combatState):
    monster = combatState.monster
    hero = combatState.hero
    
    processStartOfTurnEffects(monster, combatState)
    
    IF monster.currentHP <= 0:
        endCombat(combatState, "victory")
        RETURN
    
    IF hasStatusEffect(monster, "Stunned"):
        logMessage(combatState, monster.name + " is Stunned and cannot act!")
        removeStatusEffectStack(monster, "Stunned")
        RETURN
    
    // Check triggered abilities first
    triggeredAbility = checkTriggeredAbilities(monster, combatState)
    IF triggeredAbility != null:
        executeMonsterAbility(monster, hero, triggeredAbility, combatState)
    ELSE:
        chosenAction = monsterAI(monster, hero, combatState)
        IF chosenAction.type == "active":
            executeMonsterAbility(monster, hero, chosenAction.ability, combatState)
        ELSE:
            executeMonsterBasicAttack(monster, hero, combatState)
    
    // Check for extra actions (e.g., Boss below 25% HP)
    IF hasPassiveAbility(monster, "extraActionBelow25") 
       AND monster.currentHP < monster.maxHP * 0.25:
        chosenAction = monsterAI(monster, hero, combatState)
        executeMonsterAction(monster, hero, chosenAction, combatState)
    
    IF hero.currentHP <= 0:
        endCombat(combatState, "defeat")
        RETURN
    
    processEndOfTurnEffects(monster, combatState)
```

## 16.6 Monster AI

```
FUNCTION monsterAI(monster, hero, combatState):
    // Priority 1: Check Active ability conditions
    FOR EACH ability IN monster.abilities:
        IF ability.type == "active" AND NOT isOnCooldown(ability):
            IF evaluateCondition(ability.useCondition, monster, hero, combatState):
                RETURN { type: "active", ability: ability }
    
    // Priority 2: Basic attack
    RETURN { type: "basic" }


FUNCTION evaluateCondition(condition, monster, hero, combatState):
    SWITCH condition:
        CASE "belowHalfHP": RETURN monster.currentHP < monster.maxHP * 0.5
        CASE "belowQuarterHP": RETURN monster.currentHP < monster.maxHP * 0.25
        CASE "heroStunned": RETURN hasStatusEffect(hero, "Stunned")
        CASE "heroLowHP": RETURN hero.currentHP < hero.maxHP * 0.25
        CASE "notBuffed": RETURN NOT hasAnyBuff(monster)
        CASE "always": RETURN true
        DEFAULT: RETURN false


FUNCTION checkTriggeredAbilities(monster, combatState):
    FOR EACH ability IN monster.abilities:
        IF ability.type == "triggered":
            IF evaluateTrigger(ability, monster, combatState):
                RETURN ability
    RETURN null
```

## 16.7 Damage Calculation

```
FUNCTION calculateDamage(attacker, defender, ability, combatState):
    // Step 1: Determine stats
    IF ability.damageType IN ["slashing", "piercing", "bludgeoning"]:
        offensiveStat = attacker.stats.power
        defensiveStat = defender.stats.toughness
    ELSE:
        offensiveStat = attacker.stats.brilliance
        defensiveStat = defender.stats.spirit
    
    // Step 2: Apply ability multiplier
    abilityMultiplier = ability.damageMultiplier OR 1.0
    
    // Step 3: Base damage formula
    // Damage = Offensive × (Off ÷ (Off + Def)) × 4
    rawDamage = offensiveStat * (offensiveStat / (offensiveStat + defensiveStat)) * 4
    rawDamage = rawDamage * abilityMultiplier
    
    // Step 4: Damage type interactions
    damageModifier = getDamageTypeModifier(ability.damageType, defender)
    
    SWITCH damageModifier:
        CASE "weakness": rawDamage = rawDamage * 1.25
        CASE "resistance": rawDamage = rawDamage * 0.75
        CASE "immunity":
            IF defender.counterAttack != null:
                triggerCounterAttack(defender, attacker, combatState)
            RETURN 0
    
    // Step 5: Critical hit check
    isCrit = rollCritical(attacker)
    IF isCrit:
        rawDamage = rawDamage * 1.5
        statusEffect = getStatusEffectForDamageType(ability.damageType)
        IF statusEffect != null:
            applyStatusEffect(defender, statusEffect, combatState)
    
    // Step 6: Minimum damage threshold
    finalDamage = max(1, floor(rawDamage))
    
    RETURN { damage: finalDamage, isCrit: isCrit, damageModifier: damageModifier }


FUNCTION rollCritical(attacker):
    // Crit chance = 5% base + (Acuity / 2)%
    critChance = 5 + (attacker.stats.acuity / 2)
    roll = randomInt(1, 100)
    RETURN roll <= critChance
```

## 16.8 Status Effect Processing

```
FUNCTION applyStatusEffect(target, statusEffect, combatState):
    IF isImmuneToStatus(target, statusEffect.type):
        logMessage(combatState, target.name + " is immune to " + statusEffect.type)
        RETURN
    
    existingEffect = findStatusEffect(target, statusEffect.type)
    
    IF existingEffect != null:
        existingEffect.remainingDuration = statusEffect.duration  // Refresh
    ELSE:
        target.activeStatusEffects.push({
            type: statusEffect.type,
            remainingDuration: statusEffect.duration,
            value: statusEffect.value
        })


FUNCTION processStartOfTurnEffects(combatant, combatState):
    FOR EACH effect IN combatant.activeStatusEffects:
        SWITCH effect.type:
            CASE "Bleeding", "Burning", "Poisoned":
                damage = floor(combatant.maxHP * 0.15)
                combatant.currentHP -= damage
            CASE "Chilled", "Weakened", "Crippled":
                combatant.tempDamageModifier = 0.85
            CASE "Shocked":
                IF randomInt(1, 100) <= 25:
                    applyStatusEffect(combatant, { type: "Stunned", duration: 1 })


FUNCTION processEndOfTurnEffects(combatant, combatState):
    // Decrement durations
    FOR EACH effect IN combatant.activeStatusEffects:
        effect.remainingDuration -= 1
    
    // Remove expired effects
    combatant.activeStatusEffects = combatant.activeStatusEffects
        .filter(e => e.remainingDuration > 0)
    
    // Reset temp modifiers
    combatant.tempDamageModifier = 1.0
    
    // Reduce cooldowns
    FOR EACH ability IN combatant.abilities:
        IF ability.currentCooldown > 0:
            ability.currentCooldown -= 1
    
    // Stamina recovery (Hero only)
    IF combatant.isHero:
        staminaRecovery = floor(combatant.maxStamina * 0.15)
        combatant.currentStamina = min(combatant.maxStamina, 
                                       combatant.currentStamina + staminaRecovery)
```

## 16.9 Flee Attempt

```
FUNCTION attemptFlee(combatState):
    hero = combatState.hero
    monster = combatState.monster
    
    // Base 50% + (Hero Instinct - Monster Instinct) × 2%
    fleeChance = 50 + ((hero.stats.instinct - monster.stats.instinct) * 2)
    fleeChance = clamp(fleeChance, 10, 90)
    
    roll = randomInt(1, 100)
    RETURN roll <= fleeChance
```

## 16.10 Combat Resolution

```
FUNCTION endCombat(combatState, result):
    combatState.isComplete = true
    combatState.result = result
    
    SWITCH result:
        CASE "victory": processVictory(combatState)
        CASE "defeat": processDefeat(combatState)
        CASE "fled": processFlee(combatState)


FUNCTION processVictory(combatState):
    hero = combatState.hero
    monster = combatState.monster
    
    // Award XP
    xpGained = calculateXP(monster)
    hero.currentXP += xpGained
    WHILE hero.currentXP >= hero.xpToNextLevel:
        levelUp(hero)
    
    // Award Gold
    goldGained = randomInt(monster.goldDrop.min, monster.goldDrop.max)
    hero.gold += goldGained
    
    // Generate loot
    loot = generateLoot(monster)
    FOR EACH item IN loot:
        addToInventory(hero, item)
    
    // Mark named monster defeated
    IF monster.isNamed:
        hero.defeatedMonsters.push(monster._id)
    
    // Update site status
    updateSiteStatus(combatState.currentSite, hero)
    
    fadeToExplorationUI(combatState)
```

## 16.11 Loot Generation

```
FUNCTION generateLoot(monster):
    loot = []
    
    // Valuable drops
    IF randomInt(1, 100) <= getValuableDropChance(monster.tier):
        rarity = rollRarity(monster.tier)
        item = generateItem(randomChoice(["weapon", "armor", "consumable"]), 
                           rarity, monster.level)
        loot.push(item)
    
    // Guaranteed drops (Champion+)
    IF monster.tier IN ["champion", "miniboss", "boss"]:
        rarity = getGuaranteedRarity(monster.tier)
        item = generateItem(randomChoice(["weapon", "armor"]), rarity, monster.level)
        loot.push(item)
    
    // Junk drops
    IF randomInt(1, 100) <= getJunkDropChance(monster.tier):
        loot.push(generateJunkItem(monster.tier))
    
    // Boss Remnant
    IF monster.tier == "boss" AND monster.remnantItem != null:
        loot.push(monster.remnantItem)
    
    RETURN loot
```

## 16.12 Combat Flow Diagram

```
┌──────────────────┐
│  INITIATE COMBAT │
│  Roll Initiative │
└────────┬─────────┘
         ▼
┌──────────────────┐
│   START ROUND    │◄──────────────────────────┐
└────────┬─────────┘                           │
         ▼                                     │
┌──────────────────┐                           │
│  PROCESS TURNS   │                           │
│  (Init Order)    │                           │
└────────┬─────────┘                           │
         │                                     │
    ┌────┴────┐                                │
    ▼         ▼                                │
┌───────┐ ┌─────────┐                          │
│ HERO  │ │ MONSTER │                          │
│ TURN  │ │  TURN   │                          │
└───┬───┘ └────┬────┘                          │
    └────┬─────┘                               │
         ▼                                     │
┌─────────────────────────────┐                │
│     TURN PROCESSING         │                │
├─────────────────────────────┤                │
│ 1. Start of Turn Effects    │                │
│ 2. Check Stunned            │                │
│ 3. Check Triggered Abilities│                │
│ 4. Execute Action           │                │
│ 5. End of Turn Effects      │                │
└────────────┬────────────────┘                │
             ▼                                 │
    ┌────────────────┐                         │
    │  CHECK END?    │                         │
    └────────┬───────┘                         │
             │                                 │
    ┌────────┼────────┐                        │
    ▼        ▼        ▼                        │
┌───────┐┌───────┐┌───────┐                    │
│DEFEAT ││VICTORY││ FLED  │                    │
└───────┘└───┬───┘└───────┘                    │
             ▼                                 │
        ┌─────────┐                            │
        │Award XP │                            │
        │Award Gld│                            │
        │Gen Loot │                            │
        └─────────┘                            │
                                               │
    If combat continues ───────────────────────┘
```

---

# 17. Areas Requiring Development

The following areas have been identified but not yet fully defined:

## 17.1 High Priority (Blocks Core Gameplay)

- [x] **Damage Formula** - ✅ Complete (Offensive × (Off ÷ (Off + Def)) × 4, with threshold, crit, weakness/resistance)
- [x] **Skill Point Economy** - ✅ Complete (54 SP total, scaling 2→3→4 per level)
- [x] **Damage Types** - ✅ Complete (9 types: 3 Physical, 6 Magical)
- [x] **Status Effects** - ✅ Complete (11 effects with durations and triggers)
- [x] **Monster W/R/I System** - ✅ Complete (2 Weaknesses, 1 Resistance, 1 Immunity per Category)
- [x] **Map Hierarchy** - ✅ Complete (Region → Territory → Sector → Site)
- [x] **Progression System** - ✅ Complete (Site clearing, Champion/Boss gates)
- [x] **Location Flavor Text System** - ✅ Complete (Corrupted/Cleared states, 5-sentence structure)
- [x] **Experience Curve** - ✅ Complete (21,150 total XP, exponential scaling, ±20% variance)
- [x] **Hero Data Schema** - ✅ Complete (Full schema with Account, Hero, navigation, lifetime stats)
- [x] **Site Schema** - ✅ Complete (Full schema with hierarchy, services, monsters, flavor text, envDamage)
- [x] **Monster Schema** - ✅ Complete (Full schema with stats, abilities, loot, counter attacks, fixedSpawnSite)
- [x] **Trainer Distribution** - ✅ Complete (16 Trainers across 7 visible Regions)
- [x] **Economy & Service Pricing** - ✅ Complete (Gold sources, Merchant/Inn/Apothecary/Gambling pricing, regional scaling)
- [x] **Stamina System** - ✅ Complete (Toughness × 5, recovery formula, Stage costs 0/8/18/35)
- [x] **Skill Tree Path Names** - ✅ Complete (48 unique Path names for 8 Callings × 6 branches)
- [x] **Basic Abilities** - ✅ Complete (Strike, Guard, Spark, Fortify, Focus, Evade)
- [x] **Initiative System** - ✅ Complete (d100 + Instinct × 2, rolled once per combat, Hero wins ties)

## 17.2 Medium Priority (Needed for Complete Game)

- [x] **Skill Tree Abilities** - ✅ Complete (8/8 Callings: Warrior, Paladin, Hunter, Rogue, Mage, Priest, Druid, Bard)
- [x] **Monster Bestiary** - 150+ individual monsters (Beast: 23, Humanoid: 23, Cursed: 23, Construct: 23, Undead: 23, Magical Beast: 23, Dragon: 23, Faerie: 23, Celestial: 23, Aberration: 23 — 230/150+ COMPLETE)
- [x] **Location Atlas** - Specific Sites for all 10 Regions (All 10 Regions complete: The Verdant Wilds, The Lawless Marches, The Blighted Moor, The Clockwork Wastes, The Hollow Kingdom, The Savage Wilds, The Obsidian Dominion, The Dreaming Woods, The Empyrean Reaches, The Maddening Deep)
- [x] **Region Names** - ✅ Complete (10 finalized names)
- [x] **Secret Region Details** - ✅ Complete (3 secret Regions with access points defined)
- [ ] **Location Flavor Text** - Corrupted/Cleared text for all Sites (to be written during database entry)
- [x] **Gambling Mechanics** - ✅ Complete (4 risk tiers, house edge, daily limits, lucky streak bonus)
- [x] **Monster Counter Attack** - ✅ Framework complete (triggers on Immunity hit, see Monster Schema)
- [x] **Monster Ability System** - ✅ Complete (10 Category ability pools, Boss Uniques, trigger conditions)
- [x] **Loot & Drop System** - ✅ Complete (Valuable/Junk drop tables by Monster Tier)
- [x] **Combat Technical Reference** - ✅ Complete (Pseudocode for initiative, turns, damage, status effects, loot)

## 17.3 Lower Priority (Polish)

- [x] **UI/UX Details** - ✅ Complete (Screen flows, Three-Panel Layout, Combat Takeover, Game States)
- [ ] **Balance Testing** - Stat formulas, damage scaling, difficulty curves (requires playable build)

---

*— End of Design Document —*

*Document Version 5.9 - Living Document*
