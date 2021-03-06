export default class WeatherModel {
    constructor() {
        
        let recent_request_json = localStorage.getItem("recent_aviweather_requests");

        if(recent_request_json == null || recent_request_json == "") {
            this.recent_requests = [];
        } else {
            this.recent_requests = JSON.parse(recent_request_json);
        }
        
    }
    // Saves the request in the localStorage
    saveRequest(url) {
        this.recent_requests.push(url)
        let self = this;
        localStorage.setItem("recent_aviweather_requests", JSON.stringify(self.recent_requests));
    }
    // Return the last requests using the localStorage
    getRecentRequest() {
        return [... new Set (this.recent_requests)].reverse();
    }
}