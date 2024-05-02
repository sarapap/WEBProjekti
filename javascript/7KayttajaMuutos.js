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
            alert("Tiedot päivitetty onnistuneesti.");
            window.location.href = '7Kayttaja.html';
        } else {
            throw new Error('Päivitys epäonnistui');
        }
    } catch (error) {
        alert("Käyttäjätunnus on varattu. Valitse toinen käyttäjätunnus.");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken");

    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);

    const userId = parsedPayload.asiakas_id;

    const response = await fetch(`http://localhost:3000/api/v1/asiakas/info/${userId}`);

    if (response.ok) {
        const userData = await response.json();

        document.getElementById("etunimi").value = userData.etunimi || '';
        document.getElementById("sukunimi").value = userData.sukunimi || '';
        document.getElementById("tunnus").value = userData.tunnus || '';
        document.getElementById("email").value = userData.email || '';
        document.getElementById("puhelin").value = userData.puhelin || '';
    } else {
        console.error("Virhe käyttäjän tietojen hakemisessa.");
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
                alert("Salasana on vaihdettu.");
                window.location.href = "7Kayttaja.html";
            } else {
                alert("Virhe salasanan päivityksessä.");
            }
        })
        .catch(error => {
            alert("Jotain meni pieleen.");
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

function updateAllergiaList() {
    const allergies = JSON.parse(localStorage.getItem("userAllergia")) || [];
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
            localStorage.setItem("userAllergia", JSON.stringify(allergies));
            updateAllergiaList();
        });
    });
}

document.getElementById("allergiaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const allergia = document.getElementById("allergia").value;

    if (allergia.trim() === "") {
        alert("Allergia ei voi olla tyhjä.");
        return;
    }

    const existingAllergias = JSON.parse(localStorage.getItem("userAllergia")) || [];
    existingAllergias.push(allergia);

    localStorage.setItem("userAllergia", JSON.stringify(existingAllergias));
    document.getElementById("allergia").value = '';

    updateAllergiaList();
});

updateAllergiaList();






