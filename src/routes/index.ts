import { catcher } from "../utils/catcher";

const controller = require("../controllers/home.controller");

const route = (fastify: any, options: any, done: any) => {
  fastify.get("/v1", catcher(controller.getAll));
  fastify.get("/v1/jobs", catcher(controller.findJob));
  done();
};

export default route;
