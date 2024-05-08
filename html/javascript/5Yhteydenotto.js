'use strict';

const map = L.map('map').setView([60.1614905, 24.9318391], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const newIcon = L.icon({
    iconUrl: '../css/kuvat/marker.png',
    iconSize: [50, 50],

});

const marker = L.marker([60.1614905, 24.9318391], { icon: newIcon })
    .addTo(map)
    .bindPopup('S&A Cafe')
    .openPopup();
