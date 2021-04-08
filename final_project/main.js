/*let airport_code = "SPJC";

getWeatherData(airport_code).then(a => console.log(a));



function getWeatherData(airport_code) {
    return fetch(`https://avwx.rest/api/metar/${airport_code}`
        , {
            headers: {
                'Authorization':'Token ggBdFXYMz2PDh7-0E9KYVdudvp4k1g7Xw8sVqZ-CK3w'
            }
        }
    )
    .then(response => response.json());
}*/


import WeatherController from './WeatherController.js';


let controller = new WeatherController(".aviweather_root");

console.log(controller);