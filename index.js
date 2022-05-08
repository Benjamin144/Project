const PORT = 8000;
const axios = require("axios"); // to perform GET requests
const cheerio = require("cheerio");
const express = require("express");
const visitMalvern = express();
const url = "https://www.visitthemalverns.org/";
axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".gb-headline-text", html).each(function () {
      const site = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        site,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));
visitMalvern.listen(PORT, () =>
  console.log(`server listening to PORT ${PORT}`)
);
