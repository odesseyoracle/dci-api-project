const countryInput = document.getElementById("country-input");
const output = document.getElementById("output");
const button = document.querySelector("button");
const main = document.querySelector("main");

button.addEventListener("click", searchCountry);

async function getCapital() {
  const country = countryInput.value;
  const url = `https://restcountries.com/v3.1/name/${country}`;

  const response = await fetch(url);
  const data = await response.json();

  const capital = data[0].capital;

  return capital[0];
}

async function searchCountry(e) {
  e.preventDefault();
  try {
    const url = `https://restcountries.com/v3.1/name/${countryInput.value}`;

    const response = await fetch(url);
    const data = await response.json();
    const country = data[0];
    console.log(country);

    const addedCountry = document.createElement("div");

    addedCountry.innerHTML = `<h2>${country.name.common} ${country.flag}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Region: ${country.region}</p>
    <p>Language : ${Object.values(country.languages)}</p>
    <p>Currency: ${Object.values(country.currencies)[0].name}</p>
    <p>Population: ${country.population.toLocaleString("de-DE")}</p>
    <a href="${country.maps.googleMaps}">Map</a>`;

    main.appendChild(addedCountry);
    await getWeather();
    //
  } catch (error) {
    console.log(error);
  }
}

async function getWeather() {
  try {
    const apiKey = "71f05fa9a67003870792a089b0de04e9";
    const cityInput = await getCapital();
    console.log(cityInput);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    const response = await fetch(weatherUrl);
    const data = await response.json();
    if (data.cod === "400") {
      throw data;
    }
    console.log(data);

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const addedWeather = document.createElement("div");
    addedWeather.classList.add("weather-box");

    addedWeather.innerHTML = `
    <img src="${iconUrl}">
    Tempratur in ${data.name}: ${data.main.temp} C, ${data.weather[0].description}
    `;

    main.appendChild(addedWeather);
  } catch (err) {
    console.log(err);
    document.getElementById("weather").textContent = err.message;
  }
}
