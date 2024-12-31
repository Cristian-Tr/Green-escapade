
document.addEventListener('DOMContentLoaded', function () {



  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const number = document.getElementById("number").value;
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const info = document.getElementById("info").value;

    document.getElementById("ticketNumber").textContent = number;
    document.getElementById("ticketType").textContent = type;
    document.getElementById("ticketDate").textContent = date;
    document.getElementById("ticketTime").textContent = time;
    document.getElementById("ticketInfo").textContent = info;

    document.getElementById("ticket").style.display = "block";
    document.getElementById("ticket").classList.add("zoomIn");
});

function printTicket() {
    const ticket = document.getElementById('ticket');
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>TICKET DETAILS</title></head><body>');
    printWindow.document.write(ticket.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}

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