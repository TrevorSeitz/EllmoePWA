const locations = document.querySelector('.locations')

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');


  M.Sidenav.init(menus, {edge: 'right'});
   // <a href="#" data-target="mobile-demo" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
  // add location form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render location database
const renderLocation = (data, id) => {
  const html = `
    <div class="card-panel location white row" data-id="${id}">
        <img src=${data.imageFileLocation} alt="location thumb">
      <div class="location-details">
        <div class="location-name">${data.name}</div>
        <div class="location-venue">${data.venue}</div>
        <div class="location-description">${data.description}</div>
        <div class="location-contactName">Contact: ${data.contactName}</div>
        <div class="location-contactPhone">Phone: ${data.contactPhone}</div>
        <div class="location-email">email: ${data.email}</div>
      </div>
      <div class="location-delete">
        <i class="material-icons"  data-id="${id}">delete_outline</i>
      </div>
    </div>
  `
  locations.innerHTML += html
}



// remove location from DOM
const removeLocation = (id) => {
  const location = document.querySelector(`.location[data-id=${id}]`)
  location.remove()
}
