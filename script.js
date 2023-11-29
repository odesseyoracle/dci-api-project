const countryInput = document.getElementById("country-input");
const output = document.getElementById("output");
const button = document.querySelector("button");

button.addEventListener("click", searchCountry);

async function searchCountry(e) {
  e.preventDefault();
  try {
    const country = countryInput.value;
    const url = `https://restcountries.com/v3.1/name/${country}`;

    const capital = data[0].capital;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    getWeather();

    output.innerHTML = `<h2>${data[0].name.common} ${data[0].flag}</h2>
    <p>Capital:<span id="capital"> ${data[0].capital}</span></p>
    <p>Region: ${data[0].region}</p>
    <p>Language : ${Object.values(data[0].languages)}</p>
    <p>Currency: ${Object.values(data[0].currencies)[0].name}</p>
    <p>Population: ${data[0].population.toLocaleString("de-DE")}</p>
    <a href="${data[0].maps.googleMaps}">Map</a>`;
    //
  } catch {}
}

async function getWeather() {
  try {
    const apiKey = "71f05fa9a67003870792a089b0de04e9";
    const cityInput = capital;
    console.log(cityInput);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    const response = await fetch(weatherUrl);
    const data = await response.json();
    if (data.cod === "400") {
      throw data;
    }
    console.log(data);

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const result = `
    <img src="${iconUrl}">
    Tempratur in ${data.name}: ${data.main.temp} C, ${data.weather[0].description}
    `;

    document.getElementById("weather").innerHTML = result;
  } catch (err) {
    console.log(err);
    document.getElementById("weather").textContent = err.message;
  }
}
