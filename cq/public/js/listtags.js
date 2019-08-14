let table;

 $(document).ready(function() {
     table = $('#rajates').DataTable({
      "processing": true,
      "serverSide": true,
       "dataSrc":"",
      "ajax": {
        "url": "/showtags",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "tags"
      },
      {
        "data" : "createDate"
      },
      {
        "data" : "createdBy"
      },
      {
        "data" : null
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                  return '<span class="btn btn-warning btn-sm emailbtn actionbtns" id="deleteTag" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';               
                }
            }],
    });

     $('#refresh').on('click', function () {
        table.ajax.reload(null, false);
       });
  });



function deleteTag(ides)
{
  //console.log(namess);
  $(document).on("click", "#deleteTag", function() {

   d = $(this).parent().parent()[0].children;
   console.log(d)
   var nam = d[0].innerHTML;
  
    $.confirm({
        title: 'Delete Tag!',
        content: "Are you sure you want to delete " + nam,
        draggable: true,
        buttons: {
          Yes: {
               btnClass: 'btn-success any-other-class',
                action: function () {
                 btnClass: 'btn-red any-other-class'
               var filename = ides;
                console.log(filename);

                 var request = new XMLHttpRequest();
                 request.open('DELETE',filename);
                 request.send()
                 request.addEventListener("load",function(event)
                {
                      table.ajax.reload(null, false);
                   console.log(request.responseText);
                });  
            }
        },
          No: {
              btnClass: 'btn-danger any-other-class',
               
        },
        }
      }); 
  })
}