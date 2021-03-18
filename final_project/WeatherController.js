import WeatherModel from './WeatherModel.js';
import WeatherView from './WeatherView.js';
import {getWeatherData} from "./utilities.js";


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
            });
        });
        
    }
}