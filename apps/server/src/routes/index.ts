import { FastifyPluginAsync } from "fastify";
import { githubRoutes, githubRoutesPrefix } from "./github";

const routes: FastifyPluginAsync = async (app) => {
  app.register(githubRoutes, { prefix: githubRoutesPrefix });
};

export default routes;
