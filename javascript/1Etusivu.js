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

feedbackLink.addEventListener('click', function (event) {
    event.preventDefault();
    openModal();
});

function openModal() {
    const modal = document.querySelector('dialog');
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        modal.close();
    });

    modalContent.appendChild(closeButton);

    const form = document.createElement('form');
    form.id = 'feedbackForm';

    form.innerHTML = `
        <label for="name">Nimi:</label>
        <input type="text" id="name" name="name" required><br>

        <label for="email">Sähköposti:</label>
        <input type="email" id="email" name="email" required><br>

        <label for="feedbackType">Palautteen tyyppi:</label>
        <select id="feedbackType" name="feedbackType">
            <option value="" disabled selected>Valitse...</option>
            <option value="general">Yleinen palaute</option>
            <option value="question">Kysymys</option>
            <option value="suggestion">Ehdotus</option>
            <option value="problem">Ongelma</option>
            <option value="praise">Kehut</option>
        </select><br>

        <label for="message">Viesti:</label><br>
        <textarea id="message" name="message" rows="4" cols="50" required></textarea><br>

        <input type="submit" value="Lähetä">
    `;

    modalContent.appendChild(form);

    modal.innerHTML = '';
    modal.appendChild(modalContent);

    modal.showModal();
}




