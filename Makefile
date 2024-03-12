# Site generator directory
ZETTEL_DIR := .
# Path to the working_content directory
CONTENT_DIR := ../content
# List of directories and files to be deleted from the ZETTEL_DIR directory
PUBLISH_DIRS := area musing read writing index.md

.PHONY: clean_content copy_content build_content publish check_redun remove_redun

clean_content:
	@echo "🔨 Cleaning existing content..."
	@$(foreach dir,$(PUBLISH_DIRS),rm -rf $(ZETTEL_DIR)/$(dir);)
	@echo "✅ Cleaned existing content"
	@echo ""

copy_content:
	@echo "🔨 Loading content..."
	@cp -r $(CONTENT_DIR)/* $(ZETTEL_DIR)/
	@echo "✅ Loaded content"
	@echo ""

build_content:
	@echo "📢 Start building site..."
	@echo ""
	@echo "🔨 Removing _site..."
	rm -rf ./_site
	@echo "✅ Removed _site"
	@echo ""
	@echo "🔨 Processing tailwindcss..."
	npx tailwindcss -i ./static/css/style.css -o ./static/css/dist.css
	@echo "✅ Processed tailwindcss"
	@echo ""
	@echo "🔨 Generating _site..."
	npx @11ty/eleventy
	@echo "✅ Generated _site"
	@echo ""
	@echo "🎉 Done building site"

publish: clean_content copy_content build_content

check_redun:
	find . -name .DS_Store -print0 | xargs -0 | grep "./_site/"

remove_redun:
	find . -name .DS_Store -print0 | xargs -0 | grep -v "_site" | rm
