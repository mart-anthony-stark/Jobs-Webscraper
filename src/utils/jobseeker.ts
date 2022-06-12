import axios from "axios";
import * as cheerio from "cheerio";

// Scraper for indeed.com
export const indeed = async (job: string, loc: string, page?: number) => {
  page = page ? page * 10 : 0;
  const BASEURL: string = `https://ph.indeed.com`;
  const URL: string = `${BASEURL}/jobs?q=${job || "all"}&l=${
    loc || "all"
  }&start=${page}`;
  const selector: string = ".job_seen_beacon";
  const response = await axios.get(URL);
  const html = response.data;
  const $ = cheerio.load(html);

  const results: any = [];

  $(selector).each((parentIndex, parentEl) => {
    const resultObj: any = {};

    const title = $(parentEl).find(".jobTitle a");
    const companyName = $(parentEl).find(".companyName").text();
    const companyLoc = $(parentEl).find(".companyLocation").text();
    const salary = $(parentEl).find(".salary-snippet-container").text();
    const job_desc = $(parentEl).find(".job-snippet").text();
    resultObj["job_title"] = title.text();
    resultObj["link"] = `${BASEURL}${title.attr("href")}`;
    resultObj["company_name"] = companyName;
    resultObj["company_location"] = companyLoc;
    resultObj["salary"] = salary;
    resultObj["job_desc"] = job_desc;

    results.push(resultObj);
  });
  return { start: page, items: results.length, origin: BASEURL, jobs: results };
};

export const jobstreet = async(job: string, loc: string, page: number) => {
  const BASEURL: string = `https://www.jobstreet.com.ph`;
  const URL = `${BASEURL}/en/job-search/${job}-jobs-in-${loc}/${
    !isNaN(page) ? page : ""
  }`;

  // const selector: string = ".job_seen_beacon";
  const response = await axios.get(URL);
  // const html = response.data;
  // const $ = cheerio.load(html);
  console.log(response.data)

  return URL;
};
