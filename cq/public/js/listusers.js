var d;
var nameses = document.getElementById("nameses");
var username = document.getElementById("username");
var phone = document.getElementById("phone");
var city = document.getElementById("city");
var status = document.getElementById("status");
var role = document.getElementById("role");
var subject = document.getElementById("subject");
var to = document.getElementById("to");
var table;

$.trumbowyg.svgPath = '/css/trumbowgy.svg';
  	$('#comment').trumbowyg();

	$(document).ready(function() {
		 table = $('#datatableses').DataTable({
			"processing": true,
			"serverSide": true,
			"ajax": {
				"url": "/showuser",
				"type": "POST",
				"data": function ( d )
            	{
                	d.role   = $('#roles').val();
                	d.status = $('#selectoption').val();
            	}, 
			},
			"columns": [
			{
				"data" : "email"
			},
			{
				"data" : "phone"
			},
			{
				"data" : "city"
			},
			{
				"data" : "status"
			},
			{
				"data" : "role"
			},
			{
				"data" : null
			},
			],
			"columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
              
                   	if(data.flag==1)
                  return '<center><span class="actionbut emailbut" id="emailbut" data-toggle="modal" data-target="#myModal"><i class="fas fa-envelope"></i></span><span class="actionbut editbut" id="editbut" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span><span class="actionbut deactivatebut" id="deactivatebut" onclick=deactivateUser("'+row._id+'","'+row.name+'","'+row.flag+'")><i class="fa fa-times-circle"></i></span></center>';               
                else
                  return '<center><span class="actionbut emailbut" id="emailbut" data-toggle="modal" data-target="#myModal"><i class="fas fa-envelope"></i></span><span class="actionbut editbut" id="editbut" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span><span class="actionbut activatebut" id="activatebut" onclick=reactivateUser("'+row._id+'","'+row.name+'","'+row.flag+'")><i class="fa fa-check-circle"></i></span></center>'

                }
            }],

		});

		 $('#refresh').on('click', function () {
        table.ajax.reload(null, false);
   		 });


        $('#selectoption').on('click', function () {
        table.ajax.reload(null, false);
    	});

    	$('#roles').on('click', function () {
        table.ajax.reload(null, false);
    });
	});


    

	$(document).on("click", "#editbut", function() {
		d = $(this).parent().parent().parent()[0].children;
		console.log(d[5].innerHTML);
		$('#username').val(d[0].innerHTML);
		$('#phone').val(d[1].innerHTML);
		$('#city').val(d[2].innerHTML);
		document.getElementById('status').value=d[3].innerHTML;
		document.getElementById('role').value=d[4].innerHTML;
		nameses.innerHTML = d[0].innerHTML
	})

	$(document).on("click", "#emailbut", function() {
		d = $(this).parent().parent().parent()[0].children;
		console.log(d[0]);
		$('#to').val(d[0].innerHTML);
	})

	function updateuserdetails()
	{
		console.log('d')
		if(phone.value.length < 10 || phone.value.length > 10)
		{
			$.confirm({
    	title: 'Invalid! Phone Number',
    	content: "Phone number is not valid",
    	draggable: true,
    	zIndex: 99999,
   		buttons: {
        OK: {
            btnClass: 'btn-danger any-other-class',
             action: function () {      
        	}
   		},
    	}
		});
			return false;
		}
		var obj1 = Object()
			obj1.email = username.value;
			obj1.phone = phone.value;
			obj1.city = city.value;
			obj1.status = document.getElementById("status").value;
			obj1.role = role.value;
			console.log(obj1)
			var request = new XMLHttpRequest();
			request.open('POST', '/updateuserdetails');
			request.setRequestHeader("Content-Type","application/json");
			request.send(JSON.stringify(obj1))
			request.addEventListener("load",function()
        	{
         		 console.log(request.responseText);
        	});
        	table.ajax.reload(null, false);
	}

	function sendmail()
	{
		console.log('m');
		var data = new Object()
			data.to=to.value;
			data.from="codemailler12@gmail.com";
			data.subject=subject.value;
			data.html= $("#comment").val();
		
		console.log(data);
		var request = new XMLHttpRequest();
			request.open('POST', '/sendMail');
			request.setRequestHeader("Content-Type","application/json");
			request.send(JSON.stringify(data))
			request.addEventListener("load",function()
        	{
         		 console.log(request.responseText);
        	});
	}


function deactivateUser(ides,namess,flages)
{
		var obj1 = new Object();
				obj1._id = ides;
				obj1.flag = 0;
				console.log(obj1._id);
	$.confirm({
    	title: 'Deactivate User ?',
    	content: "Are you sure to Deactivate " + namess,
    	draggable: true,
   		buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
            	action: function () {
            	 btnClass: 'btn-red any-other-class'
            	 var request = new XMLHttpRequest()
				request.open('POST','/deativateuserdata');
				request.setRequestHeader("Content-Type","application/json");
				request.send(JSON.stringify(obj1))
				request.addEventListener("load",function()
        		{
         			 console.log(request.responseText);
         			table.ajax.reload(null, false);
        		});				
        	}
   		},
        No: {
            btnClass: 'btn-danger any-other-class',
             action: function () {      
        	}
   		},
    	}
		});
}

function reactivateUser(ides,namess,flages)
{
		var obj1 = new Object();
				obj1._id = ides;
				obj1.flag = 1;
				console.log(obj1._id);
	$.confirm({
    	title: 'Deactivate User ?',
    	content: "Are you sure to Reactivate " + namess,
    	draggable: true,
   		buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
            	action: function () {
            	 btnClass: 'btn-red any-other-class'
            	var request = new XMLHttpRequest()
				request.open('POST','/reativateuserdata');
				request.setRequestHeader("Content-Type","application/json");
				request.send(JSON.stringify(obj1))
				request.addEventListener("load",function()
        		{
         			 console.log(request.responseText);
         			  table.ajax.reload(null, false);
        		});			
        	}
   		},
        No: {
            btnClass: 'btn-danger any-other-class',
             action: function () {      
        	}
   		},
    	}
		});
}

