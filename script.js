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


document.addEventListener("DOMContentLoaded", function () {

  const savedName = localStorage.getItem("toolfulUserName");

  const randomNames = [
    "Ali", "John", "Emma", "Sophia", "Daniel",
    "Arslan", "Olivia", "Noah", "James", "Ava",
    "Lucas", "Isabella", "Ethan", "Mia", "Henry",
    "Zain", "Amelia", "Benjamin", "Hassan", "David"
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "France",
    "India",
    "Australia",
    "Pakistan",
    "Brazil",
    "UAE",
    "Turkey",
    "Italy"
  ];

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function createNotification() {

    const name = savedName || getRandom(randomNames);
    const country = getRandom(countries);

    const notification = document.createElement("div");
    notification.className = "live-notification";

    notification.innerHTML = `
      <div class="live-dot"></div>
      <div class="live-text">
        <strong>${name}</strong> from <strong>${country}</strong><br>
        is using this tool right now
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 6000);
  }

  // First popup after 8 seconds
  setTimeout(createNotification, 8000);

  // Repeat every 2 minutes
  setInterval(createNotification, 120000);

});

