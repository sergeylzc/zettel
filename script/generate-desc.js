const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const markdownIt = require('markdown-it')
const md = new markdownIt()

const contentDirs = [
                      './area/gtm',
                      './area/find-niche',
                      './area/better-thinker',
                      './area/mental-models-to-startup-building',
                      './area/mental-models-to-understanding-tech',
                      './area/social-product',
                      './area/social-product',
                      './musing/building-products-people-want',
                      './read/book-100m-offer',
                      './read/essay-emergent-layers',
                      './writing'
                    ]
const descLength = 160

function processFile(filePath) {
  if (path.basename(filePath) === 'index.md') {
    console.log('Skipping index.md')
    return
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const parsedContent = matter(fileContent)

  if (!parsedContent.data.description) {
    let description = parsedContent.content.slice(0, descLength - 3) + '...'
    description = md.render(description).replace(/<[^>]*>/g, '').replace(/\n+/g, ' ')
    
    parsedContent.data.description = description
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