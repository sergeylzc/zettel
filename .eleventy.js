const markdownIt = require("markdown-it"),
      eleventyNavPlugin = require("@11ty/eleventy-navigation"),
      { DateTime } = require("luxon");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyNavPlugin);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("getParentURL", (url) => {

      let parts = url.split("/");

      const hashId = parts[parts.length - 2];
      const secondToLastIndex = parts.length - 2;
      parts.splice(secondToLastIndex, 1);

      return parts.join("/") + "#" + hashId;
  });

  eleventyConfig.addPassthroughCopy("dist");
  // Copy `resource/` to `_site/resource`
  eleventyConfig.addPassthroughCopy("resource");

  const options = {
    html: true,
    breaks: true,
    linkify: false
  };
  eleventyConfig.setLibrary("md", markdownIt(options));

  return {  
    // Use liquid in html templates
    htmlTemplateEngine: "liquid"
  };
};