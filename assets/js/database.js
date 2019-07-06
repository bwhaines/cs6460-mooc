var db = firebase.database();

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
