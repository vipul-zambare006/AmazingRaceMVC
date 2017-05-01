//simulator .js start
//simulator function
function moveMarkerAlongPath() {

    //create symbol on line Path
    //icon on the line
    var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#00ced1' //#393
    };

    var teamCount = teamsForEvent.length;
    if (teamCount == "")
        teamCount = 1;

    for (i = 1; i <= teamCount; i++) {
        debugger;
        var duration = Math.floor((Math.random() * 8000) + 3000);
        teamsForEvent[i - 1].TeamName = teamsForEvent[i - 1].TeamName + "" + i;
        var label = { text: teamsForEvent[i - 1].TeamName, color: getRandomColor() };

        var teamMarker = new SlidingMarker({

            position: { lat: zerothLat, lng: zerothLng },
            //title:"#" + path.getLength(),
            animation: google.maps.Animation.DROP,
            label: label,
            icon: movingImage,
            draggable: true,
            map: map,
            duration: duration
        });
        teamMarkers.push(teamMarker);

        var totalPitstops = totalPitstopsForEvent;
        var currentPitstops = 0;
        var remainingPitstops = 0;
        var team = teamMarker.label.text;
        var teamId = parseInt(team.charAt(team.length - 1));

        //ajax call to initialise leaderboard
        $.ajax({

            type: "POST",
            url: url_initialise,
            data: { teamId: teamId, team: team, totalPitstops: totalPitstops, remainingPitstops: remainingPitstops, currentPitstops: currentPitstops },
            traditional: true,

        });
    }

    var currentPitStop = 0;
    var table, rows, x, col1, col2;
    var i = 1;
    //var teamObjecttoString;
    move = function (marker, latlngs, index, wait, newDestination) {
        marker.setPosition(latlngs[index]);
        //map.panTo(latlngs[index].split(",")[0], latlngs[index].split(",")[1]);
        //currentPitStop = index + 1;

        if (index != latlngs.length) {
            // call the next "frame" of the animation
            setTimeout(function () {
                currentPitStop = index + 1;


                var markerStr = marker.label.text.charAt(marker.label.text.length - 1)
                var markerIndex = parseInt(markerStr);

                var currentPitstops = currentPitStop;
                var totalPitstops = markersArray.length;
                var remainingPitstops = totalPitstops - currentPitStop;
                var team = marker.label.text;
                var teamId = parseInt(team.charAt(team.length - 1));

                //--------------ajax call to update positions
                $.ajax({

                    type: "POST",
                    url: url_execute,
                    data: { teamId: teamId, team: team, totalPitstops: totalPitstops, remainingPitstops: remainingPitstops, currentPitstops: currentPitstops },
                    traditional: true,
                    //contentType: "application/json; charset=utf-8",
                    //dataType: "text",


                });

                marker.duration = Math.floor((Math.random() * 8000) + 3000);
                var wait = marker.duration;
                move(marker, latlngs, index + 1, wait, newDestination);

            }, wait);
        }
        else {
            //assign new route
            marker.position = marker.destination;
            marker.destination = newDestination;
        }
    }
    // begin animation, send back to origin after completion
    for (i = 0; i < teamCount; i++) {
        move(teamMarkers[i], pathArray, 0, teamMarkers[i].duration, teamMarkers[i].position);
    }

    //if (i == teamCount)
    //{
    //    var finished = "true";

    //    $.ajax({

    //        type: "POST",
    //        url: url_finished,
    //        data: { finished: finished },
    //        traditional: true,

    //    });

    //}
    
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//End of simulator js