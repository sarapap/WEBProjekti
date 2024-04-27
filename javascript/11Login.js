'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('#register-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const data = {
            etunimi: document.getElementById('firstname').value,
            sukunimi: document.getElementById('lastname').value,
            tunnus: document.getElementById('tunnus').value,
            salasana: document.getElementById('password').value,
            email: document.getElementById('email').value,
            puhelin: parseInt(document.getElementById('phone').value, 10),
            syntymapaiva: document.getElementById('syntymapaiva').value || null,
            rooli: "admin",
            ehdot_hyvaksytty: document.querySelector('#accept-1').checked ? 1 : 0,
            allennus_ryhma: document.querySelector('input[name="status"]:checked') ? document.querySelector('input[name="status"]:checked').value : null
        };

        console.log("Rekisteröinti data:", JSON.stringify(data));

        fetch('http://localhost:3000/api/v1/asiakas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log("Vastaus:", response.status);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Rekisteröinti epäonnistui');
                }
            })
            .then(data => {
                console.log('Rekisteröinti onnistui:', data);
                window.location.href = '../fi/7Kayttaja.html';
            })
            .catch(error => {
                console.error('Virhe rekisteröinnissä:', error);
                alert('Rekisteröinti epäonnistui. Yritä uudelleen.');
            });
    });
});
