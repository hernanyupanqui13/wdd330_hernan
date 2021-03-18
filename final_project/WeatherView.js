
export default class WeatherView {
    constructor(parent_id) {
        this.parentElement = document.getElementById(parent_id);
        this.main_form = document.getElementById("main_form");

        this.main_form.addEventListener("submit", () => {
            
        });
    }

    renderResponse(data) {

    }

    renderMetar(data) {
        let container = document.querySelector(".metar_info");
        container.innerHTML = data.sanitized;

    }
}

