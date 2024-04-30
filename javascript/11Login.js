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

                        const kieli = document.getElementById('kieli');
                        const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

                        let targetPage = '';
                        switch (selectedLanguage) {
                            case 'EN':
                                targetPage = '../../html/en/7Kayttaja_en.html';
                                break;
                            case 'CN':
                                targetPage = '../../html/cn/7Kayttaja_cn.html';
                                break;
                            case 'ET':
                                targetPage = '../../html/et/7Kayttaja_et.html';
                                break;
                            case 'SV':
                                targetPage = '../../html/sv/7Kayttaja_sv.html';
                                break;
                            case 'FI':
                            default:
                                targetPage = '../../html/fi/7Kayttaja.html';
                                break;
                        }

                        window.location.href = targetPage;
                    } else {
                        alert('Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana.');
                    }
                })
                .catch(error => {
                    console.error('Väärä käyttäjätunnus tai salasana.', error);
                    alert('Väärä käyttäjätunnus tai salasana.');
                });
        });
    }
});

