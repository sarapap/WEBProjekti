'use strict';

const selectedLanguage = getSelectedLanguage();
let discountYes = '';
let discountNo = '';
switch (selectedLanguage) {
    case 'EN':
        discountYes = 'Discount code accepted! You get 15 % discount.';
        discountNo = 'Invalid discount code';
        break;
    case 'CN':
        discountYes = '折扣码已接受！您将获得 15% 的折扣。';
        discountNo = '无效的折扣码';
        break;
    case 'ET':
        discountYes = 'Allahindluskood on aktsepteeritud! Saate 15% allahindlust.';
        discountNo = 'Vigane allahindluskood';
        break;
    case 'SV':
        discountYes = 'Rabattkoden accepterad! Du får 15 % rabatt.';
        discountNo = 'Ogiltig rabattkod';
        break;
    case 'FI':
    default:
        discountYes = 'Alennuskoodi hyväksytty! Saat 15 % alennusta.';
        discountNo = 'Virheellinen alennuskoodi';
        break;
}

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

    let discountResult = discountNo;

    if (discountCode === 'EnsiTilaus15') {
        discountResult = discountYes;
    } else if (discountCode === 'AlennusRyhma15') {
        discountResult = discountYes;
    }

    document.getElementById('discountResult').innerText = discountResult;
});
