
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
const forecastWeatre = document.getElementById("forecast-weather")
const Btn= document.getElementById("btn")
let lastCity=""

// console.log(card);


async function getData(city) {
  try {
    const response = await fetch(`${url}${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
   
    const data = await response.json();
    // console.log(data);
    if (!data.results || data.results.length === 0) {
        card.textContent = "";
        forecastWeatre.textContent = "";
      messageErreur.textContent = "Ville introuvable !"
      return
    }
    const latitude = data.results[0].latitude
    console.log(latitude);
    const longitude = data.results[0].longitude
    console.log(longitude);

    //weather response
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=kmh&daily=temperature_2m_min,temperature_2m_max,weather_code&forecast_days=14&timezone=auto`;
    const weatherResponse = await fetch(`${weatherUrl}`)
    if (!weatherResponse.ok) {
      throw new Error(`Weather status:${weatherResponse.status}`)
    }
    //throw new Error("Weather status: 429");
    //============Test temporaire===============================
//throw new Error("Weather status: 500");

    const weatherData = await weatherResponse.json()
    console.log(weatherData.daily);
    const daily = weatherData.daily
    const dates = daily.time
    const minTemp = daily.temperature_2m_min
    const maxTemp = daily.temperature_2m_max
    const codes = daily.weather_code
    const weatherObjet = dates.map((date, index) => {
      const dateFormated = new Date(date + "T12:00:00").toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long"

      })
      return {
        date: date,
        min: minTemp[index],
        max: maxTemp[index],
        code: codes[index],
        dateFormatted: dateFormated,

      }
    })
    console.log(weatherObjet);

    forecastWeatre.textContent = "";

    const forecastCards = weatherObjet.map((day) => {
      const forecastCard = document.createElement("div");

      forecastCard.classList.add(
        "bg-blue-100",
        "rounded-2xl",
        "shadow-lg",
        "p-5",
        "border",
        "border-gray-200",
        "text-center",
        "hover:shadow-xl",
        "transition",
        "duration-300"
      );
      const weather = WEATHER_CODES[day.code] || {
        icon: "🌡️",
        label: "Donnée indisponible"
      };
      const description = document.createElement("p")

      description.textContent = `${weather.icon}  ${weather.label}`
      description.classList.add("text-lg", "mt-3");
      forecastCard.appendChild(description)
      const date = document.createElement("p")
      date.textContent = `Day:${day.dateFormatted}`
      date.classList.add("text-lg", "font-bold")
      forecastCard.appendChild(date)
      const min = document.createElement("p")
      min.textContent = `Min: ${day.min !== null && day.min !== undefined
        ? day.min + "°C"
        : "Donnée indisponible"
        }`;
      min.classList.add("text-lg", "font-bold")
      forecastCard.appendChild(min)
      const max = document.createElement("p")
      max.textContent = `Max: ${day.max !== null && day.max !== undefined
        ? day.max + "°C"
        : "Donnée indisponible"
        }`;
      max.classList.add("text-lg", "font-bold")
      forecastCard.appendChild(max)


      return forecastCard;
    });
    forecastCards.forEach(forecastCard => {
      forecastWeatre.appendChild(forecastCard)

    });


    //Meteo actuelle
    const temperature = weatherData.current.temperature_2m
    console.log(temperature);
    const humidity = weatherData.current.relative_humidity_2m
    console.log(humidity);
    const weatherCode = weatherData.current.weather_code
    console.log(weatherCode);
    card.textContent = "";


    const ville = document.createElement("h1")
    ville.textContent = `${city}`
    ville.classList.add("text-2xl", "font-bold", "text-center")
    card.appendChild(ville)
    const weather = WEATHER_CODES[weatherCode] || {
      icon: "🌡️",
      label: "Donnée indisponible"
    };
    const description = document.createElement("p")
    description.textContent = `${weather.icon}  ${weather.label}`
    description.classList.add("text-lg", "mt-3")
    card.appendChild(description)
    const windSpeed = weatherData.current.wind_speed_10m
    console.log(windSpeed);
    const title = document.createElement("h5")
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
    if(err.message.includes("429")){
      messageErreur.textContent =
  "Limite de requêtes atteinte. Réessayez plus tard"
      
    }else if (err.message.includes("fetch")){
      messageErreur.textContent="Problème de connexion. Vérifiez votre réseau."
    }
    else{
      messageErreur.textContent="Le service météo est indisponible. Réessayez plus tard"
    }
    Btn.hidden=false
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
  lastCity=cityName
  messageErreur.textContent = ""
  Btn.hidden=true
  loading.hidden = false
  getData(cityName)

})
Btn.addEventListener("click",function(){
  messageErreur.textContent=""
  Btn.hidden=true
  loading.hidden=false
  getData(lastCity)
})