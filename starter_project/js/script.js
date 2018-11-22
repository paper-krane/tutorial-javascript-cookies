var submitButton = document.querySelector('.next[type=submit]');

// When details have been submitted
submitButton.addEventListener('click', function(e){
    e.preventDefault();

    

    // Displays horoscope results on form submission
    viewResults();
}, false);
