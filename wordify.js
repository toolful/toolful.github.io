const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const charNoSpaceCount = document.getElementById("charNoSpaceCount");
const readingTime = document.getElementById("readingTime");
const toast = document.getElementById("toast");

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function calculate() {
  const text = textInput.value.trim();
  const words = text ? text.split(/\s+/).length : 0;

  wordCount.textContent = words;
  charCount.textContent = text.length;
  charNoSpaceCount.textContent = text.replace(/\s/g, "").length;
  readingTime.textContent = `${Math.ceil(words / 200)} min`;
}

textInput.addEventListener("input", debounce(calculate, 200));

document.getElementById("clearBtn").addEventListener("click", () => {
  textInput.value = "";
  calculate();
});

document.getElementById("copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(textInput.value);
  toast.textContent = "Copied successfully!";
  setTimeout(() => toast.textContent = "", 2000);
});
