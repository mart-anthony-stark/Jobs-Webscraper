"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catcher_1 = require("../utils/catcher");
const controller = require("../controllers/home.controller");
const route = (fastify, options, done) => {
    fastify.get("/v1", (0, catcher_1.catcher)(controller.getAll));
    fastify.get("/v1/jobs", (0, catcher_1.catcher)(controller.findJob));
    done();
};
exports.default = route;
