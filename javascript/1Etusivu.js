'use strict';

/* dropdown menu */

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const menuDropdown = document.getElementById("menuDropdown");

    menuButton.addEventListener("click", function () {
        if (menuDropdown.style.display === "block") {
            menuDropdown.style.display = "none";
        } else {
            menuDropdown.style.display = "block";
        }
    });
});

/* palaute */

const feedbackLink = document.getElementById("openModal");
const modal = document.getElementById("feedbackModal");
const closeButton = document.getElementById("closeModal");

feedbackLink.addEventListener('click', function (event) {
    event.preventDefault();
    modal.showModal();
});

closeButton.addEventListener('click', function () {
    modal.close();
});

/* kuvat */
const images = [
    '../../css/kuvat/weddingCake.jpg',
    '../../css/kuvat/chocolateCake.jpg',
    '../../css/kuvat/weddingCake2.jpg'
];
let currentIndex = 0;

function showImage(index) {
    const image = document.querySelector('.imageFront');
    image.src = images[index];
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}





