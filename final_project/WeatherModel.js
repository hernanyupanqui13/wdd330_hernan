export default class WeatherModel {
    constructor() {
        this.recent_requests = localStorage.getItem("recent_aviweather_requests"); [];
        
    }

    saveRequest(url) {
        localStorage.setItem("recent_aviweather_requests", url);
    }
}