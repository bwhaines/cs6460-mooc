var intro_message = "Welcome to \"Cooking with Cast Iron\"!  This is an experimental online course that will record some anonymous data as you progress through the lessons.  This site will also save some cookies to your device.  If you do not agree to this, please close this page or click \'Cancel\'."

function intro_popup()
{
    // Check for existing UUID
    if(getCookieValue("uuid") != "")
    {
        if(window.confirm(intro_message))
        {
            // Generate user UUID
            getUUID();
        }
        else
        {
            window.close()
        }
    }
}
