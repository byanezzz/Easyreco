var divMap = document.getElementById('map');
var gMap;
var gMarker;
initialize();

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150, 644),
    zoom: 8
  }
  gMap = new google.maps.Map(divMap, mapOptions);
  var pos = {};
  // Try HTML5 geolocation.

  $('#find').click(function() {
    gMap = new google.maps.Map($('#map').get(0), {
      center: new google.maps.LatLng(-34.397, 150, 644),
      zoom: 8
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        var gLatLon = new google.maps.LatLng(lat, lon);
        gMap.setZoom(17);
        gMap.setCenter(gLatLon);

        var objConfMarker = {
          position: gLatLon,
          map: gMap
        }
        gMarker = new google.maps.Marker(objConfMarker);
        gMarker.setIcon('assets/img/icono-bici.png');
      }, function() {
        alert('error');
      });
    } else {
      alert('error');
    }
  });

}
var start;
var stop;
$('#origin').change(function() {
  var gCoderOrigin = new google.maps.Geocoder();
  var objInformationOrigin = {
    address: $('#origin').val()
  };
  gCoderOrigin.geocode(objInformationOrigin, coderOrigin);

  function coderOrigin(data) {
    start = data[0].geometry.location; //Lo mismo que el objeto LatLong
  };
});
$('#final').change(function() {
  var gCoderFinal = new google.maps.Geocoder();
  var objInformationFinal = {
    address: $('#final').val()
  };
  gCoderFinal.geocode(objInformationFinal, coderFinal);

  function coderFinal(data) {
    stop = data[0].geometry.location; //Lo mismo que el objeto LatLong    
  }

});
var dr;
$('#route').click(function() {
  gMap = new google.maps.Map($('#map').get(0), {
    center: new google.maps.LatLng(-34.397, 150, 644),
    zoom: 8
  });
  var objConfigDR = {
    map: gMap,
    suppressMarkers: true
  }
  var startMarker = new google.maps.Marker({
    position: start,
    map: gMap,
    icon: 'assets/img/icono-bici.png'
  });
  var stopMarker = new google.maps.Marker({
    position: stop,
    map: gMap,
    icon: 'assets/img/icono-bici.png'
  });

  var objConfigDS = {
    origin: start,
    destination: stop,
    travelMode: google.maps.TravelMode.WALKING
  }
  var ds = new google.maps.DirectionsService();
  dr = new google.maps.DirectionsRenderer(objConfigDR);
  ds.route(objConfigDS, getRoute);

  function getRoute(dataRoute, status) {
    if (status === 'OK') {
      dr.setDirections(dataRoute);
      //dr.setMap(null);
    } else {
      alert('No hay ruta establecida en Bici para esta dirección ');
    }
  }
});
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