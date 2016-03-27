function iniTripSearch() {
  var originPlaceId = null;
  var destinationPlaceId = null;

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);

  var originInput =  document.getElementById('origin');
  var destinationInput = document.getElementById('destination');

  //var originAutocomplete = new google.maps.places.Autocomplete(originInput);
  //originAutocomplete.bindTo('bounds', map);

  var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
  destinationAutocomplete.bindTo('bounds', map);

  var travelMode = google.maps.TravelMode.DRIVING;

  function expandViewportToFitPlace(map, place) {

    var marker = new google.maps.Marker({
        map: map
    });

    var infowindow = new google.maps.InfoWindow();

    marker.addListener('click', function() {
      document.getElementById("div-source").style.display = 'block'; ;
      infowindow.open(map, marker);
    });


    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPlace({
          placeId: place.place_id,
          location: place.geometry.location
    });

    marker.setVisible(true);

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address);
  }

  /*originAutocomplete.addListener('place_changed', function() {
    var place = originAutocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Autocomplete returns no place");
      return;
    }

    expandViewportToFitPlace(map, place);
    originPlaceId = place.place_id;

    route(originPlaceId, destinationPlaceId, travelMode, directionsService, directionsDisplay);
  }); */

  destinationAutocomplete.addListener('place_changed', function() {
    var place = destinationAutocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    expandViewportToFitPlace(map, place);

    destinationPlaceId = place.place_id;

    route(originPlaceId, destinationPlaceId, travelMode, directionsService, directionsDisplay);
  });

  function route(originPlaceId, destinationPlaceId, travelMode, directionsService, directionsDisplay) {
    if (!originPlaceId || !destinationPlaceId) {
      return;
    }

    directionsService.route({
      origin : {'placeId' : originPlaceId},
      destination : {'placeId' : destinationPlaceId},
      travelMode : travelMode
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}