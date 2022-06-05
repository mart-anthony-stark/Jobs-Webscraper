const controller = require("../controllers/home.controller");

const route = (fastify: any, options: any, done: any) => {
  fastify.get("/v1", controller.getAll);
  fastify.get("/v1/jobs", controller.findJob);
  done();
};

export default route;
