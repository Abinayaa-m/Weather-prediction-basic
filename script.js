document.getElementById("searchBtn").addEventListener("click", function () {
    const apiKey = "39143f269ddfc7ee70da94dd498bc65d"; // Replace with your OpenWeather API key
    const city = document.getElementById("city").value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Full API Response:", data);

            if (data.cod !== 200) {
                showError("City not found. Please try again.");
                return;
            }

            updateWeatherUI(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            showError("Something went wrong. Please try again.");
        });
});

function updateWeatherUI(data) {
    document.getElementById("city-name").innerText = data.name;
    document.getElementById("temperature").innerText = `${data.main.temp}°C`;
    document.getElementById("weather-condition").innerText = data.weather[0].description;
    document.getElementById("wind-speed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById("weather-icon").alt = "Weather Icon";

    document.getElementById("weather-info").classList.remove("hidden");
    document.getElementById("error-message").classList.add("hidden");
}

function showError(message) {
    document.getElementById("error-message").innerText = message;
    document.getElementById("error-message").classList.remove("hidden");
    document.getElementById("weather-info").classList.add("hidden");
}
