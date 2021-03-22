
export default class WeatherView {
    constructor(parent_id) {
        this.parentElement = document.querySelector(parent_id);
        this.main_form = document.getElementById("main_form");

        this.main_form.addEventListener("submit", () => {
            
        });
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
        const raining = `<i class="fas fa-cloud-rain"></i>`;
        const snow = `<i class="fas fa-cloud-rain"></i>`;

        // If there was not an error in the request, we proceed
        if(item_data.error === undefined) {

            let description = item_data.sanitized;
            let icon_to_show;

            if(/CAVOK/i.test(description)) {
                icon_to_show = cavok;
            } else if (/BKN/i.test(description) || /FEW/i.test(description) || /SCT/i.test(description) || /OVC/i.test(description)) {
                icon_to_show = clouds;
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

}

