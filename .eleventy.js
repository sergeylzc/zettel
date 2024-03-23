const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const markdownIt = require("markdown-it")
const eleventyNavPlugin = require("@11ty/eleventy-navigation")
const { DateTime } = require("luxon")
const env = require("dotenv").config()
const inspect = require("util").inspect

module.exports = (eleventyConfig) => {
  eleventyConfig.addGlobalData("env", process.env)

  eleventyConfig.addPlugin(eleventyNavPlugin)

  eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`)

  eleventyConfig.addFilter('hashFile', function(filePath) {
    // Ensure the path is relative to your site's root
    const fullPath = path.join(__dirname, filePath)

    try {
      const fileBuffer = fs.readFileSync(fullPath)
      const hashSum = crypto.createHash('sha1')
      hashSum.update(fileBuffer)
      const hex = hashSum.digest('hex')
      return hex
    } catch (error) {
      console.error(`Error hashing file ${filePath}:`, error)
      return ''
    }
  })

  eleventyConfig.addFilter("excludeCollection", function(allPosts, excludeKeys) {
    if (!Array.isArray(excludeKeys)) {
      excludeKeys = [excludeKeys]
    }

    return allPosts.filter(post => {
      return !excludeKeys.some(key => post.data.tags.includes(key))
    })
  })

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd")
  })

  eleventyConfig.addFilter("postTime", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd HH:mm:ss")
  })

  eleventyConfig.addFilter("cleanTag", (url) => {
    let parts = url.split("/")
    parts.shift()
    parts.pop()

    return parts.join("/")
  })

  eleventyConfig.addFilter("jsonify", function(variable) {
    return JSON.stringify(variable, null, 2)
  })

  eleventyConfig.addFilter("getParentURL", (url) => {
    let parts = url.split("/")

    const hashId = parts[parts.length - 2]
    const secondToLastIndex = parts.length - 2
    parts.splice(secondToLastIndex, 1)

    return parts.join("/") + "#" + hashId
  })

  eleventyConfig.addFilter("getNewestCollectionItemDate", (collections) => {
    if(collections && collections.length > 0) {
      const sortedCollections = collections.sort((a, b) => {
        return b.date - a.date;
      })

      return sortedCollections[0].date
    }

    return null;
  })

  eleventyConfig.addFilter("dateToRfc3339", (date) => {
    return DateTime.fromJSDate(date).toISO();
  })

  // Copy `static/` to `_site/static`
  eleventyConfig.addPassthroughCopy("static")
  // Copy root level static files
  eleventyConfig.addPassthroughCopy("robots.txt")
  eleventyConfig.addPassthroughCopy("404.html")

  const options = {
    html: true,
    breaks: true,
    linkify: false
  }
  eleventyConfig.setLibrary("md", markdownIt(options))

  return {
    htmlTemplateEngine: "liquid",
    input: "source"
  }
}