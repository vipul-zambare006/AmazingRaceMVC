//simulator function
function moveMarkerAlongPath() {

    //create symbol on line Path
    //icon on the line

    var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#00ced1' //#393
    };



    var teamCount = document.getElementById('No_of_teams').value;
    //addRow(teamCount);

    if (teamCount == "")
        teamCount = 1;


    for (i = 1; i <= teamCount; i++) {
        var duration = Math.floor((Math.random() * 5000) + 3000);
        var label = { text: "team " + i, color: "black" };

        var teamMarker = new SlidingMarker({

            position: pathArray[0],
            //title:"#" + path.getLength(),
            animation: google.maps.Animation.DROP,
            label: label,
            icon: movingImage,
            draggable: true,
            map: map,
            duration: duration
        });

        teamMarkers.push(teamMarker);

        var totalPitstops = markersArray.length;
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

                //--------------ajax call ends------------------

                //col1 = rows[markerIndex].getElementsByTagName("TD")[1];
                //col2 = rows[markerIndex].getElementsByTagName("TD")[2];
                //col3 = rows[markerIndex].getElementsByTagName("TD")[3];
                //col1.innerHTML = " " + marker.label.text
                //col2.innerHTML = " " + currentPitStop;
                //col3.innerHTML = " " + (pathArray.length - currentPitStop)
                //sortTable(2);
                //newsortTable("myTable", 2);
                //newsortTable("myTable", 1);
                marker.duration = Math.floor((Math.random() * 5000) + 3000);
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

}