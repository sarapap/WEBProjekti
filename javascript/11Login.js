'use strict';

document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        etunimi: document.getElementById('firstname').value,
        sukunimi: document.getElementById('lastname').value,
        tunnus: document.getElementById('name').value,
        salasana: document.getElementById('password').value,
        email: document.getElementById('email').value,
        puhelin: document.getElementById('phone').value,
        syntymapaiva: document.getElementById('today').value,
    };

    console.log('Lähetettävät tiedot:', data);

    fetch('http://localhost:3000/api/v1/asiakas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                console.log('Vastaus onnistui');
                alert('Rekisteröityminen onnistui');
            } else {
                console.log('Vastaus epäonnistui');
                throw new Error('Rekisteröityminen epäonnistui');
            }
        })
        .catch(error => {
            console.log('Virhe:', error.message);
            alert(error.message);
        });
});