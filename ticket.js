document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('bookingForm');
    const ticket = document.getElementById('generatedTicket');

    // SUNET EMITERE TICKET
    function playTicketSound() {

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1);
    }

    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // PRELUARE VALORI SELECTATE DE UTILIZATOR
        const people = document.getElementById('number').value;
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const info = document.getElementById('info').value;

        // POPULAM TICKETUL
        document.getElementById('res-people').innerText = people;
        document.getElementById('res-type').innerText = type;
        document.getElementById('res-date').innerText = date;
        document.getElementById('res-time').innerText = time;
        document.getElementById('res-info').innerText = info;

        // REDARE SUNET
        playTicketSound();

        // ACTIVARE ANIMATIE TICKET
        ticket.classList.add('active');
    });
});

// BUTON RESET TICKET
function resetForm() {
    document.getElementById('generatedTicket').classList.remove('active');
    document.getElementById('bookingForm').reset();
}