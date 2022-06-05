const controller = require("../controllers/home.controller");

const route = (fastify: any, options: any, done: any) => {
  fastify.get("/", controller.getAll);
  done();
};

export default route
