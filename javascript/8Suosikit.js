'use strict';

let currentIndex = 0;
const images = document.querySelectorAll('.image-container img');
const imageWidth = images[0].clientWidth + 10; //lisää marginia


document.querySelector('.prev-button').addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        const transformValue = -currentIndex * imageWidth;
        document.querySelector('.image-container').style.transform = `translateX(${transformValue}px)`;
    }
});

document.querySelector('.next-button').addEventListener('click', function () {
    if (currentIndex < 4) {
        currentIndex++;
        const transformValue = -currentIndex * imageWidth;
        document.querySelector('.image-container').style.transform = `translateX(${transformValue}px)`;
    }
});

