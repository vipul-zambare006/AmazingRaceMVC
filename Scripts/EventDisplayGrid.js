$(function () {
    $("#list2").jqGrid({
        url: '/Event/getEvents/',
        datatype: "json",
        contentType: "application/json; charset-utf-8",
        mtype: 'GET',
        colNames: ['Id', 'Event Name', 'Event Date And Time', 'City'],
        colModel: [
            { key: true, hidden: "true", name: 'id', index: 'id', editable: false , editrules: {edithidden: true } },
            { key: false, name: 'EventName', index: 'EventName', editable: true },
            { key: false, name: 'EventDateTime', index: 'EventDateTime', editable: true },
            { key: false, name: 'City', index: 'City', editable: true }
        ],
        rowNum: 10,
        height: '100%',
        autowidth: true,
        rowList: [10, 20, 30, 40],
        pager: jQuery('#pager2'),
        sortname: 'EventName',
        viewrecords: true,
        sortorder: "asc",
        caption: "Event List",
        emptyrecords: 'No Event Records are Available to Display',
        multiselect: false
    }).navGrid('#pager2', { edit: true, add: true, del: true, search: false, refresh: true },
        {
            zIndex: 100,
            top: Math.max(0, ($(window).height() / 3)),
            left: Math.max(0, ($(window).width() / 3)),
            url: '/Event/Edit/',
            closeOnEscape: true,
            closeAfterEdit: true,
            recreateForm: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        },
        {
            zIndex: 100,
            top: Math.max(0, ($(window).height() / 3)),
            left: Math.max(0, ($(window).width() / 3)),
            url: "/Event/Create/",
            closeOnEscape: true,
            closeAfterAdd: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        },
        {
            zIndex: 100,
            top: Math.max(0, ($(window).height() / 3)),
            left: Math.max(0, ($(window).width() / 3)),
            url: "/Event/Delete/",
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            msg: "Are you sure you want to delete Student... ? ",
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        });
});