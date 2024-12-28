
document.addEventListener('DOMContentLoaded', function () {


  function loadvideo() {
    var mobileSrc = "/boats-small.mp4";
    var desktopSrc = "/boats-large.mp4";
     
       if (window.innerWidth > 630){
           $("#video").attr("src",desktopSrc);
        }else{
           $("#video").attr("src",mobileSrc);
        }
    }
    
      window.addEventListener("resize", loadvideo);
      window.onload=loadvideo; 



  //Buttons
  var button = document.querySelector('#like-btn1');
  var counter = 1;
  button.addEventListener('click', function () {
    document.querySelector('#like-btn1 span').innerText = counter;
    counter++;
  });

  var button = document.querySelector('#like-btn2');
  var counter = 1;
  button.addEventListener('click', function () {
    document.querySelector('#like-btn2 span').innerText = counter;
    counter++;
  });

  var button = document.querySelector('#like-btn3');
  var counter = 1;
  button.addEventListener('click', function () {
    document.querySelector('#like-btn3 span').innerText = counter;
    counter++;
  });

  var button = document.querySelector('#like-btn4');
  var counter = 1;
  button.addEventListener('click', function () {
    document.querySelector('#like-btn4 span').innerText = counter;
    counter++;
  });


}); 