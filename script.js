document.addEventListener("DOMContentLoaded", function () {

  const popup = document.getElementById("welcomePopup");
  const startBtn = document.getElementById("startBtn");
  const nameInput = document.getElementById("userNameInput");

  const savedName = localStorage.getItem("toolfulUserName");

  if (savedName) {
    popup.style.display = "none";
  }

  startBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("toolfulUserName", name);
    popup.style.display = "none";
  });

});
