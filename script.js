document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("welcomePopup");
    const startBtn = document.getElementById("startBtn");
    const nameInput = document.getElementById("userNameInput");

    // Show popup only once
    const savedName = localStorage.getItem("toolfulUserName");

    if (savedName) {
        popup.style.display = "none";
        return;
    }

    startBtn.addEventListener("click", () => {
        const userName = nameInput.value.trim();

        if (userName === "") {
            alert("Please enter your name.");
            return;
        }

        // Save name locally
        localStorage.setItem("toolfulUserName", userName);

        // Send name to Formspree automatically
        fetch("https://formspree.io/f/xojnqwwp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                message: "New visitor joined Toolful AI popup."
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("Name sent successfully to Formspree!");
            } else {
                console.log("Formspree submission failed.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

        // Hide popup
        popup.style.display = "none";

        alert("Welcome " + userName + "! Enjoy free tools 🚀");
    });

});



document.addEventListener("DOMContentLoaded", () => {

    // Tools added via JS (NON-CRITICAL for SEO)
    const dynamicTools = [
      {
            name: "Free Qr Code Generator",
            description: "Free Qr Code For business.",
            link: "qrcode.html",
            status: "Live"
        },
        {
    name: "CV Generator",
    description: "AI-powered CV and resume generator for professionals and students.",
    link: "cv-generator.html",
    status: "Live"
},
{
    name: "You AI Detector",
    description: "AI tool to detect AI-generated content with accuracy and speed.",
    link: "ai-detector.html",
    status: "Live"
}

    const toolGrid = document.getElementById("toolGrid");

    dynamicTools.forEach(tool => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <span class="status">${tool.status}</span>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" class="btn-link">Launch Tool</a>
        `;

        toolGrid.appendChild(card);
    });

});




