import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL!,
    idle_timeout: 10000,
  },
  casing: "snake_case",
});
