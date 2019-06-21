var db = firebase.database();

function testRecord()
{
    var id = b();
    var tm = new Date().getTime();
    db.ref('testing/'+id).set({
        time: tm
    });
}

// Save lesson start time
function recordLessonStart(lessonName)
{
    // Check if cookie already exists so we only record times once
    if(getCookieValue(lessonName+" Start") == "")
    {
        var tm = new Date().getTime();
        // Save time to Firebase database
        db.ref(getUUID()+'/'+lessonName+'/start').set({
            time: tm
        });
        // Also save it to cookie
        setCookie(lessonName+" Start", tm);
    }
}

// Save lesson end time
function recordLessonEnd(lessonName)
{
    if(getCookieValue(lessonName+" End") == "")
    {
        var tm = new Date().getTime();
        db.ref(getUUID()+'/'+lessonName+'/end').set({
            time: tm
        });
        setCookie(lessonName+" End", tm);
    }
}

// Save quiz results
function recordQuizAnswers(responseList)
{
    // TODO
}
