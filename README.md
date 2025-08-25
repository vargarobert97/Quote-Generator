# Quote App Sigli

A full-stack quote application built with React frontend and Fastify backend, featuring GraphQL and REST APIs, quote recommendations, and like functionality.

## Features

- **Random Quote Generation**: Fetches inspirational quotes from external APIs
- **Like System**: Users can like quotes and track their preferences
- **Popular Quotes**: Trending quotes based on user interactions
- **Dual API**: Both GraphQL and REST endpoints available
- **Modern UI**: Clean, responsive React interface
- **Caching**: In-memory caching for quotes and user preferences

## Tech Stack

### Backend

- **Fastify**: High-performance web framework
- **GraphQL**: With Mercurius for GraphQL support
- **TypeScript**: Full type safety
- **Node-Cache**: In-memory caching
- **Zod**: Schema validation

### Frontend

- **React 19**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Axios**: HTTP client for API calls
- **CSS**: Custom styling with responsive design

## Project Structure

```
quote-app-sigli/
├── backend/                 # Fastify backend server
│   ├── src/
│   │   ├── api/            # GraphQL and REST APIs
│   │   ├── services/       # Business logic services
│   │   ├── models/         # Data models
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript type definitions
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml      # Docker configuration
├── package.json            # Root package.json with scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional, for containerized development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quote-app-sigli
   ```

2. **Install all dependencies**

   ```bash
   npm run install:all
   ```

### Development

1. **Start both frontend and backend in development mode**

   ```bash
   npm run dev
   ```

2. **Or start them separately**

   ```bash
   # Backend only (runs on port 3001)
   npm run dev:backend

   # Frontend only (runs on port 3000)
   npm run dev:frontend
   ```

### Production Build

1. **Build both applications**

   ```bash
   npm run build
   ```

2. **Start production servers**

   ```bash
   npm start
   ```

### Docker Development

1. **Start with Docker Compose**

   ```bash
   npm run docker:up
   ```

2. **Stop Docker services**

   ```bash
   npm run docker:down
   ```

## API Endpoints

### REST API (Base: `/api`)

- `GET /quotes/random` - Get a random quote
- `POST /quotes/:id/like` - Like a quote
- `GET /quotes/:id/likes` - Get quote like count
- `GET /quotes/popular` - Get popular quotes

### GraphQL

- `randomQuote` - Get a random quote
- `quote(id)` - Get a specific quote
- `popularQuotes(limit)` - Get popular quotes
- `likeQuote(quoteId, userId)` - Like a quote

## Environment Variables

### Backend

- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

### Frontend

- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3001)

## Testing

```bash
# Run frontend tests
npm test

# Run backend tests (when implemented)
cd backend && npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
