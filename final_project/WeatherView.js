import {forceInputUppercase} from './utilities.js';


export default class WeatherView {
    constructor(parent_id) {
        this.parentElement = document.querySelector(parent_id);
        this.main_form = document.getElementById("main_form");

        this.main_form.querySelector("input[type='text']").addEventListener("keyup", forceInputUppercase, false);

        this.main_form.addEventListener("submit", () => {
            
        });

        this.renderLoadingMessage();

        this.airports_with_error = [];
    }


    renderMetar(data) {
        let container = document.querySelector(".metar_info");
        container.innerHTML = data.sanitized;

    }

    
    renderRecentRequests() {

    }

    renderRecentRequestsItem(item_data) {
        const cavok = `<i class="fas fa-sun"></i>`;
        const clouds = `<i class="fas fa-cloud"></i>`;
        const small_clouds = `<div class="small_clouds"><i class="fas fa-cloud"></i><i class="fas fa-cloud"></i><i class="fas fa-cloud"></i></div>`
        const raining = `<i class="fas fa-cloud-rain"></i>`;
        const snow = `<i class="fas fa-cloud-rain"></i>`;
        
        console.log(item_data);
        // If there was not an error in the request, we proceed
        if(true) {

            let description = item_data.sanitized;
            let icon_to_show;

            if(/CAVOK/i.test(description)) {
                icon_to_show = cavok;
            } else if (/BKN/i.test(description) || /FEW/i.test(description) || /SCT/i.test(description) || /OVC/i.test(description)) {
                icon_to_show = clouds;
            } else if(/\w{0,}RA/i.test(description)){
                icon_to_show = raining;
            } else if(/\w{0,}RA/i.test(description)){
                icon_to_show = snow;
            } else {
                icon_to_show = small_clouds;
            }
            


            let item_html = document.createElement("li");
            item_html.innerHTML = `
                ${icon_to_show}
                <div class="station_name">${item_data.station}</div>
                <div class="wind_info">${item_data.sanitized.split(" ")[2]}</div>
                <div class="qnh_info">${item_data.altimeter.repr}</div>
                
                `
            this.parentElement.querySelector(".request_list").appendChild(item_html);
            console.log("redering vie");
            console.log(item_data);
        }
        

    }

    renderLoadingMessage() {
        
        let loading_html = `
            <div class="loading_msg"        
                <div class=loading_heading>Loading</div>
                <div class="load-3">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </div>
        `;

        document.querySelector(".request_list").innerHTML = loading_html;
        document.querySelector(".metar_info").innerHTML = "Nothing to show yet";
        document.querySelector(".current_pos_output").innerHTML = loading_html;
        /*document.querySelector(".wind_arrow").style.visibility = "hidden";
        document.querySelector(".cards_container").style.visibility = "hidden";*/
        
    }

    renderTempIndicator(current_temp, deep_point, parentElement) {
        let temp_1, temp_2;
        const container = document.createElement("div");
        container.classList.add("temp_item");

        let html_content = `
            <div class="cards_heading">Temperature</div>
            <div class="vertical_bar">
                <div class="indicator_1"></div>
                <div class="label_1_indicator"></div>
                <div class="indicator_2"></div>
                <div class="label_2_indicator"></div>
            </div>
            <div class="summary_info">${current_temp}ºC</div>
        `;

        container.innerHTML = html_content;

        if (current_temp > deep_point) {
            temp_1 = current_temp;
            temp_2 = deep_point;
        } else  {
            temp_1 = deep_point;
            temp_2 = current_temp;
        }

        const temp_1_html = container.querySelector(".label_1_indicator");
        container.querySelector(".label_1_indicator").innerHTML = `${temp_1}º`;
        container.querySelector(".label_1_indicator").style.top = "-14px";

        const label_2_indicator = container.querySelector(".label_2_indicator");
        label_2_indicator.innerHTML = `${temp_2}º`;
        container.querySelector(".indicator_2").style.top = `${135-Math.round(135 * temp_2 / temp_1) - 7}px`;
        container.querySelector(".label_2_indicator").style.top = `${135-Math.round(135 * temp_2 / temp_1) - 21}px`;



        document.querySelector(parentElement).innerHTML = "";
        document.querySelector(parentElement).appendChild(container);
    }

    renderPressureIndicator(pressure, parentElement) {
        let temp_1, temp_2;
        const container = document.createElement("div");
        container.classList.add("press_item");

        let html_content = `
            <div class="cards_heading">Pressure</div>
            <div class="vertical_bar">
                <div class="indicator_1"></div>
                <div class="label_1_indicator"></div>
                <div class="indicator_2"></div>
                <div class="label_2_indicator"></div>
            </div>
            <div class="summary_info">${pressure} hPa</div>         
        `;

        container.innerHTML = html_content;

        

        container.querySelector(".label_1_indicator");
        container.querySelector(".label_1_indicator").innerHTML = `${pressure} hPa`;
        container.querySelector(".label_1_indicator").style.top = "-20px";


        const label_2_indicator = container.querySelector(".label_2_indicator");
        label_2_indicator.innerHTML = `${1013} hPa`;
        container.querySelector(".indicator_2").style.top = `${20}px`;
        container.querySelector(".label_2_indicator").style.top = `${0}px`;

        if (pressure < 1013) {
            container.querySelector(".indicator_1").style.bottom = `${10}px`;
        } else  {
            container.querySelector(".indicator_1").style.top = `${10}px`;
        }


        document.querySelector(parentElement).innerHTML = "";
        document.querySelector(parentElement).appendChild(container);
    }

    renderWindIndicator(wind_deg, wind_speed) {
        document.querySelector(".wind_arrow").style.transform = `rotate(${wind_deg}deg)`;
        document.querySelector(".wind_information .summary_info").innerHTML = `${wind_deg} degrees - ${wind_speed} kts`;
    }

    renderErrorMessage() {

        let message = this.airports_with_error.join(", ")
        const error_msg = document.querySelector(".error_message");
        error_msg.innerHTML = `
            Something went wrong with these airports: ${message.toUpperCase()}
        `

        error_msg.classList.add("error_active");

        setTimeout(() => {
            error_msg.classList.remove("error_active");
        }, 3000);
        this.airports_with_error = [];
    }

}

