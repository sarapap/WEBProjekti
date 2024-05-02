'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');

    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);

    let userID = parsedPayload.asiakas_id;
    const userStatusElement = document.getElementById('userStatus');

    if (token) {
        fetch(`http://localhost:3000/api/v1/asiakas/alennus/${userID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isEligible) {
                    userStatusElement.style.display = 'block';
                } else {
                    userStatusElement.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Virhe tarkistettaessa käyttäjän tyyppiä:', error);
            });
    } else {
        console.error('Autentikaatiotoken puuttuu');
    }
});

/* alennuskoodit */

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Koodi kopioitu: " + text);
    }).catch(err => {
        console.error("Virhe kopioitaessa leikepöydälle:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const ensiTilausImg = document.getElementById("ensi_tilaus_img");
    const alennusRyhmaImg = document.getElementById("alennus_ryhma_img");

    ensiTilausImg.addEventListener("click", () => {
        copyToClipboard("EnsiTilaus15");
    });

    alennusRyhmaImg.addEventListener("click", () => {
        copyToClipboard("AlennusRyhma15");
    });
});