function isControlGroup()
{
    return Number(getUUID()) % 2 == 0;
}

function hideNextLesson()
{
    var next_linear_div = document.getElementById("next-lesson-a");
    var next_nonlin_div = document.getElementById("next-lesson-b");

    if(isControlGroup())
    {
        next_nonlin_div.style.display = "none";
    }
    else
    {
        next_linear_div.style.display = "none";
    }
}

function hideHomePage()
{
    var linear_home = document.getElementById("post-list");
    var nonlin_home = document.getElementById("course-map");
    
    if(isControlGroup())
    {
        nonlin_home.style.display = "none";
    }
    else
    {
        linear_home.style.display = "none";
    }
}