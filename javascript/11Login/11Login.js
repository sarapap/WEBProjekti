document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');

    if (loginButton) {
        loginButton.addEventListener('click', function (event) {
            event.preventDefault();

            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const data = {
                tunnus: username,
                salasana: password,
            };

            fetch('http://localhost:3000/api/v1/asiakas/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Kirjautuminen epäonnistui');
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
                    console.error('Virhe kirjautumisessa:', error);
                    alert('Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana.');
                });
        });
    } else {
        console.error('Kirjautumispainiketta ei löydy');
    }

    const links = document.querySelectorAll('a');

    links.forEach(link => {
        if (link.href.endsWith('11Login.html')) {
            link.addEventListener('click', function (event) {
                event.preventPreventDefault();

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