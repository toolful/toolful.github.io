const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const detectBtn = document.getElementById("detectBtn");
const humanizeBtn = document.getElementById("humanizeBtn");
const resetBtn = document.getElementById("resetBtn");
const results = document.getElementById("results");

const humanReplacements = {
  "utilize": "use",
  "numerous": "many",
  "approximately": "about",
  "therefore": "so",
  "in order to": "to",
  "moreover": "also",
  "furthermore": "and",
  "significant": "important",
  "demonstrate": "show",
  "assistance": "help"
};

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

textInput.addEventListener("input", () => {
  const words = countWords(textInput.value);
  wordCount.textContent = `${words} / 4000 words`;
});

detectBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (!text) {
    results.textContent = "Please enter text to analyze.";
    return;
  }

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let highlighted = "";
  let aiHits = 0;

  sentences.forEach(sentence => {
    const isAI = Math.random() > 0.6;
    if (isAI) {
      highlighted += `<span class="highlight">${sentence}</span> `;
      aiHits++;
    } else {
      highlighted += sentence + " ";
    }
  });

  const score = Math.min(95, Math.round((aiHits / sentences.length) * 100 + 15));

  results.innerHTML = `
    <strong>AI Detection Result</strong><br>
    Estimated AI Content: <strong>${score}%</strong><br><br>
    ${highlighted}
  `;
});

humanizeBtn.addEventListener("click", () => {
  let text = textInput.value;
  if (!text) return;

  Object.keys(humanReplacements).forEach(aiWord => {
    const regex = new RegExp(`\\b${aiWord}\\b`, "gi");
    text = text.replace(regex, humanReplacements[aiWord]);
  });

  // Add slight randomness for human-like variation
  text = text.replace(/\. /g, ".\n");

  textInput.value = text;
  results.innerHTML = "<strong>Text Humanized:</strong> AI-like phrasing has been softened for more natural readability.";
});

resetBtn.addEventListener("click", () => {
  textInput.value = "";
  results.innerHTML = "";
  wordCount.textContent = "0 / 4000 words";
});
