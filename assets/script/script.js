let submitButton = $('#submit-btn');
let city = $('#city');
let place = $('#input-city');
let currentTemp = $('#current-temp');
let currentWind = $('#current-wind');
let currentHumidity = $('#current-humidity');
let list = $('#saved-cities');
let places = [];
let savedCities;
let weatherUrl;
let locationUrl;
let lan;
let lon;
let day;

submitButton.on('click', function(event) {
    place = $('#input-city').val();
    places.push(place);
    localStorage.setItem('places', JSON.stringify(places));
    getLocationUrl();
})

function init() {
    savedCities = JSON.parse(localStorage.getItem('places'));
    console.log(savedCities);
    
    for (let l = 0; l < savedCities.length; l++) {
        let savedButton = `<div><button class=" btn btn-primary form-control m-1 mt-2">${savedCities[l]}</button></div>`
        $('#saved-cities').append(savedButton);
    }
}

init();



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
            let weatherIcon = "http://openweathermap.org/img/w/" + currentWeatherData.weather[0].icon + ".png";
            $('#icon').attr('src', weatherIcon);
            $('#current-temp').text(currentWeatherData.main.temp + "°F");
            $('#current-wind').text(currentWeatherData.wind.speed + " MPH");
            $('#current-humidity').text(currentWeatherData.main.humidity + "%");            
        
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





    for (let i = 1; i < days.length;) {
       
    $('#day' + i).text(days[i].dt_txt);
    let iconUrl = "http://openweathermap.org/img/w/" + days[i].weather[0].icon + ".png";
    console.log(iconUrl);
    $('#forcast-icon' + i).attr('src', iconUrl);
    $('#forcast-temp' + i).text(`Temp: ${days[i].main.temp}°F`);
    $('#forcast-wind' + i).text(`Wind: ${days[i].wind.speed} MPH`);
    $('#forcast-humidity' + i).text(`Humidity: ${days[i].main.humidity}%`);
        console.log(days[i].main.humidity);
        console.log(i);
        console.log(days[i]);
        i = i + 8;
    }
}