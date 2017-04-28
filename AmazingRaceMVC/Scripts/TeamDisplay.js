var teamId = "";
var oTable = "";
var imagepath = "";
$(document).ready(function () {
    oTable = $("#team_table").DataTable({
        "ajax": {
            "scrollY": "200px",
            "scrollCollapse": true,
            "url": '/Team/GetTeams', // load all Staff Info in table (GetStaff methods in controller)
            "type": "get",
            "datatype": "json"
        },
        "columns": [
            { "data": "Name", "autowidth": true },
            {
                "data": "ID", "width": "50px", "render": function (data) {
                    return '<button id="btnDetail_' + data + '" class="btn btn-primary btn-xs popup">Details</button>'
                    //return '<a class="popup" href="/Team/Detail' + data + '">Details</a>'
                }
            },
            {
                "data": "ID", "width": "50px", "render": function (data) {
                    return '<button id="btnEdit_' + data + '" class="btn btn-primary btn-xs editPopup">Edit</button>'
                    //return '<a class="popup" href="/Team/Edit' + data + '">Edit</a>'
                }
            },
            {
                "data": "ID", "width": "50px", "render": function (data) {
                    return '<button id="btnDelete_' + data + '" class="btn btn-danger btn-xs deletePopup">Delete</button>'
                    //return '<a class="popup" href="/Team/Delete' + data + '">Delete</a>'
                }
            }
        ]
    });

    $('.tablecontainer').on('click', '[id^="btnEdit_"]', function (e) {
        debugger;
        e.preventDefault();
        //dropdown();
        teamId = $(this).attr("ID").substring(8);
        $('#successDiv').addClass('hidden');
        $.ajax({
            type: 'GET',
            url: '/Team/Save/' + teamId,
            
        })

            .done(function (TeamJsonData) {
                debugger;
                $("#teamId").val(teamId);
                $("#Name").val(TeamJsonData.TeamJsonData.Name);
                //$("#ImagePath").val(TeamJsonData.TeamJsonData.ImagePath);
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
        teamId = $(this).attr("ID").substring(10);
        $("#myDeleteModal").modal('show');
    });

    $('.tablecontainer').on('click', '[id^="btnDetail_"]', function (e) {
        debugger;
        e.preventDefault();
        teamId = $(this).attr("ID").substring(10);
        $('#successDiv').addClass('hidden');
        $.ajax({
            type: "GET",
            url: '/Team/Detail/' + teamId,
            contentType: 'application/json',
            success: function (Data) {
                debugger;
                alert("success");
                $("#teamName").text(Data.Data.data);
                $("#teamPhoto").text(Data.Data.imagePath);
                $("#uploadedImage").append('<img src=' + Data.Data.imagePath + ' class="img-responsive thumbnail" />');
                $("#teamEnrolledEvents").text(Data.Data.eventName);
                $('#successDiv').addClass('hidden');
                $('#failDiv').addClass('hidden');
                $("#myDetailModal").modal('show');
            },
        });
    
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

    $('#myDetailModal').on('hidden.bs.modal', function () {
        debugger;
        $(this).find("input,textarea,select").val('').end();
        $('#successDiv').addClass('hidden');
        $('#failDiv').addClass('hidden');
    });

    $("#PopupSaveForm").on("submit", function (event) {
        debugger;
        var $this = $(this);
        var teamentity = $this.serialize();
        $.ajax({
            type: $this.attr('method'),
            url: '/Team/Save',
            data: teamentity,  
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
            url: '/Team/Delete/' + teamId
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

    $('#myTeamDetail').on('click', function (data) {
        debugger;
        $.ajax({
            type: 'Get',
            url: '/Team/Details/' + teamId
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

    $('#imageBrowes').change(function () {
        debugger;
        var File = this.files;
        if (File && File[0]) {
            ReadImage(File[0]);
        }
    });
     
    var ReadImage = function (file) {
        debugger;
         //Read Image file from path
         var reader = new FileReader;
         var image = new Image;
     
         reader.readAsDataURL(file);
         reader.onload = function (_file) {
     
             image.src = _file.target.result;
             image.onload = function () {
                 var height = this.height;
                 var width = this.width;
                 var type = file.type;
                 var size = ~~(file.size / 1024) + "KB";
     
                 $("#targetImg").attr('src', _file.target.result);
                 $("#description").text("Size:" + height + "X" + width + "," + type);
                 $("#imgPreview").show();
             }
         }
     }
     
     $('#clearPreview').on('click', function () {
         debugger;
         //clear image if no need
         $("#imageBrowes").val('');
         $("#description").text('');
         $("#imgPreview").hide();
     });

     $("#cancel-detail").on('click', function () {
         debugger;
         $("#uploadedImage img:last-child").remove()         
     })
     
     $('#uploadImage').on('click', function () {
         //Upload image
         var file = $("#imageBrowes").get(0).files;
         var data = new FormData();
         data.append("ImageFile", file[0]); //ImageFile is property in TeamViewModel    
         
         $.ajax({
             type: "POST",
             url: '/Team/ImageUpload', //ImageUpload is method in Teamcontroller
             data: data,
             contentType: false,
             processData: false,
             success: function (data) {
                 debugger;                 
                 alert("Upload Successfull!!");                                  
                 $("#imagepath").val(data.imagepath);
             }
         })
     });
});

var tableReload = function () {
    oTable.ajax.reload();
}
