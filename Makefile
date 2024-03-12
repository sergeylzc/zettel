# Site generator directory
ZETTEL_DIR := .
# Path to the working_content directory
CONTENT_DIR := ../content
# List of directories and files to be deleted from the ZETTEL_DIR directory
PUBLISH_DIRS := area musing read writing index.md

.PHONY: clean copy

clean_content:
	@echo "clean published content..."
	@$(foreach dir,$(PUBLISH_DIRS),rm -rf $(ZETTEL_DIR)/$(dir);)

copy_content:
	@echo "Copying files from working_content to zettel site generator directory..."
	@cp -r $(CONTENT_DIR)/* $(ZETTEL_DIR)/

# Default target to do both tasks
all_content: clean_content copy_content


check_redun:
	find . -name .DS_Store -print0 | xargs -0 | grep "./_site/"

remove_redun:
	find . -name .DS_Store -print0 | xargs -0 | grep -v "_site" | rm
