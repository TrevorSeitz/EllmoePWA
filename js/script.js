let myMap = () => {
  let mapProp = {
    center: new google.maps.LatLng(1.2921,36.8219),
    zoom: 5
  }
  let map = new google.maps.Map(document.getElementById('myMap'),
  mapProp)
}
