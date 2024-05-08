'use strict';

const estimatedDeliveryTime = 3600;

let timeRemaining = estimatedDeliveryTime;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} s`;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timeRemaining >= 0) {
        timerElement.textContent = formatTime(timeRemaining);
        timeRemaining -= 1;
        setTimeout(updateTimer, 1000);
    }
}

window.onload = updateTimer;