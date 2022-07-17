"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobstreet = exports.indeed = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
// Scraper for indeed.com
const indeed = async (job, loc, page) => {
    page = page ? page * 10 : 0;
    const BASEURL = `https://ph.indeed.com`;
    const URL = `${BASEURL}/jobs?q=${job || "all"}&l=${loc || "all"}&start=${page}`;
    const selector = ".job_seen_beacon";
    const response = await axios_1.default.get(URL);
    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];
    $(selector).each((parentIndex, parentEl) => {
        const resultObj = {};
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
exports.indeed = indeed;
const jobstreet = async (job, loc, page) => {
    const BASEURL = `https://www.jobstreet.com.ph`;
    const URL = `${BASEURL}/en/job-search/${job}-jobs-in-${loc}/${!isNaN(page) ? page : ""}`;
    // const selector: string = ".job_seen_beacon";
    const response = await axios_1.default.get(URL);
    // const html = response.data;
    // const $ = cheerio.load(html);
    console.log(response.data);
    return URL;
};
exports.jobstreet = jobstreet;
