"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jobseeker_1 = require("../utils/jobseeker");
module.exports = {
    getAll: (req, reply) => {
        reply.send("Hello");
    },
    findJob: async (req, reply) => {
        const { job, place, page } = req.query;
        const jobs = await (0, jobseeker_1.indeed)(job, place, page);
        // const jobs = await jobstreet(job, place, page);
        reply.send({ jobs });
    },
};
