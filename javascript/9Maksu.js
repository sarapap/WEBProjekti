'use strict';

const eriLaskutusCheckbox = document.getElementById('eri_laskutus');
const laskutusOsoiteDiv = document.getElementById('laskutus_osoite');

eriLaskutusCheckbox.addEventListener('change', () => {
    if (eriLaskutusCheckbox.checked) {
        laskutusOsoiteDiv.style.display = 'block';
    } else {
        laskutusOsoiteDiv.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("maksutiedotForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        vahvistaJaTyhjenna();
    });
});
