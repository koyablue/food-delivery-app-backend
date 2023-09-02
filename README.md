docker compose -f docker-compose.dev.yml --env-file env/.env.dev up

// It will create migration file in /src/migrations folder
docker-compose -f docker-compose.dev.yml --env-file ./env/.env.dev run dev npm run typeorm:generate src/migrations/table-init

// Run files from migrations folder
docker-compose -f docker-compose.dev.yml --env-file ./env/.env.dev run dev npm run typeorm:run

// Create DB if DB is not created automatically. Here db is the service & fooddb is the DB name
docker-compose -f docker-compose.dev.yml --env-file env/.env.dev exec db createdb fooddb -U postgres
