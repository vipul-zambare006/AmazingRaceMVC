var staffId = "";
var oTable = "";
$(document).ready(function () {
    debugger;
     oTable = $("#staff_table").DataTable({
         "ajax": {
            "scrollY": "200px",
            "scrollCollapse": true,
            "url": '/Staff/GetStaffs', // load all Staff Info in table (GetStaff methods in controller)
            "type": "get",
            "datatype": "json"
        },
        "columns": [
            { "data": "Name", "autowidth": true },
            { "data": "Location", "autowidth": true },

            {
                "data": "ID", "width": "50px", "render": function (data) {
                    return '<button id="btnEdit_' + data + '" class="btn btn-primary btn-xs editPopup">Edit</button>'
                    //return '<a class="popup" href="/Staff/Edit/' + data + '">Edit</a>'
                }
            },
            {
                "data": "ID", "width": "50px", "render": function (data) {
                    return '<button id="btnDelete_' + data + '" class="btn btn-danger btn-xs deletePopup">Delete</button>'
                    //return '<a class="popup" href="/Staff/Delete/' + data + '">Delete</a>'
                }
            }
        ]
    });

    $('.tablecontainer').on('click', '[id^="btnEdit_"]', function (e) {
        debugger;
        e.preventDefault();
        staffId = $(this).attr("ID").substring(8);
        $('#successDiv').addClass('hidden');
        $.ajax({
            type: "GET",
            url: "/Staff/Save/" + staffId,
        })

            .done(function (StaffJsonData) {
                debugger;
                $("#staffId").val(staffId);
                $("#Name").val(StaffJsonData.StaffJsonData.Name);
                $("#Location").val(StaffJsonData.StaffJsonData.Location);
                debugger;
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
        staffId = $(this).attr("ID").substring(10);
        $("#myDeleteModal").modal('show');
    });

    function OpenPopup(pageurl) {
        var $PageContent = $("<div />");
        $PageContent.load(pageurl, function () {
            $("#PopupForm", $PageContent).remove('validator');
            $("#PopupForm", $PageContent).remove('unobtrusiveValidation');
            $.validator.unobtrusive.parse('form');
        });

        $dialog = $('<div class="PopupWindow" style="overflow:auto"></div>')
            .html($PageContent)
            .dialog({
                draggable: false,
                autoOpen: false,
                resizable: false,
                model: true,
                title: 'Save Record',
                height: 400,
                width: 700,
                close: function () {
                    $dialog.dialog('distroy').remove();
                }
            });


        $('PopupWindow').on('submit', '#PopupSaveForm', function (e) {
            var url = $('#PopupSaveForm')[0].action
            $.ajax({
                type: "POST",
                url: url,
                data: $("#PopupSaveForm").serialize(),
                success: function (data) {
                    if (data.status) {
                        $dialog.dialog('close');
                        oTable.ajax.reload();
                    }
                }
            });
            e.preventDefault();
        });

        $dialog.dialog('open');
    }
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

    $("#PopupSaveForm").on("submit", function (event) {
        debugger;
        var $this = $(this);
        var staffentity = $this.serialize();
        var strng = JSON.stringify(staffentity);
        $.ajax({
            type: $this.attr('method'),
            url: '/Staff/Save',
            data: staffentity
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
    });

    $('#deletePopupBtn').on('click', function (data) {
        $.ajax({
            type: 'POST',
            url: '/Staff/Delete/' + staffId
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