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

document.getElementById('applyDiscountButton').addEventListener('click', () => {
    const discountCode = document.getElementById('alennus').value.trim();

    let discountResult = 'Virheellinen alennuskoodi';

    if (discountCode === 'EnsiTilaus15') {
        discountResult = 'Alennuskoodi hyväksytty! Saat 15 % alennusta.';
    } else if (discountCode === 'AlennusRyhma15') {
        discountResult = 'Alennuskoodi hyväksytty! Saat 20 % alennusta.';
    }

    document.getElementById('discountResult').innerText = discountResult;
});
