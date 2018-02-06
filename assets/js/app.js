var divMap = document.getElementById('map');
navigator.geolocation.getCurrentPosition(success, error);

function error() {};

function success(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var gLatLon = new google.maps.LatLng(lat, lon);
  var objConf = {
    zoom: 17,
    center: gLatLon
  };
  var gMap = new google.maps.Map(divMap, objConf);
  var objConfMarker = {
    position: gLatLon,
    map: gMap
  }
  var gMarker = new google.maps.Marker(objConfMarker);
  gMarker.setIcon('assets/img/icono-bici.png');
};
// Autocompletar Input
var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 1512631)
);
var options = {
  bounds: defaultBounds
}
var inputOrigin = document.getElementById('origin');
var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin, options);
var inputFinal = document.getElementById('final');
var autocompleteFinal = new google.maps.places.Autocomplete(inputFinal, options);
/* 
  var gCoder = new google.maps.Geocoder();
  var objInformation = {
    address: 'Eleuterio Ramírez 1027,Santiago,Santiago de Chile'
  };
  gCoder.geocode(objInformation, coder)

  function coder(data) {
    var coord = data[0].geometry.location; //Lo mismo que el objeto LatLong
    var confMarker = {
      position: coord,
      map: gMap
    };
    var gMarkerDV = new google.maps.Marker(confMarker);
  }
  var objConfigDR = {
    map: gMap
  }
  var objConfigDS = {
    origin: gLatLon,
    destination: objInformation.address,
    travelMode: google.maps.TravelMode.DRIVING
  }
  var ds = new google.maps.DirectionsService();
  var dr = new google.maps.DirectionsRenderer(objConfigDR);
  ds.route(objConfigDS, getRoute);

  function getRoute(dataRoute, status) {
    if (status === 'OK') {
      dr.setDirections(dataRoute);
    } else {
      alert('No hay ruta establecida en Bici para esta dirección ');
    }
  } */