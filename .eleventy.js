const markdownIt = require("markdown-it"),
      eleventyNavPlugin = require("@11ty/eleventy-navigation"),
      { DateTime } = require("luxon");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyNavPlugin);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
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