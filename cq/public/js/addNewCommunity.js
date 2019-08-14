$.trumbowyg.svgPath = '/css/trumbowgy.svg';
    $('#description').trumbowyg();

var commName = document.getElementById("commName");
var description = document.getElementById("description");
var directadmin = document.getElementById("directadmin");
var permisadmin = document.getElementById("permisadmin");
//var filename = document.getElementById("filename");
var addinges = document.getElementById("adding");
var refresh = document.getElementById("first-btn");

// console.log(directadmin.checked);
// console.log(permisadmin.checked);

addinges.addEventListener("click", function() { 

    var obj1 = new Object();
    obj1.name = commName.value;
    obj1.desc = description.value;

    if(commName.value == '' || description.value == '')
    {
        alert("Field is Empty");
        return false;
    }

    if(directadmin.checked)
    {
        obj1.rule = directadmin.value;
    }
    else
    {
        obj1.rule = permisadmin.value;
    }
    obj1.commphoto = "uploads/defaultCommunity.jpg";
    obj1.location = "Not Added";
    obj1.status = "Active";

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var format = "AM";
    if(hrs>12)
    {
        hrs=hrs-12;
        format="PM";
    }
    today = + dd + '-' + getMonths(mm) + '-' + yyyy;
    today = today + " ";
    today = today + "(" + hrs + ':' + mins + '' + format + ")";
    console.log(today);

    obj1.createDate = today;
    console.log(obj1);

    var request = new XMLHttpRequest();
    request.open('POST',"/addNewCommunitytobase");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj1))
    request.addEventListener("load",function() {
        console.log("Community Posted Successfully");
        alert("New Community Is Registred");
    }); 

    
    window.location = "/addNewCommunity";

})

function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

refresh.addEventListener("click", function() {
     window.location = "/openCommunityPage";
})

function searchingCommunity()
{
    window.location = "/searchingCommunity";
}