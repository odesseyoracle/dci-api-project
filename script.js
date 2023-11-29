const countryInput = document.getElementById("country-input");
const output = document.getElementById("output");
const button = document.querySelector("button");

button.addEventListener("click", searchCountry);

async function searchCountry(e) {
  e.preventDefault();
  try {
    const country = countryInput.value;
    const url = `https://restcountries.com/v3.1/name/${country}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    output.textContent = data[0].name.common;
  } catch {}
}
