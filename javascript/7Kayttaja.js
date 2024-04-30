'use strict';

function logOut() {
    localStorage.removeItem('authToken');

    const kieli = document.getElementById('kieli');
    const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

    let logoutPage = '';
    switch (selectedLanguage) {
        case 'EN':
            logoutPage = '11Login_en.html';
            break;
        case 'CN':
            logoutPage = '11Login_cn.html';
            break;
        case 'ET':
            logoutPage = '11Login_et.html';
            break;
        case 'SV':
            logoutPage = '11Login_sv.html';
            break;
        case 'FI':
        default:
            logoutPage = '11Login.html';
            break;
    }
    window.location.href = logoutPage;
}

document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("authToken");

    let userId;

    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        const parsedPayload = JSON.parse(payload);

        userId = parsedPayload.asiakas_id;

        const response = await fetch(`http://localhost:3000/api/v1/asiakas/info/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Virhe käyttäjän tietojen hakemisessa.");
        }

        const userData = await response.json();

        console.log("Saatu käyttäjän tiedot:", userData);

        const omatTiedotSection = document.getElementById("omatiedot");

        omatTiedotSection.innerHTML = `
            <h1>Omat tiedot</h1><br>
            <p>Nimi: ${userData.nimi}</p>
            <p>Tunnus: ${userData.tunnus}</p>
            <p>Sähköposti: ${userData.email}</p>
            <p>Puhelin: ${userData.puhelin ?? 'Ei saatavilla'}</p>
            <p>Syntymäpäivä: ${userData.syntymapaiva ?? 'Ei saatavilla'}</p>
            <p>Alennusryhmä: ${userData.allennus_ryhma ?? 'Ei saatavilla'}</p>
            <label for="allergia">Ruoka-allergiat:</label><br>
            <textarea name="allergia" id="allergia">${userData.allergia ?? ''}</textarea><br>
            <button class="logOut" type="button" onclick="logOut()"><b>Kirjaudu ulos</b></button>
        `;

    } catch (error) {
        console.error("Virhe käyttäjän tietojen hakemisessa:", error.message);
    }
});


