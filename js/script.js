
const WEATHER_CODES = {
  0: { label: "Ciel dégagé", icon: "☀️" },
  1: { label: "Plutôt dégagé", icon: "🌤️" },
  2: { label: "Partiellement nuageux", icon: "⛅" },
  3: { label: "Couvert", icon: "☁️" },
  45: { label: "Brouillard", icon: "🌫️" },
  48: { label: "Brouillard givrant", icon: "🌫️" },
  51: { label: "Bruine légère", icon: "🌦️" },
  53: { label: "Bruine", icon: "🌦️" },
  55: { label: "Bruine forte", icon: "🌦️" },
  56: { label: "Bruine verglaçante", icon: "🌧️" },
  57: { label: "Bruine verglaçante", icon: "🌧️" },
  61: { label: "Pluie légère", icon: "🌧️" },
  63: { label: "Pluie", icon: "🌧️" },
  65: { label: "Pluie forte", icon: "🌧️" },
  66: { label: "Pluie verglaçante", icon: "🌧️" },
  67: { label: "Pluie verglaçante", icon: "🌧️" },
  71: { label: "Neige légère", icon: "🌨️" },
  73: { label: "Neige", icon: "🌨️" },
  75: { label: "Neige forte", icon: "❄️" },
  77: { label: "Grains de neige", icon: "🌨️" },
  80: { label: "Averses légères", icon: "🌦️" },
  81: { label: "Averses", icon: "🌧️" },
  82: { label: "Averses violentes", icon: "⛈️" },
  85: { label: "Averses de neige", icon: "🌨️" },
  86: { label: "Fortes averses de neige", icon: "❄️" },
  95: { label: "Orage", icon: "⛈️" },
  96: { label: "Orage avec grêle", icon: "⛈️" },
  99: { label: "Orage avec forte grêle", icon: "⛈️" },
};




const url = "https://geocoding-api.open-meteo.com/v1/search?name=";

const form = document.getElementById("search-form")
const city = document.getElementById("city")
const messageErreur = document.getElementById("message-erreur")
const loading = document.getElementById("loading")
const card = document.getElementById("Weather-card")

// console.log(card);


async function getData(city) {
  try {
    const response = await fetch(`${url}${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const latitude = data.results[0].latitude
    console.log(latitude);
    const longitude = data.results[0].longitude
    console.log(longitude);
    //weather response
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=kmh`;
    const weatherResponse = await fetch(`${weatherUrl}`)
    if (!weatherResponse.ok) {
      throw new Error(`Weather status:${weatherResponse.status}`)
    }

    const weatherData = await weatherResponse.json()
    console.log(weatherData);
    const temperature = weatherData.current.temperature_2m
    console.log(temperature);
    const humidity = weatherData.current.relative_humidity_2m
    console.log(humidity);
    const weatherCode = weatherData.current.weather_code
    console.log(weatherCode);
    card.textContent = "";

    const weather = WEATHER_CODES[weatherCode]
    const description = document.createElement("p")
    description.textContent = `${weather.icon}  ${weather.label}`
    description.classList.add( "text-lg","mt-3")
    card.appendChild(description)
    const windSpeed = weatherData.current.wind_speed_10m
    console.log(windSpeed);
    const title = document.createElement("h1")
    title.textContent = 'Météo actuelle'
    title.classList.add("text-2xl", "font-bold", "text-center")
    card.appendChild(title)
    const parag = document.createElement("p")
    parag.textContent = `Temperature: ${temperature}°C`
    parag.classList.add("text-lg", "mt-3")
    card.appendChild(parag)
    const humid = document.createElement("p")
    humid.textContent = ` Humidité :${humidity}%`
    humid.classList.add("text-lg", "mt-3")
    card.appendChild(humid)
    const wind = document.createElement("p")
    wind.textContent = `Vitesse du vent:${windSpeed}km/h`
    wind.classList.add("text-lg", "mt-3")
    card.appendChild(wind)





  } catch (err) {
    console.error(err.message);
  }
  finally {
    loading.hidden = true
  }

}

form.addEventListener("submit", function (event) {
  event.preventDefault()
  const cityName = city.value.trim()
  if (cityName === "") {
    messageErreur.textContent = "entrer un ville"
    return
  }
  messageErreur.textContent = ""
  loading.hidden = false
  getData(cityName)

})