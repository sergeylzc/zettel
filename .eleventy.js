const markdownIt = require("markdown-it");
const eleventyNavPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");


module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyNavPlugin);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("cleanTag", (url) => {
    let parts = url.split("/");
    parts.shift();
    parts.pop();

    return parts.join("/");
  });

  eleventyConfig.addFilter("jsonify", function(variable) {
    return JSON.stringify(variable, null, 2);
  });

  eleventyConfig.addFilter("getParentURL", (url) => {
    let parts = url.split("/");

    const hashId = parts[parts.length - 2];
    const secondToLastIndex = parts.length - 2;
    parts.splice(secondToLastIndex, 1);

    return parts.join("/") + "#" + hashId;
  });

  // Copy `static/` to `_site/static`
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("robots.txt");

  const options = {
    html: true,
    breaks: true,
    linkify: false
  };
  eleventyConfig.setLibrary("md", markdownIt(options));

  return {  
    htmlTemplateEngine: "liquid",
    input: "source"
  };
};