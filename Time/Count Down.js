let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let startBtn = document.getElementById('start-button');
let stopBtn = document.getElementById('stop-button');
let timerInterval;
let ticking = document.getElementById('ticking');
let alarm = document.getElementById('alarm');

startBtn.addEventListener('click', function() {
    // Get user input for hours, minutes, and seconds
    let hours = parseInt(document.getElementById('input-hours').value || 0);
    let minutes = parseInt(document.getElementById('input-minutes').value || 0);
    let seconds = parseInt(document.getElementById('input-seconds').value) || 0;

    let countdownTime = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

    // Set the target end time
    let endTime = new Date().getTime() + countdownTime;

    // Update the countdown every second
    timerInterval = setInterval(() => {

        let currentTime = new Date().getTime();

        let remainingTime = endTime - currentTime;

        // Convert remaining time to hours, minutes, and seconds
        hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // Update the display
        hrs.innerHTML = (hours < 10 ? '0' : '') + hours;
        min.innerHTML = (minutes < 10 ? '0' : '') + minutes;
        sec.innerHTML = (seconds < 10 ? '0' : '') + seconds;

        // Check if the countdown has finished
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            // ticking.pause();
            alarm.play();
        }
    }, 1000);

    ticking.play();
});

stopBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    // ticking.pause();
    alarm.pause();
});