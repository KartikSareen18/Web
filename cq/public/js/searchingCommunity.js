var refresh = document.getElementById("first-btn");
refresh.addEventListener("click", function() {
     window.location = "/openCommunityPage";
})

var searchbtn = document.getElementById("search-btn");
searchbtn.onclick = function()
{
    window.location = '/searchingCommunity';
}

var bigDiv = document.getElementById("bigDiv");

var commArr;

$(document).ready(function() {
    loadFromServer();
})

function loadFromServer()
{
    var request = new XMLHttpRequest();
    request.open('GET','/getCommunityforSearch');
    request.send();
    request.onload = function()
    {
        commArr = JSON.parse(request.responseText);
        for(i in commArr)
        {
            addToDom(commArr[i]);
        }
    }
}

document.getElementById('searchinput').onkeyup=function()
{
        document.getElementById('bigDiv').innerHTML=""
        var val=document.getElementById('searchinput').value;
        console.log(val)
        for(j in commArr)
        {     
            if((commArr[j].name).includes(val)) 
            {
                 console.log("klkl")
               // console.log(commArr[j])
                addToDom(commArr[j]);
            }
        }
}

function addToDom(ob)
{
    var filenaming = ob._id;
    console.log(filenaming);
    var parentDiv = document.createElement("div");
    parentDiv.setAttribute("class","container");

    var wrapperdiv =  document.createElement("div");
    wrapperdiv.setAttribute("class","panel panel-default");
    wrapperdiv.setAttribute("style","    box-shadow: 0 3px 10px 0 rgba(115,143,147,.3);")

    var div1 = document.createElement("div");
    div1.setAttribute("class","panel-body");
    div1.setAttribute("style","padding:0;padding-top:20px");

    var div11 = document.createElement("div");
    div11.setAttribute("class","col-sm-2 col-xs-3 col-lg-1 col-md-2");
    var img = document.createElement("img");
    img.src = "/uploads/default.png"
    img.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;background: rgb(255, 255, 255) !important;box-shadow: 0 0 10px rgba(0,0,0,0.5);")
    div11.appendChild(img);
    div1.appendChild(div11);


    var div12 = document.createElement("div");
    div12.setAttribute("class","col-sm-8 col-xs-6 col-lg-8 col-md-8");
    var a12 = document.createElement("a");
    a12.innerHTML = ob.name;
    a12.href = '/info/' + filenaming;
    div12.appendChild(a12);
    div1.appendChild(div12);

    var div13 = document.createElement("div");
    div13.setAttribute("class","col-sm-2 col-xs-3 col-lg-3 col-md-2");
    div13.setAttribute("style","padding:15px 10px 0px 10px");
    var div131 = document.createElement("div");
    var btn = document.createElement("button");
    btn.setAttribute("class","btn btn-primary btn-sm pull-right");
    if(ob.rule=="Direct")
    btn.innerHTML = "JOIN";
    else if(ob.rule=="Permission"){
        btn.innerHTML = "ASK TO JOIN";
    }
    btn.onclick=function(){

        var request = new XMLHttpRequest();
        var filename = '/joincommunity';
        request.open('POST',filename);
        request.setRequestHeader("content-Type","application/JSON");
        request.send(JSON.stringify(ob));
        request.onload = function()
        {
            console.log(request.responseText);

        }
        parentDiv.removeChild(wrapperdiv);
    }
    div131.appendChild(btn);
    div13.appendChild(div131);
    div1.appendChild(div13);

    wrapperdiv.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class","panel-body");
    div2.setAttribute("style","padding:10px 0 10px 0");

    var div21 = document.createElement("div");
    div21.setAttribute("class","col-sm-12 col-xs-12 col-lg-12 col-md-12");
    var p21 = document.createElement("p");
    p21.setAttribute("id","memeberpara");
    p21.innerHTML = ob.memberno;
    div21.appendChild(p21);
    div2.appendChild(div21);

    var div22 = document.createElement("div");
    div22.setAttribute("class","col-sm-12 col-xs-12 col-lg-12 col-md-12");
    var p22 = document.createElement("p");
    p22.setAttribute("id","descpara");
    p22.innerHTML = ob.desc;
    div22.appendChild(p22);
    div2.appendChild(div22);


    wrapperdiv.appendChild(div1);
    wrapperdiv.appendChild(div2);

    parentDiv.appendChild(wrapperdiv);
    bigDiv.appendChild(parentDiv);
    console.log(parentDiv)

}



