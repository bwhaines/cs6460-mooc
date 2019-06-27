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

// Line-drawing functions
// Adapted from https://www.beyondjava.net/how-to-connect-html-elements-with-an-arrow-using-svg

function findAbsolutePosition(htmlElement) 
{
    var x = htmlElement.offsetLeft;
    var y = htmlElement.offsetTop;
    for (var x=0, y=0, el=htmlElement; el != null; el = el.offsetParent) 
        {x += el.offsetLeft;y += el.offsetTop;}
    return {"x":x,"y":y};
}

function drawLine(x1, y1, w, h)
{
    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    var shape = document.createElementNS("http://www.w3.org/2000/svg","path");
    var path = "M "+x1+" "+y1+" L "+w+" "+h;

    shape.setAttributeNS(null,"d",path);
    shape.setAttributeNS(null,"fill","none");
    shape.setAttributeNS(null,"stroke","black");
    svg.appendChild(shape);
    svg.setAttributeNS(null,"class","line");
    document.getElementById("map-lines").appendChild(svg);
}

function connectDivs(leftId, rightId) 
{
    var left = document.getElementById(leftId);
    var right = document.getElementById(rightId);

    var leftPos = findAbsolutePosition(left);
    var x1 = leftPos.x;
    var y1 = leftPos.y;
    x1 += left.offsetWidth;
    y1 += (left.offsetHeight / 2);

    var rightPos = findAbsolutePosition(right);
    var x2 = rightPos.x;
    var y2 = rightPos.y;
    y2 += (right.offsetHeight / 2);

    var width = x2-x1;
    var height = y2-y1;

    drawLine(x1, y1, width, height);
}

function drawLines()
{
    connectDivs("intro-btn","why-btn");
    connectDivs("why-btn","cooking-btn");
    connectDivs("why-btn","baking-btn");
    connectDivs("why-btn","seasoning-btn");
    connectDivs("cooking-btn","cleaning-btn");
    connectDivs("baking-btn","cleaning-btn");
    connectDivs("seasoning-btn","rust-btn");
    connectDivs("seasoning-btn","chem-btn");
    connectDivs("cleaning-btn","mistakes-btn");
    connectDivs("rust-btn","mistakes-btn");
    connectDivs("mistakes-btn","concl-btn");
    connectDivs("concl-btn","quiz-btn");
}