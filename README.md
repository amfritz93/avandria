# Avandria

A browser-based text RPG featuring 12 unique species, 8 callings with skill trees, strategic combat, and an expansive world with 10 regions to explore.

## Features

### Current (Iteration 1)
- User account registration and authentication (JWT-based)
- Theme toggle (light/dark mode) with persistent preferences
- Responsive landing page with login/register modals
- User dashboard
- RESTful API with Express.js
- MongoDB database integration

### Planned
- Character creation with 12 species and 8 callings
- Turn-based combat system with tactical depth
- Skill trees and ability progression
- 10 explorable regions with 150+ monsters
- Equipment and inventory management
- Save system with multiple hero slots

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
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── store/          # Redux state management
│   │   └── App.jsx         # Main app component
│   └── vite.config.js
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth & error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── server.js           # Entry point
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

Project Link: [https://github.com/amfritz93/avandria](https://github.com/amfritz93/avandria)
