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
    "United States", "United Kingdom", "Canada",
    "Germany", "France", "India", "Australia",
    "Pakistan", "Brazil", "UAE", "Turkey", "Italy"
  ];

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function playNotificationSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {}
  }

  function createNotification() {

    const currentUser = localStorage.getItem("toolfulUserName");
    const name = currentUser || getRandom(randomNames);
    const country = getRandom(countries);

    const notification = document.createElement("div");
    notification.className = "live-notification";

    notification.innerHTML = `
      <div class="live-dot"></div>
      <div class="live-text">
        <strong>${name}</strong> from <strong>${country}</strong><br>
        is using this tool right now
      </div>
      <span class="close-btn">&times;</span>
    `;

    document.body.appendChild(notification);

    playNotificationSound();

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Auto hide after 6 sec
    const autoRemove = setTimeout(() => {
      removeNotification(notification);
    }, 6000);

    // Manual close
    notification.querySelector(".close-btn").addEventListener("click", () => {
      clearTimeout(autoRemove);
      removeNotification(notification);
    });
  }

  function removeNotification(notification) {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 400);
  }

  // First after 10 sec
  setTimeout(() => {
    createNotification();
    startRandomInterval();
  }, 10000);

  // Random 1–1.5 min
  function startRandomInterval() {
    const randomDelay = Math.floor(Math.random() * 30000) + 60000;

    setTimeout(() => {
      createNotification();
      startRandomInterval();
    }, randomDelay);
  }

});
