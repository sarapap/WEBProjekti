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

        fetch('http://localhost:3000/api/v1/asiakas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Rekisteröinti epäonnistui');
                }
            })
            .then(data => {
                const token = data.token;

                if (token) {
                    localStorage.setItem('authToken', token);
                }

                if (token) {
                    window.location.href = '../../html/fi/7Kayttaja.html';
                } else {
                    window.location.href = '../../html/fi/11Login.html';
                }
            })
            .catch(error => {
                console.error('Virhe rekisteröinnissä:', error);
                alert('Rekisteröinti epäonnistui. Yritä uudelleen.');
            });
    });

    const links = document.querySelectorAll('a');

    links.forEach(link => {
        if (link.href.endsWith('11Login.html')) {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                const authToken = localStorage.getItem('authToken');

                if (authToken) {
                    window.location.href = '../../html/fi/7Kayttaja.html';
                } else {
                    window.location.href = '../../html/fi/11Login.html';
                }
            });
        }
    });
});