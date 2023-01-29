let submitButton = $('#submit-btn');
let city = $('#city');
let place = $('#input-city');
let currentTemp = $('#current-temp');
let currentWind = $('#current-wind');
let currentHumidity = $('#current-humidity');

let weatherUrl;
let locationUrl;
let lan;
let lon;
let day;

submitButton.on('click', function(event) {
    place = $('#input-city').val();
    console.log(place);
    getLocationUrl();
})



function getLocationUrl() {

    locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + place + '&limit=10&appid=2ca1c9e6889192710f3b59dc0b31f2bf';
    console.log(locationUrl);

    fetch(locationUrl)
        .then(function (locationResponse) {
            return locationResponse.json();
        })
        .then(function (locationData) {
            console.log(locationData);

            lat = locationData[0].lat;
            lon = locationData[0].lon;
            console.log(lat);
            console.log(lon);
            getCurrentWeatherUrl();
            getWeatherUrl();
        })
}

function getCurrentWeatherUrl() {

    currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2ca1c9e6889192710f3b59dc0b31f2bf';
    console.log(currentWeatherUrl);

    fetch(currentWeatherUrl)
        .then(function (currentWeatherResponse) {
            return currentWeatherResponse.json();
        })
        .then(function (currentWeatherData) {
            console.log(currentWeatherData);
            $('#city').text(currentWeatherData.name); 
            console.log(currentWeatherData.name);
            let weatherIcon = "http://openweathermap.org/img/w/" + currentWeatherData.weather[0].icon + ".png";
            $('#icon').attr('src', weatherIcon);
            console.log(currentWeatherData.weather[0].icon);
            $('#current-temp').text(currentWeatherData.main.temp);
            console.log(currentWeatherData.main.temp);
            $('#current-wind').text(currentWeatherData.wind.speed);
            console.log(currentWeatherData.wind.speed);
            $('#current-humidity').text(currentWeatherData.main.humidity)
            console.log(currentWeatherData.main.humidity);

            
        })
}


function getWeatherUrl() {

    console.log(lat);
    console.log(lon);

   
    weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2ca1c9e6889192710f3b59dc0b31f2bf';
    console.log(weatherUrl);



    fetch(weatherUrl)
        .then(function (weatherResponse) {
            return weatherResponse.json();
        })
        .then(function (weatherData) {

            console.log(weatherData);
            
            days = weatherData.list;
            console.log(days);
            renderForcast()


        });
}

function renderForcast() {
    for (let i = 0; i < days.length;) {
        console.log(i);
        console.log(days[i]);
        i = i + 8;
    }
}