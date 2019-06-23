function isControlGroup()
{
    var num = parseInt(getUUID().substr(-1),16);
    return (num % 2 == 0);
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
    var linear_home = document.getElementById("next-lesson");
    var nonlin_home = document.getElementById("course-map");
    
    if(isControlGroup())
    {
        nonlin_home.style.display = "none";
        getNextLesson();
    }
    else
    {
        linear_home.style.display = "none";
    }
}

function getNextLesson()
{
    var next_btn = document.getElementById("next-lesson-btn");

    if(getCookieValue("Conclusion Start") != "")
    {
        next_btn.innerHTML = "Final Quiz";
        next_btn.onclick = "window.location='/quiz/';";
    }
    else if(getCookieValue("Common Mistakes Start") != "")
    {
        next_btn.innerHTML = "Conclusion";
        next_btn.onclick = "window.location='/conclusion/';";
    }
    else if(getCookieValue("Chemistry Start") != "")
    {
        next_btn.innerHTML = "Common Mistakes";
        next_btn.onclick = "window.location='/mistakes/';";
    }
    else if(getCookieValue("Rust Start") != "")
    {
        next_btn.innerHTML = "Chemistry";
        next_btn.onclick = "window.location='/chemistry/';";
    }
    else if(getCookieValue("Seasoning Start") != "")
    {
        next_btn.innerHTML = "Removing Rust";
        next_btn.onclick = "window.location='/rust/';";
    }
    else if(getCookieValue("Cleaning Start") != "")
    {
        next_btn.innerHTML = "Seasoning";
        next_btn.onclick = "window.location='/Seasoning/';";
    }
    else if(getCookieValue("Baking Start") != "")
    {
        next_btn.innerHTML = "Cleaning";
        next_btn.onclick = "window.location='/cleaning/';";
    }
    else if(getCookieValue("Cooking Start") != "")
    {
        next_btn.innerHTML = "Baking";
        next_btn.onclick = "window.location='/baking/';";
    }
    else if(getCookieValue("Why Cast Iron Start") != "")
    {
        next_btn.innerHTML = "Cooking";
        next_btn.onclick = "window.location='/cooking/';";
    }
    else if(getCookieValue("Introduction Start") != "")
    {
        next_btn.innerHTML = "Why Cast Iron?";
        next_btn.onclick = "window.location='/why_cast_iron/';";
    }
    else
    {
        next_btn.innerHTML = "Introduction";
        next_btn.onclick = "window.location='/intro/';";
    }
}