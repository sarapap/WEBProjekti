'use strict';

/* kuvat */
const images = [
    '../../css/kuvat/cakeMenu.jpg',
    '../../css/kuvat/pastryMenu.jpg',
    '../../css/kuvat/foodMenu.jpg',
    '../../css/kuvat/pastryMenu2.jpg',
    '../../css/kuvat/sweetMenu.jpg',
    '../../css/kuvat/cakeMenu2.jpg',
    '../../css/kuvat/drinkMenu.jpg',
    '../../css/kuvat/foodMenu2.jpg',
    '../../css/kuvat/sweetMenu2.jpg',
    '../../css/kuvat/coffeeMenu.jpg',
];
let currentIndex = 0;

function showImage(index) {
    const image = document.querySelector('.food-image');
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