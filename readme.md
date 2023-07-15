# Content Publishing Process
1. Update content in xiaosuidao-slippod-content directory
2. Run `npm run clean-input` and `npm run clean-output` to clean the previous content and generated _site directory
3. Copy the updated content from xiaosuidao-slippod-content directory to this directory
4. Run `npm run build` to generate _site directory which contains the generated html files
5. Run git commit to mark a new update to the content
6. Push the latest commit to github
7. Login to xiaosuidao serve and pull the latest update from github


# Steps to set up remote server to only sync only _site directory
1. `git clone <repository_url>`
2. `cd <repository_name>`
3. `git config core.sparsecheckout true`
4. `echo "_site" >> .git/info/sparse-checkout`
5. `git read-tree -m -u HEAD`