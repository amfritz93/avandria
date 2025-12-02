# Avandria

A browser-based text RPG featuring 12 unique species, 8 callings with skill trees, strategic combat, and an expansive world with 10 regions to explore.

## Features

### Current (Iterations 1-2)

**Account System**
- User account registration and authentication (JWT-based)
- Theme toggle (light/dark mode) with persistent preferences
- Responsive landing page with login/register modals

**Hero Creation**
- 12 unique species (Human, Elf, Dwarf, Gnome, Orc, Goliath, Tiefling, Goblin, Aarakocra, Vulpine, Sylvan, Sprite)
- 8 callings/classes (Warrior, Paladin, Hunter, Rogue, Mage, Priest, Bard, Druid)
- 4 gender identity options with icons
- 6-step character creation wizard
- Combined stat preview (species base + calling modifiers)
- Starting equipment based on calling specializations

**Skill Tree System**
- 6 skill branches per calling (Power, Toughness, Brilliance, Spirit, Acuity, Instinct)
- 6 stages per branch with unique abilities
- 288 total abilities across all callings
- Initial skill point spending during creation

**Dashboard**
- Hero selection with detailed hero cards
- Up to 5 heroes per account
- Delete hero with confirmation
- Hero stats display (level, location, last played)

### Planned
- Turn-based combat system with tactical depth
- 10 explorable regions with 150+ monsters
- Equipment and inventory management
- Save system with auto-save

## Installation

```bash
# Clone the repository
git clone https://github.com/amfritz93/avandria.git

# Navigate to project directory
cd avandria

# Install all dependencies (root, server, and client)
npm run install:all
```

### Environment Setup

Create a `.env` file in the `server` directory (use `.env.example` as reference):

```bash
cp server/.env.example server/.env
```

Then edit `server/.env` with your configuration:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/avandria
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
```

## Usage

```bash
# Start both client and server in development mode
npm run dev

# Run only the server
npm run dev:server

# Run only the client
npm run dev:client

# Lint the codebase
npm run lint

# Format code with Prettier
npm run format
```

The client runs on `http://localhost:5173` and the API server on `http://localhost:5000`.

## Project Structure

```
avandria/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # Login/Register modals
│   │   │   ├── characterCreation/  # 6-step wizard components
│   │   │   ├── common/         # ThemeToggle, shared UI
│   │   │   └── dashboard/      # HeroCard, dashboard UI
│   │   ├── pages/              # LandingPage, Dashboard, CharacterCreation
│   │   ├── services/           # API service layer (hero, gameData, skillTree)
│   │   ├── store/              # Redux slices (auth, theme, hero)
│   │   └── App.jsx
│   └── vite.config.js
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # heroController, skillTreeController, etc.
│   ├── data/               # Game data (species, callings, items, skillTrees)
│   ├── middleware/         # Auth & error handling
│   ├── models/             # Account, Hero, Item schemas
│   ├── routes/             # API routes (auth, heroes, game, skills)
│   └── server.js
└── package.json            # Root workspace scripts
```

## Technologies Used

### Frontend
- React 19
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js

### Development Tools
- ESLint
- Prettier
- Concurrently
- Nodemon

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login to account |
| POST | `/api/auth/logout` | Logout current session |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/settings` | Update user settings |

### Heroes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/heroes` | Get all heroes for account |
| POST | `/api/heroes` | Create a new hero |
| GET | `/api/heroes/:id` | Get hero details |
| PUT | `/api/heroes/:id` | Update hero (save game) |
| DELETE | `/api/heroes/:id` | Delete a hero |
| GET | `/api/heroes/:id/stats` | Get calculated stats |

### Game Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/game/species` | Get all species |
| GET | `/api/game/callings` | Get all callings |
| GET | `/api/game/items` | Get all items |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills/tree/:calling` | Get skill tree for calling |
| GET | `/api/skills/ability/:calling/:branch/:stage` | Get specific ability |
| POST | `/api/skills/spend` | Spend skill points |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

Project Link: [https://github.com/amfritz93/avandria](https://github.com/amfritz93/avandria)
