# WatchMate

A private movie and TV tracker built for small groups. Search titles, rate and review them, build shared watchlists, and keep tabs on what everyone's seen — no algorithm, no noise, just your circle.

> Currently in active development.

## What it does

- Search movies and series by title, genre, year, or rating (via OMDb)
- Rate, review, and comment — visible only to your group
- Personal lists: watchlist, favorites, watched history
- Shared group lists for planning movie nights
- Track series progress by season and episode
- Send recommendations to friends
- User profiles with watch stats and activity

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Java, Spring Boot, Spring Security + JWT |
| Frontend | React, Tailwind CSS |
| Database | PostgreSQL (Supabase) |
| Testing | Cypress |
| External API | OMDb |

## Getting started

**Backend**
```bash
cd backend
mvn spring-boot:run
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Before running either service, create a `.env` file in the root with the following:

```env
# OMDb
OMDB_API_KEY=your_omdb_api_key

# Supabase / PostgreSQL
DB_URL=your_supabase_db_url
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION_MS=86400000
```

> Generate a secure JWT secret with `openssl rand -base64 64`.
