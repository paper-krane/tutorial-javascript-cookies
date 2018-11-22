// Global variables
var nonCookieSection = document.querySelector('.no-cookie');
var cookieSection = document.querySelector('.cookie');
var sectionOne = document.querySelector('.section-1');
var sectionTwo = document.querySelector('.section-2');
var sectionThree = document.querySelector('.section-3');

// AJAX getting the daily horoscope
function getmessage(zodiacSign) {
    var xhttp = new XMLHttpRequest();
    var horoscrope;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           horoscrope = JSON.parse(this.response);

           var zodiacSymbol = document.querySelector('.' + zodiacSign).cloneNode(true);

           document.getElementById('link').href = horoscrope.dailyhoroscope[zodiacSign].split('<a')[1].split('"')[1];
           document.getElementById('sign').appendChild(zodiacSymbol);
           document.getElementById('horoscrope').innerText = horoscrope.dailyhoroscope[zodiacSign].split('<a')[0];
        }
    };
    xhttp.open("GET", "https://www.horoscopes-and-astrology.com/json", true);
    xhttp.send();
}


// View submitted results
function viewResults() {
    if (sectionThree.classList.contains('active')) {
        sectionThree.classList.remove('active');
        sectionThree.addEventListener('transitionend', function(){

            nonCookieSection.style.display = 'none';
            cookieSection.style.display = 'block';
            setTimeout(function(){
                cookieSection.classList.add('revealed');
            }, 100);

        }, false);
    } else {
        cookieSection.style.display = 'block';
        setTimeout(function(){
            cookieSection.classList.add('revealed');
        }, 100);
    }
}



if (false) {

    document.querySelector('.cookie-name').innerText = retrieveCookie("name");
    getmessage(retrieveCookie("zodiac"));
    setTimeout(viewResults(), 1000);

} else {

    var greeting = document.querySelector('.greeting');
    var firstName = document.querySelector('.firstName');
    var thanks = document.querySelector('.thanks');
    var zodiac = document.querySelector('.zodiac-question');
    var acknowledge = document.querySelector('.acknowledge');
    var finalMessage = document.querySelector('.final-message');
    var textInputs = document.querySelectorAll('[type=text]');
    var zodiacSigns = document.querySelectorAll('.zodiac-sign');
    var inputedName = document.getElementById('input-name');

    nonCookieSection.style.display = 'block';
    nonCookieSection.classList.add('revealed');

    // Prevent users from submitting webform with Enter
    document.addEventListener('keydown', function(e){if(e.which == 13 || e.keyCode == 13) {e.preventDefault(); return false;}}, false);

    // Set sections to fade in on transition / animation ending
    greeting.addEventListener('webkitAnimationEnd', function() {greeting.parentNode.removeChild(greeting);firstName.style.display = 'block';firstName.classList.add('active');}, false);
    greeting.addEventListener('animationEnd', function() {greeting.parentNode.removeChild(greeting);firstName.style.display = 'block';firstName.classList.add('active');}, false);

    // Reveal first name input field
    firstName.addEventListener('webkitAnimationEnd', function() {
        firstName.parentNode.removeChild(firstName);
        sectionOne.classList.add('active');
        sectionOne.addEventListener('transitionend', function() {
            sectionOne.querySelector('#name').focus();
        }, false);
    }, false);
    firstName.addEventListener('animationEnd', function() {
        firstName.parentNode.removeChild(firstName);
        sectionOne.classList.add('active');
        sectionOne.addEventListener('transitionend', function() {
            sectionOne.querySelector('#name').focus();
        }, false);
    }, false);

    // Listen for fadeout of section 1
    var nextOne = document.getElementById('next-one');

    nextOne.addEventListener('click', function(){
        inputedName.innerText = sectionOne.querySelector('#name').value;
        document.querySelector('.cookie-name').innerText = sectionOne.querySelector('#name').value;

        sectionOne.classList.remove('active');
        sectionOne.addEventListener('transitionend', function(){
            thanks.style.display = 'block';
            thanks.classList.add('active');
        }, false);
    }, false);

    // Thanks fadeout
    thanks.addEventListener('webkitAnimationEnd', function(){thanks.parentNode.removeChild(thanks);zodiac.style.display = 'block';zodiac.classList.add('active');}, false);
    thanks.addEventListener('animationEnd', function(){thanks.parentNode.removeChild(thanks);zodiac.style.display = 'block';zodiac.classList.add('active');}, false);

    // Zodiac fadeout
    zodiac.addEventListener('webkitAnimationEnd', function(){
        zodiac.parentNode.removeChild(zodiac);
        sectionTwo.classList.add('active');
    },false);
    zodiac.addEventListener('animationEnd', function(){
        zodiac.parentNode.removeChild(zodiac);
        sectionTwo.classList.add('active');
    },false);

    // Zodiac selection click event
    for (var a = 0; a < zodiacSigns.length; a++) {
        zodiacSigns[a].addEventListener('click', function(){
            document.getElementById('zodiac').value = this.querySelector('.title').innerText;
            sectionTwo.classList.remove('active');

            getmessage(this.querySelector('.title').innerText);

            sectionTwo.addEventListener('transitionend', function(){
                acknowledge.style.display = 'block';
                acknowledge.classList.add('active');
            }, false);
        }, false);
    }

    // Acknowledgement fadeout
    acknowledge.addEventListener('webkitAnimationEnd',function(){acknowledge.parentNode.removeChild(acknowledge);finalMessage.style.display = 'block';finalMessage.classList.add('active');}, false);
    acknowledge.addEventListener('animationEnd',function(){acknowledge.parentNode.removeChild(acknowledge);finalMessage.style.display = 'block';finalMessage.classList.add('active');}, false);

    // Final message
    finalMessage.addEventListener('webkitAnimationEnd',function(){finalMessage.parentNode.removeChild(finalMessage);sectionThree.classList.add('active');}, false);
    finalMessage.addEventListener('animationEnd',function(){finalMessage.parentNode.removeChild(finalMessage);sectionThree.classList.add('active');}, false);

    // Event listeners checking if form field has been filled
    for (var i = 0; i < textInputs.length; i++) {
        textInputs[i].addEventListener('keyup', function() {
            if (this.value == '') {
                this.nextElementSibling.classList.remove('visible');
            } else {
                this.nextElementSibling.classList.add('visible');
            }
        }, false);
    }

}
