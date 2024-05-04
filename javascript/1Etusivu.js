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

const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(feedbackForm);

    const feedbackData = {
        nimi: formData.get("name"),
        email: formData.get("email"),
        title: formData.get("feedbackType"),
        teksti: formData.get("message"),
        pvm: new Date().toISOString().split("T")[0],
    };

    try {
        const response = await fetch("http://localhost:3000/api/v1/palaute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
        });

        const kieli = document.getElementById('kieli');
        const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

        if (response.ok) {
            switch (selectedLanguage) {
                case 'EN':
                    alert("Thank you for your feedback!");
                    break;
                case 'CN':
                    alert("感谢您的反馈！");
                    break;
                case 'ET':
                    alert("Täname teie tagasiside eest!");
                    break;
                case 'SV':
                    alert("Tack för din feedback!");
                    break;
                case 'FI':
                default:
                    alert("Kiitos palautteestasi!");
                    break;
            }
            modal.close();
        } else {
            switch (selectedLanguage) {
                case 'EN':
                    alert("Failed to submit feedback. Please try again.");
                    break;
                case 'CN':
                    alert("提交反馈失败。请再试一次。");
                    break;
                case 'ET':
                    alert("Tagasiside esitamine ebaõnnestus. Proovi uuesti.");
                    break;
                case 'SV':
                    alert("Misslyckades med att skicka feedback. Försök igen.");
                    break;
                case 'FI':
                default:
                    alert("Palautteen lähettäminen epäonnistui. Yritä uudelleen.");
                    break;
            }
        }
    } catch (error) {
        const kieli = document.getElementById('kieli');
        const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

        switch (selectedLanguage) {
            case 'EN':
                alert("An error occurred while submitting feedback. Please try again later.");
                break;
            case 'CN':
                alert("提交反馈时发生错误。请稍后再试。");
                break;
            case 'ET':
                alert("Tagasiside esitamisel tekkis viga. Proovi hiljem uuesti.");
                break;
            case 'SV':
                alert("Ett fel uppstod när feedback skickades. Försök igen senare.");
                break;
            case 'FI':
                alert("Virhe palautteen lähettämisessä. Yritä myöhemmin uudelleen.");
                break;
            default:
                alert("Virhe palautteen lähettämisessä. Yritä myöhemmin uudelleen.");
                break;
        }
    }
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






