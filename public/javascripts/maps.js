function initMap() {
  // Office Map
  var officeLatLng = {lat: -37.856372, lng: 145.167063};
  var officeMap = new google.maps.Map(document.getElementById('Office'), {
    zoom: 14,
    center: officeLatLng
  });
  var officeMarker = new google.maps.Marker({
    position: officeLatLng,
    map: officeMap,
    title: "Office"
  });
  var officeInfo = new google.maps.InfoWindow({
    content:'<strong>Office (no classes)</strong><br>14/24 Lakeside Drive<br>3151 Burwood East<br>'
  });
  officeInfo.open(officeMap,officeMarker);

  // WH Map
  var whLatLng = {lat: -37.910157, lng: 145.183131};
  var whMap = new google.maps.Map(document.getElementById('WH'), {
    zoom: 14,
    center: whLatLng
  });
  var whMarker = new google.maps.Marker({
    position: whLatLng,
    map: whMap,
    title: "WH"
  });
  var whInfo = new google.maps.InfoWindow({
    content:'<strong>Wheelers Hill Campus</strong><br>Raphael Drive<br>3150 Wheelers Hill<br>'
  });
  whInfo.open(whMap,whMarker);

  // Temp Map
  var temLatLng = {lat: -37.767539, lng: 145.121817};
  var temMap = new google.maps.Map(document.getElementById('Tem'), {
    zoom: 14,
    center: temLatLng
  });
  var temMarker = new google.maps.Marker({
    position: temLatLng,
    map: temMap,
    title: "Tem"
  });
  var temInfo = new google.maps.InfoWindow({
    content:'<strong>Templestowe Campus</strong><br>Cypress Avenue<br>3107 Lower Templestowe<br>'
  });
  temInfo.open(temMap,temMarker);

  // Ashw Map
  var ashLatLng = {lat: -37.863094, lng: 145.103326};
  var ashMap = new google.maps.Map(document.getElementById('Ash'), {
    zoom: 14,
    center: ashLatLng
  });
  var ashMarker = new google.maps.Marker({
    position: ashLatLng,
    map: ashMap,
    title: "Ash"
  });
  var ashInfo = new google.maps.InfoWindow({
    content:'<strong>Ashwood Campus</strong><br>Vannam Drive<br>3147 Ashwood<br>'
  });
  ashInfo.open(ashMap,ashMarker);

  // Donny Map
  var donLatLng = {lat: -37.783834, lng: 145.137961};
  var donMap = new google.maps.Map(document.getElementById('Don'), {
    zoom: 14,
    center: donLatLng
  });
  var donMarker = new google.maps.Marker({
    position: donLatLng,
    map: donMap,
    title: "Don"
  });
  var donInfo = new google.maps.InfoWindow({
    content:'<strong>Doncaster Campus</strong><br>123 Church Rd<br>3108 Doncaster<br>'
  });
  donInfo.open(donMap,donMarker);

  // Hawthorn Map
  var hawLatLng = {lat: -37.839324, lng: 145.043788};
  var hawMap = new google.maps.Map(document.getElementById('Haw'), {
    zoom: 14,
    center: hawLatLng
  });
  var hawMarker = new google.maps.Marker({
    position: hawLatLng,
    map: hawMap,
    title: "Haw"
  });
  var hawInfo = new google.maps.InfoWindow({
    content:'<strong>Hawthorn Campus</strong><br>23 Burgess St<br>3123 Hawthorn East<br>'
  });
  hawInfo.open(hawMap,hawMarker);

};

google.maps.event.addDomListener(window, 'load', initMap);
