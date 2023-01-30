let apiKey = "6f4b1dd4c203f093e57dfd51238ddef2";

// Select the element where the search history will be displayed
let historyD = document.querySelector("#history");

// Set initial values for longitude, latitude, and city
let lon, lat, city = ""

// Select the element where the weather information will be displayed
let wetherDisplay = document.querySelector(".displayWether")

// Get the user input element
let userInput = document.getElementById("search-input")

// Add event listener to the search button to start the app when clicked
document.querySelector("#search-button").addEventListener(`click`, getInput)

// Get the input from the user
function getInput(x) {
    // Check if the user has entered any input
    if (!userInput.value) {
        // If no input, return without executing further
        return
    }
    // Prevent the default behavior of the form
    x.preventDefault()
    // Log the input value to the console
    // Trim any whitespace from the input and store it in the search variable
    let search = userInput.value.trim()
    // Log the search variable to the console
    console.log(userInput)
    // Pass the search variable to the getCity function
    getCity(search)
}

// Get the coordinates of the specified location
function getCity(search) {
    console.log(search)
    // Create the URL for the fetch request to the OpenWeatherMap API
    let coordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;
    // return fetch(coordinates)
    // Make the fetch request
    console.log(coordinates)
    fetch(coordinates)
        // Convert the response to json
        .then(function (response) {
            return response.json()
            console.log(coordinates)
        })
        // Pass the location data to the getWeather function
        .then(function (data) {
            getWeather(data[0])
            // console log name of the city 
            console.log(coordinates)
        })
        // If there is an error, log it to the console
        .catch(error => console.error(error))
}

// Get the weather forecast for the specified location
function getWeather(coordinates) {
    // Log the location data to the console
    console.log(coordinates)
    // Destructure the lat and lon properties from the location data
    let lat = coordinates.lat; let lon = coordinates.lon;
    // Log the latitude and longitude to the console
    console.log(lat, lon)
    // Store the city name in the city variable
    let city = coordinates.name
    // Create the URL for the fetch request to the OpenWeatherMap API
    let wetherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    // Make the fetch request
    fetch(wetherURL)
    console.log(wetherURL)
        // Convert the response to json
        .then(function (response) {
            return response.json()
        })
        // Pass the city and data to the splitFunction
        .then(function (data) {
            splitFunction(city, data)
            console.log(city)
        })
        .catch(error => console.error(error))
}

//!  changing all location to cordiantes 


// Split the data for current weather and forecast
function splitFunction(city, data) {
    console.log(data)
    console.log(city)
    currentWether(city, data.list[0])
    foreCastWether(data.list)
    console.log(city , data.list[0], data.list)
}






