'use strict';

const modal = document.getElementById("userModal");
const closeModalButton = document.getElementById("closeModal");

document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById("openModal");
    if (openModalButton) {
        openModalButton.addEventListener('click', function (event) {
            event.preventDefault();
            modal.showModal();
        });
    } else {
        console.error("openModalButton is null");
    }

    const closeModalButton = document.getElementById("closeModal");
    const modal = document.getElementById("userModal");

    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', function (event) {
            event.preventDefault();
            modal.close();
        });
    } else {
        console.error("closeModalButton or modal is null");
    }

    const userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(userForm);

            const userData = {
                etunimi: formData.get("etunimi"),
                sukunimi: formData.get("sukunimi"),
                tunnus: formData.get("tunnus"),
                salasana: formData.get("salasana"),
                email: formData.get("email"),
                puhelin: formData.get("puhelin"),
                syntymapaiva: formData.get("syntymapaiva"),
                rooli: formData.get("rooli"),
                ehdot_hyvaksytty: formData.get("ehdot_hyvaksytty"),
            };

            try {
                const response = await fetch("http://localhost:3000/api/v1/asiakas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    modal.close();
                    alert("Käyttäjä lisätty");
                } else {
                    throw new Error("Käyttäjän lisääminen epäonnistui");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Virhe käyttäjän lisäämisessä");
            }
        });
    } else {
        console.error("userForm is null");
    }
});
