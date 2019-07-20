var div1=document.getElementById("div");
var users=[];
createPannel();
function createPannel()
{
	var login=document.createElement("button");
	login.innerHTML="SIGN IN";
	login.setAttribute("style","font-weight:bold;font-size:15px");
	//login.setAttribute("style","");
	var register=document.createElement("button");
	register.innerHTML="SIGN UP";
	register.setAttribute("style","font-weight:bold;font-size:15px");
	div1.appendChild(login);
	div1.appendChild(register);
	login.addEventListener("click",function(e)
								{
									createLoginPannel();
									
								});

	register.addEventListener("click",function(e)
									{
										div1.innerHTML="";
										var input=document.createElement("input");
										input.setAttribute("placeholder","Enter Username");
										div1.appendChild(input);
									
										insertBreakLine(div1);
									
										var input1=document.createElement("input");
										input1.setAttribute("placeholder","Enter Password");
										div1.appendChild(input1);
									
										insertBreakLine(div1);
										
										var btn=document.createElement("button");
										btn.innerHTML="SIGN UP";
										btn.setAttribute("style","font-weight:bold;font-size:15px");
										div1.appendChild(btn);
										btn.addEventListener("click",function(event)
										{
											if(input1.value=="" || input.value=="")
												alert("All fields are required!");
											else
												addUser(input,input1);
										});
									});

}

function createLoginPannel()
{
	div1.innerHTML="";
	var input=document.createElement("input");
	input.setAttribute("placeholder","Enter Username");
	div1.appendChild(input);
				
	insertBreakLine(div1);
								
	var input1=document.createElement("input");
	input1.setAttribute("placeholder","Enter Password");
	div1.appendChild(input1);
									
	insertBreakLine(div1);
									
	var btn=document.createElement("button");
	btn.innerHTML="LOGIN";
	btn.setAttribute("style","font-weight:bold;font-size:15px");
	div1.appendChild(btn);
	btn.addEventListener("click",function(event)
									{
										if(input1.value=="" || input.value=="")
											alert("All fields are required!");
										else
											verifyUser(input,input1);
									});
}

function addUser(a,b)
{
	var obj=new Object();
	obj.name=a.value;
	obj.password=b.value;
	users.push(obj);
	alert("Sign Up successful!");
	div1.innerHTML="";
	createPannel();
	//div1.innerHTML="Sign Up successful!";
}

function insertBreakLine(targetElement)
{
	var br=document.createElement("br");
	targetElement.appendChild(br);
}

function verifyUser(a,b)
{
	console.log(users);
	var flag=0;
	for(var i=0;i<users.length;i++)
	{
		if(users[i].name==a.value)
		{
			if(users[i].password!=b.value)
			{
				
				alert("Wrong Password!");
			}
			else
			{
				alert("Login Successfull!");
				div1.innerHTML="Login successful!";
				flag=1;
				break;
			}
		}
	}
	if(flag==0)
	{
		alert("Invalid Username!");
		div.innerHTML="";
		createPannel();
	}
}