// Variablen & Eventlistener

const countryInput = document.getElementById("country-input");
const output = document.getElementById("output");
const button = document.querySelector("button");
const main = document.querySelector("main");
const countryPosts = JSON.parse(localStorage.getItem("country")) || [];

button.addEventListener("click", searchCountry);

// SEARCH COUNTRY UND GET WEATHER FUNKTIONEN

async function searchCountry(e) {
  e.preventDefault();

  try {
    // FETCH

    const url = `https://restcountries.com/v3.1/name/${countryInput.value}`;

    const response = await fetch(url);
    const data = await response.json();
    const country = data[0];
    console.log(country);

    //DIV WIRD ERSTELLT   &  AN ANFANG VON MAIN GESETZT

    const addedCountry = document.createElement("div");

    addedCountry.innerHTML = `<h2>${country.name.common} ${country.flag}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Region: ${country.region}</p>
    <p>Language : ${Object.values(country.languages)}</p>
    <p>Currency: ${Object.values(country.currencies)[0].name}</p>
    <p>Population: ${country.population.toLocaleString("de-DE")}</p>
    <a href="${
      country.maps.googleMaps
    }" target="blank" >Click here for Map</a>`;

    await getWeather(country.capital, addedCountry);

    main.prepend(addedCountry);

    // ARRAY MIT COUNTRIES WIRD ERSTELLT UND IN LOCAL STORAGE GESPEICHERT

    countryPosts.push({
      name: country.name.common,
      flag: country.flag,
      capital: country.capital,
      region: country.region,
      language: Object.values(country.languages),
      currency: Object.values(country.currencies)[0].name,
      population: country.population.toLocaleString("de-DE"),
      map: country.maps.googleMaps,
    });

    localStorage.setItem("country", JSON.stringify(countryPosts));

    console.log(JSON.parse(localStorage.getItem("country")));
    //
  } catch (error) {
    console.log(error);
  }
}

async function getWeather(city, container) {
  try {
    // FETCH
    const apiKey = "71f05fa9a67003870792a089b0de04e9";

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(weatherUrl);
    const data = await response.json();
    if (data.cod === "400") {
      throw data;
    }
    console.log(data);

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // INNER HTML WIRD ERSTELLT

    container.innerHTML += `
    <img src="${iconUrl}">
    Tempratur in ${data.name}: ${parseInt(data.main.temp)} C, ${
      data.weather[0].description
    }
    `;

    container.classList.add("weather-box");

    main.prepend(container);
  } catch (err) {
    console.log(err);
    document.querySelector("main").textContent = err.message;
  }
}

// LOCAL STORAGE

function getLocalStorage() {
  // COUNTRY POSTS ARRAY WIRD IN DOM UMGEWANDELT
  countryPosts.map((country) => {
    console.log(country);
    const addedCountry = document.createElement("div");
    addedCountry.innerHTML += `<h2>${country.name} ${country.flag}</h2>
      <p>Capital: ${country.capital}</p>
      <p>Region: ${country.region}</p>
      <p>Language : ${country.language}</p>
      <p>Currency: ${country.currency}</p>
      <p>Population: ${country.population}</p>
      <a href="${country.map}" target="blank" >Click here for Map</a>`;

    getWeather(country.capital, addedCountry);
    main.appendChild(addedCountry);
  });
}

window.addEventListener("DOMContentLoaded", getLocalStorage);
