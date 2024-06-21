const searchElement = document.getElementById("searchInput");
const weatherTemperature = document.getElementById("weather-Temperature");
const weatherInfo = document.getElementById("weather-Info");
const cardWindinformation = document.getElementById("card-Wind-information");
const cardHumidityInformation = document.getElementById("card-Humidity-information");
const cardPressureinformation = document.getElementById("card-Pressure-information");
const imageElement = document.getElementById("image-Element");
const locationName = document.getElementById("location-Name");
async function getWeatherinformation() {
    try {
        const locationCoordinates = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((resolve));
        })
        const latitude = locationCoordinates.coords.latitude;
        const longitude = locationCoordinates.coords.longitude;

        const fetchWeatherinformation = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=487982cd3e6cb89608a90058e36bb7e4&units=metric`)
        const responseInformation = await fetchWeatherinformation.json();
        const temperature = responseInformation.main.temp.toFixed(0);
        const temperatureInformation = responseInformation.weather[0].main;
        const windInformation = responseInformation.wind.speed;
        const humidityInformation = responseInformation.main.humidity;
        const pressureInformation = responseInformation.main.pressure;
        const iconCode = responseInformation.weather[0].icon;
        const locationNameValue = responseInformation.name;
        weatherTemperature.innerText = `Temperature : ${temperature} °C`;
        weatherInfo.innerText = temperatureInformation;
        locationName.innerText = locationNameValue;
        cardWindinformation.innerText = `Wind Speed : ${windInformation} km/h`;
        cardHumidityInformation.innerText = `Humidity : ${humidityInformation} %`;
        cardPressureinformation.innerText = `Pressure : ${pressureInformation} hPa`;
        imageElement.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    } catch (error) {
        alert(error);
    }
}

async function getWeatherinformationBasedonCity(event) {
    event.preventDefault();
    try {
        const cityName = searchElement.value;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=487982cd3e6cb89608a90058e36bb7e4&units=metric`);
        const apiCallresponse = await response.json();
        console.log(apiCallresponse);
        const cityLocationname = apiCallresponse.name;
        const cityLocationtemperature = apiCallresponse.main.temp;
        const cityLocationweatherInfo = apiCallresponse.weather[0].main;
        const cityLocationhumidity = apiCallresponse.main.humidity;
        const cityLocationwind = apiCallresponse.wind.speed;
        const cityLocationpressure = apiCallresponse.main.pressure;
        const imageCode = apiCallresponse.weather[0].icon;
        imageElement.src = `https://openweathermap.org/img/wn/${imageCode}@4x.png`;
        weatherTemperature.innerText = `Temperature : ${cityLocationtemperature} °C`;
        weatherInfo.innerText = cityLocationweatherInfo;
        locationName.innerText = cityLocationname;
        cardHumidityInformation.innerText = `Humidity : ${cityLocationhumidity} %`;
        cardWindinformation.innerText = `Wind Speed : ${cityLocationwind} km/h`;
        cardPressureinformation.innerText = `Pressure : ${cityLocationpressure} hPa`;
        console.log(cityLocationname);
        console.log(cityLocationtemperature);
        console.log(cityLocationweatherInfo);
        console.log(cityLocationhumidity);
        console.log(cityLocationwind);
        console.log(cityLocationpressure);
    } catch (error) {
        alert(error);
    }
}

getWeatherinformation();
