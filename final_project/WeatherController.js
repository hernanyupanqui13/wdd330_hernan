import WeatherModel from './WeatherModel.js';
import WeatherView from './WeatherView.js';
import {getWeatherData, getLocation} from "./utilities.js";


export default class WeatherController {
    constructor(parentElement) {
        let self = this;
        this.model = new WeatherModel();
        this.view = new WeatherView(parentElement); 

        this.view.main_form.addEventListener("submit", (event) => {
            event.preventDefault();
            let airport = self.view.main_form.querySelector("#airport_input").value;
            getWeatherData(airport)
            .then(data => {
                self.view.renderMetar(data); 
                self.model.saveRequest(airport);
            });
        });

        // On load the object
        this.renderRecentRequests();
        this.initPosition();
        
        
    }

    async renderRecentRequests() {
        let self = this;
        let recent_data = this.model.getRecentRequest();
        let full_data = [];


        for (let index = 0; index < recent_data.length; index++) {
            const element = recent_data[index];
            let one_data = await getWeatherData(element);
            full_data.push(one_data);
            
        }

        for (let index = 0; index < full_data.length; index++) {
            const element = full_data[index];
            this.view.renderRecentRequestsItem(element);
        }
    }

    async getCurrentPositionInfo() {
        let position = await getLocation();
        console.log(position);

        
    }
}