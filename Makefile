check-redun:
	find . -name .DS_Store -print0 | xargs -0 | grep "./_site/"

remove-redun:
	find . -name .DS_Store -print0 | xargs -0 | grep -v "_site" | rm