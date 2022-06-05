import axios from "axios";
import cheerio from "cheerio";
import { indeed } from "../utils/jobseeker";

module.exports = {
  getAll: (req: any, reply: any) => {
    reply.send("Hello");
  },

  findJob: async(req: any, reply: any) => {
    const { job, place } = req.query;
    const indeedJobs = await indeed(job, place);
    reply.send({ indeedJobs });
  },
};
