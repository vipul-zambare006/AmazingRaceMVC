var eventId = "";
var oTable = "";
var successMessage = "<strong>Success!!</strong> Data saved successfully";
var errorMessage = "<strong>Error!!</strong> There is some error while processing your request";


var markersArray = [];
var latlngArray = [];
var locationAddress = [];
var pathArray = [];
var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var pitstops = '123456789'
var pitstopIndex = 0;
var labelIndex = 0;
var poly;
var image;
var movingImage;

$(document).ready(function () {

    oTable = $('#Event_table').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "ajax": {
            "url": '/Event/GetEvents',
            "type": "get",
            "datatype": "json"
        },
        "columns": [
            { "data": "EventName", "autowidth": true },
            {
                "data": "EventDateTime",
                "render": function ToJavaScriptDate(value) {
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(value);
                    var dt = new Date(parseFloat(results[1]));
                    return (dt.getMonth() + 1) + "-" + dt.getDate() + "-" + dt.getFullYear();
                },
                "autowidth": true
            },
            { "data": "City", "autowidth": true },
            {
                "data": "Id", "width": "80px",
                "render": function (data) {
                    return '<button id="btnPitstop_' + data + '" class="btn btn-primary btn-xs popup">Pitstops</button>'
                }
            },
            {
                "data": "Id", "width": "50px",
                "render": function (data) {
                    return '<button id="btnEdit_' + data + '" class="btn btn-primary btn-xs editPopup">Edit</button>'
                }
            },
            {
                "data": "Id", "width": "50px",
                "render": function (data) {
                    return '<button id="btnDelete_' + data + '" class="btn btn-danger btn-xs deletePopup">Delete</button>'
                }
            }
        ]
    });
});

    $('.tablecontainer').on('click', '[id^="btnEdit_"]', function (e) {
        e.preventDefault();
        eventId = $(this).attr("Id").substring(8);
        $('#successDiv').addClass('hidden');
        $.ajax({
            type: 'GET',
            url: '/Event/Save/' + eventId,
        })
            .done(function (eventModelJson) {
                var value = eventModelJson.eventModelJson.EventDateTime;
                var pattern = /Date\(([^)]+)\)/;
                var results = pattern.exec(value);
                var dt = new Date(parseFloat(results[1]));
                var convertedDate = (dt.getMonth() + 1) + "-" + dt.getDate() + "-" + dt.getFullYear();

                $('#eventId').val(eventId);
                $('#EventName').val(eventModelJson.eventModelJson.EventName);
                $('#datepicker').val(convertedDate);
                $('#City').val(eventModelJson.eventModelJson.City);

                setTimeout(tableReload, 100);
            })
            .fail(function () {
                $('#failDiv').html(errorMessage);
                $('#failDiv').removeClass('hidden');
                event.preventDefault();
            });
        $('#successDiv').addClass('hidden');
        $('#failDiv').addClass('hidden');
        $('#myModal').modal('show');
    });

    $('.tablecontainer').on('click', '[id^="btnDelete_"]', function (e) {
        e.preventDefault();
        eventId = $(this).attr("Id").substring(10);
        $('#myDeleteModal').modal('show');
    });

    $('.tablecontainer').on('click', '[id^="btnPitstop_"]', function (e) {
        e.preventDefault();
        eventId = $(this).attr("Id").substring(11);
        $('#myPitstopModal').modal('show');
    });

    $(function () {
        $("#datepicker").datepicker();
    });

    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#successDiv').addClass('hidden');
        $('#failDiv').addClass('hidden');
    });

    $('#myDeleteModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#successDiv').addClass('hidden');
        $('#failDiv').addClass('hidden');
    });

    $("#eventAddForm").on("submit", function (event) {
        debugger;
        var $this = $(this);
        console.log(latlngArray);
        var eventModel = $this.serialize();
        $.ajax({
            type: $this.attr('method'),
            url: '/Event/Save',
            //data: { raceEvent: eventModel, latlngArray : latlngArray }
            data: eventModel
        })
            .done(function (Data) {
                $('#successDiv').html(successMessage);
                $('#successDiv').removeClass('hidden');
                setTimeout(tableReload, 100);
            })
            .fail(function () {
                $('#failDiv').html(errorMessage);
                $('#failDiv').removeClass('hidden');
                event.preventDefault();
            });
    });

    $('#deletePopupBtn').on('click', function (data) {
        $.ajax({
            type: 'POST',
            url: '/Event/Delete/' + eventId
        })
            .done(function (Data) {
                $('#successDiv').html(successMessage);
                $('#successDiv').removeClass('hidden');
                setTimeout(tableReload, 100);
            })
            .fail(function () {
                $('#failDiv').html(errorMessage);
                $('#failDiv').removeClass('hidden');
                event.preventDefault();
            });
    });

    var tableReload = function () {
        oTable.ajax.reload();
    }

    $('#addNewEvent').click(
        function () {
            initMap();
        }
    );

    function initMap() {
        var singapore = { lat: 1.290270, lng: 103.851959 };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: singapore,
            mapTypeId: google.maps.MapTypeId.ROADMAP, //
            gestureHandling: 'cooperative',
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

        });//map declaration ends

        //set the mapTilt to 45
        map.setTilt(45);

        //set Marker on Load of Map  
        var marker = new google.maps.Marker({
            position: singapore,
            map: map,
            draggable: false,
            label: 'S'

        });


        //set the polyline
        poly = new google.maps.Polyline({
            strokeColor: '#00ffd8',
            strokeOpacity: 1.0,
            strokeWeight: 3

        });
        poly.setMap(map);

        //Add a listener for the click event and call to function addLatLng
        map.addListener('click', addLatLng);
    }//init function ends

    function addLatLng(event) {
       
        var path = poly.getPath();
        path.push(event.latLng);
        
        //push to pathArray
        pathArray.push(event.latLng);

        image = {
            url: '/Content/images/vlc.png', // setting custom image for marker
            scaledSize: new google.maps.Size(22, 32)
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

        debugger;
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        geocoder.geocode({ 'location': event.latlng }, function (results, status) {
            if (status === 'OK') {
                debugger;
                if (results[1]) {
                    debugger;
                    locationAddress.push(results[1].formatted_address);
                }
                else {
                    locationAddress.push('No results found');
                }
            }
        });

        var strLatlng = event.latLng.lat() + ',' + event.latLng.lng() + '_' + path.getLength();
        latlngArray.push(strLatlng);

        //Cluster to define number of Marker in specific Region
        var markerCluster = new MarkerClusterer(map, markersArray,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    }//addLatLng function ends
