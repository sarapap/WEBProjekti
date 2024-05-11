'use strict';

/**
 * Hakee valitun kielen HTML-elementistä ja palauttaa sen.
 *
 * @returns {string} Valittu kieli, oletusarvoisesti 'FI'.
 */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/**
 * Käsittelee tietojen päivityslomakkeen lähettämisen.
 *
 * @param {Event} event - Lomakkeen lähetyksen tapahtuma.
 */
async function submitForm(event) {
    event.preventDefault();  // Estää lomakkeen oletuskäytöksen
    const form = document.getElementById("editForm");
    const formData = new FormData(form);
    const token = localStorage.getItem("authToken");
    const selectedLanguage = getSelectedLanguage();

    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;  // Muuntaa FormData-objektin tavalliseksi objektiksi
    }

    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);
    const userId = parsedPayload.asiakas_id;

    try {
        const response = await fetch(`http://localhost:3000/api/v1/asiakas/info/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(data),  // Lähettää lomakkeen tiedot JSON-muodossa
        });

        if (response.ok) {
            let targetPage = '';  // Määrittää sivun, jonne siirrytään onnistumisen jälkeen
            switch (selectedLanguage) {
                case 'EN':
                    alert("Information updated successfully.");
                    targetPage = '../../html/en/7Kayttaja_en.html';
                    break;
                case 'CN':
                    alert("信息已成功更新。");
                    targetPage = '../../html/cn/7Kayttaja_cn.html';
                    break;
                case 'ET':
                    alert("Teave on edukalt uuendatud.");
                    targetPage = '../../html/et/7Kayttaja_et.html';
                    break;
                case 'SV':
                    alert("Informationen har uppdaterats framgångsrikt.");
                    targetPage = '../../html/sv/7Kayttaja_sv.html';
                    break;
                case 'FI':
                default:
                    alert("Tiedot päivitetty onnistuneesti.");
                    targetPage = '../../html/fi/7Kayttaja.html';
                    break;
            }
            window.location.href = targetPage;  // Uudelleenohjaus onnistumisen jälkeen
        } else {
            switch (selectedLanguage) {
                case 'EN':
                    alert("Failed to update information. Please try again.");
                    break;
                case 'CN':
                    alert("信息更新失败。请再试一次。");
                    break;
                case 'ET':
                    alert("Teave uuendamine ebaõnnestus. Palun proovi uuesti.");
                    break;
                case 'SV':
                    alert("Uppdateringen misslyckades. Försök igen.");
                    break;
                case 'FI':
                default:
                    alert("Päivitys epäonnistui. Yritä uudelleen.");
                    break;
            }
        }
    } catch (error) {
        // Käsittelee virheitä, jos lomakkeen lähetys epäonnistuu
        switch (selectedLanguage) {
            case 'EN':
                alert("An error occurred while updating information. Please try again later.");
                break;
            case 'CN':
                alert("信息更新时发生错误。请稍后再试。");
                break;
            case 'ET':
                alert("Viga teabe uuendamisel. Proovige hiljem uuesti.");
                break;
            case 'SV':
                alert("Fel uppstod vid uppdatering. Försök igen senare.");
                break;
            case 'FI':
                alert("Tietojen päivityksessä tapahtui virhe. Yritä myöhemmin uudelleen.");
                break;
            default:
                alert("Tietojen päivityksessä tapahtui virhe. Yritä myöhemmin uudelleen.");
                break;
        }
    }
}

/**
 * Suorittaa tiedon esittämisen, kun sivu on ladattu.
 */
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken");

    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);  // Dekoodaa Base64
    const parsedPayload = JSON.parse(payload);  // Parsii JSON-muodossa
    const userId = parsedPayload.asiakas_id;

    const response = await fetch(`http://localhost:3000/api/v1/asiakas/info/${userId}`);

    if (response.ok) {
        const userData = await response.json();  // Hakee tiedot JSON-muodossa

        document.getElementById("etunimi").value = userData.nimi || '';
        document.getElementById("sukunimi").value = userData.sukunimi || '';
        document.getElementById("tunnus").value = userData.tunnus || '';
        document.getElementById("email").value = userData.email || '';
        document.getElementById("puhelin").value = userData.puhelin || '';
    }
});

/**
 * Käsittelee salasanan vaihtolomakkeen lähettämisen.
 * 
 * @param {Event} event - Lomakkeen lähetyksen tapahtuma.
 */
document.getElementById("changePasswordForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Estää lomakkeen oletuskäytöksen

    const token = localStorage.getItem("authToken");

    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);
    const userID = parsedPayload.asiakas_id;
    const selectedLanguage = getSelectedLanguage();

    const newPassword = document.getElementById("salasana").value;
    const confirmPassword = document.getElementById("confirm_salasana").value;

    // Varmista, että uusi salasana ja vahvistus täsmäävät
    if (newPassword !== confirmPassword) {
        switch (selectedLanguage) {
            case 'EN':
                alert("New password and confirmation do not match.");
                break;
            case 'CN':
                alert("新密码和确认不匹配。");
                break;
            case 'ET':
                alert("Uus parool ja kinnitus ei ühti.");
                break;
            case 'SV':
                alert("Det nya lösenordet och bekräftelsen matchar inte.");
                break;
            case 'FI':
            default:
                alert("Uusi salasana ja vahvistus eivät täsmää.");
                break;
        }
        return;
    }

    // Päivitä salasana API:n avulla
    fetch(`http://localhost:3000/api/v1/asiakas/password/${userID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ salasana: newPassword }),  // Lähettää uuden salasanan
    })
        .then(response => {
            if (response.ok) {
                let targetPage = '';
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Password changed successfully.");
                        targetPage = '../../html/en/7Kayttaja_en.html';
                        break;
                    case 'CN':
                        alert("密码更改成功。");
                        targetPage = '../../html/cn/7Kayttaja_cn.html';
                        break;
                    case 'ET':
                        alert("Parool on edukalt muudetud.");
                        targetPage = '../../html/et/7Kayttaja_et.html';
                        break;
                    case 'SV':
                        alert("Lösenordet har ändrats framgångsrikt.");
                        targetPage = '../../html/sv/7Kayttaja_sv.html';
                        break;
                    case 'FI':
                    default:
                        alert("Salasana on vaihdettu.");
                        targetPage = '../../html/fi/7Kayttaja.html';
                        break;
                }
                window.location.href = targetPage;  // Uudelleenohjaus onnistumisen jälkeen
            } else {
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Error changing password. Please try again later.");
                        break;
                    case 'CN':
                        alert("更改密码时出错。请稍后再试。");
                        break;
                    case 'ET':
                        alert("Parooli muutmisel tekkis viga. Proovige hiljem uuesti.");
                        break;
                    case 'SV':
                        alert("Fel vid ändring av lösenord. Försök igen senare.");
                        break;
                    case 'FI':
                    default:
                        alert("Virhe salasanan päivittämisessä. Yritä uudelleen myöhemmin.");
                        break;
                }
            }
        })
        .catch(error => {
            switch (selectedLanguage) {
                case 'EN':
                    alert("An error occurred. Please try again later.");
                    break;
                case 'CN':
                    alert("发生错误。请稍后再试。");
                    break;
                case 'ET':
                    alert("Tekkis viga. Proovige hiljem uuesti.");
                    break;
                case 'SV':
                    alert("Ett fel uppstod. Försök senare.");
                    break;
                case 'FI':
                    alert("Virhe. Yritä uudelleen myöhemmin.");
                    break;
                default:
                    alert("Jotain meni pieleen. Yritä myöhemmin uudelleen.");
                    break;
            }
        });
});

const translations = {
    FI: {
        deleteButton: "Poista"
    },
    EN: {
        deleteButton: "Delete"
    },
    CN: {
        deleteButton: "删除"
    },
    ET: {
        deleteButton: "Kustuta"
    },
    SV: {
        deleteButton: "Ta bort"
    }
};

function getDeleteButtonText() {
    const lang = getSelectedLanguage();
    return translations[lang]?.deleteButton || translations.FI.deleteButton;
}

/**
 * Palauttaa allergioiden tallennusavaimen käyttäjän ID:n perusteella.
 *
 * @returns {string} Allergioiden tallennusavain.
 */
function getAllergiaStorageKey() {
    const token = localStorage.getItem('authToken');
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);

    return `userAllergia_${parsedPayload.asiakas_id}`;  // Rakentaa avaimen käyttäjän ID:n perusteella
}

/**
 * Päivittää allergialistan.
 * Tämä funktio lataa allergioiden luettelon ja päivittää HTML-sisällön.
 */
function updateAllergiaList() {
    const storageKey = getAllergiaStorageKey();
    const allergies = JSON.parse(localStorage.getItem(storageKey)) || [];
    const allergiaList = document.getElementById("allergiaList");

    allergiaList.innerHTML = '';  // Tyhjentää allergialistan ennen päivitystä

    allergies.forEach((allergia, index) => {
        const allergiaItem = document.createElement("div");
        allergiaItem.innerHTML = `
            ${allergia} 
            <button data-index="${index}" class="deleteButton">${getDeleteButtonText()}</button>
        `;
        allergiaList.appendChild(allergiaItem);  // Lisää jokaisen allergian listaan
    });

    // Lisää tapahtumakuuntelijat poistopainikkeille
    const deleteButtons = allergiaList.querySelectorAll("button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"), 10);
            allergies.splice(index, 1);  // Poistaa allergian listasta
            localStorage.setItem(storageKey, JSON.stringify(allergies));  // Päivittää tallennettu allergialista
            updateAllergiaList();  // Päivittää näkymän
        });
    });
}

/**
 * Lisää uuden allergian ja päivittää allergialistan.
 *
 * @param {Event} event - Lomakkeen lähetyksen tapahtuma.
 */
document.getElementById("allergiaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const allergia = document.getElementById("allergia").value;
    const selectedLanguage = getSelectedLanguage();

    // Estetään tyhjän allergian lisääminen
    if (allergia.trim() === "") {
        switch (selectedLanguage) {
            case 'EN':
                alert("Allergy field cannot be empty.");
                break;
            case 'CN':
                alert("过敏字段不能为空。");
                break;
            case 'ET':
                alert("Allergiaväli ei saa olla tühi.");
                break;
            case 'SV':
                alert("Allergifältet får inte vara tomt.");
                break;
            case 'FI':
            default:
                alert("Allergia ei voi olla tyhjä.");
                break;
        }
        return;
    }

    const storageKey = getAllergiaStorageKey();
    const allergies = JSON.parse(localStorage.getItem(storageKey)) || [];
    allergies.push(allergia);

    localStorage.setItem(storageKey, JSON.stringify(allergies));  // Lisää uusi allergia
    document.getElementById("allergia").value = '';  // Tyhjentää kentän

    updateAllergiaList();  // Päivittää allergialistan
});

updateAllergiaList();  // Käynnistää allergialistan päivityksen