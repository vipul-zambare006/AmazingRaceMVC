//$(function () {
//    $("#list2").jqGrid({
//        url: '/Event/getEvents/',
//        datatype: "json",
//        contentType: "application/json; charset-utf-8",
//        mtype: 'GET',
//        colNames: ['Id', 'Event Name', 'Event Date And Time', 'City'],
//        colModel: [
//            { key: true, hidden: "true", name: 'id', index: 'id', editable: false, editrules: { edithidden: true } },
//            { key: false, name: 'EventName', index: 'EventName', editable: true },
//            { key: false, name: 'EventDateTime', index: 'EventDateTime', editable: true },
//            { key: false, name: 'City', index: 'City', editable: true }
//        ],
//        rowNum: 10,
//        height: '100%',
//        autowidth: true,
//        rowList: [10, 20, 30, 40],
//        pager: jQuery('#pager2'),
//        sortname: 'EventName',
//        viewrecords: true,
//        sortorder: "asc",
//        caption: "Event List",
//        emptyrecords: 'No Event Records are Available to Display',
//        multiselect: false
//    }).navGrid('#pager2', { edit: true, add: true, del: true, search: false, refresh: true },
//        {
//            zIndex: 100,
//            top: Math.max(0, ($(window).height() / 3)),
//            left: Math.max(0, ($(window).width() / 3)),
//            url: '/Event/Edit/',
//            closeOnEscape: true,
//            closeAfterEdit: true,
//            recreateForm: true,
//            afterComplete: function (response) {
//                if (response.responseText) {
//                    alert(response.responseText);
//                }
//            }
//        },
//        {
//            zIndex: 100,
//            top: Math.max(0, ($(window).height() / 3)),
//            left: Math.max(0, ($(window).width() / 3)),
//            url: "/Event/Create/",
//            closeOnEscape: true,
//            closeAfterAdd: true,
//            afterComplete: function (response) {
//                if (response.responseText) {
//                    alert(response.responseText);
//                }
//            }
//        },
//        {
//            zIndex: 100,
//            top: Math.max(0, ($(window).height() / 3)),
//            left: Math.max(0, ($(window).width() / 3)),
//            url: "/Event/Delete/",
//            closeOnEscape: true,
//            closeAfterDelete: true,
//            recreateForm: true,
//            msg: "Are you sure you want to delete Student... ? ",
//            afterComplete: function (response) {
//                if (response.responseText) {
//                    alert(response.responseText);
//                }
//            }
//        });
//});

$(document).ready(function () {
    var oTable = $('#Event_table').DataTable({
        "ajax": {
            "url": '/Event/GetEvents',
            "type": "get",
            "datatype": "json"
        },
        "columns": [
            { "data": "EventName", "autowidth": true },
            { "data": "EventDateTime", "autowidth": true },
            { "data": "City", "autowidth": true },
            {
                "data": "Id", "width": "80px",
                "render": function (data) {
                    return '<a class="popup" href="/Event/GetPistops/' + data + '">Pitstops</a>'
                }
            },
            {
                "data": "Id", "width": "50px",
                "render": function (data) {
                    return '<a class="popup" href="/Event/save/' + data + '">Edit</a>'
                }
            },
            {
                "data": "Id", "width": "50px",
                "render": function (data) {
                    return '<a class="popup" href="/Event/delete/' + data + '">Delete</a>'
                }
            }
        ]
    });

    $('.tablecontainer').on('click', 'a.popup', function (e) {
        e.preventDefault();
        openPopup($(this).attr('href'));
    });

    //$('.popup').on('click', 'a.popup', function (e) {
    //    alert("popup called");
    //    e.preventDefault();
    //    openPopup($(this).attr('href'));
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
                success: function (data) {
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