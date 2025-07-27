import app from "@server/app";
import "dotenv/config";

async function startServer() {
  try {
    await app.listen({
      port: 9900,
    });
  } catch (err: any) {
    app.log.error(err);
  }
}

startServer();
