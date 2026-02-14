const data = {
  length: {
    units: ["Meters", "Feet", "Inches", "Kilometers", "Miles"],
    rates: {
      Meters: 1,
      Feet: 3.28084,
      Inches: 39.3701,
      Kilometers: 0.001,
      Miles: 0.000621371
    }
  },

  weight: {
    units: ["Kilograms", "Pounds", "Grams", "Ounces"],
    rates: {
      Kilograms: 1,
      Pounds: 2.20462,
      Grams: 1000,
      Ounces: 35.274
    }
  },

  temp: {
    units: ["Celsius", "Fahrenheit", "Kelvin"]
  }
};

// Elements
const category = document.getElementById("category");
const unitFrom = document.getElementById("unitFrom");
const unitTo = document.getElementById("unitTo");
const inputValue = document.getElementById("inputValue");
const outputValue = document.getElementById("outputValue");

// Update dropdown units
function updateUnits() {
  const cat = category.value;

  unitFrom.innerHTML = "";
  unitTo.innerHTML = "";

  data[cat].units.forEach(unit => {
    unitFrom.add(new Option(unit, unit));
    unitTo.add(new Option(unit, unit));
  });

  unitTo.selectedIndex = 1;
  convert();
}

// Convert values
function convert() {
  const cat = category.value;
  const val = parseFloat(inputValue.value);

  if (isNaN(val)) {
    outputValue.value = "";
    return;
  }

  const from = unitFrom.value;
  const to = unitTo.value;

  // Temperature conversion
  if (cat === "temp") {
    let celsius;

    if (from === "Celsius") celsius = val;
    else if (from === "Fahrenheit") celsius = (val - 32) * 5 / 9;
    else celsius = val - 273.15;

    let result;
    if (to === "Celsius") result = celsius;
    else if (to === "Fahrenheit") result = (celsius * 9 / 5) + 32;
    else result = celsius + 273.15;

    outputValue.value = result.toFixed(2);
  }

  // Length & Weight conversion
  else {
    const base = val / data[cat].rates[from];
    const result = base * data[cat].rates[to];
    outputValue.value = result.toFixed(4);
  }
}

// Event Listeners
category.addEventListener("change", updateUnits);
unitFrom.addEventListener("change", convert);
unitTo.addEventListener("change", convert);
inputValue.addEventListener("input", convert);

// Initialize
updateUnits();

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     WELCOME POPUP (ONLY WORKS IF EXISTS)
  ========================================== */

  const popup = document.getElementById("welcomePopup");
  const startBtn = document.getElementById("startBtn");
  const nameInput = document.getElementById("userNameInput");

  const savedName = localStorage.getItem("toolfulUserName");

  // Hide popup if name already saved
  if (popup && savedName) {
    popup.style.display = "none";
  }

  // Save name when button clicked
  if (popup && startBtn && nameInput) {
    startBtn.addEventListener("click", function () {
      const name = nameInput.value.trim();

      if (!name) {
        alert("Please enter your name.");
        return;
      }

      localStorage.setItem("toolfulUserName", name);
      popup.style.display = "none";
    });
  }


  const data = {

length: {
units: ["Meters", "Kilometers", "Feet", "Miles"],
rates: {
Meters: 1,
Kilometers: 0.001,
Feet: 3.28084,
Miles: 0.000621371
}
},

weight: {
units: ["Kilograms", "Grams", "Pounds", "Ounces"],
rates: {
Kilograms: 1,
Grams: 1000,
Pounds: 2.20462,
Ounces: 35.274
}
},

area: {
units: ["Square Meters", "Square Kilometers", "Square Feet", "Acres"],
rates: {
"Square Meters": 1,
"Square Kilometers": 0.000001,
"Square Feet": 10.7639,
"Acres": 0.000247105
}
},

speed: {
units: ["Meters/second", "Kilometers/hour", "Miles/hour", "Knots"],
rates: {
"Meters/second": 1,
"Kilometers/hour": 3.6,
"Miles/hour": 2.23694,
"Knots": 1.94384
}
},

volume: {
units: ["Liters", "Milliliters", "Gallons", "Pints"],
rates: {
Liters: 1,
Milliliters: 1000,
Gallons: 0.264172,
Pints: 2.11338
}
},

temp: {
units: ["Celsius", "Fahrenheit", "Kelvin"]
}

};

const category = document.getElementById("category");
const unitFrom = document.getElementById("unitFrom");
const unitTo = document.getElementById("unitTo");
const inputValue = document.getElementById("inputValue");
const outputValue = document.getElementById("outputValue");

function updateUnits() {
const cat = category.value;
unitFrom.innerHTML = "";
unitTo.innerHTML = "";

data[cat].units.forEach(unit => {
unitFrom.add(new Option(unit, unit));
unitTo.add(new Option(unit, unit));
});

unitTo.selectedIndex = 1;
convert();
}

function convert() {
const cat = category.value;
const val = parseFloat(inputValue.value);

if (isNaN(val)) {
outputValue.value = "";
return;
}

const from = unitFrom.value;
const to = unitTo.value;

if (cat === "temp") {
let celsius;

if (from === "Celsius") celsius = val;
else if (from === "Fahrenheit") celsius = (val - 32) * 5/9;
else celsius = val - 273.15;

let result;

if (to === "Celsius") result = celsius;
else if (to === "Fahrenheit") result = (celsius * 9/5) + 32;
else result = celsius + 273.15;

outputValue.value = result.toFixed(2);
} else {
const base = val / data[cat].rates[from];
const result = base * data[cat].rates[to];
outputValue.value = result.toFixed(4);
}
}

category.addEventListener("change", updateUnits);
unitFrom.addEventListener("change", convert);
unitTo.addEventListener("change", convert);
inputValue.addEventListener("input", convert);

updateUnits();



  /* =========================================
     LIVE NOTIFICATION SYSTEM (ALL PAGES)
  ========================================== */

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

  // 🔊 Soft Notification Sound
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

    // Prevent multiple at same time
    if (document.querySelector(".live-notification")) return;

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

    const autoRemove = setTimeout(() => {
      removeNotification(notification);
    }, 6000);

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

  // First notification after 10 seconds
  setTimeout(() => {
    createNotification();
    startRandomInterval();
  }, 10000);

  // Random interval between 1 – 1.5 minutes
  function startRandomInterval() {
    const randomDelay = Math.floor(Math.random() * 30000) + 60000;

    setTimeout(() => {
      createNotification();
      startRandomInterval();
    }, randomDelay);
  }

});



