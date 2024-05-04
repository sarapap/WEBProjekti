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
                        switch (selectedLanguage) {
                            case 'EN':
                                alert('Login failed. Please check your username and password.');
                                break;
                            case 'CN':
                                alert('登录失败。请检查您的用户名和密码。');
                                break;
                            case 'ET':
                                alert('Sisselogimine ebaõnnestus. Kontrolli oma kasutajanime ja parooli.');
                                break;
                            case 'SV':
                                alert('Inloggningen misslyckades. Kontrollera ditt användarnamn och lösenord.');
                                break;
                            case 'FI':
                            default:
                                alert('Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana.');
                                break;
                        }
                    }
                })
                .catch(error => {
                    switch (selectedLanguage) {
                        case 'EN':
                            alert('An error occurred during login. Please try again later.');
                            break;
                        case 'CN':
                            alert('登录时发生错误。请稍后再试。');
                            break;
                        case 'ET':
                            alert('Sisselogimisel ilmnes viga. Palun proovi hiljem uuesti.');
                            break;
                        case 'SV':
                            alert('Ett fel uppstod vid inloggning. Försök igen senare.');
                            break;
                        case 'FI':
                        default:
                            alert('Virhe kirjautumisessa. Yritä myöhemmin uudelleen.');
                            break;
                    }
                });
        });
    }
});

