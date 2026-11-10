const url = "https://geocoding-api.open-meteo.com/v1/search?name=";

const form = document.getElementById("search-form")
const city = document.getElementById("city")
const messageErreur = document.getElementById("message-erreur")
const loading = document.getElementById("loading")

async function getData(city) {
  try {
    const response = await fetch(`${url}${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
  finally{
    loading.hidden=true
  }

}

form.addEventListener("submit", function (event) {
  event.preventDefault()
  const cityName = city.value.trim()
  if (cityName === "") {
    messageErreur.textContent = "entrer un ville"
    return
  }
  messageErreur.textContent=""
  loading.hidden=false
  getData(cityName)

})
