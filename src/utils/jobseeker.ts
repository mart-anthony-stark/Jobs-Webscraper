import axios from "axios";
import * as cheerio from "cheerio";

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
    resultObj["job_title"] = title.text();
    resultObj["link"] = `${BASEURL}${title.attr("href")}`;
    resultObj["company_name"] = companyName;
    resultObj["company_location"] = companyLoc;
    resultObj["salary"] = salary;

    results.push(resultObj);
  });
  return results;
};
