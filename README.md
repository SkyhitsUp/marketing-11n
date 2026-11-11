# Class 11–N Marketing — study website

A small static website for our Marketing class. No frameworks, no build step,
no internet needed once it is downloaded.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home page — hero, quick links, the 4 Ps, topic preview |
| `topics.html` | Full topic map, grouped into Foundations / Marketing mix / Practice |
| `notes.html` | Revision notes, frameworks, formulas and a searchable glossary |
| `quiz.html` | 10-question MCQ quiz with instant feedback and scoring |
| `resources.html` | Official links, project ideas, download placeholders, study tips |

Shared files live in `assets/`:

- `assets/styles.css` — all styling and responsive rules
- `assets/script.js` — mobile menu, glossary search, quiz logic

## View the site

1. Open `C:\Users\Gaming\marketing-11n` in File Explorer.
2. Double-click `index.html`.

That's it — it opens in your browser. If you edit files, just refresh the page.

## Editing the content

All text is plain HTML. Open a page in Notepad, VS Code or any editor and change
the words between the tags.

- **Class or school name** — update the brand in the header and the footer on each
  page, plus the hero on `index.html`.
- **Topics** — edit `topics.html`. Keep the `.chapter-num` numbers in order if you
  add or remove a topic.
- **Notes** — edit `notes.html`. Each note is a `.note-card`; section ids power the
  jump chips at the top.
- **Glossary** — add a new `<div class="term">` with a `<dt>` and `<dd>` inside the
  `.glossary` list. The search box picks it up automatically.
- **Quiz questions** — open `assets/script.js` and edit the `questions` array.
  `answer` is zero-based: `0` = first option, `1` = second option, and so on.
- **Colours** — change the CSS variables at the top of `assets/styles.css`.

## Adding PDFs for the class

1. Create `assets/downloads/`.
2. Drop in a file, e.g. `assets/downloads/marketing-mix-sheet.pdf`.
3. In `resources.html`, replace a “Not uploaded yet” line with:

```html
<a class="card-link" href="assets/downloads/marketing-mix-sheet.pdf">Download PDF ↗</a>
```

## Publishing it (optional)

The site is just static files and needs no server, so it works on any free static
host.

- **Netlify Drop** — go to `app.netlify.com/drop` and drag the whole
  `marketing-11n` folder onto the page. You get a shareable link in seconds.
- **GitHub Pages** — create a repository, upload the folder contents, then enable
  Pages in Settings → Pages (deploy from the `main` branch). Good if you want
  classmates to contribute fixes.

## One note on the syllabus

The topic list is a general Class 11 Marketing map, not an official CBSE
prescription. Compare it with your school's syllabus and textbook, then rename,
add or remove topics as needed.
