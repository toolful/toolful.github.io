document.addEventListener("DOMContentLoaded", () => {

  const popup = document.getElementById("welcomePopup");
  const startBtn = document.getElementById("startBtn");
  const nameInput = document.getElementById("userNameInput");

  const savedName = localStorage.getItem("toolfulUserName");

  if (savedName) {
    popup.style.display = "none";
  }

  startBtn.addEventListener("click", () => {

    const userName = nameInput.value.trim();

    if (!userName) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("toolfulUserName", userName);
    popup.style.display = "none";

    alert("Welcome " + userName + "! 🚀");

  });

});
