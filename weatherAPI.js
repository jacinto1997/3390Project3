const apiKey = "9055233e47a5f72f45363e40bbad40f3"

const lat = 33.44;
const lon = -94.04;

const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Weather Data:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  function success(position) {
    doSomething(position.coords.latitude, position.coords.longitude);
  }
  
  function error() {
    alert("Sorry, no position available.");
  }
  
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };
  
  const watchID = navigator.geolocation.watchPosition(success, error, options);

