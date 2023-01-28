place = prompt("Enter location: ");;
let weatherUrl;
let locationUrl;
let lan;
let lon;
let day;
getLocationUrl();
console.log(place);




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
            getWeatherUrl();
        })
}


function getWeatherUrl() {

    console.log(lat);
    console.log(lon);

   
    weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=2ca1c9e6889192710f3b59dc0b31f2bf';
    console.log(weatherUrl);



    fetch(weatherUrl)
        .then(function (weatherResponse) {
            return weatherResponse.json();
        })
        .then(function (weatherData) {

            console.log(weatherData);
            
            day = weatherData.list;
            console.log(day);
            renderForcast()


        });
}

function renderForcast() {
    for (let i = 0; i < day.length;) {
        console.log(i);
        console.log(day[i]);
        i = i + 8;
    }
}