'use strict';

async function submitForm(event) {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    const form = document.getElementById("editForm");
    const formData = new FormData(form);

    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
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
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const kieli = document.getElementById('kieli');
            const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

            let targetPage = '';
            switch (selectedLanguage) {
                case 'EN':
                    alert("Information updated successfully.")
                    targetPage = '../../html/en/7Kayttaja_en.html';
                    break;
                case 'CN':
                    alert("信息已成功更新。")
                    targetPage = '../../html/cn/7Kayttaja_cn.html';
                    break;
                case 'ET':
                    alert("Teave on edukalt uuendatud.")
                    targetPage = '../../html/et/7Kayttaja_et.html';
                    break;
                case 'SV':
                    alert("Informationen har uppdaterats framgångsrikt.")
                    targetPage = '../../html/sv/7Kayttaja_sv.html';
                    break;
                case 'FI':
                default:
                    alert("Tiedot päivitetty onnistuneesti.");
                    targetPage = '../../html/fi/7Kayttaja.html';
                    break;
            }

            window.location.href = targetPage;
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
        switch (selectedLanguage) {
            case 'EN':
                alert("Username is already taken. Please choose another one.");
                break;
            case 'CN':
                alert("用户名已被占用。请选择另一个。");
                break;
            case 'ET':
                alert("Kasutajanimi on juba kasutusel. Palun vali teine.");
                break;
            case 'SV':
                alert("Användarnamnet är redan upptaget. Välj ett annat.");
                break;
            case 'FI':
            default:
                alert("Käyttäjätunnus on varattu. Valitse toinen käyttäjätunnus.");
                break;
        }
    }
}

/* tiedot esille */
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken");

    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);

    const userId = parsedPayload.asiakas_id;

    const response = await fetch(`http://localhost:3000/api/v1/asiakas/info/${userId}`);

    if (response.ok) {
        const userData = await response.json();

        document.getElementById("etunimi").value = userData.nimi || '';
        document.getElementById("sukunimi").value = userData.sukunimi || '';
        document.getElementById("tunnus").value = userData.tunnus || '';
        document.getElementById("email").value = userData.email || '';
        document.getElementById("puhelin").value = userData.puhelin || '';
    }
});


document.getElementById("changePasswordForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const token = localStorage.getItem("authToken");

    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);

    const userID = parsedPayload.asiakas_id;

    const newPassword = document.getElementById("salasana").value;
    const confirmPassword = document.getElementById("confirm_salasana").value;

    if (newPassword !== confirmPassword) {
        alert("Uusi salasana ja vahvistus eivät täsmää.");
        return;
    }

    if (!newPassword) {
        alert("Uusi salasana on pakollinen.");
        return;
    }

    fetch(`http://localhost:3000/api/v1/asiakas/password/${userID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            salasana: newPassword,
        }),
    })
        .then(response => {
            if (response.ok) {
                const kieli = document.getElementById('kieli');
                const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

                let targetPage = '';
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Password has been changed.")
                        targetPage = '../../html/en/7Kayttaja_en.html';
                        break;
                    case 'CN':
                        alert("密码已更改。")
                        targetPage = '../../html/cn/7Kayttaja_cn.html';
                        break;
                    case 'ET':
                        alert("Parool on muudetud.")
                        targetPage = '../../html/et/7Kayttaja_et.html';
                        break;
                    case 'SV':
                        alert("Lösenordet har ändrats.")
                        targetPage = '../../html/sv/7Kayttaja_sv.html';
                        break;
                    case 'FI':
                    default:
                        alert("Salasana on vaihdettu.");
                        targetPage = '../../html/fi/7Kayttaja.html';
                        break;
                }

                window.location.href = targetPage;
            } else {
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Error updating password. Please try again.");
                        break;
                    case 'CN':
                        alert("更改密码时出错。请再试一次。");
                        break;
                    case 'ET':
                        alert("Parooli uuendamisel tekkis viga. Proovi uuesti.");
                        break;
                    case 'SV':
                        alert("Fel vid uppdatering av lösenordet. Försök igen.");
                        break;
                    case 'FI':
                    default:
                        alert("Virhe salasanan päivittämisessä. Yritä uudelleen.");
                        break;
                }
            }
        })
        .catch(error => {
            const kieli = document.getElementById('kieli');
            const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

            switch (selectedLanguage) {
                case 'EN':
                    alert("Something went wrong. Please try again later.");
                    break;
                case 'CN':
                    alert("出了点问题。请稍后再试。");
                    break;
                case 'ET':
                    alert("Midagi läks valesti. Proovi hiljem uuesti.");
                    break;
                case 'SV':
                    alert("Något gick fel. Försök igen senare.");
                    break;
                case 'FI':
                    alert("Jotain meni pieleen. Yritä myöhemmin uudelleen.");
                    break;
                default:
                    alert("Jotain meni pieleen. Yritä myöhemmin uudelleen.");
                    break;
            }
        });
});

/* ruoka-allergiat */

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

function getLanguage() {
    const languageSelect = document.getElementById("kieli");
    return languageSelect ? languageSelect.value : "FI";
}

function getDeleteButtonText() {
    const lang = getLanguage();
    return translations[lang]?.deleteButton || translations.FI.deleteButton;
}

function getAllergiaStorageKey() {
    const token = localStorage.getItem('authToken');
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);

    const userID = parsedPayload.asiakas_id;
    return `userAllergia_${userID}`;
}


function updateAllergiaList() {
    const userAllergia = getAllergiaStorageKey();
    const allergies = JSON.parse(localStorage.getItem(userAllergia)) || [];
    const allergiaList = document.getElementById("allergiaList");

    allergiaList.innerHTML = '';

    allergies.forEach((allergia, index) => {
        const allergiaItem = document.createElement("div");
        allergiaItem.innerHTML = `
            ${allergia} 
            <button data-index="${index}" class="deleteButton">${getDeleteButtonText()}</button>
        `;
        allergiaList.appendChild(allergiaItem);
    });

    const deleteButtons = allergiaList.querySelectorAll("button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"), 10);
            allergies.splice(index, 1);
            localStorage.setItem(userAllergia, JSON.stringify(allergies));
            updateAllergiaList();
        });
    });
}

document.getElementById("allergiaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const allergia = document.getElementById("allergia").value;

    const kieli = document.getElementById('kieli');
    const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

    if (allergia.trim() === "") {
        switch (selectedLanguage) {
            case 'EN':
                alert("Allergy field cannot be empty.");
                break;
            case 'CN':
                alert("过敏字段不能为空。");
                break;
            case 'ET':
                alert("Allergia väli ei tohi olla tühi.");
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

    const userAllergia = getAllergiaStorageKey();
    const allergies = JSON.parse(localStorage.getItem(userAllergia)) || [];
    allergies.push(allergia);

    localStorage.setItem(userAllergia, JSON.stringify(allergies));
    document.getElementById("allergia").value = '';

    updateAllergiaList();
});

updateAllergiaList();








