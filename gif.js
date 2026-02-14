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
