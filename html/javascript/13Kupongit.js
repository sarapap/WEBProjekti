'use strict';

/*funktio kielen vaihtoon */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/* kupongin näkyvyys statuksen mukaan */

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
            });
    }
});

/* alennuskoodit */

function copyToClipboard(text) {
    const selectedLanguage = getSelectedLanguage();

    navigator.clipboard.writeText(text).then(() => {
        switch (selectedLanguage) {
            case 'EN':
                alert("Code copied to clipboard: " + text);
                break;
            case 'CN':
                alert("代码已复制到剪贴板：" + text);
                break;
            case 'ET':
                alert("Kood kopeeritud lõikelauale: " + text);
                break;
            case 'SV':
                alert("Koden kopierades till urklipp: " + text);
                break;
            case 'FI':
            default:
                alert("Koodi kopioitu leikepöydälle: " + text);
                break;
        }
    }).catch(err => {
        switch (selectedLanguage) {
            case 'EN':
                alert("Error copying to clipboard. Please try again.");
                break;
            case 'CN':
                alert("复制到剪贴板时出错。请再试一次。");
                break;
            case 'ET':
                alert("Lõikelauale kopeerimisel tekkis viga. Proovi uuesti.");
                break;
            case 'SV':
                alert("Fel vid kopiering till urklipp. Försök igen.");
                break;
            case 'FI':
            default:
                alert("Virhe kopioitaessa leikepöydälle. Yritä uudelleen.");
                break;
        }
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