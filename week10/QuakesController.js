import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
  constructor(parent, search_form = null, position = null) {
    this.parent = parent;
    this.search_form = search_form;
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.position = position || {
      lat: 0,
      lon: 0
    };
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.quakes = new Quake(search_form);
    this.quakesView = new QuakesView();
  }
  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some quakes by calling this.getQuakesByRadius()
    this.parentElement = document.querySelector(this.parent);
    await this.initPos();

    if(!this.search_form===null && this.search_form.querySelector("#radius").value != "") {
      let radius = parseInt(this.search_form.querySelector("#radius").value);
      this.getQuakesByRadius(radius);
    } else {
      this.getQuakesByRadius(100);
    }
    
  }
  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        let current_position = await getLocation()
        // if we get the location back then set the latitude and longitude into this.position
        this.position.lat = current_position.coords.latitude;
        this.position.lon = current_position.coords.longitude;
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius = 100) {
    // this method provides the glue between the model and view. Notice it first goes out and requests the appropriate data from the model, then it passes it to the view to be rendered.
    //set loading message
    this.parentElement.innerHTML = `
Loading...
`;
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position,
      100
    );
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.addEventListener('click', e => {
      let e_target = e.target;
      console.log(e_target);
      console.log(e_target.dataset.id);
      this.getQuakeDetails(e_target.dataset.id);
    });
  }
  async getQuakeDetails(quakeId) {
    // get the details for the quakeId provided from the model, then send them to the view to be displayed

    let one_quake = this.quakes.getQuakeById(quakeId);
    console.log(one_quake);
    this.quakesView.renderQuake(one_quake, this.parentElement);
   
  }
}