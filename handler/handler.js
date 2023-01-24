let Parser = require("rss-parser");
let parser = new Parser();
require("dotenv").config();

module.exports.parse = async function () {
  let feed = await (await parser.parseURL(process.env.Mock_URI)).items;
  return feed;
};
