document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("welcomePopup");
    const startBtn = document.getElementById("startBtn");
    const nameInput = document.getElementById("userNameInput");
    const closeBtn = document.getElementById("closePopup");

    const savedName = localStorage.getItem("toolfulUserName");

    if (savedName) {
        popup.style.display = "none";
    }

    startBtn.addEventListener("click", () => {
        const userName = nameInput.value.trim();

        if (userName === "") {
            alert("Please enter your name.");
            return;
        }

        localStorage.setItem("toolfulUserName", userName);

        fetch("https://formspree.io/f/xojnqwwp", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                message: "New visitor joined Toolful AI popup."
            })
        });

        popup.style.display = "none";
        alert("Welcome " + userName + "! Enjoy free tools 🚀");
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

});
