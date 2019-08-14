var showtags = document.getElementById('showtags');
var submit = document.getElementById('submit-btn');
var tagvalue = document.getElementById('taging');
var flag = 1;

var colorLi = document.getElementById("sidebar-tags");
colorLi.setAttribute("style", "background-color:#337ab7");

showtags.addEventListener("click", function() {
    window.location = "/listuserstags"
})

submit.addEventListener("click", function() {



    if(tagvalue.value == '')
    {
        alert("Tag can't be empty");
       location.reload();
        return false;
    }

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

    var obj = new Object();
    obj.tags = tagvalue.value;

    tagvalue.value="";
    
    obj.createDate = today;

    console.log(obj);
    if(flag == 1)
    {

        var request = new XMLHttpRequest();
        request.open('POST',"/addtagtobase");
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify(obj))
        request.addEventListener("load",function() {
            console.log("Data Posted Successfully");
             document.querySelector('.added').innerHTML = 'Saved'
            document.querySelector('.added').classList.add('animate')
            alert("Tag Added Successfully")
            document.getElementById("tag_info").style.display = 'none';
        });  

    }
    else
    {
        alert("Tag Exist")
        document.getElementById("tag_info").style.display = 'none';
     //window.location = "/tag"
    }
})


function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

function checkTagAvail()
{
    flag = 1;
    document.getElementById("tag_info").style.display = 'block';
    
    var obj1 = new Object();
    obj1.tags = tagvalue.value;
    
    var request = new XMLHttpRequest();
    request.open('POST',"/checktag");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({tags: tagvalue.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            flag = 2;
            display_email.innerHTML= obj1.tags + " is already exist";
        }
        else {
            display_email.innerHTML= obj1.tags + " is available";
        }
    });  
}