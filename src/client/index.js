import "./styles/style.scss";
import { encodeCity, tripCountdown, tripLength, getCountryInfo, getWeatherForecast, getImage, showData, results, coordinates } from './js/app';

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Wait for the page to fully load
window.onload = function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let country = document.getElementById("country").value.trim();
    const travelDate = document.getElementById("travel-date").value;
    const returnDate = document.getElementById("return-date").value;

    // Validate input fields
    if (!country || !travelDate || !returnDate) {
      alert("Please fill in all fields!");
      return;
    }

    country = encodeCity(country);
    const countdown = Math.ceil(tripCountdown(travelDate));
    results.countdown = countdown;
    tripLength(travelDate, returnDate);

    await getCountryInfo(country);
    await getWeatherForecast(coordinates?.lat, coordinates?.lng);
    await getImage(country);
    showData();
  });
};