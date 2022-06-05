import axios from "axios";
import * as cheerio from "cheerio";

export const indeed = async (job: string, place: string) => {
  const BASEURL: string = `https://ph.indeed.com`;
  const URL: string = `${BASEURL}/jobs?q=${job || "all"}&l=${place || "all"}`;
  const selector: string = ".job_seen_beacon";
  const response = await axios.get(URL);
  const html = response.data;
  const $ = cheerio.load(html);

  const results: any = [];

  $(selector).each((parentIndex, parentEl) => {
    const resultObj: any = {};

    const title = $(parentEl).find(".jobTitle a");
    const companyName = $(parentEl).find(".companyName");
    const companyLoc = $(parentEl).find(".companyLocation");
    resultObj["job_title"] = title.text();
    resultObj["link"] = `${BASEURL}${title.attr("href")}`;
    resultObj["company_name"] = companyName.text();
    resultObj["company_location"] = companyLoc.text();

    results.push(resultObj);
  });
  return results;
};
