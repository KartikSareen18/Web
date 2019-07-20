var inp=document.getElementById("input");
var pause=document.getElementById("pause");
var start=document.getElementById("start");
var stop=document.getElementById("stop");
var a=0;
inp.value=a;
inp.addEventListener("input",function(e)
								{
									a=inp.value;
								});
start.addEventListener("click",function(e)
								{
									var x=setInterval(function()
									{
										pause.addEventListener("click",function(e)
										{
											clearInterval(x);
										});
										stop.addEventListener("click",function(e)
										{
											inp.value=a;
											clearInterval(x);
										});
										inp.value=inp.value-1;
										if (inp.value<0) {
											clearInterval(x);
											alert("TIMER EXPIRED!");
											inp.value=0;
										}
									},1000);
								});
