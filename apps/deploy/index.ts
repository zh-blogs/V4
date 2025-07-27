import app from "@server/app";
import "dotenv/config";

async function startServer() {
  try {
    await app.listen({
      port: 9900,
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

startServer();
