// Variables to store results and coordinates
const results = {};
const coordinates = {};

// Method to encode the country name for URL use
function encodeCity(country) {
  return encodeURIComponent(country);
}

// Method to calculate the trip countdown in days
function tripCountdown(travelDate) {
  const currentDate = new Date();
  const travel = new Date(travelDate);
  return (travel - currentDate) / (1000 * 60 * 60 * 24); // Calculate the difference in days
}

// Method to fetch country information (latitude and longitude) using the GeoNames API
async function getCountryInfo(country) {
  try {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?q=${country}&maxRows=1&username=tala`
    );
    const result = await response.json();
    const lat = result.geonames[0].lat; // Get the latitude
    const lng = result.geonames[0].lng; // Get the longitude
    coordinates.lat = lat; // Store latitude in coordinates
    coordinates.lng = lng; // Store longitude in coordinates
  } catch (error) {
    console.log(error); // Log any errors
  }
}

// Method to fetch weather forecast using the WeatherBit API
async function getWeatherForecast(lat, lng) {
  const key = "cc58a351ce9a4fcbad122fdf42c21dfb"; // API key
  if (results.countdown <= 7) { // If trip is within 7 days
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${key}&include=minutely`
      );
      const result = await response.json();
      const currentTemp = result.data[0].app_temp; // Get current temperature
      results.temp = currentTemp; // Store current temperature in results
    } catch (error) {
      console.log(error); // Log any errors
    }
  } else {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${key}`
      );
      const result = await response.json();
      console.log(result); // Log the forecast results
      results.temp = result.data[0].app_max_temp; // Store the maximum daily temperature
    } catch (error) {
      console.log(error); // Log any errors
    }
  }
}

// Method to fetch an image related to the country using the Pixabay API
async function getImage(country) {
  const key = "49088095-352bd82818f7a1b34026a5718"; // API key
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${country}&image_type=photo&min_width=800&min_height=800`
    );
    const result = await response.json();
    results.image = result.hits[0].previewURL; // Get the image URL
  } catch (error) {
    console.log(error); // Log any errors
  }
}

// Method to calculate the length of the trip in days
function tripLength(travelDate, returnDate) {
  const date1 = new Date(travelDate); // Start date
  const date2 = new Date(returnDate); // End date
  results.length = (date2 - date1) / (1000 * 60 * 60 * 24); // Calculate the difference in days
}

// Method to display the results on the webpage
function showData() {
  const image = document.querySelector(".outputs img");
  const length = document.querySelector(".outputs .length");
  const countdown = document.querySelector(".outputs .countdown");
  const weather = document.querySelector(".outputs .weather");
  
  // Display the image and results on the page
  image.src = results.image;
  length.innerHTML = `Trip Length : ${results.length} days`;
  countdown.innerHTML = `Trip Countdown : ${results.countdown} days`;
  weather.innerHTML = `Weather forecast : ${results.temp}  °C`;
}

// Export the functions and variables to be used in other files
export { 
  encodeCity, 
  tripCountdown, 
  tripLength, 
  getCountryInfo, 
  getWeatherForecast, 
  getImage, 
  showData, 
  results, 
  coordinates 
};