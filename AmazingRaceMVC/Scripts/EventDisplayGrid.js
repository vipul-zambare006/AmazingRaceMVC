var eventId = "";
var oTable = "";
var successMessage = "<strong>Success!!</strong> Data saved successfully";
var errorMessage = "<strong>Error!!</strong> There is some error while processing your request";
var deleteSuccessMsg = "<strong>Success!!</strong> Pitstops deleted successfully";

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
var newPath;

$(document).ready(function () {
    $('#addNewEvent').on('click', initMap)

    oTable = $('#Event_table').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "ajax": {
            "url": '/Event/GetEvents',
            "type": "get",
            "datatype": "json"
        },
        "columns": [
            { "data": "Name", "autowidth": true },
            {
                "data": "EventDate",
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
       // .done(function (Data) {
    
            debugger;
            var value = eventModelJson.eventModelJson.EventDate;
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            var dt = new Date(parseFloat(results[1]));
            var convertedDate = (dt.getMonth() + 1) + "-" + dt.getDate() + "-" + dt.getFullYear();

            $('#eventId').val(eventId);
            $('#EventName').val(eventModelJson.eventModelJson.Name);
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
    markersArray = [];
    $('#successPitDiv').addClass('hidden');
    $('#failPitDiv').addClass('hidden');
    eventId = $(this).attr("Id").substring(11);
    debugger;
    $.ajax({
        type: 'GET',
        url: '/Event/SavePitstop/' + eventId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            image = {
                url: '/Content/images/vlc.png', // setting custom image for marker
                scaledSize: new google.maps.Size(22, 32)
            };
            debugger;

            var sorted = result.pitstops.sort();

            for (var i = 0; i < result.pitstops.length; i++) {
                var location = result.pitstops[i].Location;
                var locArray = location.split(',');
                var lat = parseFloat(locArray[0]);
                var lng = parseFloat(locArray[1]);

               

                var marker = new google.maps.Marker({
                    position: { lat: lat, lng: lng },
                    title: "#" + result.pitstops[i].Order,
                    animation: google.maps.Animation.DROP,
                    //label: ,
                    icon: image,
                    draggable: false,
                });

                marker.setMap(map);
                markersArray.push(marker);

                newPath = poly.getPath();
                console.log(newPath);
                newPath.push(marker.position);
                poly.setMap(map);
            }
        },
        error: function (response) {
        }
    });

    $('#myPitstopModal').modal('show');
    initMap();
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
    var $this = $(this);
    var eventModel = $this.serialize();
    var raceEvent = eventModel;
    $.ajax({
        type: $this.attr('method'),
        url: '/Event/Save',
        data: eventModel
    })
        .done(function (testData) {
            if (testData.status) {
                $('#successDiv').html(successMessage);
                $('#successDiv').removeClass('hidden');
                setTimeout(tableReload, 100);
            }
            else {
                $('#failDiv').html(errorMessage);
                $('#failDiv').removeClass('hidden');
                event.preventDefault();
            }
        })
        .fail(function () {
            $('#failDiv').html(errorMessage);
            $('#failDiv').removeClass('hidden');
            event.preventDefault();
           });
});

$('#pitstopPopupBtn').on('click', function (event) {

    var stringarray = latlngArray.join("/");
    var dataTest = JSON.stringify({
        'eventId': eventId,
        'latLngString': stringarray
    });

    $.ajax({
        type: "POST",
        url: '/Event/SavePitstop/',
        data: dataTest,
        contentType: 'application/json',
     })
        .done(function (testData) {
            if (testData.status) {
               $('#failDiv').addClass('hidden');
                $('#successPitDiv').html(successMessage);
                $('#successPitDiv').removeClass('hidden');
                event.preventDefault();
                //setTimeout(tableReload, 1000);
            }
            else {
                $('#failDiv').html(errorMessage);
                $('#failDiv').removeClass('hidden');
                event.preventDefault();
            }
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

$('#btnDeleteAllPitstop').on('click', function (event) {
    debugger;
    event.preventDefault();
    var dataTest = JSON.stringify({
        'eventId': eventId,
    });

    $.ajax({
        type: "POST",
        url: '/Event/DeleteAllPitstops/',
        data: dataTest,
        contentType: 'application/json',
    }).done(function(event) {
        debugger;
        //event.preventDefault();
        $('#successPitDiv').html(deleteSuccessMsg);
        $('#successPitDiv').removeClass('hidden');
        console.log('success');
        window.reload();
    })
});

var tableReload = function () {
    oTable.ajax.reload();
}

function initMap()
{
    var centerMap = { lat: 1.4260154737416286, lng: 103.7057876586914 };
    var singapore = { lat: 1.290270, lng: 103.851959 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: centerMap,
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

    console.log(poly.getPath());

    map.addListener('click', addLatLng);

    google.maps.event.addListenerOnce(map, 'idle', function () {
        google.maps.event.trigger(map, 'resize');
    });
}

function addLatLng(event) {
    var path = poly.getPath();
    path.push(event.latLng);

    pathArray.push(event.latLng);

    image = {
        url: '/Content/images/vlc.png', // setting custom image for marker
        scaledSize: new google.maps.Size(22, 32)
    };
    console.log(event.latLng);

    var marker = new google.maps.Marker({
        position: event.latLng,
        title: "#" + path.getLength(),
        animation: google.maps.Animation.DROP,
        label: pitstops[pitstopIndex++ % pitstops.length],
        icon: image,
        draggable: false,
    });
    markersArray.push(marker);

    var strLatlng = event.latLng.lat() + ',' + event.latLng.lng() + '_' + path.getLength();
    latlngArray.push(strLatlng);

    var markerCluster = new MarkerClusterer(map, markersArray,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}
