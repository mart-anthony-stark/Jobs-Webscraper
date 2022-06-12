import axios from "axios";
import cheerio from "cheerio";
import { indeed, jobstreet } from "../utils/jobseeker";

module.exports = {
  getAll: (req: any, reply: any) => {
    reply.send("Hello");
  },

  findJob: async (req: any, reply: any) => {
    const { job, place, page } = req.query;
    const jobs = await indeed(job, place, page);
    // const jobs = await jobstreet(job, place, page);
    reply.send({ jobs });
  },
};
