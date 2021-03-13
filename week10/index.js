import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';

const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

document.getElementById("search_button").addEventListener("click", () => {

    const search_form = document.querySelector("#search_form");
    
    
    let main_obj = new QuakesController("#quakeList", search_form);

    main_obj.init();
    
})



