var button=document.getElementById("submit_button");
var inp=document.getElementById("in");
var tbody=document.getElementById("tab");
var array=[];
var array1=[];
button.addEventListener("click",function(){
	if(inp.value=="")
		alert("Provide Input!");
	else
	{
		array.push(inp.value);
		array1.push(new Date().toString());
		generateRows();
	}
});


function generateRows()
{
	tbody.innerHTML="";
	for(var i=0;i<array.length;i++)
	{
		var row=document.createElement("tr");
		row.setAttribute("id",i);
	
		var sno=document.createElement("td");
		sno.innerHTML=i+1;
		row.appendChild(sno);
		
		var task=document.createElement("td");
		task.innerHTML=array[i];
		row.appendChild(task);
	
		var date=document.createElement("td");
		date.innerHTML=array1[i];
		row.appendChild(date);
	
		var del=document.createElement("td");
		var btn=document.createElement("button");
		btn.innerHTML="X";
		btn.setAttribute("class","del");
		btn.addEventListener("click",function(e)
		{
			array.splice(e.target.parentNode.parentNode.id,1);
			array1.splice(e.target.parentNode.parentNode.id,1);
			generateRows();
		});
		del.appendChild(btn);
		row.appendChild(del);
		tbody.appendChild(row);
		inp.value="";
	}
}