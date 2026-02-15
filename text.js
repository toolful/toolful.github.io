    const editor = document.getElementById('editor');
    const wCount = document.getElementById('w-count');
    const cCount = document.getElementById('c-count');
    const lCount = document.getElementById('l-count');
    const saveNotif = document.getElementById('save-notif');

    // LOAD DATA
    window.onload = () => {
        const savedText = localStorage.getItem('toolful_data');
        if (savedText) {
            editor.value = savedText;
            updateStats();
        }
        document.getElementById('user-count').textContent = Math.floor(Math.random() * (1450 - 800) + 800);
    };

    // LOGIC
    editor.addEventListener('input', () => {
        updateStats();
        localStorage.setItem('toolful_data', editor.value);
        showSave();
    });

    function updateStats() {
        const val = editor.value;
        cCount.textContent = val.length;
        wCount.textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
        lCount.textContent = val.split('\n').length;
    }

    function showSave() {
        saveNotif.style.display = 'block';
        setTimeout(() => { saveNotif.style.display = 'none'; }, 1500);
    }

    function downloadTxt() {
        const text = editor.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const a = document.createElement('a');
        a.download = 'toolful-note.txt';
        a.href = URL.createObjectURL(blob);
        a.click();
    }

    function copyText() {
        editor.select();
        document.execCommand('copy');
        alert('Copied to clipboard!');
    }

    function clearText() {
        if(confirm("Are you sure? This will delete your current work.")) {
            editor.value = '';
            updateStats();
            localStorage.removeItem('toolful_data');
        }
    }

    function printText() {
        window.print();
    }

    document.addEventListener("DOMContentLoaded", function () {
      const popup = document.getElementById("welcomePopup");
      const startBtn = document.getElementById("startBtn");
      const nameInput = document.getElementById("userNameInput");
      const savedName = localStorage.getItem("toolfulUserName");

      if (popup && savedName) { popup.style.display = "none"; }

      if (popup && startBtn && nameInput) {
        startBtn.addEventListener("click", function () {
          const name = nameInput.value.trim();
          if (!name) { alert("Please enter your name."); return; }
          localStorage.setItem("toolfulUserName", name);
          popup.style.display = "none";
        });
      }

      const randomNames = ["Ali", "John", "Emma", "Sophia", "Daniel", "Arslan", "Olivia", "Noah", "James", "Ava", "Lucas", "Isabella", "Ethan", "Mia", "Henry", "Zain", "Amelia", "Benjamin", "Hassan", "David"];
      const countries = ["United States", "United Kingdom", "Canada", "Germany", "France", "India", "Australia", "Pakistan", "Brazil", "UAE", "Turkey", "Italy"];

      function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

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
          oscillator.start(); oscillator.stop(audioContext.currentTime + 0.15);
        } catch (e) {}
      }

      function createNotification() {
        if (document.querySelector(".live-notification")) return;
        
        // MODIFIED: Now always selects a random name instead of using stored user name
        const name = getRandom(randomNames);
        const country = getRandom(countries);
        
        const notification = document.createElement("div");
        notification.className = "live-notification";
        notification.innerHTML = `<div class="live-dot"></div><div class="live-text"><strong>${name}</strong> from <strong>${country}</strong><br>is using this tool right now</div><span class="close-btn">&times;</span>`;
        document.body.appendChild(notification);
        playNotificationSound();
        setTimeout(() => { notification.classList.add("show"); }, 100);
        const autoRemove = setTimeout(() => { removeNotification(notification); }, 6000);
        notification.querySelector(".close-btn").addEventListener("click", () => { clearTimeout(autoRemove); removeNotification(notification); });
      }

      function removeNotification(notification) {
        notification.classList.remove("show");
        setTimeout(() => { notification.remove(); }, 400);
      }

      setTimeout(() => { createNotification(); startRandomInterval(); }, 10000);
      function startRandomInterval() {
        const randomDelay = Math.floor(Math.random() * 30000) + 60000;
        setTimeout(() => { createNotification(); startRandomInterval(); }, randomDelay);
      }
    });