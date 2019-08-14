var n = document.getElementById('name');
var email = document.getElementById('email2');
var pass = document.getElementById('password2');
var phone = document.getElementById('phone');
var city = document.getElementById('City');
var role = document.getElementById('roleid');
var gender = document.getElementById('genderid')
var adding = document.getElementById('submit-btn');
var cancelling = document.getElementById('cancel-btn');
var display_email = document.getElementById("display_email");

var colorLi = document.getElementById("sidebar-adduser");
colorLi.setAttribute("style", "background-color:#337ab7");

adding.addEventListener("click", function() {  

	var ph = phone.value;

	if(name.value == '' || email.value == '' || phone.value == '' || city.value == '')
	{
		
			alert("Field can't be Empty");
			return false;
	}
	else if(ph.length<10)
	{
		alert('Phone No should be of length 10');
		return;
	}

	if(!ValidateEmail(email.value))
	{
		alert('Email format is not valid')
		return;
	}
	
	var obj = new Object();
	obj.name = n.value;
	obj.email = email.value;
	obj.password = pass.value;
	obj.phone = phone.value;
	obj.city = city.value;
	obj.gender = gender.value;
	obj.dob = '';
	obj.role = role.value;
	obj.status = 'Pending';
	obj.flag = 1;
	obj.interest = '';
	obj.bitmore = '';
	obj.expectation = '';
	obj.photoname = 'default.png'

   	var request = new XMLHttpRequest();
    request.open('POST',"/addnewuser");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        console.log("Data Posted Successfully");
        alert("New User Is Registred");
    });  
    window.location = "/addusers";
})

function ValidateEmail(mail) 
{
	console.log('vv')
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

cancelling.addEventListener("click", function(){
	window.location = "/addusers";
})

function email_avail()
{
	document.getElementById("email_info").style.display = 'block';
	document.getElementById("email_info").style.marginTop = '10px';
	document.getElementById("email_info").style.marginBottom = '10px';
	
	var obj1 = new Object();
	obj1.email = email.value;
	
	var request = new XMLHttpRequest();
    request.open('POST',"/checkemail");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({email: email.value}));
    request.addEventListener("load",function() {
    	var data = request.responseText;
    	if(data === 'true') {
    		display_email.innerHTML= "User " + obj1.email + " is already exist";
    	}
    	else {
            display_email.innerHTML= obj1.email + " is available";
    	}
    });  
}

	function sendmail()
	{
		console.log('m');
				var data = new Object()
			data.to=email.value;
			data.from="codemailler12@gmail.com";
			data.subject="Confirmation Mail";
			data.text= "Hi " + n.value + " Please Confirm your Email-Id! and kindly enter this password to login = " + pass.value;
		
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