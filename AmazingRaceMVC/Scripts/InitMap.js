var markersArray = [];
var pathArray = [];
var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var pitstops = '123456789'
var pitstopIndex = 0;
var labelIndex = 0;
var poly;
var image;

var directionDisplay;
var directionsService;
var stepDisplay;

var position;
var marker = [];
var polyline = [];
var poly2 = [];
var poly = null;
var startLocation = [];
var endLocation = [];
var timerHandle = [];


var speed = 0.000005, wait = 1;
var infowindow = null;

var myPano;
var panoClient;
var nextPanoId;

var Colors = ["#FF0000", "#00FF00", "#0000FF"];

var initObject;
var initObjectToString;
var initObjectArray = [];
var waypoints = [];

function initMap() {
    infowindow = new google.maps.InfoWindow(
        {
            size: new google.maps.Size(500, 500)
        });
    var singapore = { lat: 1.290270, lng: 103.851959 };
    var styledMapType = new google.maps.StyledMapType(
        [
            { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#c9b2a6' }]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#dcd2be' }]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#ae9e90' }]
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#93817c' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{ color: '#a5b076' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#447530' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#f5f1e6' }]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{ color: '#fdfcf8' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#f8c967' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#e9bc62' }]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{ color: '#e98d58' }]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#db8555' }]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#806b63' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#8f7d77' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#ebe3cd' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{ color: '#b9d3c2' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#92998d' }]
            }
        ],
        { name: 'Styled Map' });

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: singapore,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: 'cooperative',
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
        },

        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ]

    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    map.setTilt(45);

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        componentRestrictions: {
            country: 'SGP'

        }
    }, function (results, status) {
        if (status === 'OK') {
            map.fitBounds(results[0].geometry.viewport);
            map.setCenter(results[0].geometry.location);

        }
    });

    var marker = new google.maps.Marker({
        position: singapore,
        map: map,
        draggable: false,
        label: 'S'

    });

    poly = new google.maps.Polyline({
        //strokeColor: '#00ffd8',
        strokeColor: '#FF7F50',
        strokeOpacity: 1.0,
        strokeWeight: 3

    });
    poly.setMap(map);

    map.addListener('click', addLatLng);

}//init function ends

//Function to Create Marker
function createMarker(latlng, label, html) {
    var contentString = '<b>' + label + '</b><br>' + html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: label,
        zIndex: Math.round(latlng.lat() * -100000) << 5
    });
    marker.myname = label;

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
    return marker;
}

//set Routes
function setRoutes() {
    var directionsDisplay = new Array();
    var teamCount = document.getElementById('No_of_teams').value;

    for (var i = 1; i <= teamCount; i++) {
        waypoints.push({ location: pathArray[i], stopover: true });
    }

    for (var i = 0; i < teamCount; i++) {

        var rendererOptions = {
            map: map,
            suppressMarkers: true,
            preserveViewport: true
        }
        directionsService = new google.maps.DirectionsService();

        var travelMode = google.maps.DirectionsTravelMode.DRIVING;

        var request = {
            origin: pathArray[0],
            waypoints: waypoints,
            optimizeWaypoints: true,
            destination: pathArray[pathArray.length - 1],
            travelMode: travelMode
        };

        directionsService.route(request, makeRouteCallback(i, directionsDisplay[i]));

    }


    function makeRouteCallback(routeNum, disp) {
        if (polyline[routeNum] && (polyline[routeNum].getMap() != null)) {
            startAnimation(routeNum);
            return;
        }
        return function (response, status) {

            if (status == google.maps.DirectionsStatus.OK) {

                var bounds = new google.maps.LatLngBounds();
                var route = response.routes[0];
                startLocation[routeNum] = new Object();
                endLocation[routeNum] = new Object();


                polyline[routeNum] = new google.maps.Polyline({
                    path: [],
                    strokeColor: '#66ff33',
                    strokeWeight: 3
                });

                poly2[routeNum] = new google.maps.Polyline({
                    path: [],
                    strokeColor: '#66ff33',
                    strokeWeight: 3
                });


                // For each route, display summary information.
                var path = response.routes[0].overview_path;
                var legs = response.routes[0].legs;


                disp = new google.maps.DirectionsRenderer(rendererOptions);
                disp.setMap(map);
                disp.setDirections(response);


                //Markers
                for (i = 0; i < legs.length; i++) {
                    if (i == 0) {
                        startLocation[routeNum].latlng = legs[i].start_location;
                        startLocation[routeNum].address = legs[i].start_address;                // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                        marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green");

                    }
                    endLocation[routeNum].latlng = legs[i].end_location;
                    endLocation[routeNum].address = legs[i].end_address;

                    var steps = legs[i].steps;

                    for (j = 0; j < steps.length; j++) {
                        var nextSegment = steps[j].path;
                        var nextSegment = steps[j].path;

                        for (k = 0; k < nextSegment.length; k++) {
                            polyline[routeNum].getPath().push(nextSegment[k]);
                            bounds.extend(nextSegment[k]);
                        }

                    }
                }
            }
            polyline[routeNum].setMap(map);
            startAnimation(routeNum);
        } // else alert("Directions request failed: "+status);

    }
}

//------------------------------------------------------------------
var lastVertex = 1;
var stepnum = 0;
var step = 50; // 5; // metres
var tick = 100; // milliseconds
var eol = [];

function updatePoly(i, d) {
    // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
    if (poly2[i].getPath().getLength() > 20) {
        poly2[i] = new google.maps.Polyline([polyline[i].getPath().getAt(lastVertex - 1)]);
        // map.addOverlay(poly2)
    }

    if (polyline[i].GetIndexAtDistance(d) < lastVertex + 2) {
        if (poly2[i].getPath().getLength() > 1) {
            poly2[i].getPath().removeAt(poly2[i].getPath().getLength() - 1)
        }
        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), polyline[i].GetPointAtDistance(d));
    } else {
        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), endLocation[i].latlng);
    }
}

function animate(index, d) {
    if (d > eol[index]) {

        marker[index].setPosition(endLocation[index].latlng);
        return;
    }
    var p = polyline[index].GetPointAtDistance(d);

    map.panTo(p);
    marker[index].setPosition(p);
    updatePoly(index, d);
    timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick);
}

function startAnimation(index) {
    if (timerHandle[index]) clearTimeout(timerHandle[index]);
    eol[index] = polyline[index].Distance();
    map.setCenter(polyline[index].getPath().getAt(0));

    poly2[index] = new google.maps.Polyline({ path: [polyline[index].getPath().getAt(0)], strokeColor: "#FFFF00", strokeWeight: 3 });

    timerHandle[index] = setTimeout("animate(" + index + ",50)", 2000);  // Allow time for the initial map display
}

function addLatLng(event) {
    var path = poly.getPath();
    path.push(event.latLng);
    pathArray.push(event.latLng);
    image = {
        url: '/Content/images/vlc.png',
        scaledSize: new google.maps.Size(22, 42)
    };

    var marker = new google.maps.Marker({

        position: event.latLng,
        title: "#" + path.getLength(),
        animation: google.maps.Animation.DROP,
        label: pitstops[pitstopIndex++ % pitstops.length],
        icon: image,
        draggable: false,
    });

    markersArray.push(marker);

    //Cluster to define number of Marker in specific Region
    var markerCluster = new MarkerClusterer(map, markersArray,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}//addLatLng function ends

var teamMarkers = [];
var movingImage = {
    url: '/Content/images/team1.png',
    //scaledSize: new google.maps.Size(30, 50)
};

var url_initialise = '@Url.Action("Initialize", "Map")';
var url_execute = '@Url.Action("Execute", "Map")'

function animateCircle(line) {

    var count = 0;
    window.setInterval(function () {
        count = (count + 1) % 200;

        var icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
    }, 20);

}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(map);
    }
    markersArray.length = 0;
}

function deleteMarkers() {
    setMapOnAll(null);
    poly.setMap(null);
    markersArray = [];
}

function addRow(rowcount) {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;

    for (i = 1; i <= rowcount; i++) {
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        cell1.innerHTML = " " + i;

        var cell2 = row.insertCell(1);
        cell2.innerHTML = " ";

        var cell3 = row.insertCell(2);
        cell3.innerHTML = " ";

        var cell4 = row.insertCell(3);
        cell3.innerHTML = " ";

    }

}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }//if
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }//if
            }//elseif
        }//for
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }//if
        }//else
    }//switch
}