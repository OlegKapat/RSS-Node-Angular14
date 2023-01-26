const errorHandler = require("../utilites/errorHandler");
const handler = require("../handler/handler");
const Article = require("../models/article");
const ArticleDTO = require("../models/modelsDTO/articleDTO");
var debug = require("debug")("http");

module.exports.getarticle = async function (req, res) {
  const pageNumber = parseInt(req.query.pageNumber);
  const queryRegx = new RegExp(req.query.find, "i");
  const limit = parseInt(req.query.limit);
  const sort = req.query.sort ? req.query.sort : "";
  const result = {};
  const totalArticle = await ArticleDTO.countDocuments().exec();

  let startIndex = queryRegx ? null : pageNumber * limit;
  const endIndex = (pageNumber + 1) * limit;
  ArticleDTO.createIndexes([
    { creator: "text" },
    { title: "text" },
    { content: "text" },
    {
      unique: true,
      sparse: true,
      expireAfterSeconds: 3600,
      default_language: "non",
    },
  ]);
  try {
    result.totalArticle = totalArticle;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await ArticleDTO.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }

    var artfromdb = await ArticleDTO.find()
      .sort(sort)
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    if (artfromdb.length == 0) {
      handler.parse().then((data) => {
        if (data.length > 0) {
          data.map((all) => {
            new Article({
              atom: all.atom,
              channel: all.channel,
              description: all.description,
              item: all.item,
              link: all.link,
              title: all.title,
              categories: all.categories,
              content: all.content,
              contentSnippet: all.contentSnippet,
              creator: all.creator,
              enclosure: all.enclosure,
              guid: all.guid,
              isoDate: all.isoDate,
              link: all.link,
              pubDate: all.pubDate,
              summary: all.summary,
              title: all.title,
            }).save();
            res.status(201);
          });
        } else {
          res.status(401).json({ message: "Save error" });
        }
      });
    }

    res.status(200).json({ artfromdb, totalArticle });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getfilteredarticle = async function (req, res) {
  const queryRegx = new RegExp(req.query.find, "i");
  try {
    var artfromdb = await ArticleDTO.find({
      $text: { $search: queryRegx, $caseSensitive: false },
    }).exec();
    res.status(200).json({ artfromdb });
  } catch (e) {
    errorHandler(res, e);
  }
};
module.exports.update = async function (req, res) {
  try {
    const article = await ArticleDTO.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).exec();
    res.status(200).json(article);
  } catch (e) {
    errorHandler(res, e);
  }
};
module.exports.create = async function (req, res) {
  try {
    const article = await new ArticleDTO({
      item: req.body.item,
      link: req.body.link,
      title: req.body.title,
      categories: req.body.categories,
      content: req.body.content,
      contentSnippet: req.body.contentSnippet,
      creator: req.body.creator,
      isoDate: req.body.isoDate,
      link: req.body.link,
      pubDate: req.body.pubDate,
    }).save();
    res.status(201).json(article);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.delete = async function (req, res) {
  try {
    await Article.remove({ _id: req.params.id });
    res.status(200).json({ message: "Article deleted" });
  } catch (e) {
    errorHandler(res, e);
  }
};
