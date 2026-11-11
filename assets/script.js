/* Class 11–N Marketing — shared scripts */

/* Mobile navigation */
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.getElementById("site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Close" : "Menu";
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
    }
  });
}

/* Footer year */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* Print buttons */
document.querySelectorAll("[data-print]").forEach((btn) => {
  btn.addEventListener("click", () => window.print());
});

/* Glossary search */
const glossarySearch = document.getElementById("glossary-search");
if (glossarySearch) {
  const terms = Array.from(document.querySelectorAll(".glossary .term"));
  const emptyState = document.getElementById("glossary-empty");

  glossarySearch.addEventListener("input", () => {
    const query = glossarySearch.value.trim().toLowerCase();
    let visible = 0;

    terms.forEach((term) => {
      const matches = term.textContent.toLowerCase().includes(query);
      term.hidden = !matches;
      if (matches) visible += 1;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
  });
}

/* Quiz */
const quizCard = document.getElementById("quiz-card");

if (quizCard) {
  const questions = [
    {
      q: "The traditional marketing mix consists of which four elements?",
      options: [
        "Product, Price, Place, Promotion",
        "Product, Profit, People, Promotion",
        "Price, Place, Process, Profit",
        "Product, Price, People, Process",
      ],
      answer: 0,
      explain:
        "The 4 Ps are product, price, place and promotion. People, process and physical evidence are the extra Ps used for services.",
    },
    {
      q: "Which of the following is NOT one of the traditional 4 Ps?",
      options: ["Product", "Price", "Profit", "Promotion"],
      answer: 2,
      explain:
        "Profit is a result of good marketing, not one of the 4 Ps. The four are product, price, place and promotion.",
    },
    {
      q: "Marketing properly begins with:",
      options: [
        "Producing goods in large quantities",
        "Identifying customer needs",
        "Running advertisements",
        "Selling whatever has been produced",
      ],
      answer: 1,
      explain:
        "Marketing starts before production — the firm first finds out what customers need and want, then designs an offering around it.",
    },
    {
      q: "In marketing, STP stands for:",
      options: [
        "Sales, Targets, Profit",
        "Segmentation, Targeting, Positioning",
        "Strategy, Team, Promotion",
        "Segmentation, Testing, Pricing",
      ],
      answer: 1,
      explain:
        "STP is the process of dividing the market (segmentation), choosing whom to serve (targeting) and creating a distinct place in the customer's mind (positioning).",
    },
    {
      q: "Which of these is a demographic basis of market segmentation?",
      options: ["Age", "Lifestyle", "Personality", "Benefits sought"],
      answer: 0,
      explain:
        "Age is demographic. Lifestyle and personality are psychographic; benefits sought is behavioural.",
    },
    {
      q: "What is the correct order of the product life cycle stages?",
      options: [
        "Growth, Introduction, Maturity, Decline",
        "Introduction, Maturity, Growth, Decline",
        "Introduction, Growth, Maturity, Decline",
        "Introduction, Growth, Decline, Maturity",
      ],
      answer: 2,
      explain:
        "A product moves from introduction to growth, then maturity, and finally decline.",
    },
    {
      q: "Setting a low introductory price to win market share quickly is called:",
      options: [
        "Skimming pricing",
        "Penetration pricing",
        "Psychological pricing",
        "Discriminatory pricing",
      ],
      answer: 1,
      explain:
        "Penetration pricing uses a low price to attract buyers quickly. Skimming does the opposite — a high initial price aimed at early adopters.",
    },
    {
      q: "A manufacturer selling directly to consumers uses which channel level?",
      options: ["Zero-level", "One-level", "Two-level", "Three-level",],
      answer: 0,
      explain:
        "Zero-level (direct) channel: manufacturer → consumer, with no intermediary in between.",
    },
    {
      q: "AIDA stands for:",
      options: [
        "Attention, Interest, Desire, Action",
        "Awareness, Intention, Demand, Action",
        "Attention, Information, Decision, Action",
        "Advertising, Interest, Demand, Awareness",
      ],
      answer: 0,
      explain:
        "AIDA describes how promotion moves a buyer from attention to interest, desire and finally action.",
    },
    {
      q: "Data collected firsthand for a specific study is called:",
      options: ["Secondary data", "Primary data", "Published data", "Syndicated data"],
      answer: 1,
      explain:
        "Primary data is gathered fresh for the project — for example through a survey. Secondary data already exists, collected for some other purpose.",
    },
  ];

  const els = {
    counter: document.getElementById("quiz-counter"),
    bar: document.getElementById("quiz-bar"),
    progress: document.querySelector(".progress"),
    question: document.getElementById("quiz-question"),
    options: document.getElementById("quiz-options"),
    feedback: document.getElementById("quiz-feedback"),
    next: document.getElementById("quiz-next"),
    hint: document.getElementById("quiz-hint"),
    result: document.getElementById("quiz-result"),
    score: document.getElementById("quiz-score"),
    message: document.getElementById("quiz-message"),
    restart: document.getElementById("quiz-restart"),
  };

  let index = 0;
  let score = 0;
  let answered = false;

  function updateProgress() {
    const step = index + (answered ? 1 : 0);
    const percent = (step / questions.length) * 100;
    els.bar.style.width = percent + "%";
    if (els.progress) {
      els.progress.setAttribute("aria-valuenow", String(step));
      els.progress.setAttribute("aria-valuemax", String(questions.length));
    }
  }

  function showQuestion() {
    answered = false;
    const current = questions[index];

    els.counter.textContent = "Question " + (index + 1) + " of " + questions.length;
    els.question.hidden = false;
    els.options.hidden = false;
    els.question.textContent = current.q;
    els.options.innerHTML = "";
    els.feedback.hidden = true;
    els.feedback.className = "feedback";
    els.feedback.textContent = "";
    els.next.hidden = true;
    els.hint.hidden = false;
    els.result.hidden = true;

    current.options.forEach((text, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.textContent = String.fromCharCode(65 + optionIndex) + ". " + text;
      button.addEventListener("click", () => choose(optionIndex, button));
      els.options.appendChild(button);
    });

    updateProgress();
  }

  function choose(optionIndex, clickedButton) {
    if (answered) return;
    answered = true;

    const current = questions[index];
    const buttons = Array.from(els.options.querySelectorAll(".option"));

    buttons.forEach((button, i) => {
      button.disabled = true;
      if (i === current.answer) button.classList.add("correct");
    });

    if (optionIndex === current.answer) {
      score += 1;
    } else {
      clickedButton.classList.add("wrong");
    }

    els.feedback.textContent =
      (optionIndex === current.answer ? "Correct. " : "Not quite. ") + current.explain;
    els.feedback.classList.add(optionIndex === current.answer ? "good" : "bad");
    els.feedback.hidden = false;
    els.next.hidden = false;
    els.next.textContent =
      index === questions.length - 1 ? "See result" : "Next question →";
    els.hint.hidden = true;

    updateProgress();
  }

  els.next.addEventListener("click", () => {
    if (!answered) return;

    if (index < questions.length - 1) {
      index += 1;
      showQuestion();
      els.question.focus?.();
    } else {
      finish();
    }
  });

  function finish() {
    els.counter.textContent = "Quiz complete";
    els.question.hidden = true;
    els.options.hidden = true;
    els.question.textContent = "";
    els.options.innerHTML = "";
    els.feedback.hidden = true;
    els.feedback.className = "feedback";
    els.feedback.textContent = "";
    els.next.hidden = true;
    els.hint.hidden = true;

    els.bar.style.width = "100%";
    els.score.textContent = score + " / " + questions.length;

    const ratio = score / questions.length;
    let message = "Start with the notes page, then come back for another try.";
    if (ratio >= 0.9) {
      message = "Excellent — you are exam-ready on the basics.";
    } else if (ratio >= 0.7) {
      message = "Good work. Review the few you missed and retry.";
    } else if (ratio >= 0.4) {
      message = "Halfway there — revisit the notes, then retry the quiz.";
    }
    els.message.textContent = message;

    els.result.hidden = false;
    els.result.focus();
  }

  els.restart.addEventListener("click", () => {
    index = 0;
    score = 0;
    els.result.hidden = true;
    showQuestion();
  });

  showQuestion();
}
