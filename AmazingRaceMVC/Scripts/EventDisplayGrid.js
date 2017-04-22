var eventId = "";
var oTable = "";
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
                    //return '<a class="popup" href="/Event/GetPistops/' + data + '" class="btn btn-primary btn-xs">Pitstops</a>'
                }
            },
            {
                "data": "Id", "width": "50px",
                "render": function (data) {
                    return '<button id="btnEdit_' + data + '" class="btn btn-primary btn-xs editPopup">Edit</button>'
                    //return '<a class="popup" href="/Event/save/' + data + ' class="btn btn-primary btn-xs">Edit</a>'
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

    //$('.tablecontainer').on('click', 'a.popup', function (e) {
    //$('.popup').on('click', 'a.popup', function (e) {
    //    alert("popup called");
    //    e.preventDefault();
    //    openPopup($(this).attr('href'));
    //});

    //$('.tablecontainer').on('click', 'button.deletePopup', function (e) {
    //    e.preventDefault();
    //    $('#myDeleteModal').modal('show');
    //   // openPopup($(this).attr('href'));
    //});
    //btnDelete_b47351a9-5017-41a7-89cf-6c4df3adf5e0

    $('.tablecontainer').on('click', '[id^="btnEdit_"]', function (e) {
        debugger;
        e.preventDefault();
        eventId = $(this).attr("Id").substring(8);
        $('#successDiv').addClass('hidden');
        $.ajax({
            type: 'GET',
            url: '/Event/Save/' + eventId,
           // data: eventModel
        })
            .done(function (eventModelJson) {
                debugger;
                var value = eventModelJson.eventModelJson.EventDateTime;
                var convertedDate = function ToJavaScriptDate(value) {
                    debugger;
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(value);
                    var dt = new Date(parseFloat(results[1]));
                    return (dt.getMonth() + 1) + "-" + dt.getDate() + "-" + dt.getFullYear();
                }

                //eventModelJson.eventModelJson.EventDateTime = convertedDate;
                $('#eventId').val(eventId);
                $('#EventName').val(eventModelJson.eventModelJson.EventName);
                //$('#datepicker').val(convertedDate);
                $('#City').val(eventModelJson.eventModelJson.City);
                debugger;
                //$('#successDiv').html("<strong>Success!!</strong> Data saved successfully");
                //$('#successDiv').removeClass('hidden');
                setTimeout(tableReload, 100);
            })
            .fail(function () {
                $('#failDiv').html("<strong>Error!!</strong> There is some error while processing your request");
                $('#failDiv').removeClass('hidden');
                event.preventDefault();
            });
        $('#successDiv').addClass('hidden');
        $('#failDiv').addClass('hidden');
        $('#myModal').modal('show');
    });

    $('.tablecontainer').on('click', '[id^="btnDelete_"]', function (e) {
        debugger;
        e.preventDefault();
        eventId = $(this).attr("Id").substring(10);
        $('#myDeleteModal').modal('show');
    });

    $('.tablecontainer').on('click', '[id^="btnPitstop_"]', function (e) {
        debugger;
        e.preventDefault();
        eventId = $(this).attr("Id").substring(11);
        $('#myPitstopModal').modal('show');
    });

    //$('.tablecontainer').on('click', 'button.editPopup', function (e) {
    //    e.preventDefault();
    //    $('#myModal').modal('show');
    //});


    function openPopup(pageurl) {
        var $pagecontent = $('<div />');
        $pagecontent.load(pageurl, function () {
            $('#popupform', $pagecontent).removeData('validator');
            $('#popupform', $pagecontent).removeData('unobtrusiveValidation');
            $.validator.unobtrusive.parse('form');
        });

        $dialog = $('<div class="popupwindow" style="overflow:auto"></div>')
            .html($pagecontent)
            .dialog({
                draggable: true,
                autoOpen: false,
                resizable: true,
                model: true,
                title: 'Save Event',
                height: 300,
                width: 400,
                close: function () {
                    $dialog.dialog('destroy').remove();
                    //$dialog.dialog('distroy').remove();
                }
            })

        $('popupwindow').on('submit', '#popupform', function (e) {
            var url = $('#popupform')[0].action
            $.ajax({
                type: "POST",
                url: url,
                data: $('#pupupform').serialize(),
                success: function () {
                    if (data.status) {
                        $dialog.dialog('close');
                        oTable.ajax.reload();
                    }
                }
            })
            e.preventDefault();
        })
        $dialog.dialog('open');
    }
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
    var eventModel = $this.serialize();
    var strng = JSON.stringify(eventModel);
    $.ajax({
        type: $this.attr('method'),
        url: '/Event/Save',
        data: eventModel
    })
        .done(function (Data) {
            $('#successDiv').html("<strong>Success!!</strong> Data saved successfully");
            $('#successDiv').removeClass('hidden');
            setTimeout(tableReload, 100);
        })
        .fail(function () {
            $('#failDiv').html("<strong>Error!!</strong> There is some error while processing your request");
            $('#failDiv').removeClass('hidden');
            event.preventDefault();
        });
    //setInterval(function () {
    //    oTable.ajax.reload();
    //}, 2000);
});

$('#deletePopupBtn').on('click', function (data) {
    $.ajax({
        type: 'POST',
        url: '/Event/Delete/' + eventId
    })
        .done(function (Data) {
            $('#successDiv').html("<strong>Success!!</strong> Data deleted successfully");
            $('#successDiv').removeClass('hidden');
            debugger;
            setTimeout(tableReload, 100);
        })
        .fail(function () {
            $('#failDiv').html("<strong>Error!!</strong> There is some error while processing your request");
            $('#failDiv').removeClass('hidden');
            event.preventDefault();
        });
});

var tableReload = function () {
    oTable.ajax.reload();
}