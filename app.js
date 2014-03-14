var target = { lat: 47.410200, lng: 7.565889 }, 
       pos     = { lat: 47.4045569, lng: 7.5559002 };

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

function toDeg(rad) {
  return rad / Math.PI * 180;
}

var getBearing = function(pos1, pos2) {

  var dLat = toRad(pos2.lat-pos1.lat),
        dLon = toRad(pos2.lng-pos1.lng);
  var lat1 = toRad(pos1.lat);
  var lat2 = toRad(pos2.lat);
  var y = Math.sin(dLon) * Math.cos(lat2);
  var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  var brng = toDeg(Math.atan2(y, x));
  
  return brng;

}

window.addEventListener("deviceorientation", function(e) {
  var heading = e.alpha;
  document.getElementById("d").textContent = heading + " -- " + getBearing(pos, target);
  
  
});

navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

navigator.getMedia({video: true}, function(stream) {
  var video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);
}, function(err) {
  str = "";
  for(p in err) {
    str += p + "=" + err[p];
  }
  alert(str)
});
