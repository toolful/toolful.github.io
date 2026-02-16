  // --- Configuration & Data ---
    const paragraphs = [
        "The quick brown fox jumps over the lazy dog. It is a well known pangram that contains every letter of the alphabet. Typing requires focus and muscle memory to master efficiently.",
        "Technology continues to evolve at a rapid pace. Artificial intelligence and machine learning are changing how we interact with data. Staying updated with these trends is crucial for modern developers.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. Resilience is a key trait found in many successful entrepreneurs and leaders across the world.",
        "Design is not just what it looks like and feels like. Design is how it works. A good user interface should be intuitive, accessible, and responsive across all devices.",
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Authenticity is rare and valuable in today's digital landscape."
    ];

    // --- DOM Elements ---
    const textDisplay = document.getElementById("textDisplay");
    const inputField = document.getElementById("inputField");
    const timerTag = document.getElementById("timer");
    const mistakeTag = document.getElementById("mistakes");
    const wpmTag = document.getElementById("wpm");
    const accuracyTag = document.getElementById("accuracy");
    const progressBar = document.getElementById("progressBar");
    const restartBtn = document.getElementById("restartBtn");
    const resultOverlay = document.getElementById("resultOverlay");
    const themeBtn = document.getElementById("themeBtn");

    // --- State Variables ---
    let timer;
    let maxTime = 60;
    let timeLeft = maxTime;
    let charIndex = 0;
    let mistakes = 0;
    let isTyping = false;

    // --- Functions ---

    function loadParagraph() {
        const randIndex = Math.floor(Math.random() * paragraphs.length);
        textDisplay.innerHTML = "";
        paragraphs[randIndex].split("").forEach(char => {
            let span = document.createElement("span");
            span.innerText = char;
            textDisplay.appendChild(span);
        });
        textDisplay.querySelectorAll("span")[0].classList.add("active");
        
        // Focus input when user clicks on text area
        document.getElementById("typingArea").addEventListener("click", () => inputField.focus());
    }

    function initTyping() {
        let characters = textDisplay.querySelectorAll("span");
        let typedChar = inputField.value.split("")[charIndex];

        if (charIndex < characters.length && timeLeft > 0) {
            if (!isTyping) {
                timer = setInterval(initTimer, 1000);
                isTyping = true;
            }

            if (typedChar == null) { // Backspace
                if (charIndex > 0) {
                    charIndex--;
                    if (characters[charIndex].classList.contains("incorrect")) {
                        mistakes--;
                    }
                    characters[charIndex].classList.remove("correct", "incorrect");
                }
            } else {
                if (characters[charIndex].innerText === typedChar) {
                    characters[charIndex].classList.add("correct");
                } else {
                    mistakes++;
                    characters[charIndex].classList.add("incorrect");
                }
                charIndex++;
            }

            // Move cursor
            characters.forEach(span => span.classList.remove("active"));
            if (charIndex < characters.length) characters[charIndex].classList.add("active");

            // Update Stats UI
            mistakeTag.innerText = mistakes;
            
            let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            wpmTag.innerText = wpm;

            let accuracy = Math.floor(((charIndex - mistakes) / charIndex) * 100);
            accuracy = isNaN(accuracy) ? 100 : accuracy;
            accuracyTag.innerText = accuracy + "%";
        } else if (charIndex >= characters.length) {
            // Completed paragraph, load new one but keep timer
            // For this simple version, we end game or loop. 
            // Let's end game early if they finish fast.
            clearInterval(timer);
            showResults();
        }
    }

    function initTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerTag.innerText = timeLeft + "s";
            
            // Update Progress Bar
            let percentage = (timeLeft / maxTime) * 100;
            progressBar.style.width = percentage + "%";
        } else {
            clearInterval(timer);
            showResults();
        }
    }

    function showResults() {
        inputField.value = "";
        resultOverlay.classList.add("show");
        
        // Final Calcs
        let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft || 1) / 60)); // Handle div by zero
        wpm = wpm < 0 ? 0 : wpm;
        
        let accuracy = Math.floor(((charIndex - mistakes) / (charIndex || 1)) * 100);
        
        document.getElementById("finalWpm").innerText = wpm;
        document.getElementById("finalAccuracy").innerText = accuracy + "%";
        document.getElementById("finalMistakes").innerText = mistakes;
    }

    function resetGame() {
        loadParagraph();
        clearInterval(timer);
        timeLeft = maxTime;
        charIndex = mistakes = 0;
        isTyping = false;
        inputField.value = "";
        timerTag.innerText = timeLeft + "s";
        mistakeTag.innerText = 0;
        wpmTag.innerText = 0;
        accuracyTag.innerText = "100%";
        progressBar.style.width = "100%";
        resultOverlay.classList.remove("show");
        inputField.focus();
    }

    function shareResult() {
        const wpm = document.getElementById("finalWpm").innerText;
        const text = `I just hit ${wpm} WPM on Toolful! Can you beat my speed? Try it here: https://toolful.github.io/typing-speed-test`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Toolful Typing Speed Test',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback for desktop
            navigator.clipboard.writeText(text);
            alert("Result copied to clipboard!");
        }
    }

    // --- Event Listeners ---
    inputField.addEventListener("input", initTyping);
    restartBtn.addEventListener("click", resetGame);

    // Dark Mode Toggle
    themeBtn.addEventListener("click", () => {
        const body = document.body;
        const isDark = body.getAttribute("data-theme") === "dark";
        
        if (isDark) {
            body.setAttribute("data-theme", "light");
            themeBtn.innerText = "Dark Mode";
        } else {
            body.setAttribute("data-theme", "dark");
            themeBtn.innerText = "Light Mode";
        }
    });

    // Auto focus on load
    window.onload = () => {
        loadParagraph();
        inputField.focus();
    };

    // Keep focus
    document.addEventListener("click", () => {
        if(!resultOverlay.classList.contains("show")) {
            inputField.focus();
        }
    });