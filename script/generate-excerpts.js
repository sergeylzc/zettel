const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const markdownIt = require('markdown-it');
const md = new markdownIt();

const contentDir = './stream';
const excerptLength = 60;

// Utility function to process a single file
function processFile(filePath) {

  if (path.basename(filePath) === 'index.md') {
    console.log('Skipping index.md')
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsedContent = matter(fileContent);

  if (!parsedContent.data.excerpt) { // Check if excerpt already exists
    let excerpt = parsedContent.content.slice(0, excerptLength - 3) + '...';
    excerpt = md.render(excerpt).replace(/<[^>]*>/g, '');
    
    parsedContent.data.excerpt = excerpt;
    const newContent = matter.stringify(parsedContent.content, parsedContent.data);
    fs.writeFileSync(filePath, newContent);
    console.log(`Excerpt added to ${filePath}`);
  }
}

// Utility function to recursively process files in a directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      processDirectory(filePath); // Recursively process subdirectories
    } else if (filePath.endsWith('.md')) { 
      processFile(filePath);
    }
  });
}

// Start processing
processDirectory(contentDir);
