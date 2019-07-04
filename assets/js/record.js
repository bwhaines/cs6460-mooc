// Generate UUID for user, taken from https://gist.github.com/jed/982883
function b(a)
{
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
}

// Check for cookie existence
function getCookieValue(name)
{
    name+="=";
    var ca = decodeURIComponent(document.cookie).split(';');
    for(var index=0; index < ca.length; index++)
    {
        var c = ca[index];
        while (c.charAt(0)==' ') { c=c.substring(1); }
        if(c.indexOf(name)==0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Add new cookie for page
function setCookie(name,val)
{
    document.cookie=name+"="+val+"; expires=Sun, 01 Sept 2019 00:00:00 UTC; path=/;";
}

// Return user UUID, generating one if it doesn't exist
function getUUID()
{
    var uuid = getCookieValue("uuid");
    if(uuid=="")
    {
        uuid=b();
        setCookie("uuid",uuid);
    }
    return uuid;
}

// Show the main page modal if the user doesn't have an ID yet
function checkModal()
{
    if(getCookieValue("uuid")=="")
    {
        var modal = document.getElementById("intro-modal");
        var closeBtn = document.getElementById("close-btn");

        modal.style.display = "block";
        closeBtn.onclick = function() { modal.style.display = "none"; }
    }
}