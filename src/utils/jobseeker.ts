import axios from "axios";
import * as cheerio from "cheerio";

export const indeed = async (job: string, place: string) => {
  const BASEURL: string = `https://ph.indeed.com`;
  const URL: string = `${BASEURL}/jobs?q=${job || "all"}&l=${place || "all"}`;
  const selector: string = ".job_seen_beacon";
  const response = await axios.get(URL);
  const html = response.data;
  const $ = cheerio.load(html);

  const keys = ["job_title", "link"];
  const results: any = [];

  $(selector).each((parentIndex, parentEl) => {
    let keyIndex = 0;
    const resultObj: any = {};
    console.log(keyIndex, keys.length)
    if (keyIndex < keys.length) {
      $(parentEl)
        .children()
        .each((childIndex, childEl) => {
          const title = $(childEl).find(".jobTitle a");
          resultObj[keys[keyIndex++]] = title.text();
          resultObj[keys[keyIndex++]] = `${BASEURL}${title.attr("href")}`;
        });

      results.push(resultObj);
    }
  });
  return results;
};
