'use strict';

const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");

openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("open");
});

closeModalButton.addEventListener("click", () => {
    modal.classList.remove("open");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("open");
    }
});

/* lomake */

(function () {
    emailjs.init({
        publicKey: "mGRHyPrtmHQmZuMpt",
    });
})();

function sendEmail() {
    const kieli = document.getElementById('kieli');
    const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

    let targetPage = '';
    switch (selectedLanguage) {
        case 'EN':
            targetPage = '../../html/en/6Poytavaraus_en.html';
            break;
        case 'CN':
            targetPage = '../../html/cn/6Poytavaraus_cn.html';
            break;
        case 'ET':
            targetPage = '../../html/et/6Poytavaraus_et.html';
            break;
        case 'SV':
            targetPage = '../../html/sv/6Poytavaraus_sv.html';
            break;
        case 'FI':
        default:
            targetPage = '../../html/fi/6Poytavaraus.html';
            break;
    }

    emailjs
        .sendForm("service_r413uj9", "template_gxtq4ji", "#bookingForm")
        .then(
            function (response) {
                alert("Lomake lähetetty onnistuneesti!");
                window.location.href = targetPage;
            },
            function (error) {
                alert("Lomakkeen lähetys epäonnistui. Yritä uudelleen myöhemmin.");
            }
        );

    return false;
}
