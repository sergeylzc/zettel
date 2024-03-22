const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const markdownIt = require('markdown-it')
const md = new markdownIt()

const contentDirs = ['./stream', './reference']
const excerptLength = 60

function processFile(filePath) {
  if (path.basename(filePath) === 'index.md') {
    console.log('Skipping index.md')
    return
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const parsedContent = matter(fileContent)

  if (!parsedContent.data.excerpt) {
    let excerpt = parsedContent.content.slice(0, excerptLength - 3) + '...'
    excerpt = md.render(excerpt).replace(/<[^>]*>/g, '')
    
    parsedContent.data.excerpt = excerpt
    const newContent = matter.stringify(parsedContent.content, parsedContent.data)
    fs.writeFileSync(filePath, newContent)
    console.log(`Excerpt added to ${filePath}`)
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory)

  files.forEach(file => {
    const filePath = path.join(directory, file)
    const fileStat = fs.statSync(filePath)

    if (fileStat.isDirectory()) {
      processDirectory(filePath); // Recursively process subdirectories
    } else if (filePath.endsWith('.md')) { 
      processFile(filePath)
    }
  });
}

// Start processing for each directory
contentDirs.forEach(dir => processDirectory(dir))