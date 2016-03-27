var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6167357, lng: -122.3624825},
    zoom: 13,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  });

  map.addListener('click', function(event) {
    placeInstruction(event);
  });

  //Place search box
}

function placeInstruction(event) {
  var marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      title: 'Instruction'
    });

  initMarket(marker);

  var infowindow = new google.maps.InfoWindow({
      content: createInstructionInfo(event)
  });

  infowindow.open(map, marker);
}

function removeInstruction(marker) {
  marker.setMap(null);
}

function createInstructionInfo(event) {
  var title = "Add Instruction for Location " + event.latLng;

  var msg =
    '<div class="modal-content">'
    + '<div class="modal-header">'
    +    '<h4 class="modal-title">'
    + title + '</h4>'
    +  '</div>'
    +  '<div class="modal-body">'
    +    '<p>One fine body&hellip;</p>'
    +  '</div>'
    +  '<div class="modal-footer">'
    +    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
    +    '<button type="button" class="btn btn-primary">Save changes</button>'
    +  '</div>'
    + '</div>'
  return msg;
}

function initMarket(marker) {
  marker.addListener('click', function() {
    alert('need delete this marker?');
    removeInstruction(marker);
  });
}

function initTripInstructionPanel() {
   $("#trip-instruction-panel").toggleClass("show");
   var map = new google.maps.Map(document.getElementById('map'), {
                 center: {lat: 47.6167357, lng: -122.3624825},
                 zoom: 13
   });

   iniTripSearch(map);
}

function hideSearchPanel() {
    $("#wrapper").toggleClass("toggled");
    iniTripSearch(map);
}