# Products Parser 20230105

# Descrição

Api de atualização automática agendada de produtos e sua manipulação

# Linguagens e frameworks

- javascript & typescript
- nest
- prisma
- axios
- jest
- docker
- postgres

# Instalação e execução

```sh
# Install dependencies
yarn

# Start postgres image with docker compose
docker compose up -d

# Run migrations
npx prisma migrate dev

# Set .env file with
DATABASE_URL="postgresql://test-user:test-pass@localhost:5432/test-db?schema=public"
API_KEY="api-key-string"

# Build App image with docker build
docker build -t products-parser .

# Run App image with doocker run
docker run -p 3003:3003 --network host products-parser:latest
```

# Notes

This is a challenge by Coodesh
