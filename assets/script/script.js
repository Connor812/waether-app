let submitButton = $('#submit-btn');
let city = $('#city');
let place = $('#input-city');
let currentTemp = $('#current-temp');
let currentWind = $('#current-wind');
let currentHumidity = $('#current-humidity');
let list = $('#saved-cities');
let places = [];
let savedButton
let savedCities;
let weatherUrl;
let locationUrl;
let lan;
let lon;
let day;
let getCurrentDate = dayjs();
let currentDate = getCurrentDate.format(`(M/D/YYYY)`);
let getForcastDate;
let forcastDate;
console.log(getCurrentDate);
// forcastDate = getForecastDate.add(1, 'day');
console.log(forcastDate);

init();

submitButton.on('click', function (event) {
    place = $('#input-city').val();
    if (place == '') {
        return
    }
    places.push(place);
    savedButton = `<div id="${place}"><button data-language="${place}" class="btn btn-primary form-control m-1 mt-2">${place}</button></div>`
    $('#saved-cities').append(savedButton);
    localStorage.setItem('places', JSON.stringify(places));
    $('#input-city').val('');
    getLocationUrl();
})

list.on('click', function (event) {
    place = event.target.getAttribute('data-language');
    console.log(place);
    getLocationUrl();
})

function init() {
    $('#show-weather').addClass('hide');
    savedCities = JSON.parse(localStorage.getItem('places'));
    if (savedCities == null) {
        places = [];
    } else {
        places = savedCities;
        if (savedCities.length > 0) {
            for (let l = 0; l < savedCities.length; l++) {
                savedButton = `<div><button data-language="${savedCities[l]}" class="btn btn-primary form-control m-1 mt-2">${savedCities[l]}</button></div>`
                $('#saved-cities').append(savedButton);
            }
        }
    }
    console.log(savedCities);

}

function getLocationUrl() {
    $('#show-weather').removeClass('hide');
    locationUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + place + '&limit=10&appid=2ca1c9e6889192710f3b59dc0b31f2bf';
    console.log(locationUrl);

    fetch(locationUrl)
        .then(function (locationResponse) {
            return locationResponse.json();
        })
        .then(function (locationData) {
            console.log(locationData.length);
            if (locationData == 0 || locationData == undefined) {
                deleteButton = document.getElementById(place);
                deleteButton.remove();
                savedCities = JSON.parse(localStorage.getItem('places'));
                savedCitiesReturn = savedCities.filter(item => item !== place);
                newPlaces = places.filter(item => item !== place);
                places = newPlaces;
                localStorage.setItem('places', JSON.stringify(savedCitiesReturn));
                alert("Invalid city please try again");
                return;
            }
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
            $('#city').text(currentWeatherData.name + currentDate);
            let weatherIcon = "https://openweathermap.org/img/w/" + currentWeatherData.weather[0].icon + ".png";
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
    let d = 1;
    for (let i = 1; i < days.length;) {
        getForecastDate = dayjs();
        forcastDate = getForecastDate.add(d, 'day');
        forcastDate = forcastDate.format('M/D/YYYY');


        $('#day' + i).text(forcastDate);
        let iconUrl = "https://openweathermap.org/img/w/" + days[i].weather[0].icon + ".png";
        console.log(iconUrl);
        $('#forcast-icon' + i).attr('src', iconUrl);
        $('#forcast-temp' + i).text(`Temp: ${days[i].main.temp}°F`);
        $('#forcast-wind' + i).text(`Wind: ${days[i].wind.speed} MPH`);
        $('#forcast-humidity' + i).text(`Humidity: ${days[i].main.humidity}%`);
        console.log(days[i].main.humidity);
        console.log(i);
        console.log(days[i]);
        i = i + 8;
        d = d + 1;
    }
}