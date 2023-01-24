const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const { v4: uuid } = require("uuid");

const article = new Schema(
  {
    link: { type: String },
    title: { type: String },
    categories: [String],
    content: { type: String },
    contentSnippet: { type: String },
    creator: { type: String },
    guid: { type: String },
    isoDate: { type: Date, default: () => moment().format("DD.MM.YYYY") },
    pubDate: { type: Date, default: () => moment().format("DD.MM.YYYY") },
  },
  { capped: { size: 100000, max: 10000, autoIndexId: true } }
);
module.exports = mongoose.model("articles", article);
