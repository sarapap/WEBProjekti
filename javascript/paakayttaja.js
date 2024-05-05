'use strict';

/*funktio kielen vaihtoon */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/* uuden käyttäjän lisäys adminin puolesta */

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("userModal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementById("closeModal");
    const selectedLanguage = getSelectedLanguage();

    if (openModalButton) {
        openModalButton.addEventListener('click', function (event) {
            event.preventDefault();
            modal.showModal();
        });
    }

    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', function (event) {
            event.preventDefault();
            modal.close();
        });
    }

    const userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const requiredFields = ["etunimi", "sukunimi", "tunnus", "salasana", "email", "puhelin"];
            const missingFields = requiredFields.filter(field => !document.getElementById(field)?.value);

            if (missingFields.length > 0) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert(`Missing fields: ${missingFields.join(", ")}`);
                        break;
                    case 'CN':
                        alert(`缺失的字段: ${missingFields.join(", ")}`);
                        break;
                    case 'ET':
                        alert(`Puuduvad väljad: ${missingFields.join(", ")}`);
                        break;
                    case 'SV':
                        alert(`Saknade fält: ${missingFields.join(", ")}`);
                        break;
                    case 'FI':
                    default:
                        alert(`Puuttuvat kentät: ${missingFields.join(", ")}`);
                        break;
                }
                return;
            }

            const data = {
                etunimi: document.getElementById('etunimi') ? document.getElementById('etunimi').value : '',
                sukunimi: document.getElementById('sukunimi') ? document.getElementById('sukunimi').value : '',
                tunnus: document.getElementById('tunnus') ? document.getElementById('tunnus').value : '',
                salasana: document.getElementById('salasana') ? document.getElementById('salasana').value : '',
                email: document.getElementById('email') ? document.getElementById('email').value : '',
                puhelin: document.getElementById('puhelin') ? parseInt(document.getElementById('puhelin').value, 10) : null,
                syntymapaiva: document.getElementById('syntymapaiva') && document.getElementById('syntymapaiva').value.trim() ? document.getElementById('syntymapaiva').value : null,
                rooli: document.getElementById("rooli") ? document.getElementById("rooli").value : "user",
                ehdot_hyvaksytty: document.getElementById('ehdot_hyvaksytty') && document.getElementById('ehdot_hyvaksytty').checked ? 1 : 0,
                allennus_ryhma: document.getElementById('alennus') ? document.getElementById('alennus').value : null,
            };

            try {
                const response = await fetch("http://localhost:3000/api/v1/asiakas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {

                    let targetPage = '';
                    switch (selectedLanguage) {
                        case 'EN':
                            targetPage = '../../html/en/10Paakayttaja_en.html';
                            alert("User added successfully.");
                            break;
                        case 'CN':
                            targetPage = '../../html/cn/10Paakayttaja_cn.html';
                            alert("用户已成功添加。");
                            break;
                        case 'ET':
                            targetPage = '../../html/et/10Paakayttaja_et.html';
                            alert("Kasutaja on edukalt lisatud.");
                            break;
                        case 'SV':
                            targetPage = '../../html/sv/10Paakayttaja_sv.html';
                            alert("Användare har lagts till framgångsrikt.");
                            break;
                        case 'FI':
                        default:
                            targetPage = '../../html/fi/10Paakayttaja.html';
                            alert("Käyttäjä lisätty onnistuneesti.");
                            break;
                    }

                    window.location.href = targetPage;
                } else {
                    switch (selectedLanguage) {
                        case 'EN':
                            alert("Failed to add user. Please try again.");
                            break;
                        case 'CN':
                            alert("添加用户失败。请再试一次。");
                            break;
                        case 'ET':
                            alert("Kasutaja lisamine ebaõnnestus. Proovi uuesti.");
                            break;
                        case 'SV':
                            alert("Misslyckades med att lägga till användare. Försök igen.");
                            break;
                        case 'FI':
                        default:
                            alert("Käyttäjän lisääminen epäonnistui.");
                            break;
                    }
                }
            } catch (error) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert("An error occurred while adding the user.");
                        break;
                    case 'CN':
                        alert("添加用户时发生错误。");
                        break;
                    case 'ET':
                        alert("Kasutaja lisamisel tekkis viga.");
                        break;
                    case 'SV':
                        alert("Ett fel uppstod när användaren lades till.");
                        break;
                    case 'FI':
                    default:
                        alert("Virhe käyttäjän lisäämisessä.");
                        break;
                }
            }
        });
    }
});

/* Pääkäyttäjän sivu, vain admin pääsee */

function base64Decode(str) {
    return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

function getUserRoleFromToken(token) {
    const parts = token.split('.');
    const payload = base64Decode(parts[1]);
    const payloadObject = JSON.parse(payload);
    return payloadObject.role;
}

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    const selectedLanguage = getSelectedLanguage();
    if (!token) {

        let redirectPage;
        switch (selectedLanguage) {
            case 'EN':
                redirectPage = '../../html/en/11Login_en.html';
                break;
            case 'CN':
                redirectPage = '../../html/cn/11login_cn.html';
                break;
            case 'ET':
                redirectPage = '../../html/et/11Login_et.html';
                break;
            case 'SV':
                redirectPage = '../../html/sv/11Login_sv.html';
                break;
            case 'FI':
            default:
                redirectPage = '../../html/fi/11Login.html';
                break;
        }

        window.location.href = redirectPage;
        return;
    }

    const userRole = getUserRoleFromToken(token);

    if (userRole !== "admin") {
        function showCustomModal() {
            const modal = document.getElementById('customModal');
            const overlay = document.getElementById('backgroundOverlay');

            modal.style.display = 'block';
            overlay.style.display = 'block';

            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', function () {

                let redirectPage;
                switch (selectedLanguage) {
                    case 'EN':
                        redirectPage = '../../html/en/1Etusivu_en.html';
                        break;
                    case 'CN':
                        redirectPage = '../../html/cn/1Etusivu_cn.html';
                        break;
                    case 'ET':
                        redirectPage = '../../html/et/1Etusivu_et.html';
                        break;
                    case 'SV':
                        redirectPage = '../../html/sv/1Etusivu_sv.html';
                        break;
                    case 'FI':
                    default:
                        redirectPage = '../../html/fi/1Etusivu.html';
                        break;
                }

                window.location.href = redirectPage;
            });
        }
        showCustomModal();
    }
});

/* palautteen saaminen */

window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("haePalaute");

    if (button) {
        button.addEventListener("click", async () => {

            const startDateElement = document.getElementById("aloituspvm");
            const endDateElement = document.getElementById("lopetuspvm");

            const startDate = startDateElement.value;
            const endDate = endDateElement.value;

            try {
                const response = await fetch(`http://localhost:3000/api/v1/palaute/${startDate}/${endDate}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const palaute = await response.json();
                    const palauteTbody = document.getElementById("palaute");

                    palauteTbody.innerHTML = "";

                    palaute.forEach((p) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `<td>${p.nimi}:</td><td>"${p.teksti}"</td>`;
                        palauteTbody.appendChild(row);
                    });

                }
            } catch (error) {
            }
        });
    }
});