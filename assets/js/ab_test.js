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

function setLessonBtn(btn,label,link)
{
    btn.innerHTML = label;
    btn.setAttributeNS(null,"onclick","window.location='/"+link+"/';");
}

function getNextLesson()
{
    var next_btn = document.getElementById("next-lesson-btn");

    if(getCookieValue("Conclusion Start") != "")
    {
        setLessonBtn(next_btn,"Final Quiz","quiz");
    }
    else if(getCookieValue("Common Mistakes Start") != "")
    {
        setLessonBtn(next_btn,"Conclusion","conclusion");
    }
    else if(getCookieValue("Chemistry of Soap Start") != "")
    {
        setLessonBtn(next_btn,"Common Mistakes","mistakes");
    }
    else if(getCookieValue("Removing Rust Start") != "")
    {
        setLessonBtn(next_btn,"Chemistry","chemistry");
    }
    else if(getCookieValue("Seasoning Start") != "")
    {
        setLessonBtn(next_btn,"Removing Rust","rust");
    }
    else if(getCookieValue("Cleaning Start") != "")
    {
        setLessonBtn(next_btn,"Seasoning","seasoning");
    }
    else if(getCookieValue("Baking Start") != "")
    {
        setLessonBtn(next_btn,"Cleaning","cleaning");
    }
    else if(getCookieValue("Cooking Start") != "")
    {
        setLessonBtn(next_btn,"Baking","baking");
    }
    else if(getCookieValue("Why Cast Iron Start") != "")
    {
        setLessonBtn(next_btn,"Cooking","cooking");
    }
    else if(getCookieValue("Introduction Start") != "")
    {
        setLessonBtn(next_btn,"Why Cast Iron?","why_cast_iron");
    }
    else
    {
        setLessonBtn(next_btn,"Introduction","introduction");
    }
}
