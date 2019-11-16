var weatherApiKey = "10cbfe9a94703630c964b0d52c2ec46e";
var weatherApiName = "Default"
var weatheApiPath = "https://api.openweathermap.org/data/2.5/weather"

var gps = {
    fetchCurrentLocation () {
        navigator.geolocation.getCurrentPosition(
            gps.geolocationSuccess,
            gps.geolocationError,
        );

    },

    geolocationSuccess (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        axios.get(weatheApiPath, {
            params: {
                APPID: weatherApiKey,
                lat: lat,
                lon: lon,
              }
        }).then(function (response) {
            // handle success
            app.info(response.data.weather[0].description + '</br>' + response.data.name);
          })
          .catch(function (error) {
            // handle error
            app.info(error.message);
          })
    },

    geolocationError (error) {
        app.info('Error fetching geo loc!' + error.message);
    }
}