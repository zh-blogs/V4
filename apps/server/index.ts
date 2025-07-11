import app from "@server/app.js";
import { migrateDatabase } from "@zhblogs/schemas/migrator";

// Start the Fastify server
app.listen({ port: 8765 }).catch((err) => {
  app.log.error("Error starting server:", err);
});

// Run scripts after the server is ready
app.ready().then(async () => {
  // Perform database migration
  migrateDatabase().catch((err) => {
    app.log.error("Error migrating database:", err);
  })
});
