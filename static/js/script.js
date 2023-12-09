let DEFAULT_NOTE_URL = "";
let DEVICE;
const notesContainer = document.querySelector("#notesContainer");

document.addEventListener("DOMContentLoaded", function () {
    // Check if notes list container exists
    if (!document.querySelector("#notesListContainer")) {
        DEFAULT_NOTE_URL = document.querySelector("#notesContainer .note:first-child").getAttribute('data-note-url');
    }
    setDevice();
    initializeNotes();
    setupEventListeners();
});

function initializeNotes() {
    if (document.querySelector("#notesListContainer")) { return; }
    const entryNoteElement = document.querySelector("#notesContainer .note:first-child");
    const entryNoteURL = entryNoteElement.getAttribute('data-note-url');
    const queryNotes = getQueryNotes();

    // Remove all notes except the entry note
    const notesToBeRemoved = document.querySelectorAll("#notesContainer .note:not(:first-child)"); 
    notesToBeRemoved.forEach(note => note.remove());

    // Load notes from queryNotes excluding the entry note
    queryNotes.forEach(noteURL => {
        if (noteURL !== entryNoteURL) {
            loadNote(noteURL);
        }
    });
}

function setupEventListeners() {
    if (notesContainer === null) { return; }

    // Adding event listener for notes container click
    notesContainer.addEventListener("click", handleNotesContainerClick);

    // Adding event listener for notes container scroll
    notesContainer.addEventListener("scroll", handleNotesContainerScroll);

    // Adding event listener for mouse over
    notesContainer.addEventListener("mouseover", handleNotesContainerMouseOver);

    // Event listeners for popstate and resize
    window.addEventListener('popstate', initializeNotes);
    window.addEventListener('resize', setDevice);
}

function handleNotesContainerClick(event) {
    let noteURL;

    // If the device is small
    if (DEVICE === 'small') {
        const refNoteWrapper = event.target.closest(".refNoteWrapper");
        if (refNoteWrapper) {
            event.preventDefault();
            noteURL = refNoteWrapper.getAttribute("data-note-url");
            const noteLink = document.createElement("a");
            noteLink.href = noteURL;
            noteLink.click();
            return;
        } else {
            return;
        }
    }

    // Identify the clicked element type
    const isNoteLink = event.target.tagName === 'A' && event.target.hasAttribute("data-note-url");
    const isOutsideRefNoteWrapper = !event.target.closest(".refNoteWrapper");

    // For anchor links not inside .refNoteWrapper
    if (isNoteLink && isOutsideRefNoteWrapper) {
        event.preventDefault();
        noteURL = event.target.getAttribute("data-note-url");
    } else if (event.target.closest(".refNoteWrapper")) {
        const refNoteWrapper = event.target.closest(".refNoteWrapper");
        if (refNoteWrapper) {
            event.preventDefault();
            noteId = refNoteWrapper.getAttribute("data-note-url");
        }
    }

    if (!noteURL) { return; }

    const currentNotes = [DEFAULT_NOTE_URL].concat(getQueryNotes());
    const targetNote = document.querySelector(`.note[data-note-url="${noteURL}"]`);
    const clickedNote = event.target.closest('.note');
    const clickedNoteIndex = currentNotes.indexOf(clickedNote.getAttribute('data-note-url'));

    if (!currentNotes.includes(noteURL)) {
        currentNotes.splice(clickedNoteIndex + 1); // Remove notes after the clicked one
        document.querySelectorAll(".note").forEach((node, idx) => {
            if (idx > clickedNoteIndex) {
                node.remove();
                highlightActiveLinks();
            }
        });
        currentNotes.push(noteURL);
        loadNote(noteURL).then(loadedNote => {
            scrollToNote(loadedNote, clickedNote);
        });
        currentNotes.shift();
        updateQueryParams(currentNotes);
    } else {
        scrollToNote(targetNote, clickedNote);
    }
}

function handleNotesContainerScroll(event) {
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => note.classList.remove('overlap'));
    
    for (let i = 1; i < notes.length; i++) {
        if (isOverlapping(notes[i-1], notes[i])) {
            notes[i].classList.add('overlap');
        }
    }
}

function handleNotesContainerMouseOver(event) {
    if (DEVICE === 'small') { return; }

    const target = event.target;

    if (target.tagName === 'A' && target.hasAttribute("data-note-url") && !target._tippy && !target.closest(".refNoteWrapper")) {
        tippy(target, {
            theme: "light",
            arrow: false,
            content: "Loading...",
            allowHTML: true,
            maxWidth: 300,
            onShow(instance) {
                const noteURL = target.getAttribute('data-note-url');
                fetchNoteContent(noteURL, false)
                    .then(previewContent => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(previewContent, "text/html");
                        instance.setContent(doc.querySelector(".content"));
                    })
                    .catch(error => {
                        instance.setContent("Error loading preview.");
                    });
            }
        });
        
        // Trigger the tooltip manually since it won't show up automatically the first time after initialization
        target._tippy.show();
    }
}

function getQueryNotes() {
    const queryParams = new URLSearchParams(window.location.search);
    const stackednotes = queryParams.get('stackednotes');
    if (stackednotes) {
        return stackednotes.split(",").filter(item => item && item !== DEFAULT_NOTE_URL).map(item => item.trim());
    } else {
        return [];
    }
}

function updateQueryParams(notesList) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('stackednotes', notesList.join(','));
    window.history.pushState(null, null, `?${queryParams.toString()}`);
}

function fetchNoteContent(noteURL, includeLinks = true) {
    return fetch(`${noteURL}/index.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            if (includeLinks) {
                return doc.querySelector("#notesContainer > div").innerHTML;
            } else {
                return doc.querySelector("#notesContainer .noteWrapper").innerHTML;
            }
        });
}

function loadNote(noteURL) {
    return new Promise((resolve, reject) => {
        fetchNoteContent(noteURL)
            .then(noteContent => {
                const noteDiv = document.createElement("div");
                noteDiv.className = "note";
                noteDiv.setAttribute("data-note-url", noteURL);
                noteDiv.innerHTML = noteContent;

                const scriptTag = noteDiv.querySelector("script");
                if (scriptTag) {
                    scriptTag.remove();
                }

                const noteCount = document.querySelectorAll("#notesContainer .note").length;
                noteDiv.style.left = `${noteCount * 40}px`;
                noteDiv.style.right = "-584px";

                notesContainer.appendChild(noteDiv);
                highlightActiveLinks();
                resolve(noteDiv);  // Resolve the promise with the noteDiv
            })
            .catch(error => {
                console.error("Error loading note:", error);
                reject(error);  // Reject the promise with the error
            });
    });
}

function scrollToNote(targetElm, fromElm) {
    if (targetElm) {
        const allNotes = Array.from(document.querySelectorAll("#notesContainer .note"));

        const targetNoteIndex = allNotes.indexOf(targetElm);
        const containerScrollLeft = notesContainer.scrollLeft;

        let distance = targetNoteIndex * 545 - containerScrollLeft;

        // Home Position
        if (targetNoteIndex === 0) {
            notesContainer.scrollTo({ left: 0, behavior: "smooth" });
            return;
        }

        // End Position
        if (targetNoteIndex === allNotes.length - 1) {
            notesContainer.scrollTo({ left: notesContainer.scrollWidth, behavior: "smooth" });
            return;
        }

        // Relative Backward Navigation and Relative Forward Navigation
        notesContainer.scrollBy({ left: distance, behavior: "smooth" });
    }
}

function highlightActiveLinks() {
    const allNotes = Array.from(document.querySelectorAll("#notesContainer .note")).map(note => note.getAttribute('data-note-url'));
    const allNoteWrappers = Array.from(document.querySelectorAll("#notesContainer .noteWrapper"));

    allNoteWrappers.forEach(wrapper => {
        const allNotesInWrapper = Array.from(wrapper.querySelectorAll('a[data-note-url]'));
        const allLinkNoteURLs = allNotesInWrapper.map(link => link.getAttribute('data-note-url'));

        allNotesInWrapper.forEach(link => {
            const noteURL = link.getAttribute('data-note-url');
            if (allNotes.includes(noteURL)) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    });
}

function setDevice() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 620) {
        DEVICE = 'small';
    } else {
        DEVICE = 'large';
    }
}

function clickHandle(selector, handle) {
    document.addEventListener("click", function(event) {
        if (!event.target.closest(selector)) {
            return;
        }
        handle(event);
    });
}

function isOverlapping(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return rect1.right > rect2.left;
}

function toggleElementShown(element) {
    element.classList.remove('hidden');
}

function toggleElementHidden(element){
    element.classList.add('hidden')
}