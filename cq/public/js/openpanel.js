function openbar()
{
    var element = document.getElementById("viewscreen");
    element.classList.toggle("toggle-pc");

    var element = document.getElementById("sidebar");
    element.classList.toggle("sidebar-width");


    var element = document.getElementById("rightview");
    element.classList.toggle("set-rightview");
}

function homepage()
{
    window.location = "/home";
}

function open_adduser_page()
{
     window.location = "/addusers";
}

function openuserlist()
{
    window.location = "/userlist";
}

function communitypage()
{
    window.location = "/communityList"
}

function switchasuser()
{
      $.confirm({
    title: 'Switch as User',
    content: 'Do you really want switch state...',
    draggable: true,
    buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
            action: function () {
             btnClass: 'btn-red any-other-class'
            window.location = "/switchasuser";
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

function switchasAdmin()
{
      $.confirm({
    title: 'Switch as Admin',
    content: 'Do you really want switch state...',
    draggable: true,
    buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
            action: function () {
             btnClass: 'btn-red any-other-class'
            window.location = "/switchasadmin";
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

function opentagpage()
{
    window.location = "/userestag";
}

function changepassword()
{
    window.location = "/changePassword";
}

function editProfile()
{
    window.location = "/editUserProfile";
}

function editUserDetails() 
{
    window.location = "/editUserDetails";
}

function openlogoutpage()
{
    $.confirm({
    theme: 'supervan',
    title: 'Confirm Logout!',
    content: 'Do you really want logout?',
    draggable: true,
    buttons: {
        Yes: {
            action: function () {
             window.location = "/yes";
        }
    },
        No: {
             action: function () {
            
        }
    },
    }
    });
}

function newUsereditProfile()
{
    window.location = "/newUsereditProfile";
}

function newUserProfileDetails()
{
    window.location = "/newUserProfileDetails";
}

function newUserchangePassword()
{
  window.location = "/newUserchangePassword";   
}

function openCommunityPage()
{
    window.location = "/openCommunityPage";
}

