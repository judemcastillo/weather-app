import "./styles.css";

const gif_API_Key = "juVtkeFEOYt3I3Oblap6epx0ZSOzeTJV";
const weather_API_Key = "F9XSPRADAS7KVJ9A7RSD939RL";
const submit = document.querySelector("#submit");

submit.addEventListener("click", async (e) => {
	e.preventDefault();
	const location = document.querySelector("#location").value.trim();
	if (!location) {
		alert("Please enter a location");
		return;
	}
	try {
		const weatherResponse = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${weather_API_Key}&contentType=json`,
			{ mode: "cors" }
		);
		if (!weatherResponse.ok) {
			throw new Error(`Weather API error: ${weatherResponse.status}`);
		}

		const data = await weatherResponse.json();
		console.log(data);
		displayWeather(data);
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
});

const weatherResponse = await fetch(
	`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/iligan?unitGroup=us&key=${weather_API_Key}&contentType=json`,
	{ mode: "cors" }
);
if (!weatherResponse.ok) {
	throw new Error(`Weather API error: ${weatherResponse.status}`);
}

const data = await weatherResponse.json();
console.log(data);
displayWeather(data);

function displayWeather(data) {
	const weatherContainer = document.querySelector("#weatherContainer");
	weatherContainer.innerHTML = ""; // Clear previous content
	const weatherCard = document.createElement("div");
	weatherCard.classList.add("weather-card");
	weatherCard.innerHTML = `      
        <div>${data.resolvedAddress}| ${data.currentConditions.conditions}</div>
        <div class="current-conditions">
            <p>Temperature: ${data.currentConditions.temp}°F</p>            
            <p>Humidity: ${data.currentConditions.humidity}%</p>
            <p>Wind Speed: ${data.currentConditions.windspeed} mph</p>
        </div>       
    `;
	weatherContainer.appendChild(weatherCard);
}
