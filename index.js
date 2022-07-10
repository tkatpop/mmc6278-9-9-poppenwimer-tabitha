//Endpoint URL
var weatherURL = "https://api.openweathermap.org/data/2.5/weather"

//Call items from HTML page
var weatherApp = document.getElementById('weather-app')
var weatherInfo = document.getElementById('weather')
var form = document.querySelector('form')
var weatherSearch = document.getElementById('weather-search')

//Input Submit
form.onsubmit = function(e) {
    e.preventDefault()

    //Define Input Value 
    var inputValue = weatherSearch.value

    //Fetch Information from OpenWeather
    var queryString = "?units=imperial&appid=c9c200ce14c43853eabac39aa7af9892&q=" + inputValue
    var fetchURL = weatherURL + queryString
    if (!inputValue) return
    fetch(fetchURL)

    //Location not found Error
    .then(function(res){
        if (res.status !== 200) throw new Error('Location Not Found')
        return res.json()
    })

    //Show Weather Information
    .then(showWeather)

    //If error is found
    .catch(function(err){
        weatherInfo.innerHTML = err.message
        weatherSearch.value = ""
    })
}

function showWeather(weather){
    console.log(weather)
    //Reset Values and Fields
    weatherInfo.innerHTML = ""
    weatherSearch.value = ""
    

    //City Name and Country Code
    var cityName = document.createElement('h2')
    cityName.textContent = (weather.name + ", " + weather.sys.country)
    weatherInfo.appendChild(cityName)

    //Google Maps Link
    var googleMap = document.createElement('a')
    googleMap.href = ("https://www.google.com/maps/search/?api=1&query=" + weather.coord.lat + "," + weather.coord.lon) 
    googleMap.textContent = "Click to view map"
    weatherInfo.appendChild(googleMap)

    //Weather Icon
    var iconImg = document.createElement('img')
    iconImg.src = ("https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png")
    iconImg.alt = "Weather Icon"
    weatherInfo.appendChild(iconImg)

    //Description Current Weather
    var currentWeather = document.createElement('p')
    currentWeather.textContent = weather.weather[0].description
    weatherInfo.appendChild(currentWeather)

    //Page Break
    var br = document.createElement('br')
    weatherInfo.appendChild(br)

    //Actual Temp
    var actualTemp = document.createElement('p')
    actualTemp.textContent =('Current Temp: '+ weather.main.temp)
    weatherInfo.appendChild(actualTemp)

    //Perceived Temp
    var perTemp = document.createElement('p')
    perTemp.textContent = ('Feels Like: ' + weather.main.feels_like)
    weatherInfo.appendChild(perTemp)

    //Page Break 2
    var br2 = document.createElement('br')
    weatherInfo.appendChild(br2)

    //Time of Last Update
    var timeUpdated = document.createElement('p')
        //Convert Time to Local Time
        var date = new Date(weather.dt * 1000)
        var timeString = date.toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: '2-digit'
        }).toLowerCase()
    timeUpdated.textContent = ('Last Updated: ' + timeString)
    weatherInfo.appendChild(timeUpdated)
}
