const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const article = new Schema(
  {
    atom: { type: String },
    channel: { type: String },
    description: { type: String },
    item: { type: String },
    link: { type: String },
    title: { type: String },
    categories: [String],
    content: { type: String },
    contentSnippet: { type: String },
    creator: { type: String },
    enclosure: { type: String },
    guid: { type: String },
    isoDate: { type: Date, default: () => moment().format("DD.MM.YYYY") },
    link: { type: String },
    pubDate: { type: Date, default: () => moment().format("DD.MM.YYYY") },
    summary: { type: String },
    title: { type: String },
  },
  { capped: { size: 100000, max: 10000, autoIndexId: true } }
);
module.exports = mongoose.model("article", article);
