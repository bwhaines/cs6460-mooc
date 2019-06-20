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
    var tm = new Date().getTime();
    var id = getUUID();
    db.ref(id+'/'+lessonName+'/start').set({
        time: tm
    });
}

// Save lesson end time
function recordLessonEnd(lessonName)
{
    var tm = new Date().getTime();
    var id = getUUID();
    db.ref(id+'/'+lessonName+'/end').set({
        time: tm
    });
}

// Save quiz results
function recordQuizAnswers(responseList)
{
    // TODO
}
