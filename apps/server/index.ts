import app from "@server/app";
import { migrateDatabase } from "@zhblogs/database/migrator";

app.listen({ port: 8765 }).catch((err) => {
  app.log.error("Error starting server:", err);
});

app.ready().then(async () => {
  migrateDatabase().catch((err) => {
    app.log.error("Error migrating database:", err);
  });
});
