$(document).ready(function () {

  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });



  // CAROUSEL WITH IMAGES
  var currentSlide;
  var rand;
  $(document).ready(function () {
    currentSlide = Math.floor((Math.random() * $('.item').length));
    rand = currentSlide;
    $('#myCarousel').carousel(currentSlide);
    $('#myCarousel').fadeIn(5000);
    setInterval(function () {
      while (rand == currentSlide) {
        rand = Math.floor((Math.random() * $('.item').length));
      }
      currentSlide = rand;
      $('#myCarousel').carousel(rand);
    }, 5000);
  });

  $('.carousel').carousel({
    interval: 5000
  })

  setInterval(function () {
    $('.count').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 3500,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
  }, 5300);


  
// CHANGING TEXT IN ABOUT US SECTION
$(function () {
  count = -1;
  wordsArray = ["PROFESSIONAL FISHING", "SWIMMING", "JET SKI", "WATER SKIING", "SCUBA DIVING", "SEA WATER JACUZZI", "WATER PARK", "DUTY FREE SHOPPING", "SAUNA", "FRESH FISH MENU"]; //change this text items to your own
  
  setInterval(function () {
    count++;
    $("#word").fadeOut(400, function () {
      $(this).text(wordsArray[count % wordsArray.length]).fadeIn(400);
    });
  }, 1700); // set interval time
});








})