'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("userModal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementById("closeModal");

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
                alert(`Puuttuvat kentät: ${missingFields.join(", ")}`);
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
                    const kieli = document.getElementById('kieli');
                    const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

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
                    throw new Error("Käyttäjän lisääminen epäonnistui");
                }

            } catch (error) {
                console.error("Virhe SQL-kyselyssä:", error.message);
                alert("Virhe käyttäjän lisäämisessä.");
            }
        });
    }
});

/* Pääkäyttäjän sivu */

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
    if (!token) {
        window.location.href = "../../html/fi/11Login.html";
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
                const kieli = document.getElementById('kieli');
                const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

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

/* palaute */

window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("haePalaute");

    if (button) {
        button.addEventListener("click", async () => {

            const startDateElement = document.getElementById("aloituspvm");
            const endDateElement = document.getElementById("lopetuspvm");

            const startDate = startDateElement.value;
            const endDate = endDateElement.value;

            if (!startDate || !endDate) {
                console.error("Aloitus- ja lopetuspäivämäärä ovat pakollisia");
                return;
            }

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

                } else {
                    console.error("Ei onnistunut:", response.statusText);
                }

            } catch (error) {
                console.error("Virhe yhteydessä palvelimeen:", error);
            }
        });
    } else {
        console.error("Painiketta ei löydy.");
    }
});