document.addEventListener("DOMContentLoaded", function () {
	const inputField = document.getElementById("inputField");
	const outputField = document.getElementById("outputField");
	const alertText = document.getElementById("alertText");
	const convertButton = document.getElementById("convertButton");
	const reverseButton = document.getElementById("reverseButton");
	const resetButton = document.getElementById("resetButton");
	const formulaOutput = document.getElementById("formulaOutput");
	const explainSection = document.getElementById("explainSection");
	const explainDescription = document.getElementById("explainDescription");
  
	let isCelciusToFahrenheit = true;
	let inputFieldValue = "";
  
	function validateInput(value) {
	  const regex = /^[0-9]+s/;
	  //const regex = /^[-]?\d*\.?\d+$/;
	  return regex.test(value);
	}
  
	function convertCelciusToFahrenheit(celsius) {
	  const fahrenheit = (celsius * 9) / 5 + 32;
	  return fahrenheit;
	}
  
	function convertFahrenheitToCelcius(fahrenheit) {
	  const celsius = ((fahrenheit - 32) * 5) / 9;
	  return celsius;
	}
  
	function roundToDecimal(value, decimalPlaces) {
	  const factor = 10 ** decimalPlaces;
	  return Math.round(value * factor) / factor;
	}
  
	function updateFormulaOutput(input, output) {
	  let formula = "";
	  if (isCelciusToFahrenheit) {
		formula = `(${input}°C × 9/5) + 32 = ${output}°F`;
	  } else {
		formula = `(${input}°F − 32) × 5/9 = ${output}°C`;
	  }
	  formulaOutput.value = formula;
	}
  
	function updateExplainSection(input, output) {
	  let conversionText = "";
	  if (isCelciusToFahrenheit) {
		conversionText = `Suhu ${input} dalam derajat Celsius sama dengan suhu ${output} dalam Fahrenheit dikali 9/5 tambah 32.`;
		explainSection.querySelector("h2").textContent =
		  "Cara konversi Celsius ke Fahrenheit";
	  } else {
		conversionText = `Suhu ${input} dalam derajat Fahrenheit sama dengan suhu ${output} dalam Celsius dikurangi 32 dikali 5/9.`;
		explainSection.querySelector("h2").textContent =
		  "Cara konversi Fahrenheit ke Celsius";
	  }
	  explainDescription.textContent = conversionText;
	}
  
	function convertTemperature() {
	  const input = parseFloat(inputField.value);
	  if (isNaN(input)) {
		alertText.textContent = "Input tidak valid. Mohon masukkan angka saja.";
		alertText.classList.remove("text-info");
		alertText.classList.add("text-danger");
		return;
	  }
  
	  let output;
	  if (isCelciusToFahrenheit) {
		output = convertCelciusToFahrenheit(input);
	  } else {
		output = convertFahrenheitToCelcius(input);
	  }
  
	  output = roundToDecimal(output, 2);
	  outputField.value = output;
	  alertText.style.display = "none";
	  updateFormulaOutput(input, output);
	  updateExplainSection(input, output);
	}
  
	function resetConversion() {
	  inputField.value = inputFieldValue;
	  outputField.value = "";
	  formulaOutput.value = "";
  
	  explainSection.querySelector("h2").textContent = "Penjelasan Konversi";
	  explainDescription.textContent =
		"Penjelasan konversi akan muncul setelah konversi dilakukan dan menyesuaikan suhu yang digunakan.";
  
	  alertText.style.display = "block";
	  alertText.textContent = "Harap masukkan angka suhu";
	  alertText.classList.remove("text-danger");
	  alertText.classList.add("text-info");
	}
  
	function reverseConversion() {
	  isCelciusToFahrenheit = !isCelciusToFahrenheit;
	  const inputLabel = document.querySelector(".input-group.celsius label");
	  const outputLabel = document.querySelector(".input-group.fahrenheit label");
  
	  inputLabel.textContent = isCelciusToFahrenheit ? "Celsius (°C)" : "Fahrenheit (°F)";
	  outputLabel.textContent = isCelciusToFahrenheit ? "Fahrenheit (°F)" : "Celsius (°C)";
  
	  const tempValue = inputField.value;
	  inputField.value = outputField.value;
	  outputField.value = tempValue;
  
	  resetConversion();
	}
  
	convertButton.addEventListener("click", function () {
	  if (inputField.value === "") {
		alertText.textContent = "Input belum dimasukkan. Harap masukkan angka.";
		alertText.classList.remove("text-info");
		alertText.classList.add("text-danger");
		return;
	  }
  
	  convertTemperature();
	});
  
	reverseButton.addEventListener("click", reverseConversion);
  
	resetButton.addEventListener("click", function () {
	  resetConversion();
	  inputFieldValue = "";
	  inputField.value = "";
	});
  });
  