import { getJSON } from './utilities.js';
// Quake Model
export default class Quake {
  constructor(search_form) {
    this.init_date = search_form.querySelector("#init_date").value;
    this.end_date = search_form.querySelector("#end_date").value;

    this.baseUrl =
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.init_date}&endtime=${this.end_date}`;
    // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }
  async getEarthQuakesByRadius(position, radius = 100) {
    // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it
    let self = this;

    let params_query =  `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;

    this._quakes = await getJSON(self.baseUrl + params_query);

    return this._quakes;
  }
  getQuakeById(id) {
    // filter this._quakes for the record identified by id and return it
    return this._quakes.features.filter(item => item.id === id)[0];
  }
}