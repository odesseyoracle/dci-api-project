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

    output.innerHTML = `<h2>${data[0].name.common} ${data[0].flag}</h2>
    <p>Capital: ${data[0].capital}</p>
    <p>Region: ${data[0].region}</p>
    <p>Language : ${Object.values(data[0].languages)}</p>
    <p>Currency: ${Object.values(data[0].currencies)[0].name}</p>
    <p>Population: ${data[0].population.toLocaleString("de-DE")}</p>
    <a href="${data[0].maps.googleMaps}">Map</a>`;
    //
  } catch {}
}
