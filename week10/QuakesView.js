
  // Quake View handler
  export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
      //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
      listElement.innerHTML = quakeList.features
      .map(quake => {
        return `<li class="quake_item" data-id=${quake.id}>
          <span data-id=${quake.id}>${quake.properties.title}</span>
          <div data-id=${quake.id}>${new Date(quake.properties.time)}</div>
        `;
      })
      .join('');
    }
    renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      console.log(quakeProperties);
      // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 

      let the_html_content = ``;

      quakeProperties.forEach(element => {

        if(element[0] == "time" || element[0] == "updated") {
          the_html_content += `<li><span class="key_text">${element[0]}</span>: <span>${new Date(element[1])}</span></li>`
        } else {
          the_html_content += `<li><span class="key_text">${element[0]}</span>: <span>${element[1]}</span></li>`;
        }        
      });
      
      element.innerHTML = the_html_content;
    }
  }