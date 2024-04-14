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





