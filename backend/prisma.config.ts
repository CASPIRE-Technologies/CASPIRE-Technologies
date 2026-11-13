import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx ./prisma/seed.ts",
  },
  datasource: {
    // Prisma Client generation does not connect to the database. Keep builds
    // working when DATABASE_URL is only provided at runtime (for example on
    // a deployment platform during dependency installation).
    url: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/caspire",
  },
});
