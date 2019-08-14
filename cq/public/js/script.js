// main page //

var n = document.getElementById('n');
var pass = document.getElementById('pass');
var submit = document.getElementById('submit');
var github_login = document.getElementById('github_login');

submit.addEventListener("click", function() {

    if(n.value == '' || pass.value == '')
    {
        alert("Fields can't be Empty");
        return;
    }
	//console.log(pass.value);
	var request = new XMLHttpRequest();
    request.open('POST',"/checkLogin");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name : n.value,password: pass.value}));
    request.addEventListener("load",function() {
    	var data = request.responseText;
    	if(data === 'true') {
    		console.log('hello user');
            window.location = "/home";
            //window.location.href = "h.html";
        }
        else if(data === 'false')
        {
            window.location = "/404";
        }
    	else {
            document.getElementById("wrong_id").style.display = "block";
            document.getElementById("forming").style.height = "340px";
    		console.log('getout');
            n.value = "";
            pass.value = "";
    	}
      //  console.log(data);
    });
})

github_login.addEventListener("click", function() {
    console.log('aaya github');
    window.location = "/auth/github";

})

pass.addEventListener("keyup", function() {

     if (event.keyCode === 13) {
    //console.log(pass.value);
    var request = new XMLHttpRequest();
    request.open('POST',"/checkLogin");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name : n.value,password: pass.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            console.log('hello user');
            window.location = "/home";
            //window.location.href = "h.html";
        }
        else {
            alert('Enter Correct Details')
            console.log('getout');
            n.value = "";
            pass.value = "";
        }
      //  console.log(data);
    });
}
})



