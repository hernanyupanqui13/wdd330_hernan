export function getWeatherData(airport_code) {
    return fetch(`https://avwx.rest/api/metar/${airport_code}`
        , {
            headers: {
                'Authorization':'Token ggBdFXYMz2PDh7-0E9KYVdudvp4k1g7Xw8sVqZ-CK3w'
            }
        }
    )
    .then(response => response.json());
}