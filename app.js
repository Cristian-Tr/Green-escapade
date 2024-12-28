
document.addEventListener('DOMContentLoaded', function () {


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