//Call items from HTML page
const weatherApp = document.getElementById('weather-app')
const weatherInfo = document.getElementById('weather')
const form = document.querySelector('form')
const weatherSearch = document.getElementById('weather-search')


//Input Submit
form.onsubmit = async e => {
    e.preventDefault()

    //Define Input Value 
    const inputValue = weatherSearch.value
    if (!inputValue) return
    try{
        //Fetch Information from OpenWeather
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=c9c200ce14c43853eabac39aa7af9892&q=${inputValue}`)
        //Location Not Found
        if (res.status !== 200) throw new Error('Location Not Found')
        const weather = await res.json()
        showWeather(weather)
    } //Error Message 
    catch(err){
        weatherInfo.innerHTML = err.message
        weatherSearch.value = ""
    }

}

function showWeather({
    name,
    sys: {
        country
    },
    coord: {
        lon,
        lat
    },
    weather: [{
        icon,
        description
    }],
    main: {
        temp,
        feels_like
    },
    dt

}) {
    weatherSearch.value = ""
    weatherInfo.innerHTML = `<h2>${name} ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}">Click to view map</a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
    <p>${description}</p>
    <br>
    <p>Current Temp: ${temp}</p>
    <p>Feels Like: ${feels_like}</p>
    <br>
    <p>Last Updated: ${(new Date(dt * 1000)).toLocaleTimeString('en-US',{hour:'numeric', minute: '2-digit'})}</p>
    `
}


    //City Name and Country Code
    // var cityName = document.createElement('h2')
    // cityName.textContent = (weather.name + ", " + weather.sys.country)
    // weatherInfo.appendChild(cityName)

    //Google Maps Link
    // var googleMap = document.createElement('a')
    // googleMap.href = ("https://www.google.com/maps/search/?api=1&query=" + weather.coord.lat + "," + weather.coord.lon) 
    // googleMap.textContent = "Click to view map"
    // weatherInfo.appendChild(googleMap)

    //Weather Icon
    // var iconImg = document.createElement('img')
    // iconImg.src = ("https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png")
    // iconImg.alt = "Weather Icon"
    // weatherInfo.appendChild(iconImg)

    //Description Current Weather
    // var currentWeather = document.createElement('p')
    // currentWeather.textContent = weather.weather[0].description
    // weatherInfo.appendChild(currentWeather)

    // //Page Break
    // var br = document.createElement('br')
    // weatherInfo.appendChild(br)

    //Actual Temp
    // var actualTemp = document.createElement('p')
    // actualTemp.textContent =('Current Temp: '+ weather.main.temp)
    // weatherInfo.appendChild(actualTemp)

    //Perceived Temp
    // var perTemp = document.createElement('p')
    // perTemp.textContent = ('Feels Like: ' + weather.main.feels_like)
    // weatherInfo.appendChild(perTemp)

    // //Page Break 2
    // var br2 = document.createElement('br')
    // weatherInfo.appendChild(br2)

    //Time of Last Update
    // var timeUpdated = document.createElement('p')
        //Convert Time to Local Time
        // const date = new Date(weather.dt * 1000)
        // const timeString = date.toLocaleTimeString('en-US',{
        //     hour: 'numeric',
        //     minute: '2-digit'
        // })
    // timeUpdated.textContent = ('Last Updated: ' + timeString)
    // weatherInfo.appendChild(timeUpdated)

