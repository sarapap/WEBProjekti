'use strict';

/*funktio kielen vaihtoon */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/* modaali lomakkeelle */
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
    const selectedLanguage = getSelectedLanguage();

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
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Form submitted successfully!");
                        break;
                    case 'CN':
                        alert("表格已成功提交！");
                        break;
                    case 'ET':
                        alert("Vorm on edukalt saadetud!");
                        break;
                    case 'SV':
                        alert("Formuläret har skickats framgångsrikt!");
                        break;
                    case 'FI':
                    default:
                        alert("Lomake lähetetty onnistuneesti!");
                        break;
                }
                window.location.href = targetPage;
            },
            function (error) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Failed to send the form. Please try again later.");
                        break;
                    case 'CN':
                        alert("提交表格失败。请稍后再试。");
                        break;
                    case 'ET':
                        alert("Vormi saatmine ebaõnnestus. Palun proovi hiljem uuesti.");
                        break;
                    case 'SV':
                        alert("Misslyckades med att skicka formuläret. Försök igen senare.");
                        break;
                    case 'FI':
                    default:
                        alert("Lomakkeen lähetys epäonnistui. Yritä uudelleen myöhemmin.");
                        break;
                }
            }
        );

    return false;
}
