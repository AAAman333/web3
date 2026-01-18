 document.addEventListener("DOMContentLoaded", () => {
    const weatherInfo = document.getElementById("weather-info");
    const weatherTip = document.getElementById("weather-tip");
    const catFactContainer = document.getElementById("cat-fact");
    const ourCatFactContainer = document.getElementById("our-cat-fact");

    const getWeatherTip = (temp) => {
      if (temp <= 0) return "❄️ It's freezing! Cover your flowers to protect them.";
      if (temp <= 10) return "🌱 It's chilly. Keep an eye on soil moisture and avoid drafts.";
      return "🌸 Good weather for your plants! Make sure to water them well.";
    };

    const ourCatFact = "🐾 Cats love cozy spots near flowers, but always keep toxic plants out of reach!";

    const displayWeather = (data) => {
      const temp = Math.round(data.temperature);
      const feelsLike = Math.round(data.feels_like);
      const description = data.description;
      const wind = data.wind_speed;
      const rain = data.rain_3h ?? 0;

      weatherInfo.innerHTML = `
        <span class="temp">🌡 ${temp}°C (feels like ${feelsLike}°C)</span><br>
        <span class="desc">☁ ${description}</span><br>
        <span class="details">💨 Wind: ${wind} m/s | 🌧 Rain (3h): ${rain} mm</span>
      `;
      weatherTip.textContent = getWeatherTip(temp);
    };

    fetch("/weather")
      .then(res => res.json())
      .then(displayWeather)
      .catch(err => {
        console.error("Weather fetch error:", err);
        weatherInfo.textContent = "Weather unavailable 🌧";
        weatherTip.textContent = "Unable to provide weather tips.";
      });

    fetch("/random-fact")
      .then(res => res.json())
      .then(data => {
        catFactContainer.textContent = data.fact;
        ourCatFactContainer.textContent = ourCatFact;
      })
      .catch(err => {
        console.error("Cat fact fetch error:", err);
        catFactContainer.textContent = "Cat fact unavailable 😺";
        ourCatFactContainer.textContent = ourCatFact;
      });
  });