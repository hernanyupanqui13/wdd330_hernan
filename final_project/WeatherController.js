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
        this.renderCurrentPositionInfo();


        
        
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

        document.querySelector(".request_list").innerHTML = "";

        for (let index = 0; index < full_data.length; index++) {
            const element = full_data[index];
            this.view.renderRecentRequestsItem(element);
        }
    }

    async getCurrentPositionInfo() {
        let position = await getLocation();
        console.log(position);
        let a_key = "f311bb8bcd320204349726acab80291a";
        let lat = position.coords.latitude;
        let lon  = position.coords.longitude;
        
        return fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${a_key}`)
        .then(data => data.json());
    }

    async renderCurrentPositionInfo() {
        let c_pos_data = await this.getCurrentPositionInfo();
        console.log(c_pos_data);
        const parent_html = document.querySelector(".current_pos_output");
        
        c_pos_data = c_pos_data.current;

        let temperature = Math.round((c_pos_data.temp - 273.15)* 100)/100 ;

        parent_html.innerHTML = `
            <div class="temp_cp">${temperature}</div>
            <div class="qnh_cp">${c_pos_data.pressure}</div>
            <div class="wind_info">${Math.round(c_pos_data.wind_deg)} kts at ${Math.round(c_pos_data.wind_speed)} deg

        `
        this.view.renderTempIndicator(Math.round(c_pos_data.temp-273.15)
            , Math.round(c_pos_data.dew_point-273.15)
            , ".temperature_information"
        );
        

        this.view.renderPressureIndicator(c_pos_data.pressure, ".pressure_information");

        this.view.renderWindIndicator(170);

    }
}