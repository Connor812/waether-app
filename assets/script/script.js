let weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=2ca1c9e6889192710f3b59dc0b31f2bf';



fetch(weatherUrl)
.then(function (response) {
return response.json();
})
.then(function (data) {

    console.log(data);
});