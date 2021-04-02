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

export function getLocation(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};


export function forceInputUppercase(e) {
    var start = e.target.selectionStart;
    var end = e.target.selectionEnd;
    e.target.value = e.target.value.toUpperCase();
    e.target.setSelectionRange(start, end);
}