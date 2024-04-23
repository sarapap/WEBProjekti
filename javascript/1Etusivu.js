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

        if (response.ok) {
            console.log("Palaute lähetetty onnistuneesti!");
            modal.close();
        } else {
            console.error("Palauteen lähetys epäonnistui.");
        }
    } catch (error) {
        console.error("Tapahtui virhe:", error);
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





