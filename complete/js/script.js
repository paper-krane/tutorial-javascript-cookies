var submitButton = document.querySelector('.next[type=submit]');

// Create cookie
function createCookie(name, value) {
    var currentDate = new Date();
    var expDate = new Date((currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + (currentDate.getFullYear() + 1)).toUTCString();

    document.cookie = name + "=" + value + ";expires=" + expDate + ";path=/";
}

// Retrieve cookie
function retrieveCookie(cookieName) {
    var name = cookieName + "=";
    var splitCookie = document.cookie.split(';');

    for(var i = 0; i < splitCookie.length; i++) {
        var details = splitCookie[i];

        while (details.charAt(0) == ' ') {
            details = details.substring(1);
        }
        if (details.indexOf(name) == 0) {
            return details.substring(name.length, details.length);
        }
    }
    return "";
}

// When details have been submitted
submitButton.addEventListener('click', function(e){
    e.preventDefault();

    var name = document.querySelector('#name').value;
    var zodiac = document.querySelector('#zodiac').value;

    createCookie("name", name);
    createCookie("zodiac", zodiac);

    // Displays horoscope results on form submission
    viewResults();
}, false);
